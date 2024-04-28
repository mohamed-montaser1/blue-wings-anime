type Props = {
  slidesPerView: number;
};

export default function generateSwiperBreakPoints({ slidesPerView }: Props) {
  if (slidesPerView === 4) {
    return {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    };
  }
}
