// "use server";
"use client";

import Hero from "@/components/Hero";
import Trend from "@/components/Trend";
import "@/app/globals.css";
import FilterBar from "@components/FilterBar";

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
      <FilterBar />
      <Trend />
    </>
  );
}
