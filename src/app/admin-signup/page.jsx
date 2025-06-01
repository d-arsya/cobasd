"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => router.push("/"), 2000); // ke halaman login
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center flex-col min-h-screen items-center">
      <div className="text-3xl">Bagi Makan - Admin Signup</div>
      <div className="mt-7">
        <Card className="w-[450px] mt-2 mb-7 mx-4">
          <CardBody className="space-y-8 my-3">
            <Input
              label="Name"
              placeholder="Create Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <Input
              label="Email"
              placeholder="Create Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Input
              label="Phone"
              placeholder="Create Phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
            <Input
              label="Password"
              placeholder="Create password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">{success}</p>
            )}
          </CardBody>
          <CardFooter className="flex flex-col items-center space-y-3">
            <Button color="primary" onClick={handleSignup}>
              Signup
            </Button>
            <h3 className="text-sm text-center">
              Cannot login?{" "}
              <a
                href="/Signup"
                className="text-blue-500 font-bold hover:underline"
              >
                Contact here
              </a>
            </h3>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
