"use client";

import Hero from "@/components/Hero";
import Trend from "@/components/Trend";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  console.log(data);
  return (
    <>
      <Hero />
      <Trend />
    </>
  );
}
