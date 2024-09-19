"use client";
import { Container, SectionSwiper, Slide } from "@/components";
import { CarouselItem } from "@/components/Ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Ui/dropdown-menu";
import MangaNewImage from "@public/manga-new-image.svg";
import { Separator } from "@/components/Ui/separator";
import Image from "next/image";
import { nanoid } from "nanoid";

export default function NewsPage() {
  return (
    <Container>
      <MangaNews />
      <MangaList />
    </Container>
  );
}

function MangaNews() {
  return (
    <>
      <h1 className="text-5xl text-center my-10">آخر أخبار المانجا</h1>
      <SectionSwiper>
        {Array.from({ length: 10 }).map((slide, idx) => (
          <CarouselItem className="basis-1/4">
            <Slide title="خبر" key={idx}>
              <div className="mt-4">
                <h3 className="font-bold text-lg text-slate-200">
                  عنوان الخبر
                </h3>
                <p className="text-slate-300">
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربى، حيث ي...
                </p>
                <small className="text-slate-400">
                  عدد المشاهدات<span className="font-bold"> 720</span>
                </small>
              </div>
            </Slide>
          </CarouselItem>
        ))}
      </SectionSwiper>
    </>
  );
}

function MangaList() {
  function handleSortOlder() {}
  function handleSortLatest() {}
  return (
    <>
      <h1 className="text-5xl text-center my-10">قائمة الأخبار</h1>
      <div className="filter w-[236px] h-[45px] rounded-lg bg-card flex items-center justify-center">
        <DropdownMenu>
          <div className="w-[236px] h-[45px] flex justify-center items-center">
            <DropdownMenuTrigger>الترتيب حسب</DropdownMenuTrigger>
            <DropdownMenuContent className="w-[236px]">
              <DropdownMenuItem
                onClick={handleSortOlder}
                className="flex justify-center items-center cursor-pointer"
              >
                الأقدم
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSortLatest}
                className="flex justify-center items-center cursor-pointer"
              >
                الأحدث
              </DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </div>
      {Array.from({ length: 5 }).map((el, i) => (
        <MangaNew key={i} />
      ))}
    </>
  );
}

function MangaNew() {
  return (
    <article>
      <Separator className="bg-slate-500 block mt-[32px] mb-[16px]" />
      <div className="flex items-stretch gap-5">
        <Image
          src={MangaNewImage}
          alt={`small-card-placeholder-${nanoid()}`}
          className="h-[180px] w-[359px]"
          width={359}
          height={180}
        />
        <div className="content">
          <div className="keywords !mt-0 mb-4">
            <span className="keyword">أكشن</span>
            <span className="keyword">خارق للطبيعه</span>
          </div>
          <h2 className="text-slate-200 font-bold text-xl mb-2">
            عودة فيلمي HAIKYU!! The Dumpster Battle و THE FIRST SLAM DUNK إلى
            قائمة العشرة الأوائل في شباك التذاكر الياباني بفضل العروض الخاصة
          </h2>
          <p className="text-slate-400">يتجاوز الفيلم الرابع من سلسلة أفلام Kingdom حاجز 6.8 مليار ين</p>
        </div>
      </div>
    </article>
  );
}
