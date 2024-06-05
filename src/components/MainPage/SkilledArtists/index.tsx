import React from "react";
import { Button, Container, SectionHeader, SectionSwiper } from "../..";
import generateSwiperBreakPoints from "@/lib/swiperOptions";
import data from "@/lib/demoSwiperData";
import { SwiperSlide } from "swiper/react";
import Slide from "../../Swiper/SectionSwiper/Slide";
import { ClockIcon } from "@icons/index";
import Image from "next/image";

export default function MostSkilledArtists() {
  const ID = "most-skilled-artists";
  const slides = 4;
  return (
    <Container className="lg:px-0 mt-20">
      <SectionHeader title="أمهر الرسامين" id={ID} />
      <SectionSwiper
        slidesPerView={slides}
        id={ID}
        options={{
          breakpoints: generateSwiperBreakPoints({ slidesPerView: slides }),
        }}
      >
        {data.map((el, i) => (
          <SwiperSlide className="mr-3" key={i}>
            <Slide>
              <div className="details w-full mt-3">
                <h3 className="text-white text-right">
                  الفنان : د. عمار الشريف
                </h3>
                <p className="text-slate-50 mb-2">
                  إيميل الفنان: example@gmail.com
                </p>
                <Button
                  variant="main"
                  className="!py-2 mx-auto !my-4 min-h-fit"
                >
                  زيارة الملف الشخصي
                </Button>
                <div className="flex justify-between items-center mt-4 mb-5 flex-col lg:flex-row gap-2">
                  <span className="text-gray-300">عدد الفصول المكتوبة 5</span>
                  <div className="creation-time flex gap-2">
                    <Image src={ClockIcon} alt="clock icon" />
                    <span className="text-slate-100 text-sm" dir="ltr">
                      10 Jun 2024
                    </span>
                  </div>
                </div>
              </div>
            </Slide>
          </SwiperSlide>
        ))}
      </SectionSwiper>
    </Container>
  );
}
