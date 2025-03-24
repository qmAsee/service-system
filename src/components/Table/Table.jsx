import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import styles from "./Table.module.scss";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";



export const Table = ({ columns, data, className = "", tableContainerStyle = {} }) => {
  // const [data, setData] = useState(mockRestaurantsTableData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ width: "100%", ...tableContainerStyle }} className={className}>
      <Box className={styles.table} w="full">
        {/* Заголовки таблицы */}
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className={styles.tr} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className={styles.th} key={header.id}>
                {header.column.columnDef.header}
              </Box>
            ))}
          </Box>
        ))}
        {/* Строки таблицы */}
        {table.getRowModel().rows.map((row) => (
          <Box className={styles.tr} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className={styles.td} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </div>
  );
  // return (
  //     <Box className={styles.table} w="full">
  //       {table.getHeaderGroups().map((headerGroup) => (
  //         <Box className={styles.tr} key={headerGroup.id}>
  //           {headerGroup.headers.map((header) => (
  //             <Box className={styles.th} key={header.id}>
  //               {header.column.columnDef.header}
  //             </Box>
  //           ))}
  //         </Box>
  //       ))}
  //       {table.getRowModel().rows.map((row) => (
  //         <Box className={styles.tr} key={row.id}>
  //           {row.getVisibleCells().map((cell) => (
  //             <Box className={styles.td} key={cell.id} w={cell.column.getSize()}>
  //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //             </Box>
  //           ))}
  //         </Box>
  //       ))}
  //     </Box>
  // );
};
