import Head from "next/head";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blue Wings Manga</title>
      </Head>
      <Main>
        <Navbar />
        <Hero />
      </Main>
    </>
  );
}
