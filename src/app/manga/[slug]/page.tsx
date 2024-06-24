"use client";
import useUser from "@/hooks/useUser";
import { MangaInfo, Rate, SimilarManga } from "@components";

type TProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params: { slug } }: TProps) {
  const { status } = useUser({ required: false });
  return (
    <>
      <MangaInfo />
      <SimilarManga />
      {status !== "authenticated" ? <h1 className="text-red-300 text-3xl text-center my-14">يجب أن تكون مسجل بالموقع لتقييم العمل!</h1> : <Rate />}
    </>
  );
}
