import React from "react";
import { UserOutlineIcon } from "../../public/icons";
import Image from "next/image";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
}

export default function Input({ children, ...props }: Props) {
  return (
    <div
      {...props}
      className={`w-full mb-[22px] bg-card rounded-md py-[10px] gap-[10px] flex px-[20px] ${props.className}`}
    >
      {children}
    </div>
  );
}
