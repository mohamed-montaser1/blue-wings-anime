import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./Slide";
import { SwiperOptions } from "swiper/types";
import { EmptyStarIcon, HalfStarIcon, StarIcon } from "@icons";
import Image from "next/image";

export interface TAnime {
  image: string;
  title: string;
  chaptersNumber: number;
  rate: number[];
}

interface Props {
  slidesPerView: number;
  data: Array<TAnime>;
  id: string;
  options?: SwiperOptions;
}

export default function SectionSwiper({
  slidesPerView,
  data,
  id,
  options,
}: Props) {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      loop={true}
      className="mt-9"
      id={id}
      grabCursor={true}
      {...options}
    >
      {data.map((el, i) => (
        <SwiperSlide key={i} className="mr-3">
          <Slide key={i}>
            <div className="details w-full mt-3">
              <h3 className="text-white text-right">
                Star Martial God Technique
              </h3>
              <p className="text-[#ccc] mb-2">عدد الفصول {el.chaptersNumber}</p>
              <div className="rate flex gap-2">
                <div className="stars flex gap-2">
                  {el.rate.map((ele, i) =>
                    ele === 1 ? (
                      <Image src={StarIcon} alt="star-icon" key={i} />
                    ) : ele <= 0.5 && ele > 0 ? (
                      <Image src={HalfStarIcon} alt="star-icon" key={i} />
                    ) : (
                      <Image src={EmptyStarIcon} alt="star-icon" key={i} />
                    )
                  )}
                </div>
                <span className="text-white">10</span>
              </div>
            </div>
          </Slide>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
