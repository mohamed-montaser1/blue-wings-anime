"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";

export default function VerifyEmail() {
  const { status, data } = useSession();
  const router = useRouter();
  const firstName = data?.user?.name?.split(" ")[0];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);
  return (
    <Container className="my-[100px] flex flex-col items-center">
      <h1 className="text-white text-4xl">مرحبا بك, {firstName}!</h1>
      <h2 className="text-[#ccc] text-2xl mt-3">
        تم إرسال كود علي البريد الإلكتروني الذي أدخلته
      </h2>
      <div className="mt-20 rounded-xl bg-card p-6 w-[600px] max-w-full">
        <input
          type="number"
          className="mx-auto block bg-sub-card rounded-lg p-2 w-full text-white text-lg text-center outline-none"
        />
        <Button
          variant="main"
          className="mx-auto mt-6"
          style={{ padding: "10px 60px" }}
        >
          تحقق
        </Button>
      </div>
    </Container>
  );
}
