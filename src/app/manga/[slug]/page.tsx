"use client";
import useFetch from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";
import { TManga } from "@/models/Manga";
import { MangaInfo, Rate, SimilarManga } from "@components";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type TProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params: { slug } }: TProps) {
  const { status } = useUser({ required: false });
  const [err, setErr] = useState("");
  const [data, setData] = useState<TManga | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await useFetch<{}, { manga: TManga }>(
          `/api/manga/${slug}`,
          "GET",
          {}
        );
        setData(res.data.manga);
        console.log({ res })
      } catch (err) {
        let error = err as unknown as AxiosError;
        switch (error.response?.status) {
          case 404:
            setErr("لا توجد مانجا بهذا الإسم");
            break;
        }
      }
    })();
  }, []);

  if (err) {
    return <h1 className="text-slate-300 text-center text-3xl mt-5">{err}</h1>;
  }
  if (data === null) {
    return (
      <h1 className="text-slate-300 text-center text-3xl mt-5">
        جار التحميل...
      </h1>
    );
  }

  return (
    <>
      <MangaInfo data={data} />
      <SimilarManga />
      {status !== "authenticated" ? (
        <h1 className="text-red-300 text-3xl text-center my-14">
          يجب أن تكون مسجل بالموقع لتقييم العمل!
        </h1>
      ) : (
        <Rate data={data} />
      )}
    </>
  );
}
