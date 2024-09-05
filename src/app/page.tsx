"use client";

import {
  Ads,
  Blogs,
  Container,
  FilterBar,
  Hero,
  MostSkilledArtists,
  Newest,
  PremiumMember,
  Recommendations,
  SocialMediaAccounts,
  Trend,
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
      <Container className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 grid-section-container">
        <PremiumMember />
        <SocialMediaAccounts />
        <Ads />
      </Container>
      <Recommendations />
      <Blogs />
    </>
  );
}
