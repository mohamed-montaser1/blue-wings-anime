import { TitleLine } from "@/../public/icons";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

type Props = React.DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  children: React.ReactNode;
  lineSize?: "small" | "medium" | "large";
};

export default function Title({ children, lineSize, ...props }: Props) {
  let size;
  if (lineSize === "small") {
    size = "w-1/2";
  } else if (lineSize === "medium") {
    size = "w-3/4";
  } else {
    size = "w-[90%]";
  }
  return (
    <div {...props} className={`flex flex-col w-fit ${props.className}`}>
      <h2
        className={`text-xl sm:text-3xl md:text-[40px] text-white text-center mb-2 md:mb-4`}
      >
        {children}
      </h2>
      <Image src={TitleLine} alt="title-line" className={`self-end ${size}`} />
    </div>
  );
}
