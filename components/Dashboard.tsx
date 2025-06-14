// Updated Dashboard Layout — inspired by your screenshot

"use client";

import styled from "styled-components";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";



const Header = styled.header`
  margin-bottom: 2rem;
  h1 {
    font-size: 1.5rem;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  @media screen and (max-width: 480px) {
    h1 {
      font-size: 1rem;
    }
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div`
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  text-align: center;
`;

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user]);

  if (!user) return null;

  return (

      <>
        <Header>
          <h1 style={{ fontWeight: 600 }}>Good morning, {user.username}</h1>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Here’s what’s happening today
          </p>
        </Header>

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
      </>
  );
}
