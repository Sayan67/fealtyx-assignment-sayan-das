"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import styled from "styled-components";
import { LogIn } from "lucide-react";

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background-color: #f9fafb;

  &:focus {
    outline: none;
    border-color: #2563eb;
    background-color: #fff;
  }
`;

const Button = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  background-color: #2563eb;
  color: #fff;
  padding: 0.75rem;
  font-size: 0.95rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #1e40af;
  }
`;

const Error = styled.p`
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: 0.75rem;
`;

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <PageWrapper>
      <Card>
        <Heading>
          <LogIn size={20} /> Sign in to your account
        </Heading>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., manager"
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />

          {error && <Error>{error}</Error>}

          <Button type="submit">Login</Button>
        </form>
      </Card>
    </PageWrapper>
  );
}
