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

// Define columns
const columns = [
  {
    key: "user_name",
    label: "Username",
  },
  {
    key: "nama_pencari",
    label: "Nama Pencari",
  },
  {
    key: "nama_kegiatan",
    label: "Nama Kegiatan",
  },
  {
    key: "nama_tempat",
    label: "Nama Tempat",
  },
  {
    key: "jumlah_makanan",
    label: "Jumlah Makanan",
  },
  {
    key: "keterangan",
    label: "Keterangan",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const statusColorMap = {
  Pending: "warning",
  Accepted: "success",
  Rejected: "danger",
};

// Define status options
const statusOptions = [
  { name: "Pending" },
  { name: "Accepted" },
  { name: "Rejected" },
];

export default function UserConfirm() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/food/need") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((res) => {
        setData(res.data); // Store the data in state
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError(err); // Handle any errors
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  const handleAccept = (item) => {
    // Send accepted data to the accept endpoint
    fetch(`/api/food/need/accept/${item.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Update the item's status and move it to the end of the array
        setData((prevData) => {
          const newData = [...prevData];
          const index = newData.findIndex((i) => i.id === item.id);
          if (index !== -1) {
            const updatedItem = { ...newData[index], status: "Accepted" };
            // Remove the item from its current position
            newData.splice(index, 1);
            // Add it to the end of the array
            newData.push(updatedItem);
          }
          return newData;
        });
      })
      .catch((err) => {
        console.error("Error accepting data:", err);
      });
  };

  const handleReject = (item) => {
    // Send rejection data to the reject endpoint
    fetch(`/api/food/need/reject/${item.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Update the item's status and move it to the end of the array
        setData((prevData) => {
          const newData = [...prevData];
          const index = newData.findIndex((i) => i.id === item.id);
          if (index !== -1) {
            const updatedItem = { ...newData[index], status: "Rejected" };
            // Remove the item from its current position
            newData.splice(index, 1);
            // Add it to the end of the array
            newData.push(updatedItem);
          }
          return newData;
        });
      })
      .catch((err) => {
        console.error("Error rejecting data:", err);
      });
  };

  const handleDelete = (item) => {
    // Send delete request to the server
    fetch(`/api/food/need/${item.id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove item from the table after successful deletion
        setData((prevData) => prevData.filter((i) => i.id !== item.id));
      })
      .catch((err) => {
        console.error("Error deleting data:", err);
      });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col items-center px-2 min-h-screen justify-start m-10 ">
      <h1 className="mb-5 font-semibold">Data Membutuhkan Makanan</h1>
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
                    <TableCell className="space-x-4">
                      {item.status === "Pending" && (
                        <>
                          <Button
                            onClick={() => handleAccept(item)}
                            color="success"
                            radius="sm"
                            className="text-white"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleReject(item)}
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
                  const status = item.status;
                  return (
                    <TableCell>
                      <Chip color={statusColorMap[status]} variant="flat">
                        {status}
                      </Chip>
                    </TableCell>
                  );
                }

                const cellValue = getKeyValue(item, columnKey);
                return <TableCell>{cellValue}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
