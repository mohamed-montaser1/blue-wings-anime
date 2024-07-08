"use client";
import { Button, Container, Slide } from "@/components";
import useFetch from "@/hooks/useFetch";
import useUser from "@hooks/useUser";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FavoritesPage() {
  const { user } = useUser({ required: true });
  const [status, setStatus] = useState<"loading" | "loaded" | "empty">(
    "loaded"
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    // Get The Data From Server Here And Change The Status To Loaded
    (async () => {
      if (!user) return;
      try {
        const res = await useFetch(
          `/api/manga/favs/${user.slug_name}`,
          "POST",
          {}
        );
        if (res.status === 200) {
          setStatus("loaded");
          setData(res.data.data);
        }
      } catch (error) {
        let e = error as unknown as AxiosError;
        if (e.response?.status === 404) {
          toast.error("لا يوجد مستخدم بهذا الإسم");
        }
      }
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
        {Array.from({ length: 3 }).map((el) => (
          <Slide key={Math.random()} title="مفضلة">
            <div className="text-white w-full mt-2">
              <h3 className="text-lg font-bold">هذا النص هو مثال لنص يمكن</h3>
              <p className="my-1">
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                هذا النص من مولد النص العربى، حيث
              </p>
              <div>Rating Rating Rating</div>
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
