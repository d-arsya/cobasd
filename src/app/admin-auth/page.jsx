"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push("/admin-map-view");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center flex-col min-h-screen items-center">
      <div className="text-3xl">Bagi Makan - Admin Panel Login</div>
      <div className="mt-7">
        <Card className="w-[450px] mt-2 mb-7 mx-4">
          <CardBody className="space-y-8 my-3">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </CardBody>
          <CardFooter className="flex flex-col items-center space-y-3">
            <Button color="primary" onClick={handleLogin}>
              Login
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
