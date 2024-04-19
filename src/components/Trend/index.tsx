"use client";
import Container from "../Container";
import SectionHeader from "../SectionHeader";
import SectionSwiper, { TAnime } from "../SectionSwiper";

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
    <div className="mt-8">
      <Container className="lg:px-0">
        <SectionHeader title="آخر الأعمال الرائجة" id="trend" />
        <SectionSwiper
          data={data}
          id="trend"
          options={{
            breakpoints: {
              0: {
                slidesPerView: 1,
              },
              575: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            },
          }}
          slidesPerView={4}
        />
      </Container>
    </div>
  );
}
