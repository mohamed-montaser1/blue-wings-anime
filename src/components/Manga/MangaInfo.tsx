"use client";

import { useEffect, useState } from "react";
import { Button, Container, Input } from "@components";
import Image from "next/image";
import Star from "@icons/star";
import Bookmark from "@icons/bookmark";
import Rater from "react-rater";
import { TManga } from "@/models/Manga";
import { nanoid } from "nanoid";
import DateController from "@/utils/date";
import useUser from "@/hooks/useUser";
import useFetch from "@/hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TUser } from "@/models/User";

type TProps = {
  data: TManga;
};

export default function MangaInfo({ data }: TProps) {
  const { user } = useUser({ required: false });
  const [chapter, setChapter] = useState<"default" | number>("default");
  const [rating, setRating] = useState(0);
  const keywords = data.keywords;

  async function handleAddToFav() {
    if (!user) return;
    try {
      const res = await useFetch(
        `/api/manga/favs/${(user as TUser).slug_name}/${data.slug}`,
        "POST",
        {}
      );

      if (res.data.data === null) {
        toast.info("المانجا موجوده بالفعل في المفضلة !");
      } else if (res.status < 202) {
        toast.success("تم إضافة المانجا الى المفضلة بنجاح");
      }
    } catch (error) {
      toast.error("حدث خطأ ما عاود الحاولة لاحقاً");
      return;
    }
  }

  useEffect(() => {
    setRating(data.ratingNumber);
  }, []);

  console.log({ data });
  return (
    <div className="mt-[105px]">
      <Container className="flex gap-10 flex-col-reverse items-center lg:flex-row lg:items-start">
        <div>
          <Image
            src={data.credit}
            alt={`credit-anime-${nanoid()}`}
            width={430}
            height={500}
          />
          <div className="bg-card p-5 min-h-80 min-w-[400px] w-full mt-5">
            {user && (
              <div className="flex gap-4">
                <Button className="!bg-secondary" onClick={handleAddToFav}>
                  <span className="text-white">مانجا مفضلة</span>
                  <Star fill="white" />
                </Button>
                <Button className="!bg-secondary">
                  <span className="text-white">أريد قراءتها لاحقاً</span>
                  <Bookmark />
                </Button>
              </div>
            )}
            <div className="rate bg-sub-card p-4 rounded-lg flex items-center justify-between my-6">
              {data.rating.length > 0 ? (
                <>
                  <div className="flex">
                    <Rater
                      interactive={false}
                      total={5}
                      rating={rating}
                      key={nanoid()}
                    />
                  </div>
                  <span className="text-white">{rating.toFixed(2)}</span>
                </>
              ) : (
                <h1 className="text-slate-200 text-xl">
                  لم يتم تقييم هذه المانجا بعد !
                </h1>
              )}
            </div>
            <div className="info flex flex-col gap-2">
              <div className="info-data">
                <span>الحالة:</span>
                <span>{data.status}</span>
              </div>
              <div className="info-data">
                <span>النوع:</span>
                <span>{data.type}</span>
              </div>
              <div className="info-data">
                <span>بواسطة:</span>
                <span>{data.author.name}</span>
              </div>
              <div className="info-data">
                <span>منشور في:</span>
                <span>
                  {new DateController(data.createdAt).format("DD MMMM YYYY")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-auto flex flex-col">
          <div className="bg-card text-white w-full min-h-56 px-4 pb-10 pt-7">
            <h1 className="text-white text-4xl font-bold mb-3">{data.name}</h1>
            <div className="keywords">
              {keywords.map((keyword, idx) => (
                <span className="keyword" key={idx}>
                  {keyword}
                </span>
              ))}
            </div>
            <div className="story mt-5">
              <h2 className="text-lg font-bold">قصة المانجا</h2>
              <p className="text-[#ccc] mt-2 leading-7">{data.story}</p>
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
                  {data.chapters.map((chapter, idx) => (
                    <option value={idx + 1} className="!bg-sub-card text-xl">
                      chapter {idx + 1}
                    </option>
                  ))}
                </select>
              </Input>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <span>الفصول في شكل خلايا</span>
              <div className="flex gap-4 flex-wrap">
                {data.chapters.map((chapter, idx) => (
                  <span className="text-white font-bold border border-solid border-sub-card rounded-lg px-5 py-2.5 w-40 cursor-pointer hover:bg-sub-card transition-colors duration-300 ease-in-out">
                    الفصل {idx + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ToastContainer
          theme="dark"
          position="bottom-right"
          closeButton={false}
          closeOnClick={true}
          rtl
        />
      </Container>
    </div>
  );
}
