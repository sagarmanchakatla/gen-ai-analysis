import { NextRequest, NextResponse } from "next/server";
import data from "@/data/data.json";
import { z } from "zod";
import { generateSql } from "@/lib/generateSql";
import { explainQuery } from "@/lib/explainQuery";

// Query Validation Schema
const QueryValidationSchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters long"),
});

export async function POST(request: NextRequest) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    QueryValidationSchema.parse({ query });

    const tableSchemas = Object.entries(data)
      .map(([tableName, records]) => {
        if (records.length === 0) return `${tableName}: No records`;

        const columns = Object.keys(records[0]).join(", ");
        return `${tableName} (${columns}) - ${records.length} records`;
      })
      .join("\n");

    const sqlQuery = await generateSql(query, tableSchemas);

    const explainQueryResult = explainQuery(query, sqlQuery);
    console.log(explainQueryResult);

    return NextResponse.json(explainQueryResult, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
