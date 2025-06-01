"use client";
import { Button } from "@heroui/button"; // Import Button component
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table"; // HeroUI Table components
import { useState, useEffect } from "react"; // To handle state and fetch logic
import { useRouter } from "next/navigation"; // For routing
import { Input } from "@heroui/input"; // For form input

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]); // State to store fetched data
  const [newTitle, setNewTitle] = useState(""); // State for new title input
  const [newDescription, setNewDescription] = useState(""); // State for new description input
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  // Fetch announcements data on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements");
        const { data } = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // Function to handle button click and navigate to the /update route
  const handleClick = () => {
    router.push("/announcements/update"); // Redirect to the /update page
  };

  // Handle deleting an announcement by ID
  const handleDelete = async (announcementId) => {
    try {
      const response = await fetch(
        `/api/announcements/${announcementId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setAnnouncements((prev) =>
          prev.filter((announcement) => announcement.id !== announcementId)
        );
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 gap-4 px-5">
      <Button onClick={handleClick} color="primary">
        Update Announcements
      </Button>

      <Table
        aria-label="Announcements Table"
        className="mt-10 w-full max-w-4xl"
      >
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody items={announcements}>
          {(announcement) => (
            <TableRow key={announcement.id}>
              <TableCell>{announcement.title}</TableCell>
              <TableCell>{announcement.description}</TableCell>
              <TableCell>
                <Button
                  color="danger"
                  className="text-white"
                  onClick={() => handleDelete(announcement.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
