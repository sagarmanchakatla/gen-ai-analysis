// import data from "@/data/data.json";

// interface QueryExplanation {
//   originalQuery: string;
//   sqlQuery: string;
//   intent: string;
//   complexity: {
//     score: "Low" | "Medium" | "High";
//     factors: string[];
//   };
//   tables: {
//     name: string;
//     operation: "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "JOIN";
//     columns: string[];
//     affectedRows?: number;
//     schema: Record<string, string>; // Add schema information
//   }[];
//   executionPlan: {
//     steps: string[];
//     estimatedPerformance: "Fast" | "Moderate" | "Slow";
//   };
//   potentialIssues: string[];
//   optimizationSuggestions: string[];
//   schemaSummary: string;
// }

// export function explainQuery(
//   naturalLanguageQuery: string,
//   sqlQuery: string
// ): QueryExplanation {
//   // Parse SQL query to extract components
//   const sqlLower = sqlQuery.toLowerCase();
//   const isSelect = sqlLower.startsWith("select");
//   const isInsert = sqlLower.startsWith("insert");
//   const isUpdate = sqlLower.startsWith("update");
//   const isDelete = sqlLower.startsWith("delete");

//   // Generate table schema information
//   const tableSchemas = Object.entries(data)
//     .map(([tableName, records]) => {
//       if (records.length === 0) return `${tableName}: No records`;
//       const columns = Object.keys(records[0]).join(", ");
//       return `${tableName} (${columns}) - ${records.length} records`;
//     })
//     .join("\n");

//   // Extract tables from SQL with better regex
//   const tableRegex = /(?:from|join|update|into)\s+([\w]+)/gi;
//   const tables = [];
//   let match;
//   while ((match = tableRegex.exec(sqlLower)) !== null) {
//     tables.push(match[1]);
//   }
//   const uniqueTables = [...new Set(tables)];

//   // Extract columns with improved regex
//   const columns: string[] = [];

//   // Handle SELECT columns
//   const selectColRegex = /select\s+([^]+?)\s+from/gi;
//   if ((match = selectColRegex.exec(sqlLower)) !== null) {
//     match[1].split(",").forEach((col) => {
//       const cleanCol = col.trim().split(" ")[0].split("(")[0].split(")")[0];
//       if (cleanCol && cleanCol !== "*") {
//         columns.push(cleanCol.replace(/["`]/g, ""));
//       }
//     });
//   }

//   // Handle WHERE conditions
//   const whereColRegex = /where\s+([\w.]+)/gi;
//   while ((match = whereColRegex.exec(sqlLower)) !== null) {
//     const cleanCol = match[1].trim().split(" ")[0].split("=")[0];
//     if (cleanCol && !columns.includes(cleanCol)) {
//       columns.push(cleanCol.replace(/["`]/g, ""));
//     }
//   }

//   // Handle JOIN conditions
//   const joinColRegex = /join\s+[\w]+\s+on\s+([\w.]+)\s*=\s*[\w.]+/gi;
//   while ((match = joinColRegex.exec(sqlLower)) !== null) {
//     const cleanCol = match[1].trim();
//     if (cleanCol && !columns.includes(cleanCol)) {
//       columns.push(cleanCol.replace(/["`]/g, ""));
//     }
//   }

//   // Handle SET clauses for UPDATE
//   const setColRegex = /set\s+([^]+?)(?:\s+where|$)/gi;
//   if ((match = setColRegex.exec(sqlLower)) !== null) {
//     match[1].split(",").forEach((setClause) => {
//       const cleanCol = setClause.trim().split("=")[0].trim();
//       if (cleanCol && !columns.includes(cleanCol)) {
//         columns.push(cleanCol.replace(/["`]/g, ""));
//       }
//     });
//   }

//   // Determine intent
//   let intent = "Read";
//   if (isInsert) intent = "Create";
//   if (isUpdate) intent = "Update";
//   if (isDelete) intent = "Delete";
//   if (sqlLower.includes("join")) intent += " with Join";
//   if (sqlLower.includes("group by")) intent += " with Aggregation";
//   if (sqlLower.includes("where")) intent += " with Filtering";

//   // Calculate complexity
//   const complexityFactors = [];
//   let complexityScore: "Low" | "Medium" | "High" = "Low";

