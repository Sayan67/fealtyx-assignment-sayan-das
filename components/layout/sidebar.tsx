import { menuItems } from "@/app/dashboard/layout";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

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

function SidebarComp({ mobile }: { mobile: boolean }) {
  const Sidebar = styled.aside`
    width: 240px;
    background: #f3f4f6;
    padding:1.5rem;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100dvh;
    @media screen and (max-width: 768px) {
        width: 100%;
        height: 100%;
      display: ${mobile ? "flex" : "none"};
    }
    h2 {
      font-size: 20px;
    }
  `;
  const { logout } = useAuthStore();
  const router = useRouter();
  const path = usePathname();

  return (
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
  );
}

export default SidebarComp;
