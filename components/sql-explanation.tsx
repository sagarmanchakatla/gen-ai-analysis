// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// interface SqlExplanationProps {
//   explanation: any;
//   isLoading: boolean;
// }

// export default function SqlExplanation({
//   explanation,
//   isLoading,
// }: SqlExplanationProps) {
//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>SQL Explanation</CardTitle>
//           <CardDescription>Explaining your query...</CardDescription>
//         </CardHeader>
//         <CardContent className="flex justify-center py-8">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!explanation) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>SQL Explanation</CardTitle>
//           <CardDescription>
//             Explain your query to see details here
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground text-center py-8">
//             Click the "Explain" button to generate an explanation
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>SQL Explanation</CardTitle>
//         <CardDescription>Understanding the generated SQL query</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {explanation.intent && (
//           <div>
//             <h3 className="font-medium mb-2">Query Intent</h3>
//             <Badge variant="outline" className="text-sm">
//               {explanation.intent}
//             </Badge>
//           </div>
//         )}

//         {explanation.complexity && (
//           <div>
//             <h3 className="font-medium mb-2">Complexity</h3>
//             <Badge
//               variant={
//                 explanation.complexity.score === "Low"
//                   ? "success"
//                   : explanation.complexity.score === "Medium"
//                   ? "warning"
//                   : "destructive"
//               }
//               className="text-sm"
//             >
//               {explanation.complexity.score}
//             </Badge>
//           </div>
//         )}

//         {explanation.tables && explanation.tables.length > 0 && (
//           <div>
//             <h3 className="font-medium mb-2">Tables Used</h3>
//             <div className="space-y-3">
//               {explanation.tables.map((table: any, index: number) => (
//                 <div key={index} className="bg-muted p-3 rounded-md">
//                   <p className="font-medium">{table.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     Operation: {table.operation}
//                   </p>
//                   {table.columns && table.columns.length > 0 && (
//                     <p className="text-sm text-muted-foreground">
//                       Columns: {table.columns.join(", ")}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {explanation.executionPlan && (
//           <div>
//             <h3 className="font-medium mb-2">Execution Plan</h3>
//             <div className="bg-muted p-3 rounded-md">
//               <ol className="list-decimal list-inside space-y-1">
//                 {explanation.executionPlan.steps.map(
//                   (step: string, index: number) => (
//                     <li key={index} className="text-sm">
//                       {step}
//                     </li>
//                   )
//                 )}
//               </ol>
//               {explanation.executionPlan.estimatedPerformance && (
//                 <p className="text-sm mt-2">
//                   Estimated Performance:
//                   <Badge
//                     variant={
//                       explanation.executionPlan.estimatedPerformance === "Fast"
//                         ? "success"
//                         : explanation.executionPlan.estimatedPerformance ===
//                           "Medium"
//                         ? "warning"
//                         : "destructive"
//                     }
//                     className="ml-2"
//                   >
//                     {explanation.executionPlan.estimatedPerformance}
//                   </Badge>
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {explanation.potentialIssues &&
//           explanation.potentialIssues.length > 0 && (
//             <div>
//               <h3 className="font-medium mb-2">Potential Issues</h3>
//               <ul className="list-disc list-inside space-y-1 text-amber-600">
//                 {explanation.potentialIssues.map(
//                   (issue: string, index: number) => (
//                     <li key={index} className="text-sm">
//                       {issue}
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//           )}

//         {explanation.optimizationSuggestions &&
//           explanation.optimizationSuggestions.length > 0 && (
//             <div>
//               <h3 className="font-medium mb-2">Optimization Suggestions</h3>
//               <ul className="list-disc list-inside space-y-1 text-green-600">
//                 {explanation.optimizationSuggestions.map(
//                   (suggestion: string, index: number) => (
//                     <li key={index} className="text-sm">
//                       {suggestion}
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//           )}
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
import { Loader2, Info, Lightbulb, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SqlExplanationProps {
  explanation: any;
  isLoading: boolean;
}

export default function SqlExplanation({
  explanation,
  isLoading,
}: SqlExplanationProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            SQL Explanation
          </CardTitle>
          <CardDescription>Explaining your query...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!explanation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            SQL Explanation
          </CardTitle>
          <CardDescription>
            Explain your query to see details here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Info className="h-16 w-16 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground">
              Click the &quot;Explain&quot; button to generate an explanation
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          SQL Explanation
        </CardTitle>
        <CardDescription>Understanding the generated SQL query</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {explanation.intent && (
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0">
                Intent
              </Badge>
              Query Intent
            </h3>
            <p className="text-sm">{explanation.intent}</p>
          </div>
        )}

        {explanation.complexity && (
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0">
                Complexity
              </Badge>
              Query Complexity
            </h3>
            <Badge
              variant={
                explanation.complexity.score === "Low"
                  ? "success"
                  : explanation.complexity.score === "Medium"
                  ? "warning"
                  : "destructive"
              }
              className="text-sm"
            >
              {explanation.complexity.score}
            </Badge>
          </div>
        )}

        {explanation.tables && explanation.tables.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0">
                Tables
              </Badge>
              Tables Used
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {explanation.tables.map((table: any, index: number) => (
                <div key={index} className="bg-muted/50 p-3 rounded-md border">
                  <p className="font-medium text-sm">{table.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Operation: {table.operation}
                  </p>
                  {table.columns && table.columns.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs text-muted-foreground mb-1">
                        Columns:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {table.columns.map(
                          (column: string, colIndex: number) => (
                            <Badge
                              key={colIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {column}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {explanation.executionPlan && (
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0">
                Plan
              </Badge>
              Execution Plan
            </h3>
            <div className="bg-muted/50 p-3 rounded-md border">
              <ol className="list-decimal list-inside space-y-1">
                {explanation.executionPlan.steps.map(
                  (step: string, index: number) => (
                    <li key={index} className="text-sm">
                      {step}
                    </li>
                  )
                )}
              </ol>
              {explanation.executionPlan.estimatedPerformance && (
                <p className="text-sm mt-2 flex items-center gap-2">
                  Estimated Performance:
                  <Badge
                    variant={
                      explanation.executionPlan.estimatedPerformance === "Fast"
                        ? "success"
                        : explanation.executionPlan.estimatedPerformance ===
                          "Medium"
                        ? "warning"
                        : "destructive"
                    }
                    className="ml-2"
                  >
                    {explanation.executionPlan.estimatedPerformance}
                  </Badge>
                </p>
              )}
            </div>
          </div>
        )}

        {explanation.potentialIssues &&
          explanation.potentialIssues.length > 0 && (
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Potential Issues
              </h3>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-3">
                <ul className="list-disc list-inside space-y-1 text-amber-600 dark:text-amber-400">
                  {explanation.potentialIssues.map(
                    (issue: string, index: number) => (
                      <li key={index} className="text-sm">
                        {issue}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}

        {explanation.optimizationSuggestions &&
          explanation.optimizationSuggestions.length > 0 && (
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-green-500" />
                Optimization Suggestions
              </h3>
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                <ul className="list-disc list-inside space-y-1 text-green-600 dark:text-green-400">
                  {explanation.optimizationSuggestions.map(
                    (suggestion: string, index: number) => (
                      <li key={index} className="text-sm">
                        {suggestion}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
