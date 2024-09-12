"use client";
import { Container, SectionSwiper, Slide } from "@/components";
import { CarouselItem } from "@/components/Ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Ui/dropdown-menu";

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
              <DropdownMenuItem onClick={handleSortOlder}>
                الأقدم
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSortLatest}>
                الأحدث
              </DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </div>
    </>
  );
}
