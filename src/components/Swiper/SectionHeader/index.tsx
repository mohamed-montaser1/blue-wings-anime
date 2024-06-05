import React from "react";
import { Title, SwiperButton } from "@components";

interface Props {
  title: string;
  id: string;
}

export default function SectionHeader({ title, id }: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      <Title center>{title}</Title>
      <div className="flex gap-2.5 mx-auto md:mx-0">
        <SwiperButton arrowDir="right" id={id} />
        <SwiperButton arrowDir="left" id={id} />
      </div>
    </div>
  );
}
