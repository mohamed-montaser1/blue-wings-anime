import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./Slide";
import { SwiperOptions } from "swiper/types";

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
  options?: SwiperOptions
}

export default function SectionSwiper({ slidesPerView, data, id, options }: Props) {
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
        <SwiperSlide key={i} className="mr-[12px]">
          <Slide key={i} data={el} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
