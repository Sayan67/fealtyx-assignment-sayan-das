import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#111827" }}>404</h1>
      <p style={{ fontSize: "1.5rem", color: "#6b7280" }}>Page Not Found</p>
      <p style={{ color: "#374151" }}>
        The page you are looking for does not exist.
      </p>

      <Link href={"/"} style={{ color: "#3e76fe", cursor: "pointer" }}>
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
