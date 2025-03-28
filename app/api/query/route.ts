import { NextRequest, NextResponse } from "next/server";

import data from "@/data/data.json";
import executeSQL from "@/lib/executeSQL";
import { generateSql } from "@/lib/generateSql";
import postGresExecute from "@/lib/postGresExecute";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

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

    // Generate SQL query
    const sqlQuery = await generateSql(query, tableSchemas);

    // Execute the SQL query against our JSON data (simplified execution)
    // const queryResult = executeSQL(sqlQuery, data);

    const queryResult = await postGresExecute(sqlQuery);
    return NextResponse.json({
      query,
      sql: sqlQuery,
      result: queryResult,
    });
  } catch (error) {
    console.error("Error processing query:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
