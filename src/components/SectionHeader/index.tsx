import React from "react";
import Title from "../Title";
import SwiperButton from "../SwiperButton";

interface Props {
  title: string;
  id: string;
}

export default function SectionHeader({ title, id }: Props) {
  return (
    <div className="section-header header flex justify-between items-center gap-9 md:flex-row">
      <Title>{title}</Title>
      <div className="flex gap-2.5">
        <SwiperButton arrowDir="right" id={id} />
        <SwiperButton arrowDir="left" id={id} />
      </div>
    </div>
  );
}
