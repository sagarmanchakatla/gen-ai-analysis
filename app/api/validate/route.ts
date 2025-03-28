// app/api/validate/route.ts
import { NextResponse } from "next/server";
import data from "@/data/data.json";

interface ValidationResult {
  isValid: boolean;
  issues: {
    message: string;
    type: "missing-table" | "missing-column";
  }[];
  schemaInfo: string;
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Generate table schema information
    const tableSchemas = Object.entries(data)
      .map(([tableName, records]) => {
        if (records.length === 0) return `${tableName}: No records`;
        const columns = Object.keys(records[0]).join(", ");
        return `${tableName} (${columns}) - ${records.length} records`;
      })
      .join("\n");

    const validationResult = validateSQLQuery(query, tableSchemas);
    return NextResponse.json(validationResult);
  } catch (error) {
    console.error("Error validating query:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function validateSQLQuery(
  sqlQuery: string,
  tableSchemas: string
): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    issues: [],
    schemaInfo: tableSchemas,
  };

  const sqlLower = sqlQuery.toLowerCase().trim();
  const availableTables = Object.keys(data);

  // 1. Validate tables
  const extractedTables = extractTables(sqlLower);
  extractedTables.forEach((table) => {
    if (!availableTables.includes(table)) {
      result.isValid = false;
      result.issues.push({
        message: `Table '${table}' does not exist in the database`,
        type: "missing-table",
      });
    }
  });

  // 2. Validate columns
  const extractedColumns = extractColumns(sqlLower);
  extractedColumns.forEach(({ column, table }) => {
    if (table) {
      // Column with explicit table reference
      if (availableTables.includes(table)) {
        const tableColumns = Object.keys(
          data[table as keyof typeof data][0] || {}
        );
        if (!tableColumns.includes(column)) {
          result.isValid = false;
          result.issues.push({
            message: `Column '${column}' does not exist in table '${table}'`,
            type: "missing-column",
          });
        }
      }
    } else {
      // Column without table reference
      const columnExists = availableTables.some((t) => {
        const tableColumns = Object.keys(data[t as keyof typeof data][0] || {});
        return tableColumns.includes(column);
      });

      if (!columnExists) {
        result.isValid = false;
        result.issues.push({
          message: `Column '${column}' does not exist in any table`,
          type: "missing-column",
        });
      }
    }
  });

  // 3. If valid, add justification
  if (result.isValid) {
    result.issues.push({
      message: "Query is valid because:",
      type: "missing-table", // Reusing type for valid case
    });

    // Justification for tables
    if (extractedTables.length > 0) {
      result.issues.push({
        message: `- All referenced tables exist: ${extractedTables.join(", ")}`,
        type: "missing-table",
      });
    }

    // Justification for columns
    const columnMessages = extractedColumns.map(({ column, table }) => {
      if (table) {
        return `- Column '${column}' exists in table '${table}'`;
      } else {
        const containingTables = availableTables.filter((t) =>
          Object.keys(data[t as keyof typeof data][0] || {}).includes(column)
        );
        return `- Column '${column}' exists in table(s): ${containingTables.join(
          ", "
        )}`;
      }
    });

    columnMessages.forEach((msg) => {
      result.issues.push({
        message: msg,
        type: "missing-column",
      });
    });
  }

  return result;
}

// Helper functions
function extractTables(sql: string): string[] {
  const tableRegex = /(?:from|join|update|into)\s+([\w]+)/gi;
  const tables = [];
  let match;

  while ((match = tableRegex.exec(sql)) !== null) {
    tables.push(match[1]);
  }

  return [...new Set(tables)]; // Return unique tables
}

function extractColumns(
  sql: string
): Array<{ column: string; table: string | null }> {
  const columns: Array<{ column: string; table: string | null }> = [];

  // Extract columns from SELECT clause
  const selectColRegex = /select\s+([^]+?)\s+from/gi;
  const selectMatch = selectColRegex.exec(sql);
  if (selectMatch) {
    selectMatch[1].split(",").forEach((col) => {
      const cleanCol = col.trim().split(" ")[0].split("(")[0];
      if (cleanCol && cleanCol !== "*") {
        if (cleanCol.includes(".")) {
          const [table, column] = cleanCol.split(".");
          columns.push({ column, table });
        } else {
          columns.push({ column: cleanCol, table: null });
        }
      }
    });
  }

  // Extract columns from WHERE clause
  const whereColRegex = /where\s+([\w.]+)/gi;
  let whereMatch;
  while ((whereMatch = whereColRegex.exec(sql)) !== null) {
    const cleanCol = whereMatch[1].trim().split(" ")[0].split("=")[0];
    if (cleanCol) {
      if (cleanCol.includes(".")) {
        const [table, column] = cleanCol.split(".");
        columns.push({ column, table });
      } else {
        columns.push({ column: cleanCol, table: null });
      }
    }
  }

  return columns;
}
