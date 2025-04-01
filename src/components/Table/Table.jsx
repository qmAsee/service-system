import React, { useState } from "react";
import styles from "./Table.module.scss";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";

export const Table = ({
    columns,
    data,
    className = "",
    tableContainerStyle = {},
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div
            style={{ width: "100%", ...tableContainerStyle }}
            className={className}
        >
            <div className={styles.table} w="full">
                {/* Заголовки таблицы */}
                {table.getHeaderGroups().map((headerGroup) => (
                    <div className={styles.tr} key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <div
                                className={styles.th}
                                key={header.id}
                                style={
                                    header.column.columnDef.headerStyle || {}
                                }
                            >
                                {header.column.columnDef.header}
                            </div>
                        ))}
                    </div>
                ))}
                {/* Строки таблицы */}
                {table.getRowModel().rows.map((row) => (
                    <div className={styles.tr} key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <div className={styles.td} key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
