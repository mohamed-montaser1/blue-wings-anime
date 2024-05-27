import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./Slide";
import { SwiperOptions } from "swiper/types";
import { EmptyStarIcon, HalfStarIcon, StarIcon } from "@icons";
import Image from "next/image";
import Rater from "react-rater";

import "react-rater/lib/react-rater.css";
import Star from "@icons/star";

export interface TAnime {
  image: string;
  title: string;
  chaptersNumber: number;
  rate: number;
}

interface Props {
  slidesPerView: number;
  id: string;
  options?: SwiperOptions;
  children: React.ReactNode;
}

export default function SectionSwiper({
  slidesPerView,
  id,
  options,
  children,
}: Props) {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      loop
      className="mt-9"
      id={id}
      grabCursor
      {...options}
    >
      {children}
    </Swiper>
  );
}
