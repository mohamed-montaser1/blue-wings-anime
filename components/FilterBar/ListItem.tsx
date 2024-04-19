import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  href: string;
}

export default function ListItem({ children, href }: Props) {
  return (
    <li className="hover:text-main-color transition-colors duration-300 ease-in-out">
      <Link href={href}>{children}</Link>
    </li>
  );
}
