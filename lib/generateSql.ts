import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { streamText } from "ai";

// Initialize Groq client
const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateSql(query: string, tableSchemas: string) {
  const systemPrompt = `
      You are a SQL query generator for a business analytics tool. 
      Based on the following database schema and the user's natural language query, 
      generate the appropriate SQL query.

      Database Schema:
      ${tableSchemas}

      Rules:
      1. Only respond with the SQL query, no explanations
      2. Use standard SQL syntax
      3. If the query is ambiguous, make reasonable assumptions
      4. Only query tables that exist in the schema
    `;

  // Generate SQL using Groq
  const result = await streamText({
    model: groq("llama3-70b-8192"), // or "mixtral-8x7b-32768"
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    system: systemPrompt,
  });

  // Collect the full response
  let sqlQuery = "";
  for await (const chunk of result.textStream) {
    sqlQuery += chunk;
  }

  return sqlQuery;
}
