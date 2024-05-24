"use client";

import { Hero, Trend, FilterBar } from "@components";
import "@/app/globals.css";

export default async function Home() {
  return (
    <>
      <Hero />
      <FilterBar />
      <Trend />
    </>
  );
}
