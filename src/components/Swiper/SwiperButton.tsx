import { SwiperArrow } from "@icons";
import Image from "next/image";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  arrowDir?: "left" | "right";
}

type SwiperFn = {
  slideNext: () => void;
  slidePrev: () => void;
  swiper: any;
};
export default function SwiperButton({ arrowDir, id, ...props }: Props) {
  function handleSwipe() {
    let swiper = document.getElementById(id!) as HTMLElement & SwiperFn;
    if (arrowDir === "left") {
      swiper.swiper.slideNext();
      return;
    }
    swiper.swiper.slidePrev();
  }

  return (
    <button
      {...props}
      className={`bg-card p-4 md:!p-7 rounded-full h-fit w-fit`}
      onClick={handleSwipe}
    >
      <Image
        src={SwiperArrow}
        alt="swiper-arrow"
        className="w-10"
        style={{ transform: arrowDir === "left" ? "rotateY(180deg)" : "" }}
      />
    </button>
  );
}
