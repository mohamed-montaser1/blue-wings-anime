"use client";
import { Button, Container, Slide } from "@/components";
import useFetch from "@/hooks/useFetch";
import { TManga } from "@/models/Manga";
import useUser from "@hooks/useUser";
import { AxiosError } from "axios";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useEffect, useState } from "react";
import Rater from "react-rater";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FavoritesPage() {
  const { user } = useUser({ required: true });
  const [status, setStatus] = useState<"loading" | "loaded" | "empty">(
    "loaded"
  );
  const [data, setData] = useState<TManga[]>([]);
  useEffect(() => {
    // Get The Data From Server Here And Change The Status To Loaded
    (async () => {
      if (!user) return;
      const res = await useFetch(
        `/api/manga/favs/${user.slug_name}`,
        "GET",
        {}
      );
      setStatus("loaded");
      setData(res.data.data);
    })();
  }, [user]);
  if (status === "loading") {
    return (
      <h1 className="text-white mt-20 text-2xl text-center">
        جاري التحميل إنتظر قليلاً
      </h1>
    );
  }
  if (status === "empty") {
    return (
      <h1 className="text-white mt-20 text-2xl text-center">
        لم تقم بإضافة أي أعمال إلى المفضلة حتى الآن!
      </h1>
    );
  }
  return (
    <>
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
        {data.map((el) => (
          <Slide key={Math.random()} title="مفضلة" image={el.credit}>
            <div className="text-white w-full mt-2 flex flex-col items-start">
              <h3 className="text-lg font-bold">{el.name}</h3>
              <p className="my-1">
                {el.story.substr(0, 100)}
                {el.story.length > 100 && "..."}
              </p>
              <div className="stars flex gap-2 items-center">
                <Rater
                  total={5}
                  rating={el.rating.length}
                  interactive={false}
                  key={nanoid()}
                />
              </div>
              <Link href={`/manga/${el.slug}`}>
                <Button variant="light-form-btn" className="mt-4">
                  زيارة
                </Button>
              </Link>
            </div>
          </Slide>
        ))}
      </Container>
      <Button variant="main" className="mx-auto mt-10">
        عرض المزيد
      </Button>

      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeOnClick
        closeButton={false}
      />
    </>
  );
}
