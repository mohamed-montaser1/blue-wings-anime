import React from "react";

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
      className={`w-full bg-card rounded-md py-2.5 gap-2.5 flex px-[20px] ${props.className}`}
    >
      {children}
    </div>
  );
}
