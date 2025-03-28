// import { Pool } from "pg";
// import { NextRequest, NextResponse } from "next/server";

// const pool = new Pool({
//   connectionString: process.env.NEON_POSTGRES_URL, // Use environment variable for security
//   ssl: {
//     rejectUnauthorized: false, // Required for Neon DB
//   },
// });

// async function executeSQL(sqlQuery: string) {
//   try {
//     const client = await pool.connect();
//     const result = await client.query(sqlQuery);
//     client.release();
//     return result.rows;
//   } catch (error) {
//     console.error("Database execution error:", error);
//     throw new Error("Failed to execute query");
//   }
// }

// export async function POST(request: NextRequest) {
//   const { sql } = await request.json();
//   console.log(sql);
//   try {
//     const queryResult = await executeSQL(sql);
//     console.log(queryResult);
//     return NextResponse.json(queryResult);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.NEON_POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET() {
  try {
    const client = await pool.connect();

    // Get all table names in the public schema
    const tablesQuery = `
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;
    const tablesResult = await client.query(tablesQuery);

    // Fetch data for each table
    const tablesData = await Promise.all(
      tablesResult.rows.map(async (table) => {
        // Get column names
        const columnsQuery = `
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = $1 AND table_schema = 'public'
        `;
        const columnsResult = await client.query(columnsQuery, [
          table.tablename,
        ]);
        const columns = columnsResult.rows.map((col) => col.column_name);

        // Fetch table data
        const dataQuery = `SELECT * FROM ${table.tablename} LIMIT 100`;
        const dataResult = await client.query(dataQuery);

        return {
          name: table.tablename,
          columns: columns,
          data: dataResult.rows,
        };
      })
    );

    client.release();

    return NextResponse.json(tablesData);
  } catch (error) {
    console.error("Error fetching table data:", error);
    return NextResponse.json(
      { error: "Failed to fetch table data" },
      { status: 500 }
    );
  }
}
