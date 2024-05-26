"use client";
import generateSwiperBreakPoints from "@lib/swiperOptions";
import { Container, SectionHeader, SectionSwiper } from "@components";
import { TAnime } from "@components/SectionSwiper";
import Slide from "../SectionSwiper/Slide";
import Rater from "react-rater";
import { SwiperSlide } from "swiper/react";
import { Fragment } from "react";

export default function Trend() {
  const data: TAnime[] = [
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 0.5, 0],
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 1, 0],
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 1, 0],
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 1, 0],
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 1, 0],
      title: "Star Martial God Technique",
    },
  ];
  return (
    <div className="mt-16">
      <Container className="lg:px-0">
        <SectionHeader title="الأعمال الرائجة" id="trend" />
        <SectionSwiper
          id="trend"
          options={{
            breakpoints: generateSwiperBreakPoints({ slidesPerView: 4 }),
          }}
          slidesPerView={4}
        >
          {data.map((el, i) => {
            let sum = el.rate.reduce((sum, el) => sum + el, 0);
            return (
              <SwiperSlide className="mr-3" key={i}>
                <Slide>
                  <div className="details w-full mt-3">
                    <h3 className="text-white text-right">
                      Star Martial God Technique
                    </h3>
                    <p className="text-[#ccc] mb-2">
                      عدد الفصول {el.chaptersNumber}
                    </p>
                    <div className="rate flex gap-2 items-center">
                      <div className="stars flex gap-2 items-center">
                        <Rater
                          total={5}
                          rating={sum}
                          interactive={false}
                          key={Math.random()}
                        />
                      </div>
                      <span className="text-white">{sum}</span>
                    </div>
                  </div>
                </Slide>
              </SwiperSlide>
            );
          })}
        </SectionSwiper>
      </Container>
    </div>
  );
}
