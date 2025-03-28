// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Loader2, CheckCircle, XCircle } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// interface ValidationResultsProps {
//   validation: any;
//   isLoading: boolean;
// }

// export default function ValidationResults({
//   validation,
//   isLoading,
// }: ValidationResultsProps) {
//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Validation Results</CardTitle>
//           <CardDescription>Validating your SQL query...</CardDescription>
//         </CardHeader>
//         <CardContent className="flex justify-center py-8">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!validation) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Validation Results</CardTitle>
//           <CardDescription>
//             Validate your query to see results here
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground text-center py-8">
//             Click the "Validate" button to check if your SQL query is valid
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           {validation.isValid ? (
//             <>
//               <CheckCircle className="h-5 w-5 text-green-500" />
//               <span>Valid Query</span>
//             </>
//           ) : (
//             <>
//               <XCircle className="h-5 w-5 text-red-500" />
//               <span>Invalid Query</span>
//             </>
//           )}
//         </CardTitle>
//         <CardDescription>
//           {validation.isValid
//             ? "Your SQL query is valid and can be executed"
//             : "Your SQL query has issues that need to be fixed"}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {validation.issues && validation.issues.length > 0 && (
//             <div>
//               <h3 className="font-medium mb-2">Validation Details</h3>
//               <ul className="list-disc pl-5 space-y-1">
//                 {validation.issues.map((issue: any, index: number) => {
//                   // Determine if this is a validation issue or just information
//                   const isError =
//                     !validation.isValid &&
//                     (issue.type === "missing-table" ||
//                       issue.type === "missing-column") &&
//                     !issue.message.startsWith("Query is valid");

//                   // Determine if this is a success message
//                   const isSuccess =
//                     validation.isValid ||
//                     issue.message.startsWith("- All referenced") ||
//                     issue.message.startsWith("- Column") ||
//                     issue.message.startsWith("Query is valid");

//                   return (
//                     <li
//                       key={index}
//                       className={
//                         isError
//                           ? "text-red-500"
//                           : isSuccess
//                           ? "text-green-500"
//                           : "text-muted-foreground"
//                       }
//                     >
//                       {issue.message}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           )}

//           {validation.schemaInfo && (
//             <div>
//               <h3 className="font-medium mb-2">Available Schema</h3>
//               <div className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
//                 {validation.schemaInfo
//                   .split("\n")
//                   .map((line: string, index: number) => {
//                     const [tableName, rest] = line.split(" (");
//                     return (
//                       <div key={index} className="mb-1">
//                         <Badge variant="outline" className="mr-2">
//                           {tableName}
//                         </Badge>
//                         <span className="text-muted-foreground">({rest}</span>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           )}
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
import { Loader2, CheckCircle, XCircle, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ValidationResultsProps {
  validation: any;
  isLoading: boolean;
}

export default function ValidationResults({
  validation,
  isLoading,
}: ValidationResultsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Validation Results
          </CardTitle>
          <CardDescription>Validating your SQL query...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!validation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Validation Results
          </CardTitle>
          <CardDescription>
            Validate your query to see results here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle className="h-16 w-16 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground">
              Click the "Validate" button to check if your SQL query is valid
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {validation.isValid ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Valid Query</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-red-500" />
              <span>Invalid Query</span>
            </>
          )}
        </CardTitle>
        <CardDescription>
          {validation.isValid
            ? "Your SQL query is valid and can be executed"
            : "Your SQL query has issues that need to be fixed"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {validation.issues && validation.issues.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Validation Details</h3>
            <div
              className={`p-4 rounded-lg border ${
                validation.isValid
                  ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
              }`}
            >
              <ul className="space-y-2">
                {validation.issues.map((issue: any, index: number) => {
                  // Determine if this is a validation issue or just information
                  const isError =
                    !validation.isValid &&
                    (issue.type === "missing-table" ||
                      issue.type === "missing-column") &&
                    !issue.message.startsWith("Query is valid");

                  // Determine if this is a success message
                  const isSuccess =
                    validation.isValid ||
                    issue.message.startsWith("- All referenced") ||
                    issue.message.startsWith("- Column") ||
                    issue.message.startsWith("Query is valid");

                  return (
                    <li
                      key={index}
                      className={`flex items-start gap-2 ${
                        isError
                          ? "text-red-600 dark:text-red-400"
                          : isSuccess
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {isError ? (
                        <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      ) : isSuccess ? (
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      ) : (
                        <span className="h-4 w-4 block"></span>
                      )}
                      <span className="text-sm">{issue.message}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {validation.schemaInfo && (
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Available Schema
            </h3>
            <div className="bg-muted/50 p-3 rounded-md border text-sm overflow-x-auto">
              <div className="grid gap-2">
                {validation.schemaInfo
                  .split("\n")
                  .map((line: string, index: number) => {
                    if (!line.trim()) return null;

                    const [tableName, rest] = line.includes(" (")
                      ? line.split(" (")
                      : [line, ""];

                    return (
                      <div
                        key={index}
                        className="flex flex-wrap items-center gap-2"
                      >
                        <Badge variant="outline" className="font-mono">
                          {tableName}
                        </Badge>
                        {rest && (
                          <span className="text-xs text-muted-foreground font-mono">
                            ({rest}
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
