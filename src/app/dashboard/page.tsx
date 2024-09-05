"use client";
import useUser from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useUser({ required: true });

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      redirect("/");
    }
    document.body.classList.add("dashboard-page");
    redirect("/dashboard/users");
  }, [user]);

  return <></>;
}
