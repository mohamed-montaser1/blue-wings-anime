// "use server";
"use client";

import Hero from "@/components/Hero";
import Trend from "@/components/Trend";
import "@/app/globals.css";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";

export default async function Home() {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   window.onload = function () {
  //     setLoading(false);
  //   };
  // }, []);
  return (
    <>
      {/* {loading && <Loading />} */}
      <Hero />
      <Trend />
    </>
  );
}
