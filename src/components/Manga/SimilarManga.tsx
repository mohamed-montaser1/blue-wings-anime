"use client";
import data from "@/lib/demoSwiperData";
import { Container, SectionSwiper, Title } from "..";

export default function SimilarManga() {
  return (
    <div className="mt-24">
      <Container>
        <Title>أعمال ذات صلة</Title>
        <SectionSwiper slidesPerView={4} data={data} id="any" key={1412141312141} />
      </Container>
    </div>
  );
}
