"use client";

import styled, { css } from "styled-components";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const buttonStyles = {
  primary: css`
    background: #2563eb;
    color: #fff;
    &:hover {
      background: #1e40af;
    }
  `,
  secondary: css`
    background: #f3f4f6;
    color: #111827;
    border: 1px solid #d1d5db;
    &:hover {
      background: #e5e7eb;
    }
  `,
  ghost: css`
    background: transparent;
    color: #374151;
    &:hover {
      background: #f3f4f6;
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  height: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  ${({ variant = "primary" }) => buttonStyles[variant]}
  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  ${({ disabled }) => disabled && "opacity: 0.6; cursor: not-allowed;"}
`;
