// "use client";

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import { Loader2, AlertCircle, CheckCircle2, Play, Info } from "lucide-react";
// import QueryResults from "./query-results";
// import SqlExplanation from "./sql-explanation";
// import ValidationResults from "./validation-results";
// import DatabaseTablesDisplay from "./DatabaseTablesDisplay";

// export default function Dashboard() {
//   const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("");
//   const [sqlQuery, setSqlQuery] = useState("");
//   const [isExplaining, setIsExplaining] = useState(false);
//   const [isValidating, setIsValidating] = useState(false);
//   const [isRunning, setIsRunning] = useState(false);
//   const [explanation, setExplanation] = useState<any>(null);
//   const [validation, setValidation] = useState<any>(null);
//   const [queryResults, setQueryResults] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("explanation");

//   // Update the handleExplain function to properly handle the API response
//   const handleExplain = async () => {
//     if (!naturalLanguageQuery.trim()) {
//       setError("Please enter a query");
//       return;
//     }

//     setError(null);
//     setIsExplaining(true);
//     setActiveTab("explanation");

//     try {
//       const response = await fetch("/api/explain", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: naturalLanguageQuery }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to explain query");
//       }

//       const data = await response.json();
//       setExplanation(data);
//       setSqlQuery(data.sqlQuery || data.sql || "");

//       // Automatically validate after explaining
//       if (data.sqlQuery || data.sql) {
//         await handleValidate(data.sqlQuery || data.sql);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setIsExplaining(false);
//     }
//   };

//   const handleValidate = async (sql = sqlQuery) => {
//     if (!sql.trim()) {
//       setError("No SQL query to validate");
//       return;
//     }

//     setError(null);
//     setIsValidating(true);
//     setActiveTab("validation");

//     try {
//       const response = await fetch("/api/validate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: sql }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to validate query");
//       }

//       const data = await response.json();
//       setValidation(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setIsValidating(false);
//     }
//   };

//   const handleRunQuery = async () => {
//     if (!sqlQuery.trim()) {
//       setError("No SQL query to run");
//       return;
//     }

//     if (validation && !validation.isValid) {
//       setError("Cannot run an invalid query. Please fix the issues first.");
//       return;
//     }

//     setError(null);
//     setIsRunning(true);
//     setActiveTab("results");

//     try {
//       const response = await fetch("/api/query", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: naturalLanguageQuery }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to run query");
//       }

//       const data = await response.json();
//       setQueryResults(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   return (
//     <div className="space-y-6 mx-auto w-[1000px]">
//       <Card>
//         <CardHeader>
//           <CardTitle>Natural Language Query</CardTitle>
//           <CardDescription>
//             Enter your query in plain English and we'll convert it to SQL
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Textarea
//             placeholder="e.g., Get all products that cost less than $500"
//             value={naturalLanguageQuery}
//             onChange={(e) => setNaturalLanguageQuery(e.target.value)}
//             className="min-h-[100px]"
//           />
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <div className="flex gap-2">
//             <Button
//               onClick={handleExplain}
//               disabled={isExplaining || !naturalLanguageQuery.trim()}
//             >
//               {isExplaining ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Explaining...
//                 </>
//               ) : (
//                 <>
//                   <Info className="mr-2 h-4 w-4" />
//                   Explain
//                 </>
//               )}
//             </Button>
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               onClick={() => handleValidate()}
//               disabled={isValidating || !sqlQuery.trim()}
//             >
//               {isValidating ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Validating...
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle2 className="mr-2 h-4 w-4" />
//                   Validate
//                 </>
//               )}
//             </Button>
//             <Button
//               variant="default"
//               onClick={handleRunQuery}
//               disabled={
//                 isRunning ||
//                 !sqlQuery.trim() ||
//                 (validation && !validation.isValid)
//               }
//             >
//               {isRunning ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Running...
//                 </>
//               ) : (
//                 <>
//                   <Play className="mr-2 h-4 w-4" />
//                   Run Query
//                 </>
//               )}
//             </Button>
//           </div>
//         </CardFooter>
//       </Card>

//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {sqlQuery && (
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <div>
//               <CardTitle>Generated SQL Query</CardTitle>
//               <CardDescription>
//                 This SQL was generated from your natural language query
//               </CardDescription>
//             </div>
//             {validation && (
//               <Badge variant={validation.isValid ? "default" : "destructive"}>
//                 {validation.isValid ? "Valid" : "Invalid"}
//               </Badge>
//             )}
//           </CardHeader>
//           <CardContent>
//             <pre className="bg-muted p-4 rounded-md overflow-x-auto">
//               <code>{sqlQuery}</code>
//             </pre>
//           </CardContent>
//         </Card>
//       )}

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="explanation">Explanation</TabsTrigger>
//           <TabsTrigger value="validation">Validation</TabsTrigger>
//           <TabsTrigger value="results">Results</TabsTrigger>
//         </TabsList>
//         <TabsContent value="explanation">
//           <SqlExplanation explanation={explanation} isLoading={isExplaining} />
//         </TabsContent>
//         <TabsContent value="validation">
//           <ValidationResults validation={validation} isLoading={isValidating} />
//         </TabsContent>
//         <TabsContent value="results">
//           <QueryResults results={queryResults} isLoading={isRunning} />
//         </TabsContent>
//       </Tabs>

