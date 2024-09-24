"use client";
import data from "@/lib/demoSwiperData";
import { Container, SectionSwiper, Title } from "@components";
import { SwiperSlide } from "swiper/react";
import Slide from "../Swiper/SectionSwiper/Slide";
import Rater from "react-rater";
import { nanoid } from "nanoid";

export default function SimilarManga() {
  return (
    <div className="mt-24">
      <Container>
        <Title>أعمال ذات صلة</Title>
        <SectionSwiper key={nanoid()}>
          {data.map((slide, i) => (
            <SwiperSlide className="mr-4" key={i}>
              <Slide title="مانجا" key={i}>
                <div className="details w-full mt-3">
                  <h3 className="text-white text-right">
                    Star Martial God Technique
                  </h3>
                  <p className="text-[#ccc] mb-2">
                    عدد الفصول {slide.chaptersNumber}
                  </p>
                  <div className="rate flex gap-2 items-center">
                    <div className="stars flex gap-2 items-center">
                      <Rater
                        total={5}
                        rating={slide.rate}
                        interactive={false}
                        key={i}
                      />
                    </div>
                    <span className="text-white">{slide.rate}</span>
                  </div>
                </div>
              </Slide>
            </SwiperSlide>
          ))}
        </SectionSwiper>
      </Container>
    </div>
  );
}
