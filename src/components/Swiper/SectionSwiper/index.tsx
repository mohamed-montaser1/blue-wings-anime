import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import "react-rater/lib/react-rater.css";

export interface TAnime {
  image: string;
  title: string;
  chaptersNumber: number;
  rate: number;
}

interface Props {
  children: React.ReactNode;
}

export default function SectionSwiper({ children }: Props) {
  const autoplayRef = useRef(Autoplay({ delay: 2000, stopOnMouseEnter: true }));

  return (
    <Carousel
      plugins={[autoplayRef.current]}
      onMouseLeave={() => {
        autoplayRef.current.play();
      }}
      className="cursor-grab"
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
