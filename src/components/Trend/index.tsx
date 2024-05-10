"use client";
import generateSwiperBreakPoints from "@lib/swiperOptions";
import { Container, SectionHeader, SectionSwiper } from "@components";
import { TAnime } from "@components/SectionSwiper";

export default function Trend() {
  const data: TAnime[] = [
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 0.5, 0],
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 1, 0],
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 1, 0],
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 1, 0],
      title: "Star Martial God Technique",
    },
    {
      chaptersNumber: 640,
      image: "https://placehold.co/393C4C/white",
      rate: [1, 1, 1, 1, 0],
      title: "Star Martial God Technique",
    },
  ];
  return (
    <div className="mt-16">
      <Container className="lg:px-0">
        <SectionHeader title="آخر الأعمال الرائجة" id="trend" />
        <SectionSwiper
          data={data}
          id="trend"
          options={{
            breakpoints: generateSwiperBreakPoints({ slidesPerView: 4 }),
          }}
          slidesPerView={4}
        />
      </Container>
    </div>
  );
}
