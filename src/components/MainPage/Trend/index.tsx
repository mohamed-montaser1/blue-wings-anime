"use client";
import generateSwiperBreakPoints from "@lib/swiperOptions";
import { Container, SectionHeader, SectionSwiper } from "@components";
import { TAnime } from "@/components/Swiper/SectionSwiper";
import Slide from "../../Swiper/SectionSwiper/Slide";
import Rater from "react-rater";
import { SwiperSlide } from "swiper/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Ui/carousel";
import { Card, CardContent } from "@/components/Ui/card";

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
        <SectionHeader title="الأعمال الرائجة" />
        <SectionSwiper>
          {data.map((el, i) => {
            return (
              <CarouselItem className="basis-1/4 *:select-none" key={i}>
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
              </CarouselItem>
            );
          })}
        </SectionSwiper>
      </Container>
    </div>
  );
}
