"use client";

import {
  MostSkilledArtists,
  PremiumMember,
  MangaWatchingHistory,
  Ads,
  SocialMediaAccounts,
  Recommendations,
  Blogs,
  Hero,
  FilterBar,
  Trend,
  Newest,
  Container,
} from "@components";

import "@/app/globals.css";

export default function Home() {
  return (
    <>
      <Hero />
      <FilterBar />
      <Trend />
      <Newest />
      <MostSkilledArtists />
      <Container className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 grid-section-container">
        <PremiumMember />
        <MangaWatchingHistory />
        <Ads />
        <SocialMediaAccounts />
      </Container>
      <Recommendations />
      <Blogs />
    </>
  );
}
