import Image from "next/image";
import React from "react";
import SmallCardPlacholder from "@public/small-card-placeholder.svg";

interface Props {
  children: React.ReactNode;
  avatar?: React.ReactNode;
  title?: string;
  image?: string;
}

export default function Slide({ children, title, image, avatar }: Props) {
  return (
    <div className="w-full h-full rounded-md bg-card p-5 flex flex-col items-center">
      <div
        className={`img-container max-w-full w-full rounded-md bg-sub-card relative h-[364px]`}
      >
        <Image
          src={image || SmallCardPlacholder}
          alt="anime image"
          className="w-full h-full object-cover"
          width={216}
          height={400}
        />
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-8 py-1 rounded-full text-slate-100 select-none w-1/2 text-center pb-2">
          {title ?? "مانجا"}
        </span>
        {avatar}
      </div>
      {children}
    </div>
  );
}
