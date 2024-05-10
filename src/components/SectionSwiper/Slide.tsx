import Image from "next/image";
import React from "react";
import SmallCardPlacholder from "@public/small-card-placeholder.svg";
import { EmptyStarIcon, HalfStarIcon, StarIcon } from "@icons";
import { TAnime } from "./index";

interface Props {
  data: TAnime;
}

export default function Slide({ data }: Props) {
  let height = "h-[364px]";
  return (
    <div className="w-full h-full rounded-md bg-card p-5 flex flex-col items-center">
      <div
        className={`img-container max-w-72 rounded-md bg-sub-card relative ${height}`}
      >
        <Image
          src={SmallCardPlacholder}
          alt="anime image"
          className="w-full h-full"
        />
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-8 py-1 rounded-full text-white select-none">
          مانجا
        </span>
      </div>
      <div className="details w-full mt-3">
        <h3 className="text-white text-right">Star Martial God Technique</h3>
        <p className="text-[#ccc] mb-2">عدد الفصول {data.chaptersNumber}</p>
        <div className="rate flex gap-2">
          <div className="stars flex gap-[6px]">
            {data.rate.map((el, i) =>
              el === 1 ? (
                <Image src={StarIcon} alt="star-icon" key={i} />
              ) : el === 0.5 ? (
                <Image src={HalfStarIcon} alt="star-icon" key={i} />
              ) : (
                <Image src={EmptyStarIcon} alt="star-icon" key={i} />
              )
            )}
          </div>
          <span className="text-white">10</span>
        </div>
      </div>
    </div>
  );
}
