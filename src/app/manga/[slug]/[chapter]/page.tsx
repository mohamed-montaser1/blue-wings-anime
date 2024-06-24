"use client";
import { Container } from "@/components";
import { Breadcrumbs, Title } from "@/components/Ui";
import { nanoid } from "nanoid";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Chapter() {
  const pathname = usePathname();
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
      <Image
        src={"/uploads/manga/testing/manga-credit.jpg"}
        alt="image"
        width={1920}
        height={2000}
        className="mt-20"
      />
    </Container>
  );
}
