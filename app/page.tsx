"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router,user]);
  return null;
}
