import React, { useState } from "react";
import Title from "../../Ui/Title";
import Container from "../../Ui/Container";
import SwiperButton from "../../Swiper/SwiperButton";
import SectionSwiper from "../../Swiper/SectionSwiper";
import { SwiperSlide } from "swiper/react";
import Slide from "../../Swiper/SectionSwiper/Slide";
import generateSwiperBreakPoints from "@/lib/swiperOptions";
import data from "@/lib/demoSwiperData";
import Rater from "react-rater";
import { SectionHeader } from "@/components/Swiper";
import { CarouselItem } from "@/components/Ui/carousel";

export default function Recommendations() {
  const id = "recommendations";
  return (
    <Container className="mt-20 !px-0">
      <Title className="!mb-10 mx-auto md:mx-0">توصيات</Title>
      <div className="mb-5">
        <FilterBar />
      </div>
      <SectionSwiper>
        {data.map((slide, i) => (
          <CarouselItem className="mr-3 basis-1/3" key={i}>
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
          </CarouselItem>
        ))}
      </SectionSwiper>
    </Container>
  );
}

function FilterBar() {
  const [FILTER_OPTIONS, SET_FILTER_OPTIONS] = useState<TFilterItemProps[]>([
    { text: "أكشن", active: true },
    { text: "إيسيكاي", active: false },
    { text: "اثاره", active: false },
    { text: "اختبار", active: false },
    { text: "اعادة تجسيد", active: false },
    { text: "تنانين", active: false },
    { text: "شونين", active: false },
    { text: "شوجو", active: false },
    { text: "سينيِن", active: false },
    { text: "جوسي", active: false },
  ]);
  return (
    <div className="bg-card rounded-xl p-2 flex-1 flex items-center justify-center w-full overflow-x-auto flex-nowrap px-4">
      <ul className="flex gap-4 flex-nowrap p-4 overflow-x-auto">
        {FILTER_OPTIONS.map((filter, i) => (
          <FilterItem
            text={filter.text}
            active={filter.active}
            key={i}
            FILTER_OPTIONS={FILTER_OPTIONS}
            SET_FILTER_OPTIONS={SET_FILTER_OPTIONS}
          />
        ))}
      </ul>
    </div>
  );
}

type TFilterItemProps = {
  text: string;
  active?: boolean;
};

function FilterItem({
  text,
  active = false,
  FILTER_OPTIONS,
  SET_FILTER_OPTIONS,
}: TFilterItemProps & {
  FILTER_OPTIONS: TFilterItemProps[];
  SET_FILTER_OPTIONS: React.Dispatch<React.SetStateAction<TFilterItemProps[]>>;
}) {
  function handleChangeActive() {
    SET_FILTER_OPTIONS((prev) => {
      return prev.map((el) => ({ text: el.text, active: false }));
    });
    SET_FILTER_OPTIONS((prev) => {
      return prev.map((el) => {
        if (el.text === text) return { text: el.text, active: true };
        return el;
      });
    });
  }
  return (
    <li
      className={`text-white px-7 py-2 rounded-lg min-w-fit h-fit hover:bg-primary transition-colors duration-300 ease-in-out cursor-pointer text-xl border border-solid border-secondary md:!border-none ${
        active ? "main-gradient" : ""
      }`}
      onClick={handleChangeActive}
    >
      {text}
    </li>
  );
}
