import { SectionHeader, SectionSwiper } from "@components";
import Rater from "react-rater";
import { SwiperSlide } from "swiper/react";
import { TAnime } from "../Swiper/SectionSwiper";
import Slide from "../Swiper/SectionSwiper/Slide";

export default function ReadingLater() {
  const data: TAnime[] = [
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: 3.5,
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
      rate: 2,
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
    <section className="mt-16">
      <SectionHeader title="القرآءة لاحقاً" />
      <SectionSwiper key={5}>
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
    </section>
  );
}
