"use client";

import { Button, Container } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

export default function VerifyEmail() {
  const { status, data, update } = useSession();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [canSend, setCanSend] = useState(false);
  const firstName = data?.user?.name?.split(" ")[0];
  const email: string = data?.user.email;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
    if (status === "authenticated") {
      if (data?.user.email_verified) {
        router.replace("/");
        return;
      }
      setCanSend(true);
    }
  }, [status]);
  useEffect(() => {
    if (!email || !canSend) return;
    axios
      .post("/api/email-verification", {
        email,
      })
      .then((res) => {
        setCode(res.data.code);
      });
  }, [email, canSend]);
  function handleLength(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.split("").length > 4) {
      let newValue = e.target.value.split("").slice(0, 4).join("");
      setInputValue(newValue);
    } else {
      setInputValue(e.target.value);
    }
  }
  function handleCheckCode() {
    if (inputValue !== code) {
      return toast("الكود الذي أدخلته غير صحيح", { type: "error" });
    }
    toast("الكود الذي ادخلت صحيح", { type: "success" });
    update({ ...data, user: { ...data?.user, email_verified: true } });
    setTimeout(() => {
      router.push("/");
    }, 1400);
  }
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
          onChange={handleLength}
          value={inputValue}
        />
        <Button
          variant="main"
          className="mx-auto mt-6"
          style={{ padding: "10px 60px" }}
          onClick={handleCheckCode}
        >
          تحقق
        </Button>
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeButton={false}
        closeOnClick={true}
      />
    </Container>
  );
}
