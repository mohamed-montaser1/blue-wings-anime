import React from "react";
import { Container, SectionSwiper, SectionHeader, Button } from "@components";
import data from "@lib/demoSwiperData";
import Slide from "../SectionSwiper/Slide";
import Rater from "react-rater";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { ClockIcon } from "@icons/index";
import generateSwiperBreakPoints from "@/lib/swiperOptions";

export default function Newest() {
  return (
    <div>
      <Container className="lg:px-0 mt-20">
        <SectionHeader title="جديد الأعمال" id="newest" />
        <SectionSwiper
          slidesPerView={3}
          id="newest"
          options={{
            breakpoints: generateSwiperBreakPoints({ slidesPerView: 3 }),
          }}
        >
          {data.map((el, i) => {
            let sum = el.rate.reduce((sum, el) => sum + el, 0);
            return (
              <SwiperSlide key={i} className="mr-3">
                <Slide>
                  <div className="details w-full mt-3">
                    <h3 className="text-slate-200 text-right text-2xl">
                      هذا النص هو مثال لنص
                    </h3>
                    <p className="description text-slate-300 mt-1 mb-2">
                      هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                      توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل
                      هذا النص أو العديد من النصوص الأخر
                    </p>
                    <p className="text-slate-50 mb-2">
                      عدد الفصول {el.chaptersNumber}
                    </p>
                    <div className="flex justify-between items-center mt-4 mb-5 flex-col lg:flex-row gap-2">
                      <div className="creation-time flex gap-2">
                        <Image src={ClockIcon} alt="clock icon" />
                        <span className="text-slate-100 text-sm lg:text-base">
                          10 Jun 2024
                        </span>
                      </div>
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
                    <Button variant="main" className="px-11 mt-4">
                      إقرأ الآن
                    </Button>
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
