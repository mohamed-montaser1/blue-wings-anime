"use client";

import { animatePageIn } from "@/utils/animations";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <>
      <div className="w-full fixed z-[50000]">
        <div
          id="banner-1"
          className="banner left-0 bg-gradient-to-b from-card to-sub-card"
        />
        <div
          id="banner-2"
          className="banner left-1/4 bg-gradient-to-t from-card to-sub-card"
        />
        <div
          id="banner-3"
          className="banner left-2/4 bg-gradient-to-b from-card to-sub-card"
        />
        <div
          id="banner-4"
          className="banner left-3/4 bg-gradient-to-t from-card to-sub-card"
        />
      </div>
      {children}
    </>
  );
}
