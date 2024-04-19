import { TitleLine } from "@/../public/icons";
import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
  lineSize?: "small" | "medium" | "large";
}

export default function Title({ children, lineSize }: Props) {
  let size;
  if (lineSize === "small") {
    size = "w-1/2";
  } else if (lineSize === "medium") {
    size = "w-3/4";
  } else {
    size = "w-[90%]";
  }
  return (
    <div className="flex flex-col w-fit">
      <h2 className="text-[40px] text-white text-center mb-2">{children}</h2>
      <Image src={TitleLine} alt="title-line" className={`self-end ${size}`} />
    </div>
  );
}
