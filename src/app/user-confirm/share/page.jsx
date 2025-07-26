"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";

const columns = [
  { key: "nama_pembagi", label: "Nama Pembagi" },
  { key: "nomor_pembagi", label: "Nomor Pembagi" },
  { key: "nama_kegiatan", label: "Nama Kegiatan" },
  { key: "nama_makanan", label: "Nama Makanan" },
  { key: "jenis_makanan", label: "Jenis Makanan" },
  { key: "jumlah_makanan", label: "Jumlah Makanan" },
  { key: "keterangan", label: "Keterangan" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

const statusColorMap = {
  Pending: "warning",
  Accepted: "success",
  Rejected: "danger",
};

export default function UserConfirm() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/food/share");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      console.log(result);
      const processedData = Array.isArray(result.data)
        ? result.data.map((item, index) => ({
            ...item,
            id: item.id || `temp-${index}`,
          }))
        : [];

      setData(processedData);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (item, actionType) => {
    try {
      const url = `/api/food/share/${actionType}/${item.id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Failed to ${actionType}`);
      }

      const responseData = await response.json();

      // Update the state with the returned share_food object
      setData((prevData) =>
        prevData.map((i) => (i.id === item.id ? responseData.share_food : i))
      );
    } catch (err) {
      console.error(`Error ${actionType} data:`, err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await fetch(`/api/food/share/${item.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete");
      }

      setData((prevData) => prevData.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error("Error deleting data:", err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col items-center px-2 min-h-screen justify-start m-10">
      <h1 className="mb-5 font-semibold">Data Pembagian Makanan</h1>
      <Table aria-label="User Confirmation Dashboard">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                if (columnKey === "actions") {
                  return (
                    <TableCell className="flex flex-col justify-center gap-4">
                      {item.status === "Pending" && (
                        <>
                          <Button
                            onClick={() => handleAction(item, "accept")}
                            color="success"
                            radius="sm"
                            className="text-white"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleAction(item, "reject")}
                            color="danger"
                            radius="sm"
                            className="text-white"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {(item.status === "Accepted" ||
                        item.status === "Rejected") && (
                        <Button
                          onClick={() => handleDelete(item)}
                          color="danger"
                          radius="sm"
                          className="text-white"
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  );
                }
                if (columnKey === "status") {
                  return (
                    <TableCell>
                      <Chip color={statusColorMap[item.status]} variant="flat">
                        {item.status}
                      </Chip>
                    </TableCell>
                  );
                }
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
