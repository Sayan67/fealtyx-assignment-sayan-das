// Updated Dashboard Layout — inspired by your screenshot

"use client";

import styled from "styled-components";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import HeaderComp from "./layout/header";

const StatGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatCard = styled.div`
max-width: 180px;
  width: 100%;
  height: fit-content;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  text-align: center;
  @media screen and (max-width: 420px){
    max-width: 100%;
  }
`;

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user,router]);

  if (!user) return null;

  return (
    <StatGrid>
      <StatCard>
        <h2>103</h2>
        <p>Issues assigned</p>
      </StatCard>
      <StatCard>
        <h2>0</h2>
        <p>Issues overdue</p>
      </StatCard>
      <StatCard>
        <h2>56</h2>
        <p>Issues created</p>
      </StatCard>
      <StatCard>
        <h2>90</h2>
        <p>Issues completed</p>
      </StatCard>
    </StatGrid>
  );
}
