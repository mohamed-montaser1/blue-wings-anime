import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Ads() {
  return (
    <div className="flex flex-col gap-3" style={{ gridArea: "ads" }}>
      <Ad delay={1000} />
      <Ad delay={1100} />
    </div>
  );
}

type TAdProps = {
  delay: number;
};

function Ad({ delay }: TAdProps) {
  return (
    <div className="ad">
      <Swiper
        pagination={{ clickable: true }}
        keyboard={true}
        navigation={true}
        loop={true}
        autoplay={{
          delay
        }}
        grabCursor={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-full"
      >
        {Array.from({ length: 5 }).map((el, i) => (
          <SwiperSlide className="!flex justify-center items-center text-slate-200 w-full h-full" key={i}>
            منطقة إعلانية
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
