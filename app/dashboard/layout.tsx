"use client";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Briefcase,
  ChartNoAxesColumn,
  Home,
  LogOut,
  Mail,
  UserPen,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const menuItems = [
  { name: "Home", icon: Home, path: "/dashboard/home" },
  { name: "Your Work", icon: UserPen, path: "/dashboard/work" },
  { name: "Inbox", icon: Mail, path: "/dashboard/inbox" },
  { name: "Projects", icon: Briefcase, path: "/dashboard/projects" },
  { name: "Analytics", icon: ChartNoAxesColumn, path: "/dashboard/analytics" },
];

function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuthStore();
  const router = useRouter();
  const path = usePathname();

  const Sidebar = styled.aside`
    width: 240px;
    background: #f3f4f6;
    padding: 1rem 1.5rem;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    @media screen and (max-width: 768px) {
      display: none;
    }
    h2 {
      font-size: 20px;
    }
  `;
  const SidebarItem = styled.button`
    background: none;
    border: none;
    text-align: left;
    font-size: 0.95rem;
    color: #374151;
    padding: 0.4rem 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    &:hover {
      background: #e5e7eb;
      color: #3e76fe;
    }
    .destructive:hover {
      background: #f87171;
      color: #fff;
    }
    display: flex;
    align-items: center;
  `;

  const Main = styled.main`
    flex: 1;
    background: #fff;
    padding: 1rem;
  `;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar>
        <h2 style={{ fontWeight: 600 }}>Menu</h2>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <SidebarItem
              key={item.name}
              onClick={() => router.push(item.path)}
              style={{
                background: path === item.path ? "#e5e7eb" : "none",
                color: path === item.path ? "#3e76fe" : "#374151",
              }}
            >
              <Icon size={16} style={{ marginRight: "0.5rem" }} />
              {item.name}
            </SidebarItem>
          );
        })}
        <SidebarItem
          style={{ marginTop: "auto", color: "#dc2626" }}
          onClick={logout}
          className="destructive"
        >
          Logout
          <LogOut
            size={16}
            style={{ marginLeft: "0.5rem", verticalAlign: "middle" }}
          />
        </SidebarItem>
      </Sidebar>
      <Main>{children}</Main>
    </div>
  );
}

export default Layout;
