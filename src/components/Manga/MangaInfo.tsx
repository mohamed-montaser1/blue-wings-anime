"use client";

import { useState } from "react";
import { Button, Container, Input } from "@components";
import Image from "next/image";
import Star from "@icons/star";
import Bookmark from "@icons/bookmark";
import Rater from "react-rater";

export default function MangaInfo() {
  const [chapter, setChapter] = useState<"default" | number>("default");
  const keywords: string[] = [
    "أكشن",
    "خارق للطبيعة",
    "دراما",
    "حسر",
    "شونين",
    "فانتازيا",
  ];
  return (
    <div className="mt-[105px]">
      <Container className="flex gap-10">
        <div>
          <Image
            src={"/manga-credit.jpg"}
            alt="credit-anime"
            width={430}
            height={500}
          />
          <div className="bg-card p-5 min-h-80 min-w-[400px] max-w-fit mt-5">
            <div className="flex gap-4">
              <Button className="!bg-secondary">
                <span className="text-white">مانجا مفضلة</span>
                <Star fill="white" />
              </Button>
              <Button className="!bg-secondary">
                <span className="text-white">أريد قراءتها لاحقاً</span>
                <Bookmark />
              </Button>
            </div>
            <div className="rate bg-sub-card p-4 rounded-lg flex items-center justify-between my-6">
              <div className="flex">
                <Rater
                  interactive={false}
                  total={5}
                  rating={3}
                  key={Math.random()}
                >
                  <Star fill="#9128FF" />
                </Rater>
              </div>
              <span className="text-white">9.40</span>
            </div>
            <div className="info flex flex-col gap-2">
              <div className="info-data">
                <span>الحالة:</span>
                <span>Ongoing</span>
              </div>
              <div className="info-data">
                <span>النوع:</span>
                <span>Manga</span>
              </div>
              <div className="info-data">
                <span>بواسطة:</span>
                <span>ARES</span>
              </div>
              <div className="info-data">
                <span>منشور في:</span>
                <span>10 ديسمبر 2023</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-auto flex flex-col">
          <div className="bg-card text-white w-full min-h-56 px-4 pb-10 pt-7">
            <h1 className="text-white text-4xl font-bold mb-3">
              A Paladin in a Dark Fantasy World
            </h1>
            <div className="keywords">
              <span className="keyword">أكشن</span>
              <span className="keyword">خارق للطبيعة</span>
              <span className="keyword">دراما</span>
              <span className="keyword">سحر</span>
              <span className="keyword">شونين</span>
              <span className="keyword">فانتازيا</span>
              {keywords.map((keyword, idx) => (
                <span className="keyword" key={idx}>
                  {keyword}
                </span>
              ))}
            </div>
            <div className="story mt-5">
              <h2 className="text-lg font-bold">قصة المانجا</h2>
              <p className="text-[#ccc] mt-2 leading-7">
                بعدما انغمس في لُعبة خيالية غامضة بأطياف العصور الوسطى، التي
                تتسم بصعوبتها الفائقة، مرّت سنتان من الزمن على تجربة إيدين. حقق
                بوصفه فارسًا شجاعًا، انتصارات عظيمة بقتله 49 شيطانًا، ليُعيِّن
                بعد ذلك فارسًا مقدسًا، ما فتح أمامه أبواب التقدم في خيوط السرد
                الرئيسية للعبة. ورغم التقدم في اللعبة، يظهر تداخل التفاصيل وتشوه
                العلاقات مع الشخصيات الافتراضية. هل يستطيع إيدين التغلب على
                الصعاب المتزايدة والبقاء على قيد الحياة وسط أحداث اللعبة
                الغامضة؟
              </p>
            </div>
          </div>
          <div className="bg-card text-white w-full min-h-56 px-4 pb-10 pt-5 mt-5 h-auto flex-1">
            <h2 className="font-bold text-xl">الفصول</h2>
            <div className="mt-5 flex gap-5">
              <Button className="text-3xl !bg-primary !px-20 py-14 flex-1">
                الفصل الأول
              </Button>
              <Input className="!bg-secondary flex-1 items-center justify-center">
                <select
                  className="bg-transparent outline-none w-full text-xl h-full"
                  value={chapter}
                  onChange={(e) => setChapter(+e.target.value)}
                >
                  <option value="default" disabled className="text-lg">
                    -- الإنتقال للفصل --
                  </option>
                  {Array.from({ length: 15 }).map((el, idx) => (
                    <option value={idx + 1} className="!bg-sub-card text-xl">
                      chapter {idx + 1}
                    </option>
                  ))}
                </select>
              </Input>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <span>الفصول التي تم قرآءتها</span>
              <div className="flex gap-4 flex-wrap">
                {Array.from({ length: 9 }).map((el, idx) => (
                  <span className="text-white font-bold border border-solid border-sub-card rounded-lg px-5 py-2.5 w-40 cursor-pointer hover:bg-sub-card transition-colors duration-300 ease-in-out">
                    الفصل {idx + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
