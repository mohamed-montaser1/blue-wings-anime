import React from "react";

interface Props {
  image: string;
  info: {
    title: string;
    description: string;
    chapter: string;
  };
}

export default function Slide({ image, info }: Props) {
  return (
    <div className="flex justify-between items-center gap-24 mt-3 max-[900px]:gap-4 min-[779px]:pl-16 pt-10 min-[900px]:max-h-[410px] h-fit mb-16">
      <img
        src={image}
        alt="slide-img"
        className="max-[602px]:w-64 w-[311px] max-h-[538px] max-[418px]:h-[200px] object-cover max-[657px]:h-[778px]"
      />
      <div className="content">
        <span className="text-[14px] text-white">الفصل: {info.chapter}</span>
        <h1 className="text-white text-[30px] mt-2 mb-1 max-[602px]:text-[24px]">
          {info.title}
        </h1>
        <p className="text-white text-[14px] max-[602px]:text-[10px]">
          {info.description}
        </p>
      </div>
    </div>
  );
}
