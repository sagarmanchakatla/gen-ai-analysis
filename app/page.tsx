"use client";

// import { useState } from "react";
import {
  ArrowRight,
  Database,
  Code,
  FileText,
  Server,
  Zap,
  CheckCircle,
  Braces,
  MessageSquare,
  Github,
  Terminal,
  AlertTriangle,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  // const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="">
      {/* Hero Section */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GenAI Query Engine</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#api"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              API
            </a>
            <a
              href="#tech-stack"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Tech Stack
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://github.com/sagarmanchakatla/gen-ai-analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="/dashboard" className="flex items-center gap-2">
                Dashboard
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <section className=" py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-block mb-2" variant="outline">
                    Backend Engineering Challenge
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Gen AI Analytics Query Engine
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A lightweight backend service that simulates a simplified
                    version of our Gen AI Analytics data query system.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="gap-2">
                    <a href="/dashboard">
                      Try the Demo
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a href="#api">
                      API Documentation
                      <FileText className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-background p-2 shadow-lg">
                <div className="bg-muted rounded-lg p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="text-xs text-muted-foreground ml-2">
                      Query Engine Terminal
                    </div>
                  </div>
                  <div className="flex-1 font-mono text-sm overflow-hidden bg-black text-green-400 p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary">$</span>
                      <span>
                        Get the transaction that has sales more than 4000
                      </span>
                    </div>
                    <div className="text-muted-foreground mb-2">
                      Translating to SQL...
                    </div>
                    <div className="text-xs text-blue-400 mb-2">
                      SELECT * FROM transactions WHERE sales &gt; 4000;
                    </div>
                    <div className="text-white">Executing query...</div>
                    <div className="text-white mt-2">
                      Results: 3 transactions found
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className=" py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Capabilities
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our Gen AI Analytics Query Engine provides a comprehensive set
                  of features to help you interact with your data.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center text-center">
                <CardHeader className="flex flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Natural Language Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ask complex business questions in plain English and get
                    instant, accurate insights.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader className="flex flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>SQL Translation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically converts natural language into optimized SQL
                    queries for your database.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader className="flex flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Query Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Validates queries against your database schema to ensure
                    they can be executed successfully.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader className="flex flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Query Explanation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provides detailed explanations of how queries work,
                    including execution plans and optimization suggestions.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader className="flex flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Database Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connects to your Neon PostgreSQL database to execute queries
                    and return real results.
                  </p>
                </CardContent>
              </Card>
              {/* <Card className="flex flex-col items-center text-center">
                <CardHeader className="flex flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Fast Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Optimized for speed, providing quick responses to your
                    queries with minimal latency.
                  </p>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </section>

        <section id="api" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2">API</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  API Documentation
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive documentation for all API endpoints in our Gen
                  AI Analytics Query Engine.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-4xl py-12">
              <Tabs defaultValue="endpoints" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="authentication">
                    Authentication
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="endpoints" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader className="bg-muted/50 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            POST
                          </Badge>
                          <span>/api/query</span>
                        </CardTitle>
                        <Badge>Core Endpoint</Badge>
                      </div>
                      <CardDescription>
                        Accepts natural language query and returns results
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Request Body</h4>
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            {`{
  "query": "Get transactions with sales over 4000"
}`}
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Response</h4>
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            {`{
  "sql": "SELECT * FROM transactions WHERE sales > 4000",
  "result": [
    { "id": 1, "date": "2023-01-15", "sales": 4500 },
    { "id": 2, "date": "2023-02-20", "sales": 5200 },
    { "id": 3, "date": "2023-03-10", "sales": 4100 }
  ]
}`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-muted/50 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            POST
                          </Badge>
                          <span>/api/explain</span>
                        </CardTitle>
                        <Badge>Analysis</Badge>
                      </div>
                      <CardDescription>
                        Returns detailed explanation of the query
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Request Body</h4>
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            {`{
  "query": "Get transactions with sales over 4000"
}`}
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Response</h4>
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            {`{
  "sqlQuery": "SELECT * FROM transactions WHERE sales > 4000",
  "intent": "Find high-value transactions with sales exceeding 4000",
  "tables": [
    { "name": "transactions", "operation": "SELECT", "columns": ["*"] }
  ],
  "complexity": { "score": "Low" },
  "executionPlan": {
    "steps": ["Scan transactions table", "Filter by sales > 4000"],
    "estimatedPerformance": "Fast"
  },
  "potentialIssues": ["None for small datasets"],
  "optimizationSuggestions": ["Add index on sales column for large datasets"]
}`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-muted/50 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            POST
                          </Badge>
                          <span>/api/validate</span>
                        </CardTitle>
                        <Badge>Validation</Badge>
                      </div>
                      <CardDescription>
                        Validates SQL query against database schema
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Request Body</h4>
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            {`{
  "query": "SELECT * FROM transactions WHERE sales > 4000"
}`}
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Response</h4>
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            {`{
  "isValid": true,
  "issues": [
    { "type": "info", "message": "Table 'transactions' exists" },
    { "type": "info", "message": "Column 'sales' exists in table 'transactions'" }
  ],
  "schemaInfo": "transactions (id, date, sales, customer_id)"
}`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="examples" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Example Queries</CardTitle>
                      <CardDescription>
                        Try these example queries in the dashboard
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Basic Queries</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li className="text-sm">Show all transactions</li>
                          <li className="text-sm">
                            Get transactions from last month
                          </li>
                          <li className="text-sm">
                            Find transactions with sales over 1000
                          </li>
                        </ul>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <h4 className="font-medium">Intermediate Queries</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li className="text-sm">
                            Show average sales by month
                          </li>
                          <li className="text-sm">
                            Find customers with most transactions
                          </li>
                          <li className="text-sm">
                            Get total sales by product category
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t pt-6">
                      <Button asChild>
                        <a href="/dashboard">Try in Dashboard</a>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Curl Commands</CardTitle>
                      <CardDescription>
                        Test the API directly from your terminal
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Query Endpoint</h4>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                          {`curl -X POST https://your-api-url.com/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"query": "Get transactions with sales over 4000"}'`}
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Explain Endpoint</h4>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                          {`curl -X POST https://your-api-url.com/api/explain \\
  -H "Content-Type: application/json" \\
  -d '{"query": "Get transactions with sales over 4000"}'`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="authentication" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Authentication</CardTitle>
                      <CardDescription>
                        How to authenticate with the API
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        The API uses a lightweight authentication mechanism. For
                        production use, you would implement a more robust
                        authentication system.
                      </p>
                      <div>
                        <h4 className="font-medium mb-2">
                          API Key Authentication
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Include your API key in the request headers:
                        </p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                          {`curl -X POST https://your-api-url.com/api/query \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  -d '{"query": "Get transactions with sales over 4000"}'`}
                        </pre>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 mt-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          Demo Mode
                        </h4>
                        <p className="text-sm">
                          For the purpose of this demo, authentication is
                          simplified. In a production environment, you would
                          implement more secure authentication methods such as
                          OAuth 2.0 or JWT.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="tech-stack" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2">Tech Stack</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Technology Stack
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our Gen AI Analytics Query Engine is built with modern
                  technologies for optimal performance.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <span className="text-sm text-muted-foreground">
                        Runtime environment
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Next.js</Badge>
                      <span className="text-sm text-muted-foreground">
                        Framework
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Express.js</Badge>
                      <span className="text-sm text-muted-foreground">
                        API routing
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Database
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Neon</Badge>
                      <span className="text-sm text-muted-foreground">
                        PostgreSQL provider
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">PostgreSQL</Badge>
                      <span className="text-sm text-muted-foreground">
                        Database engine
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">SQL</Badge>
                      <span className="text-sm text-muted-foreground">
                        Query language
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Braces className="h-5 w-5 text-primary" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">React</Badge>
                      <span className="text-sm text-muted-foreground">
                        UI library
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Tailwind CSS</Badge>
                      <span className="text-sm text-muted-foreground">
                        Styling
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">shadcn/ui</Badge>
                      <span className="text-sm text-muted-foreground">
                        Component library
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Groq API</Badge>
                      <span className="text-sm text-muted-foreground">
                        LLM provider
                      </span>
                    </li>
                    {/* <li className="flex items-center gap-2">
                      <Badge variant="outline">NLP</Badge>
                      <span className="text-sm text-muted-foreground">
                        Natural language processing
                      </span>
                    </li> */}
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">AI SDK</Badge>
                      <span className="text-sm text-muted-foreground">
                        AI integration
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Vercel</Badge>
                      <span className="text-sm text-muted-foreground">
                        Hosting platform
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">GitHub</Badge>
                      <span className="text-sm text-muted-foreground">
                        Version control
                      </span>
                    </li>
                    {/* <li className="flex items-center gap-2">
                      <Badge variant="outline">CI/CD</Badge>
                      <span className="text-sm text-muted-foreground">
                        Continuous integration
                      </span>
                    </li> */}
                  </ul>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    Development
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">TypeScript</Badge>
                      <span className="text-sm text-muted-foreground">
                        Type-safe JavaScript
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">ESLint</Badge>
                      <span className="text-sm text-muted-foreground">
                        Code linting
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Prettier</Badge>
                      <span className="text-sm text-muted-foreground">
                        Code formatting
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Try our Gen AI Analytics Query Engine today and start getting
                  insights from your data.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <a href="/dashboard">
                    Try the Demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a
                    href="https://github.com/sagarmanchakatla/gen-ai-analysis"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
