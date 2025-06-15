import { useAuthStore } from "@/store/useAuthStore";
import {
  Briefcase,
  ChartNoAxesColumn,
  Hamburger,
  HamburgerIcon,
  Home,
  LogIn,
  LogOut,
  Mail,
  Menu,
  PanelLeftClose,
  UserPen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { Button } from "../ui/Button";
import SidebarComp from "./sidebar";

const headingMap: Record<
  string,
  {
    name: string;
    icon?: React.JSX.Element;
  }
> = {
  home: {
    name: "Home",
    icon: <Home size={20} />,
  },
  work: {
    name: "Your Work",
    icon: <UserPen size={20} />,
  },
  inbox: {
    name: "Inbox",
    icon: <Mail size={20} />,
  },
  projects: {
    name: "Projects",
    icon: <Briefcase size={20} />,
  },
  analytics: {
    name: "Analytics",
    icon: <ChartNoAxesColumn size={20} />,
  },
};

const Header = styled.header`
    width: 100%;
  position: fixed;
  background-color: white;
  top: 0;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  h1 {
    font-size: 1.5rem;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 1rem;
    }
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  @media screen and (max-width: 768px) {
    padding-top: 4.5rem;
  }
`;

const MobileNav = styled.nav`
  display: none;
  @media screen and (max-width: 768px) {
    width: calc(100% - 3rem);
    position: fixed;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #f3f4f6;
    border-radius: 0.4rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 90;
  }
`;
const HeadingTitle = styled.h2`
  font-size: 1rem;
  color: #111827;
  font-weight: 400;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const MenuContainer = styled.div`
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  z-index: 100;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0000004b;
  width: 100dvw;
  height: 100dvh;
`;

const Sheet = styled.aside`
  position: fixed;
  height: 100dvh;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 1px solid #e5e5e5;
`;
const CloseButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 0%;
  border-radius: 6px;
  padding: 0.5rem;
  width: fit-content;
  height: fit-content;
  width: 2.5rem;
  height: 4rem;
  background-color: #f3f4f6;
  transform: translate(110%, -100%);
`;

function HeaderComp() {
  const { user, logout } = useAuthStore();
  const path = usePathname().split("/").slice(-1)[0];
  const [hamOpen, setHamOpen] = React.useState(false);

  if (!user) return null;
  return (
    <Header>
      <MobileNav>
        <Menu
          size={20}
          style={{ cursor: "pointer", color: "#374151" }}
          onClick={() => {
            setHamOpen(!hamOpen);
          }}
        />
        <HeadingTitle>
          {headingMap[path]
            ? headingMap[path]?.icon && headingMap[path].icon
            : null}
          {headingMap[path]?.name || "Dashboard"}
        </HeadingTitle>
      </MobileNav>
      {hamOpen && (
        <MenuContainer>
          <Overlay onClick={() => setHamOpen(false)} />
          <Sheet>
            <SidebarComp mobile />
            <CloseButton onClick={() => setHamOpen(false)}>
              <PanelLeftClose />
            </CloseButton>
          </Sheet>
        </MenuContainer>
      )}

      <Heading>
        <h1>
          {(() => {
            const hours = new Date().getHours();
            if (hours < 12) return "Good morning";
            else if (hours < 18) return "Good afternoon";
            else return "Good evening";
          })()}
          , {user.username}
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Here&apos;s what&apos;s happening today
        </p>
      </Heading>
    </Header>
  );
}

export default HeaderComp;
