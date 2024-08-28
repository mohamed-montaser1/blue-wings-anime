import React from "react";
import { Container, SectionSwiper, SectionHeader, Button } from "@components";
import data from "@lib/demoSwiperData";
import Slide from "../../Swiper/SectionSwiper/Slide";
import Rater from "react-rater";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { ClockIcon } from "@icons/index";
import generateSwiperBreakPoints from "@/lib/swiperOptions";
import { CarouselItem } from "@/components/Ui/carousel";

export default function Newest() {
  return (
    <div>
      <Container className="lg:px-0 mt-20">
        <SectionHeader title="جديد الأعمال" />
        <SectionSwiper>
          {data.map((el, i) => {
            return (
              <CarouselItem key={i} className="basis-1/3">
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
                        <span className="text-slate-100 text-sm" dir="ltr">
                          10 Jun 2024
                        </span>
                      </div>
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
                    <Button variant="main" className="px-11 mt-4">
                      الإنتقال إلى الفصل
                    </Button>
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
