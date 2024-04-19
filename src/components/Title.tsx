import { TitleLine } from "@/../public/icons";
import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Title({ children }: Props) {
  return (
    <div className="flex flex-col w-fit">
      <h2 className="text-[40px] text-white">{children}</h2>
      <Image src={TitleLine} alt="title-line" className="self-end w-1/2" />
    </div>
  );
}
