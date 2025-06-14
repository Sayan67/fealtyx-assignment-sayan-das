"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }else{
      router.replace("/dashboard/home");
    }
  }, [user,router]);

  if (!user) return null;
  return null;
}
