// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Loader2, Database } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// interface QueryResultsProps {
//   results: any;
//   isLoading: boolean;
// }

// export default function QueryResults({
//   results,
//   isLoading,
// }: QueryResultsProps) {
//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Query Results</CardTitle>
//           <CardDescription>Running your query...</CardDescription>
//         </CardHeader>
//         <CardContent className="flex justify-center py-8">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!results) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Query Results</CardTitle>
//           <CardDescription>Run your query to see results here</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground text-center py-8">
//             Click the "Run Query" button to execute your SQL query
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   // Handle case where results is empty or not in expected format
//   if (
//     !results.result ||
//     !Array.isArray(results.result) ||
//     results.result.length === 0
//   ) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Query Results</CardTitle>
//           <CardDescription>No results found</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground text-center py-4">
//             Your query returned no results or the result format is unexpected
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   // Extract column headers from the first result object
//   const columns = Object.keys(results.result[0]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Database className="h-5 w-5" />
//           Query Results
//         </CardTitle>
//         <CardDescription className="flex items-center gap-2">
//           Found {results.result.length}{" "}
//           {results.result.length === 1 ? "record" : "records"}
//           <Badge variant="outline" className="ml-2">
//             {results.sql}
//           </Badge>
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="rounded-md border overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableHead key={column} className="whitespace-nowrap">
//                     {column}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {results.result.map((row: any, rowIndex: number) => (
//                 <TableRow key={rowIndex}>
//                   {columns.map((column) => {
//                     // Clean up string values that might have extra quotes
//                     let value = row[column];
//                     if (
//                       typeof value === "string" &&
//                       value.startsWith("'") &&
//                       value.endsWith("'")
//                     ) {
//                       value = value.substring(1, value.length - 1);
//                     }

//                     return (
//                       <TableCell
//                         key={`${rowIndex}-${column}`}
//                         className="whitespace-nowrap"
//                       >
//                         {typeof value === "object"
//                           ? JSON.stringify(value)
//                           : String(value)}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Database, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QueryResultsProps {
  results: any;
  isLoading: boolean;
}

export default function QueryResults({
  results,
  isLoading,
}: QueryResultsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Query Results
          </CardTitle>
          <CardDescription>Running your query...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Query Results
          </CardTitle>
          <CardDescription>Run your query to see results here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground">
              Click the &quot;Run Query&quot; button to execute your SQL query
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle case where results is empty or not in expected format
  if (
    !results.result ||
    !Array.isArray(results.result) ||
    results.result.length === 0
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Query Results
          </CardTitle>
          <CardDescription>No results found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">
              Your query returned no results or the result format is unexpected
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Extract column headers from the first result object
  const columns = Object.keys(results.result[0]);

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Query Results
        </CardTitle>
        <CardDescription className="flex items-center gap-2 flex-wrap">
          <span>
            Found {results.result.length}{" "}
            {results.result.length === 1 ? "record" : "records"}
          </span>
          <Badge variant="outline" className="ml-2 text-xs font-mono">
            {results.sql}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column}
                    className="whitespace-nowrap font-medium"
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.result.map((row: any, rowIndex: number) => (
                <TableRow
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-muted/50" : ""}
                >
                  {columns.map((column) => {
                    // Clean up string values that might have extra quotes
                    let value = row[column];
                    if (
                      typeof value === "string" &&
                      value.startsWith("'") &&
                      value.endsWith("'")
                    ) {
                      value = value.substring(1, value.length - 1);
                    }

                    return (
                      <TableCell
                        key={`${rowIndex}-${column}`}
                        className="whitespace-nowrap"
                      >
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : String(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
