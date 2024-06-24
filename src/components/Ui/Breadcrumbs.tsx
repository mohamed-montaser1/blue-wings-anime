import React from "react";

type Props = {
  url: string[];
  className?: string;
};

export default function Breadcrumbs({ url, className }: Props) {
  return (
    <ol
      dir="rtl"
      className={`flex bg-card py-2 px-6 rounded-lg w-fit ${className}`}
    >
      {url.map((el, i) => (
        <li
          className={`px-1 ${
            i !== url.length - 1 ? "text-slate-400" : "text-slate-200"
          }`}
        >
          {el} {i !== url.length - 1 && <span className="mr-1">/</span>}
        </li>
      ))}
    </ol>
  );
}
