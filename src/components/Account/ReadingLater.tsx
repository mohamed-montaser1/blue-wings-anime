import generateSwiperBreakPoints from "@/lib/swiperOptions";
import { TAnime } from "../SectionSwiper";
import { SectionHeader, SectionSwiper } from "@/components";

export default function ReadingLater() {
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
    <section className="mt-16">
      <SectionHeader id="6" title="القرآءة لاحقاً" />
      <SectionSwiper
        data={data}
        slidesPerView={4}
        id="6"
        key={5}
        options={{
          breakpoints: generateSwiperBreakPoints({ slidesPerView: 4 }),
        }}
      />
    </section>
  );
}
