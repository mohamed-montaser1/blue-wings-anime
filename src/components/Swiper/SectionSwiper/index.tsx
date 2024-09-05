import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import "react-rater/lib/react-rater.css";

export interface TAnime {
  image: string;
  title: string;
  chaptersNumber: number;
  rate: number;
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  customBtns?: boolean;
  showBtns?: boolean;
};

export default function SectionSwiper({
  children,
  customBtns,
  showBtns = true,
  ...props
}: Props) {
  const autoplayRef = useRef(Autoplay({ delay: 2000, stopOnMouseEnter: true }));

  return (
    <Carousel
      plugins={[autoplayRef.current]}
      onMouseLeave={() => {
        autoplayRef.current.play();
      }}
      {...props}
      className={cn(
        showBtns ? "cursor-grab" : "cursor-default",
        props.className
      )}
    >
      <CarouselContent>{children}</CarouselContent>
      {showBtns && (
        <>
          <CarouselPrevious
            className={customBtns ? "custom-carousel-prev" : ""}
          />
          <CarouselNext className={customBtns ? "custom-carousel-next" : ""} />
        </>
      )}
    </Carousel>
  );
}
