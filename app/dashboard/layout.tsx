"use client";
import HeaderComp from "@/components/layout/header";
import SidebarComp from "@/components/layout/sidebar";
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

export const menuItems = [
  { name: "Home", icon: Home, path: "/dashboard/home" },
  { name: "Your Work", icon: UserPen, path: "/dashboard/work" },
  { name: "Inbox", icon: Mail, path: "/dashboard/inbox" },
  { name: "Projects", icon: Briefcase, path: "/dashboard/projects" },
  { name: "Analytics", icon: ChartNoAxesColumn, path: "/dashboard/analytics" },
];

function Layout({ children }: { children: React.ReactNode }) {
  const Main = styled.main`
    flex: 1;
    background: #fff;
    padding: 1.5rem;
    padding-top: 12rem;
    overflow-y: auto;
    height: 100dvh;

    @media screen and (min-width: 820px) {
      padding-top: 8rem;
    }
  `;

  const Wrapper = styled.div`
    min-height: 100dvh;
    display: flex;
  `;

  return (
    <Wrapper>
      <SidebarComp mobile={false} />
      <div style={{width:"100%"}}>
        <HeaderComp />
        <Main>{children}</Main>
      </div>
    </Wrapper>
  );
}

export default Layout;
