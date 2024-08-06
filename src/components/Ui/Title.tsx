"use client";
import { TitleLine } from "@icons";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

type Props = React.DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  children: React.ReactNode;
  center?: boolean;
};

export default function Title({ children, center, ...props }: Props) {
  return (
    <div
      {...props}
      className={`flex flex-col ${center ? "mx-auto md:mr-0" : ""} mb-4 w-fit ${
        props.className ?? ""
      }`}
    >
      <h2
        className={`text-2xl sm:!text-3xl md:!text-[40px] text-white text-center mb-2 md:!mb-4 font-bold`}
      >
        {children}
      </h2>
      <Image
        src={TitleLine}
        alt="title-line"
        className={`self-center w-1/2 md:w-3/4 lg:w-[90%]`}
      />
    </div>
  );
}
