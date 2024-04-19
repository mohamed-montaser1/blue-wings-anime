import { SwiperArrow } from "@/../public/icons";
import Image from "next/image";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  arrowDir?: "left" | "right";
}

export default function SwiperButton({ arrowDir, id, ...props }: Props) {
  function handleSwipe() {
    let swiper = document.getElementById(id!) as HTMLElement;
    if (arrowDir === "left") {
      swiper.swiper!.slideNext();
    } else {
      swiper.swiper!.slidePrev();
    }
  }

  return (
    <button
      {...props}
      className={`bg-card p-7 rounded-full`}
      onClick={handleSwipe}
    >
      <Image
        src={SwiperArrow}
        alt="swiper-arrow"
        style={{ transform: arrowDir === "left" ? "rotateY(180deg)" : "" }}
      />
    </button>
  );
}
