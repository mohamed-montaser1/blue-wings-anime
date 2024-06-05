import React from "react";
import Title from "../../Ui/Title";
import Container from "../../Ui/Container";
import Slide from "../../Swiper/SectionSwiper/Slide";
import Image from "next/image";
import { ClockIcon } from "@icons/index";
import Rater from "react-rater";
import Button from "../../Ui/Button";

const blog_demo_data = [
  {
    title: "هذا النص هو مثال لنص",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخر",
    rate: 5,
  },
  {
    title: "هذا النص هو مثال لنص",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخر",
    rate: 4.5,
  },
  {
    title: "هذا النص هو مثال لنص",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخر",
    rate: 3.5,
  },
  {
    title: "هذا النص هو مثال لنص",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخر",
    rate: 5,
  },
];
export default function Blogs() {
  return (
    <Container className="mt-20">
      <Title>المقالات & المدونة</Title>
      <div className="blogs grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {blog_demo_data.map((el, i) => (
          <Slide title="مقالة" key={i}>
            <div className="details w-full mt-3">
              <h3 className="text-slate-200 text-right text-2xl">
                هذا النص هو مثال لنص
              </h3>
              <p className="description text-slate-300 mt-1 mb-2">
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
                العديد من النصوص الأخر
              </p>
              <div className="flex justify-between items-center mt-4 mb-5 flex-col lg:flex-row gap-2">
                <div className="creation-time flex gap-2">
                  <Image src={ClockIcon} alt="clock icon" />
                  <span className="text-slate-100 text-sm" dir="ltr">
                    10 Jun 2024
                  </span>
                </div>
                <div className="rate flex gap-2 items-center">
                  <div className="stars flex gap-2 items-center">
                    <Rater
                      total={5}
                      rating={el.rate}
                      interactive={false}
                      key={i}
                    />
                  </div>
                  <span className="text-white">{el.rate}</span>
                </div>
              </div>
              <Button variant="main" className="!px-11 mt-4 mx-auto lg:mx-0">
                إقرأ الآن
              </Button>
            </div>
          </Slide>
        ))}
        {}
      </div>
    </Container>
  );
}
