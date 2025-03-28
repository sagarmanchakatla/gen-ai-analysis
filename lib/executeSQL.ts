function preprocessWhereClause(whereClause: string): string {
  // Helper function to safely convert values
  const processValue = (val: string) => {
    // If it's a number, convert directly
    if (/^\d+(\.\d+)?$/.test(val)) {
      return val;
    }
    // If it's a column reference, wrap in row lookup
    if (/^\w+$/.test(val)) {
      return `row['${val}']`;
    }
    // Otherwise, treat as a string
    return `"${val}"`;
  };

  let processedClause = whereClause
    // Remove any trailing parentheses
    .replace(/\)+$/, "")

    // Tokenize the clause
    .split(/\s+/)
    .map((token) => {
      // Handle comparison operators
      if ([">", "<", ">=", "<=", "=", "!=", "<>"].includes(token)) {
        return token;
      }

      // Handle logical operators
      if (["AND", "OR", "NOT"].includes(token.toUpperCase())) {
        return token.toLowerCase() === "and"
          ? "&&"
          : token.toLowerCase() === "or"
          ? "||"
          : "!";
      }

      // Process values
      return processValue(token);
    })
    .join(" ");

  // Ensure the entire clause is wrapped in parentheses
  return `(${processedClause})`;
}

function evaluateWhereClause(
  whereClause: string,
  row: Record<string, any>
): boolean {
  // Comprehensive preprocessing of the where clause
  const processedClause = preprocessWhereClause(whereClause);

  try {
    // Create a function to evaluate the condition
    const conditionFunc = new Function("row", `return ${processedClause}`);
    return conditionFunc(row);
  } catch (error) {
    console.error("Evaluation error:", error);
    console.error("Original Clause:", whereClause);
    console.error("Processed Clause:", processedClause);
    throw error; // Re-throw the error for better debugging
  }
}

export default function executeSQL(
  sqlQuery: string,
  data: Record<string, any[]>
) {
  try {
    // Remove trailing semicolon and trim whitespace
    sqlQuery = sqlQuery.replace(/;$/, "").trim();

    // More robust and comprehensive SQL parsing regex
    const selectMatch = sqlQuery.match(
      /SELECT\s+(.*?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+GROUP\s+BY\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?$/i
    );

    if (!selectMatch) {
      throw new Error("Invalid SQL query format");
    }

    const [
      ,
      selectClause,
      tableName,
      whereClause,
      groupByClause,
      orderByClause,
    ] = selectMatch;

    // Validate table exists
    if (!data[tableName]) {
      throw new Error(`Table ${tableName} not found`);
    }

    let results = [...data[tableName]];

    // WHERE clause processing
    if (whereClause) {
      results = results.filter((row) => {
        try {
          return evaluateWhereClause(whereClause.trim(), row);
        } catch (filterError) {
          console.error("Error in WHERE clause filter:", filterError);
          return false;
        }
      });
    }

    // Handle SELECT columns
    const columns =
      selectClause.trim() === "*"
        ? Object.keys(results[0] || {})
        : selectClause.split(",").map((col) => col.trim());

    // Group BY processing (basic aggregation)
    if (groupByClause) {
      const groupColumns = groupByClause.split(",").map((col) => col.trim());
      const aggregatedResults: Record<string, any>[] = [];
      const groupMap = new Map();

      results.forEach((row) => {
        // Create a unique key based on group by columns
        const groupKey = groupColumns.map((col) => row[col]).join("|");

        if (!groupMap.has(groupKey)) {
          const groupRow: Record<string, any> = {};
          groupColumns.forEach((col) => {
            groupRow[col] = row[col];
          });
          groupMap.set(groupKey, groupRow);
          aggregatedResults.push(groupRow);
        }
      });

      results = aggregatedResults;
    }

    // ORDER BY processing
    if (orderByClause) {
      const [orderColumn, orderDirection] = orderByClause.trim().split(/\s+/);
      results.sort((a, b) => {
        if (orderDirection && orderDirection.toUpperCase() === "DESC") {
          return b[orderColumn] > a[orderColumn] ? 1 : -1;
        }
        return a[orderColumn] > b[orderColumn] ? 1 : -1;
      });
    }

    // Project only selected columns
    return results.map((row) =>
      columns.reduce((acc, col) => {
        acc[col] = row[col];
        return acc;
      }, {} as Record<string, any>)
    );
  } catch (error) {
    console.error("Comprehensive SQL Execution Error:", error);
    throw error;
  }
}
