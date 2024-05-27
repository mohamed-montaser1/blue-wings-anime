"use client";

import { Hero, Trend, FilterBar, Newest, Container } from "@components";
import MostSkilledArtists from "@/components/SkilledArtists";
import "@/app/globals.css";
import PremiumMember from "@/components/MemberShip";
import MangaWatchingHistory from "@/components/MangaHistory";
import Ads from "@components/Ads";
import SocialMediaAccounts from "@/components/SocialMediaAccounts";

export default async function Home() {
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
    </>
  );
}
