"use client";

import Hero from "@/components/Hero";
import Trend from "@/components/Trend";
import "@/app/globals.css";
import FilterBar from "@components/FilterBar";

export default async function Home() {
  return (
    <>
      <Hero />
      <FilterBar />
      <Trend />
    </>
  );
}
