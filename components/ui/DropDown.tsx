"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";

const Trigger = styled(DropdownMenu.Trigger)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  cursor: pointer;
`;

const Content = styled(DropdownMenu.Content)`
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  z-index: 1000;
`;

const Item = styled(DropdownMenu.Item)`
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export function DropdownFilter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <DropdownMenu.Root>
      <Trigger>
        {label}: {value} <ChevronDown size={16} />
      </Trigger>
      <DropdownMenu.Portal>
        <Content>
          {options.map((option) => (
            <Item key={option} onSelect={() => onChange(option)}>
              {option}
            </Item>
          ))}
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
