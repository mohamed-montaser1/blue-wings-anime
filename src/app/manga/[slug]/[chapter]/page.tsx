"use client";
import { Container } from "@/components";
import { Breadcrumbs, Button, Title } from "@/components/Ui";
import { nanoid } from "nanoid";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Chapter() {
  const pathname = usePathname();
  const router = useRouter();
  const [newUrl, setNewUrl] = useState<string>(pathname);
  const dropdownRef = useRef<HTMLSelectElement>(null);
  const chapter = {
    slug: pathname.split("/").at(-2) as string,
    name: pathname
      .split("/")
      .at(-2)
      ?.split("-")
      .map((e) => `${e[0].toUpperCase()}${e.slice(1)}`)
      .join(" "),
    number: pathname.split("/").at(-1) as string,
  };

  useEffect(() => {
    if (newUrl === pathname) return;
    router.push(newUrl);
  }, [newUrl]);

  return (
    <Container className="mt-14">
      <Breadcrumbs
        url={["الرئيسية", "قائمة المانجا", chapter.slug, chapter.number]}
        key={nanoid()}
        className="mb-5"
      />
      <h1 className="text-slate-200 text-3xl text-center"></h1>
      <Title className="mx-auto mt-14">
        <span className="mx-2">الفصل رقم</span>
        {chapter.number}
        <span className="mx-2">من</span>
        {chapter.name}
      </Title>
      <div className="controls flex justify-between items-center">
        <Button
          variant="main"
          className="p-4 rounded-lg !min-w-fit"
          onClick={() => {
            dropdownRef.current?.focus();
          }}
        >
          <select
            className="border-none outline-none text-slate-200 bg-transparent !min-w-36 cursor-pointer"
            ref={dropdownRef}
            onChange={(e) => {
              let newUrl: string[] | string = pathname.split("/");
              newUrl.pop();
              newUrl.push(e.target.value);
              newUrl = newUrl.join("/");
              setNewUrl(newUrl);
            }}
            value={chapter.number}
          >
            <option disabled className="bg-sub-card text-slate-500">
              إختر الفصل
            </option>
            {Array.from({ length: 20 }).map((_, i) => {
              const idx = i + 1;
              return (
                <option value={idx} className="bg-card text-slate-300">
                  الفصل {idx}
                </option>
              );
            })}
          </select>
        </Button>
        <div className="flex gap-2">
          <Button variant="main" className="!p-4">
            السابق
          </Button>
          <Button variant="main" className="!p-4">
            التالي
          </Button>
        </div>
      </div>
      <Image
        src={"/uploads/manga/testing/manga-credit.jpg"}
        alt="image"
        width={1920}
        height={2000}
        className="mt-16"
      />
      <div className="comments"></div>
    </Container>
  );
}
