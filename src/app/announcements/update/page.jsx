"use client"; // Marking this as a client component
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function UpdateAnnouncement() {
  const router = useRouter(); // Initialize the useRouter hook for navigation

  const [title, setTitle] = useState(""); // State for title
  const [description, setDescription] = useState(""); // State for description
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // POST request to update the announcement (replace with actual API URL)
      const response = await fetch("/api/announcements", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        // Redirect to the announcements page after a successful update
        router.push("/announcements"); // Navigate to the /announcements page
      } else {
        console.error("Failed to update the announcement.");
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-screen gap-4 px-5">
      <Card className="w-full max-w-xl p-5">
        <CardHeader>
          <h1 className="text-xl font-semibold">Update Announcement</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter Announcement Title"
              size="md"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state
            />
            <Input
              label="Description"
              placeholder="Enter Description"
              size="md"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state
            />
            <Button
              color="success"
              className="text-white w-full"
              onClick={handleSubmit} // Submit the form
              disabled={loading} // Disable the button when loading
            >
              {loading ? "Updating..." : "Update"}{" "}
              {/* Button text while loading */}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
