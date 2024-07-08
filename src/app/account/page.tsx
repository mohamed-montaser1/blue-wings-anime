"use client";

import useUser from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { user } = useUser({ required: true });
  useEffect(() => {
    if (!user) return;
    console.log({ user });
    redirect(`/user/${user.slug_name}`);
  }, [user]);
  return (
    <h1 className="text-slate-300 text-center mt-20 text-4xl">
      This is no longer a page
    </h1>
  );
}
