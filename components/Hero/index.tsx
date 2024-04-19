import React from "react";
import Container from "../Container";
import { Swiper, SwiperSlide } from "swiper/react";
import placeholder from "@/public/placeholder.svg";
import {
  Keyboard,
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import Slide from "./Slide";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
  const info = {
    title: "I Can Devour Everything",
    description:
      "فقط المتدرب في مرحلة الخلود يمكنه اختراق حدود صقلة وتحقيق القوة الحقيقية فقط من خلال تغيير تفكيره الراسخ حول الصقل، آن جينغ هو طالب من عشيرة تيان شين التي تتبع…",
    chapter: "12",
  };

  return (
    <div className="hero">
      <Container fluid={false}>
        <Swiper
          pagination={{ clickable: true }}
          keyboard={true}
          navigation={true}
          loop={true}
          fadeEffect={{
            crossFade: true,
          }}
          effect="fade"
          autoplay={true}
          grabCursor={true}
          modules={[Keyboard, Pagination, Navigation, Autoplay, EffectFade]}
          className="max-[102px]:h-[60vh] min-h-fit"
        >
          {Array.from({ length: 5 }).map((x, i) => (
            <SwiperSlide key={i}>
              <Slide image={placeholder} info={info} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}

async function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: "xxxx", y: "yyyyy", z: "zzzzzzz" });
    }, 1000);
  });
}
