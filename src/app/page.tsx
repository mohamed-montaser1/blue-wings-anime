"use client";

import { Hero, Trend, FilterBar, Newest } from "@components";
import "@/app/globals.css";

export default async function Home() {
  return (
    <>
      <Hero />
      <FilterBar />
      <Trend />
      <Newest />
    </>
  );
}
