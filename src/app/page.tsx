"use client";

import { Hero, Trend, FilterBar, Newest } from "@components";
import "@/app/globals.css";
import MostSkilledArtists from "@/components/SkilledArtists";

export default async function Home() {
  return (
    <>
      <Hero />
      <FilterBar />
      <Trend />
      <Newest />
      <MostSkilledArtists />
    </>
  );
}