//   if (uniqueTables.length > 1) complexityFactors.push("Multiple tables");
//   if (sqlLower.includes("join")) complexityFactors.push("Table joins");
//   if (sqlLower.includes("group by")) complexityFactors.push("Aggregation");
//   if (sqlLower.includes("subselect")) complexityFactors.push("Subqueries");
//   if (sqlLower.includes("order by")) complexityFactors.push("Sorting");

//   if (complexityFactors.length > 3) complexityScore = "High";
//   else if (complexityFactors.length > 1) complexityScore = "Medium";

//   // Generate execution plan
//   const executionSteps = [];
//   if (isSelect) {
//     executionSteps.push("Parse query and identify tables");
//     if (sqlLower.includes("where"))
//       executionSteps.push("Apply filtering conditions");
//     if (sqlLower.includes("join")) executionSteps.push("Perform table joins");
//     if (sqlLower.includes("group by"))
//       executionSteps.push("Group and aggregate data");
//     if (sqlLower.includes("order by")) executionSteps.push("Sort results");
//     executionSteps.push("Return selected columns");
//   } else if (isUpdate) {
//     executionSteps.push("Identify target table and rows");
//     executionSteps.push("Apply update to matching rows");
//     executionSteps.push("Return affected row count");
//   }

//   // Estimate performance
//   let estimatedPerformance: "Fast" | "Moderate" | "Slow" = "Fast";
//   if (sqlLower.includes("like %")) estimatedPerformance = "Slow";
//   if (sqlLower.includes("join")) estimatedPerformance = "Moderate";
//   if (complexityScore === "High") estimatedPerformance = "Slow";

//   // Check for potential issues
//   const potentialIssues = [];
//   if (sqlLower.includes("select *"))
//     potentialIssues.push("Selecting all columns may impact performance");
//   if (sqlLower.includes("like %"))
//     potentialIssues.push("Leading wildcard in LIKE will prevent index usage");
//   if (!sqlLower.includes("where") && (isUpdate || isDelete)) {
//     potentialIssues.push("Missing WHERE clause could affect all rows");
//   }

//   // Generate optimization suggestions
//   const optimizationSuggestions = [];
//   if (sqlLower.includes("select *")) {
//     optimizationSuggestions.push(
//       "Specify only needed columns instead of using SELECT *"
//     );
//   }
//   if (sqlLower.includes("like %")) {
//     optimizationSuggestions.push(
//       "Consider full-text search for better performance with wildcard searches"
//     );
//   }
//   if (complexityFactors.includes("Multiple tables")) {
//     optimizationSuggestions.push("Ensure proper indexes exist on join columns");
//   }

//   // Build table analysis with schema information
//   const tableAnalysis = uniqueTables.map((table) => {
//     const tableData = data[table as keyof typeof data];
//     const tableColumns =
//       tableData && tableData.length > 0 ? Object.keys(tableData[0]) : [];

//     // Find columns that belong to this table
//     const tableSpecificColumns = columns
//       .filter((col) => {
//         // Handle both "table.column" and "column" formats
//         if (col.includes(".")) {
//           return col.startsWith(`${table}.`);
//         }
//         // For simple column names, check if they exist in this table's schema
//         return tableColumns.includes(col);
//       })
//       .map((col) => (col.includes(".") ? col.split(".")[1] : col));

//     return {
//       name: table,
//       operation: isSelect
//         ? "SELECT"
//         : isInsert
//         ? "INSERT"
//         : isUpdate
//         ? "UPDATE"
//         : "DELETE",
//       columns: tableSpecificColumns,
//       affectedRows: isSelect ? undefined : Math.floor(Math.random() * 1000),
//       schema:
//         tableData && tableData.length > 0
//           ? Object.fromEntries(
//               Object.entries(tableData[0]).map(([key, value]) => [
//                 key,
//                 typeof value,
//               ])
//             )
//           : {},
//     };
//   });

//   return {
//     originalQuery: naturalLanguageQuery,
//     sqlQuery,
//     intent,
//     complexity: {
//       score: complexityScore,
//       factors: complexityFactors,
//     },
//     tables: tableAnalysis,
//     executionPlan: {
//       steps: executionSteps,
//       estimatedPerformance,
//     },
//     potentialIssues,
//     optimizationSuggestions,
//     schemaSummary: tableSchemas,
//   };
// }

