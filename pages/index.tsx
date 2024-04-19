import Head from "next/head";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import Title from "@/components/Title";
import SwiperButton from "@/components/SwiperButton";
import Trend from "@/components/Trend";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blue Wings Manga</title>
      </Head>
      <Main>
        <Navbar />
        <Hero />
        <FilterBar />
        <Trend />
      </Main>
    </>
  );
}
