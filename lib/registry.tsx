"use client";

import React, { useState } from "react";
import { StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return <StyleSheetManager>{children}</StyleSheetManager>;
}
