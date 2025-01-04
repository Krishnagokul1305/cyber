"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TableAttack = ({ data }) => {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="bg-white/70">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>id</TableHead>
              <TableHead className="py-4 ms-2">Attack Type</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.slice(0,9).map((d) => (
              <TableRow key={d.id}>
                <TableHead></TableHead>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.attackType}</TableCell>
                <TableCell>{d.ipAddress ?? "N/A"}</TableCell>
                <TableCell>{new Date(d.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
