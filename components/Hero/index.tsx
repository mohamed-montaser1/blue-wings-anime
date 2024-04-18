import React, { useEffect } from "react";
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
    <div className="hero" style={{ height: "90vh" }}>
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
          modules={[
            Keyboard,
            Pagination,
            Navigation,
            Autoplay,
            EffectFade,
            Autoplay,
          ]}
          className="max-[102px]:h-[60vh]"
        >
          <SwiperSlide>
            <Slide
              image="https://kingofmanga.com/wp-content/uploads/2024/04/Magic-Emperor.webp"
              info={info}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image="https://i2.wp.com/kingofmanga.com/wp-content/uploads/2024/04/5ed701d2-f575-4217-9493-39efb154ca83.jpg"
              info={info}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image="https://i2.wp.com/kingofmanga.com/wp-content/uploads/2024/04/d9d2aea8-7478-4609-8832-d36ddc650228.jpg"
              info={info}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image="https://kingofmanga.com/wp-content/uploads/2024/04/Magic-Emperor.webp "
              info={info}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image="https://kingofmanga.com/wp-content/uploads/2024/04/Magic-Emperor.webp "
              info={info}
            />
          </SwiperSlide>
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
