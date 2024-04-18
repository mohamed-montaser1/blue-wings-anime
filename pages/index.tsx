import Head from "next/head";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";

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
      </Main>
    </>
  );
}
