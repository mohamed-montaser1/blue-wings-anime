import React from "react";
import Container from "../Container";
import { Swiper, SwiperSlide } from "swiper/react";
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
           modules={[
            Keyboard,
            Pagination,
            Navigation,
            Autoplay,
            EffectFade,
          ]}
          className="max-[102px]:h-[60vh] min-h-fit"
        >
          {Array.from({ length: 5 }).map(() => (
            <SwiperSlide>
              <Slide
                image="https://placehold.co/416x400/393C4C/white"
                info={info}
              />
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
