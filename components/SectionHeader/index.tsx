import React from "react";
import Title from "../Title";
import SwiperButton from "../SwiperButton";

interface Props {
  title: string;
  id: string;
}

export default function SectionHeader({ title, id }: Props) {
  return (
    <div className="section-header header flex justify-between items-center">
      <Title>{title}</Title>
      <div className="flex gap-[10px]">
        <SwiperButton arrowDir="right" id={id} />
        <SwiperButton arrowDir="left" id={id} />
      </div>
    </div>
  );
}
