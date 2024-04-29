import React from "react";
import Container from "../Container";
import SectionHeader from "../SectionHeader";
import SectionSwiper from "../SectionSwiper";
import data from "@/lib/demoSwiperData";

export default function Newest() {
  return (
    <div>
      <Container className="lg:px-0">
        <SectionHeader title="آخر الأعمال الرائجة" id="trend" />
        <SectionSwiper slidesPerView={4} data={data} id="trend" />
      </Container>
    </div>
  );
}
