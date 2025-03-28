// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Loader2 } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface TableData {
//   name: string;
//   columns: string[];
//   data: any[];
// }

// export default function DatabaseTablesDataDisplay() {
//   const [tablesData, setTablesData] = useState<TableData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTablesData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/data", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch table data");
//         }

//         const data = await response.json();
//         setTablesData(data);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unexpected error occurred"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTablesData();
//   }, []);

//   const renderTableData = (tableData: TableData) => {
//     if (tableData.data.length === 0) {
//       return <p className="p-4 text-center">No data available</p>;
//     }

//     return (
//       <ScrollArea className="h-[500px] w-full">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               {tableData.columns.map((column) => (
//                 <TableHead key={column}>{column}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {tableData.data.map((row, rowIndex) => (
//               <TableRow key={rowIndex}>
//                 {tableData.columns.map((column) => (
//                   <TableCell key={column}>
//                     {row[column] !== null && row[column] !== undefined
//                       ? String(row[column])
//                       : "N/A"}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </ScrollArea>
//     );
//   };

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="flex justify-center items-center h-64">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="text-red-500 p-4">{error}</CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Database Tables Data</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue={tablesData[0]?.name}>
//           <TabsList className="grid w-full grid-cols-4">
//             {tablesData.map((table) => (
//               <TabsTrigger key={table.name} value={table.name}>
//                 {table.name}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {tablesData.map((tableData) => (
//             <TabsContent key={tableData.name} value={tableData.name}>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>{tableData.name}</CardTitle>
//                   <div className="flex justify-between items-center">
//                     <Badge variant="secondary">
//                       {tableData.data.length} Rows
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent>{renderTableData(tableData)}</CardContent>
//               </Card>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Database, Table2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableData {
  name: string;
  columns: string[];
  data: Record<string, unknown>[];
}

export default function DatabaseTablesDataDisplay() {
  const [tablesData, setTablesData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTable, setActiveTable] = useState<string | null>(null);

  useEffect(() => {
    const fetchTablesData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch table data");
        }

        const data = await response.json();
        setTablesData(data);
        if (data.length > 0) {
          setActiveTable(data[0].name);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTablesData();
  }, []);

  const renderTableData = (tableData: TableData) => {
    if (tableData.data.length === 0) {
      return (
        <p className="p-4 text-center text-muted-foreground">
          No data available
        </p>
      );
    }

    return (
      <ScrollArea className="h-[400px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {tableData.columns.map((column) => (
                <TableHead key={column} className="text-xs font-medium">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-muted/50" : ""}
              >
                {tableData.columns.map((column) => (
                  <TableCell key={column} className="text-xs py-2">
                    {row[column] !== null && row[column] !== undefined
                      ? String(row[column])
                      : "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (tablesData.length === 0) {
    return (
      <div className="text-muted-foreground p-4 text-center">
        <Database className="h-12 w-12 mx-auto mb-2 opacity-20" />
        <p>No database tables found</p>
      </div>
    );
  }

  return (
    <div className="">
      <Tabs
        value={activeTable || tablesData[0]?.name}
        onValueChange={setActiveTable}
        className="h-full flex flex-col"
      >
        <TabsList className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto justify-start px-4 py-2 h-auto">
          {tablesData.map((table) => (
            <TabsTrigger
              key={table.name}
              value={table.name}
              className="flex items-center gap-1 text-xs"
            >
              <Table2 className="h-3 w-3" />
              {table.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tablesData.map((tableData) => (
          <TabsContent
            key={tableData.name}
            value={tableData.name}
            className="flex-1 m-0 p-0 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <div className="px-4 py-2 flex justify-between items-center border-b">
              <h3 className="text-sm font-medium">{tableData.name}</h3>
              <Badge variant="outline" className="text-xs">
                {tableData.data.length}{" "}
                {tableData.data.length === 1 ? "Row" : "Rows"}
              </Badge>
            </div>
            <div className="flex-1 overflow-hidden">
              {renderTableData(tableData)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