import data from "@/data/data.json";

interface QueryExplanation {
  originalQuery: string;
  sqlQuery: string;
  intent: string;
  complexity: {
    score: "Low" | "Medium" | "High";
    factors: string[];
  };
  tables: {
    name: string;
    operation: "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "JOIN";
    columns: string[];
    affectedRows?: number;
    schema: Record<string, string>;
  }[];
  executionPlan: {
    steps: string[];
    estimatedPerformance: "Fast" | "Moderate" | "Slow";
  };
  potentialIssues: string[];
  optimizationSuggestions: string[];
  schemaSummary: string;
}

export function explainQuery(
  naturalLanguageQuery: string,
  sqlQuery: string
): QueryExplanation {
  // Parse SQL query to extract components
  const sqlLower = sqlQuery.toLowerCase();
  const isSelect = sqlLower.startsWith("select");
  const isInsert = sqlLower.startsWith("insert");
  const isUpdate = sqlLower.startsWith("update");
  const isDelete = sqlLower.startsWith("delete");

  // Generate table schema information
  const tableSchemas = Object.entries(data)
    .map(([tableName, records]) => {
      if (records.length === 0) return `${tableName}: No records`;
      const columns = Object.keys(records[0]).join(", ");
      return `${tableName} (${columns}) - ${records.length} records`;
    })
    .join("\n");

  // Extract tables from SQL with better regex
  const tableRegex = /(?:from|join|update|into)\s+([\w]+)/gi;
  const tables = [];
  let match;
  while ((match = tableRegex.exec(sqlLower)) !== null) {
    tables.push(match[1]);
  }
  const uniqueTables = [...new Set(tables)];

  // Extract columns with improved regex
  const columns: string[] = [];

  // Handle SELECT columns
  const selectColRegex = /select\s+([^]+?)\s+from/gi;
  if ((match = selectColRegex.exec(sqlLower)) !== null) {
    match[1].split(",").forEach((col) => {
      const cleanCol = col.trim().split(" ")[0].split("(")[0].split(")")[0];
      if (cleanCol && cleanCol !== "*") {
        columns.push(cleanCol.replace(/["`]/g, ""));
      }
    });
  }

  // Handle WHERE conditions
  const whereColRegex = /where\s+([\w.]+)/gi;
  while ((match = whereColRegex.exec(sqlLower)) !== null) {
    const cleanCol = match[1].trim().split(" ")[0].split("=")[0];
    if (cleanCol && !columns.includes(cleanCol)) {
      columns.push(cleanCol.replace(/["`]/g, ""));
    }
  }

  // Handle JOIN conditions
  const joinColRegex = /join\s+[\w]+\s+on\s+([\w.]+)\s*=\s*[\w.]+/gi;
  while ((match = joinColRegex.exec(sqlLower)) !== null) {
    const cleanCol = match[1].trim();
    if (cleanCol && !columns.includes(cleanCol)) {
      columns.push(cleanCol.replace(/["`]/g, ""));
    }
  }

  // Handle SET clauses for UPDATE
  const setColRegex = /set\s+([^]+?)(?:\s+where|$)/gi;
  if ((match = setColRegex.exec(sqlLower)) !== null) {
    match[1].split(",").forEach((setClause) => {
      const cleanCol = setClause.trim().split("=")[0].trim();
      if (cleanCol && !columns.includes(cleanCol)) {
        columns.push(cleanCol.replace(/["`]/g, ""));
      }
    });
  }

  // Determine intent
  let intent = "Read";
  if (isInsert) intent = "Create";
  if (isUpdate) intent = "Update";
  if (isDelete) intent = "Delete";
  if (sqlLower.includes("join")) intent += " with Join";
  if (sqlLower.includes("group by")) intent += " with Aggregation";
  if (sqlLower.includes("where")) intent += " with Filtering";

  // Calculate complexity
  const complexityFactors = [];
  let complexityScore: "Low" | "Medium" | "High" = "Low";

  if (uniqueTables.length > 1) complexityFactors.push("Multiple tables");
  if (sqlLower.includes("join")) complexityFactors.push("Table joins");
  if (sqlLower.includes("group by")) complexityFactors.push("Aggregation");
  if (sqlLower.includes("subselect")) complexityFactors.push("Subqueries");
  if (sqlLower.includes("order by")) complexityFactors.push("Sorting");

  if (complexityFactors.length > 3) complexityScore = "High";
  else if (complexityFactors.length > 1) complexityScore = "Medium";

  // Generate execution plan
  const executionSteps = [];
  if (isSelect) {
    executionSteps.push("Parse query and identify tables");
    if (sqlLower.includes("where"))
      executionSteps.push("Apply filtering conditions");
    if (sqlLower.includes("join")) executionSteps.push("Perform table joins");
    if (sqlLower.includes("group by"))
      executionSteps.push("Group and aggregate data");
    if (sqlLower.includes("order by")) executionSteps.push("Sort results");
    executionSteps.push("Return selected columns");
  } else if (isUpdate) {
    executionSteps.push("Identify target table and rows");
    executionSteps.push("Apply update to matching rows");
    executionSteps.push("Return affected row count");
  }

  // Estimate performance
  let estimatedPerformance: "Fast" | "Moderate" | "Slow" = "Fast";
  if (sqlLower.includes("like %")) estimatedPerformance = "Slow";
  if (sqlLower.includes("join")) estimatedPerformance = "Moderate";
  if (complexityScore === "High") estimatedPerformance = "Slow";

  // Check for potential issues
  const potentialIssues = [];
  if (sqlLower.includes("select *"))
    potentialIssues.push("Selecting all columns may impact performance");
  if (sqlLower.includes("like %"))
    potentialIssues.push("Leading wildcard in LIKE will prevent index usage");
  if (!sqlLower.includes("where") && (isUpdate || isDelete)) {
    potentialIssues.push("Missing WHERE clause could affect all rows");
  }

  // Generate optimization suggestions
  const optimizationSuggestions = [];
  if (sqlLower.includes("select *")) {
    optimizationSuggestions.push(
      "Specify only needed columns instead of using SELECT *"
    );
  }
  if (sqlLower.includes("like %")) {
    optimizationSuggestions.push(
      "Consider full-text search for better performance with wildcard searches"
    );
  }
  if (complexityFactors.includes("Multiple tables")) {
    optimizationSuggestions.push("Ensure proper indexes exist on join columns");
  }

  // Build table analysis with schema information
  const tableAnalysis = uniqueTables.map((table) => {
    const tableData = data[table as keyof typeof data];
    const tableColumns =
      tableData && tableData.length > 0 ? Object.keys(tableData[0]) : [];

    // Find columns that belong to this table
    const tableSpecificColumns = columns
      .filter((col) => {
        // Handle both "table.column" and "column" formats
        if (col.includes(".")) {
          return col.startsWith(`${table}.`);
        }
        // For simple column names, check if they exist in this table's schema
        return tableColumns.includes(col);
      })
      .map((col) => (col.includes(".") ? col.split(".")[1] : col));

    // Determine operation with proper type
    let operation: "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "JOIN" =
      "SELECT";
    if (isInsert) operation = "INSERT";
    else if (isUpdate) operation = "UPDATE";
    else if (isDelete) operation = "DELETE";
    else if (sqlLower.includes("join")) operation = "JOIN";

    return {
      name: table,
      operation,
      columns: tableSpecificColumns,
      affectedRows: isSelect ? undefined : Math.floor(Math.random() * 1000),
      schema:
        tableData && tableData.length > 0
          ? Object.fromEntries(
              Object.entries(tableData[0]).map(([key, value]) => [
                key,
                typeof value === "string"
                  ? "string"
                  : typeof value === "number"
                  ? "number"
                  : typeof value === "boolean"
                  ? "boolean"
                  : "string", // default to string for other types
              ])
            )
          : {},
    };
  });

  return {
    originalQuery: naturalLanguageQuery,
    sqlQuery,
    intent,
    complexity: {
      score: complexityScore,
      factors: complexityFactors,
    },
    tables: tableAnalysis,
    executionPlan: {
      steps: executionSteps,
      estimatedPerformance,
    },
    potentialIssues,
    optimizationSuggestions,
    schemaSummary: tableSchemas,
  };
}
