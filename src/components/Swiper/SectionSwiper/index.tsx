import { Swiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";

import "react-rater/lib/react-rater.css";

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
