"use client";

import useUser from "@hooks/useUser";
import { animatePageIn } from "@utils/animations";
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
      {status === "loading" && (
        <h1 className="fixed left-1/2 -translate-x-1/2 top-1/2 text-slate-100 text-6xl z-[13013013]">
          يرجى الإنتظار
        </h1>
      )}
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
