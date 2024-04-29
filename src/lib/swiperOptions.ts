import { SwiperOptions } from "swiper/types";

type Props = { slidesPerView: number };

export default function generateSwiperBreakPoints({ slidesPerView }: Props) {
  let options: SwiperOptions["breakpoints"] = {
    0: {
      slidesPerView: 1,
    },
    500: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
  };

  if (slidesPerView === 4) {
    options[1024] = {
      slidesPerView: 4,
    };
  }

  return options;
}
