import Image from "next/image";
import React from "react";
import SmallCardPlacholder from "@public/small-card-placeholder.svg";
import { TAnime } from "./index";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function Slide({ children, title }: Props) {
  let height = "h-[364px]";
  return (
    <div className="w-full h-full rounded-md bg-card p-5 flex flex-col items-center">
      <div
        className={`img-container max-w-full w-full rounded-md bg-sub-card relative ${height}`}
        // 288px - 72
      >
        <Image
          src={SmallCardPlacholder}
          alt="anime image"
          className="w-full h-full"
        />
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-8 py-1 rounded-full text-white select-none w-1/2 text-center pb-2">
          {title ?? "مانجا"}
        </span>
      </div>
      {children}
    </div>
  );
}