//       <DatabaseTablesDisplay />
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Play,
  Info,
  Database,
  Code,
  FileText,
} from "lucide-react";
import QueryResults from "./query-results";
import SqlExplanation from "./sql-explanation";
import ValidationResults from "./validation-results";
import DatabaseTablesDataDisplay from "./DatabaseTablesDisplay";

// Unified Interfaces
interface QueryResult {
  [key: string]: string | number | boolean | object | Date | null;
}

interface QueryResponse {
  result?: QueryResult[];
  sql?: string;
  query?: string;
  pseudoSql?: string;
  response?: unknown;
}

interface ValidationIssue {
  message: string;
  type: "missing-table" | "missing-column" | "validation";
}

interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  schemaInfo: string;
}

interface TableInfo {
  name: string;
  operation: string;
  columns?: string[];
}

interface ComplexityInfo {
  score: "Low" | "Medium" | "High";
  factors?: string[];
}

interface ExecutionPlan {
  steps: string[];
  estimatedPerformance?: "Fast" | "Moderate" | "Slow";
}

interface SqlExplanation {
  intent?: string;
  complexity?: ComplexityInfo;
  tables?: TableInfo[];
  executionPlan?: ExecutionPlan;
  potentialIssues?: string[];
  optimizationSuggestions?: string[];
  sqlQuery?: string;
  sql?: string;
}

export default function Dashboard() {
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [explanation, setExplanation] = useState<SqlExplanation | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [queryResults, setQueryResults] = useState<QueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("explanation");

  const handleExplain = async () => {
    if (!naturalLanguageQuery.trim()) {
      setError("Please enter a query");
      return;
    }

    setError(null);
    setIsExplaining(true);
    setActiveTab("explanation");

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: naturalLanguageQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to explain query");
      }

      const data: SqlExplanation = await response.json();
      setExplanation(data);
      setSqlQuery(data.sqlQuery || data.sql || "");

      if (data.sqlQuery || data.sql) {
        await handleValidate(data.sqlQuery || data.sql);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsExplaining(false);
    }
  };

  const handleValidate = async (sql = sqlQuery) => {
    if (!sql.trim()) {
      setError("No SQL query to validate");
      return;
    }

    setError(null);
    setIsValidating(true);
    setActiveTab("validation");

    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: sql }),
      });

      if (!response.ok) {
        throw new Error("Failed to validate query");
      }

      const data: ValidationResult = await response.json();
      setValidation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsValidating(false);
    }
  };

  const handleRunQuery = async () => {
    if (!sqlQuery.trim()) {
      setError("No SQL query to run");
      return;
    }

    if (validation && !validation.isValid) {
      setError("Cannot run an invalid query. Please fix the issues first.");
      return;
    }

    setError(null);
    setIsRunning(true);
    setActiveTab("results");

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: naturalLanguageQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to run query");
      }

      const data: QueryResponse = await response.json();
      setQueryResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6 space-y-8 max-w-7xl">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Natural Language Query
              </CardTitle>
              <CardDescription>
                Enter your query in plain English and we&apos;ll convert it to
                SQL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Get all products that cost less than $500"
                value={naturalLanguageQuery}
                onChange={(e) => setNaturalLanguageQuery(e.target.value)}
                className="min-h-[120px] text-base resize-none"
              />
            </CardContent>
            <CardFooter className="flex justify-between pt-3 border-t">
              <div className="flex gap-2">
                <Button
                  onClick={handleExplain}
                  disabled={isExplaining || !naturalLanguageQuery.trim()}
                  size="lg"
                  className="gap-2"
                >
                  {isExplaining ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Explaining...
                    </>
                  ) : (
                    <>
                      <Info className="h-4 w-4" />
                      Explain
                    </>
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleValidate()}
                  disabled={isValidating || !sqlQuery.trim()}
                  size="lg"
                  className="gap-2"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Validate
                    </>
                  )}
                </Button>
                <Button
                  variant="default"
                  onClick={handleRunQuery}
                  disabled={
                    isRunning ||
                    !sqlQuery.trim() ||
                    (validation ? !validation.isValid : false)
                  }
                  size="lg"
                  className="gap-2"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Run Query
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Database Schema
              </CardTitle>
              <CardDescription>
                Available tables and their structure
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <DatabaseTablesDataDisplay />
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert
            variant="destructive"
            className="animate-in fade-in-50 slide-in-from-top-5"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {sqlQuery && (
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Generated SQL Query
                </CardTitle>
                <CardDescription>
                  This SQL was generated from your natural language query
                </CardDescription>
              </div>
              {validation && (
                <Badge
                  variant={validation.isValid ? "default" : "destructive"}
                  className="ml-auto text-xs px-3 py-1"
                >
                  {validation.isValid ? "Valid Query" : "Invalid Query"}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-md overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-primary">{sqlQuery}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="explanation" className="text-sm">
              <Info className="h-4 w-4 mr-2" />
              Explanation
            </TabsTrigger>
            <TabsTrigger value="validation" className="text-sm">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="results" className="text-sm">
              <Database className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
          </TabsList>
          <TabsContent value="explanation" className="mt-0">
            <SqlExplanation
              explanation={explanation}
              isLoading={isExplaining}
            />
          </TabsContent>
          <TabsContent value="validation" className="mt-0">
            <ValidationResults
              validation={validation}
              isLoading={isValidating}
            />
          </TabsContent>
          <TabsContent value="results" className="mt-0">
            <QueryResults results={queryResults} isLoading={isRunning} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
