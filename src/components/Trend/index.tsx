"use client";
import generateSwiperBreakPoints from "@lib/swiperOptions";
import { Container, SectionHeader, SectionSwiper } from "@components";
import { TAnime } from "@components/SectionSwiper";
import Slide from "../SectionSwiper/Slide";
import Rater from "react-rater";
import { SwiperSlide } from "swiper/react";

export default function Trend() {
  const data: TAnime[] = [
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: 5,
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: 4.9,
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: 5,
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: 4,
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: 4.5,
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
                          rating={el.rate}
                          interactive={false}
                          key={i}
                        />
                      </div>
                      <span className="text-white">{el.rate}</span>
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
