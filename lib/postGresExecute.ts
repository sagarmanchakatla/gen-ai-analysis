import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.NEON_POSTGRES_URL, // Use environment variable for security
  ssl: {
    rejectUnauthorized: false, // Required for Neon DB
  },
});

async function executeSQL(sqlQuery: string) {
  try {
    const client = await pool.connect();
    const result = await client.query(sqlQuery);
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Database execution error:", error);
    throw new Error("Failed to execute query");
  }
}

export default async function postGresExecute(sqlQuery: string) {
  try {
    console.log("Excuting From Postgres");
    const queryResult = await executeSQL(sqlQuery);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
}
