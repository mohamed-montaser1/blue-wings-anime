"use client";

import useUser from "@/hooks/useUser";
import { animatePageIn } from "@/utils/animations";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  const { status } = useUser({ required: false });
  useEffect(() => {
    if (status === "loading") return;
    animatePageIn();
  }, [status]);
  return (
    <>
      <div className="w-full fixed z-[50000]">
        <div id="banner-1" className="banner left-0 bg-sub-card" />
        <div id="banner-2" className="banner left-1/4 bg-card" />
        <div id="banner-3" className="banner left-2/4 bg-sub-card" />
        <div id="banner-4" className="banner left-3/4 bg-card" />
      </div>
      {children}
    </>
  );
}
