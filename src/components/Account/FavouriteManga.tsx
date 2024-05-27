import generateSwiperBreakPoints from "@lib/swiperOptions";
import { TAnime } from "../SectionSwiper";
import { SectionHeader, SectionSwiper } from "@components";
import Slide from "../SectionSwiper/Slide";
import { SwiperSlide } from "swiper/react";
import Rater from "react-rater";

export default function FavoriteManga() {
  const data: TAnime[] = [
    {
      chaptersNumber: 390,
      image: "https://placehold.co/393C4C/white",
      rate: 5,
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 710,
      image: "https://placehold.co/393C4C/white",
      rate: 4,
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 23,
      image: "https://placehold.co/393C4C/white",
      rate: 5,
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 150,
      image: "https://placehold.co/393C4C/white",
      rate: 4.5,
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 410,
      image: "https://placehold.co/393C4C/white",
      rate: 3.2,
      title: "Star Martial God Technique",
    },
  ];
  return (
    <section className="mt-16">
      <SectionHeader id="5" title="المانجا المفضلة" />
      <SectionSwiper
        slidesPerView={4}
        id="5"
        key={5}
        options={{
          breakpoints: generateSwiperBreakPoints({ slidesPerView: 4 }),
        }}
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
    </section>
  );
}
