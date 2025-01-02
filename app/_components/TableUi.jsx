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

export const TableUi = ({ data }) => {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="bg-white/70">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>id</TableHead>
              <TableHead className="py-4 ms-2">Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Login Time</TableHead>
              <TableHead>Login IP</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                <TableCell></TableCell>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.user.email}</TableCell>
                <TableCell>{d.user.name}</TableCell>
                <TableCell>
                  {new Date(d.loginTime).toLocaleString()}
                </TableCell>
                <TableCell>{d.ipAddress}</TableCell>
                <TableCell>{d.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
