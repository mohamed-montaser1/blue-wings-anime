"use client";
import { Button, Container } from "@/components";
import Slide from "@/components/SectionSwiper/Slide";
import useUser from "@/hooks/useUser";
import React, { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { user } = useUser({ required: true });
  const [status, setStatus] = useState<"loading" | "loaded" | "empty">("empty");
  const [count, setCount] = useState(1);
  useEffect(() => {
    // Get The Data From Server Here And Change The Status To Loaded
  }, []);
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
        {Array.from({ length: 3 * count }).map((el) => (
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
      <Button
        variant="main"
        className="mx-auto mt-10"
        onClick={() => setCount((prev) => prev + 1)}
      >
        الأعمال المفضلة
      </Button>
    </>
  );
}
