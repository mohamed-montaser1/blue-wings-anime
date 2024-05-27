import React from "react";
import Title from "../Title";
import Container from "../Container";
import SwiperButton from "../SwiperButton";
import SectionSwiper from "../SectionSwiper";
import { SwiperSlide } from "swiper/react";
import Slide from "../SectionSwiper/Slide";
import generateSwiperBreakPoints from "@/lib/swiperOptions";
import data from "@/lib/demoSwiperData";
import Rater from "react-rater";

export default function Recommendations() {
  const id = "recommendations";
  return (
    <Container className="mt-20">
      <Title className="!mb-10 mx-auto md:mx-0">توصيات</Title>
      <div className="flex flex-col lg:flex-row gap-6 max-w-full items-center">
        <FilterBar />
        <div className="flex gap-2.5 mx-auto md:mx-0">
          <SwiperButton arrowDir="right" id={id} />
          <SwiperButton arrowDir="left" id={id} />
        </div>
      </div>
      <SectionSwiper
        id={id}
        slidesPerView={3}
        options={{
          breakpoints: generateSwiperBreakPoints({ slidesPerView: 3 }),
        }}
      >
        {data.map((slide, i) => (
          <SwiperSlide className="mr-3">
            <Slide key={i} title="مانجا">
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
  );
}

const FILTER_OPTIONS: TFilterItemProps[] = [
  { text: "أكشن", active: true },
  { text: "إيسيكاي" },
  { text: "اثاره" },
  { text: "اختبار" },
  { text: "اعادة تجسيد" },
  { text: "تنانين" },
];

function FilterBar() {
  return (
    <div className="bg-card rounded-xl p-2 flex-1 flex items-center justify-center">
      <ul className="flex gap-4 flex-wrap">
        {FILTER_OPTIONS.map((filter) => (
          <FilterItem text={filter.text} active={filter.active} />
        ))}
      </ul>
    </div>
  );
}

type TFilterItemProps = {
  text: string;
  active?: boolean;
};

function FilterItem({ text, active = false }: TFilterItemProps) {
  return (
    <li
      className={`text-white ${
        active ? "main-gradient" : ""
      } px-7 py-2 rounded-lg w-fit h-fit hover:bg-secondary transition-colors duration-300 ease-in-out cursor-pointer text-xl border border-solid border-secondary md:border-none`}
    >
      {text}
    </li>
  );
}
