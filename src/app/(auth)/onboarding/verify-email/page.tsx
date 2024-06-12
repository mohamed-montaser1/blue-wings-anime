"use client";

import { Button, Container } from "@components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import useUser from "@hooks/useUser";
import useFetch from "@hooks/useFetch";

export default function VerifyEmail() {
  const { user } = useUser({ required: true });
  const { update, data: session } = useSession();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    if (!user) return;
    checkVerifiedEmail();
  }, [user?.email_verified, router]);

  useEffect(() => {
    if (!user) return;
    sendCode();
  }, [user?.email, canSend]);

  function sendCode() {
    if (!user.email || !canSend) return;
    type TData = {
      email: string;
    };
    type TResponse = {
      code: string;
    };
    useFetch<TData, TResponse>("/api/email-verification", "POST", {
      email: user.email,
    }).then((res) => {
      setCode(res.data.code);
    });
  }

  function handleMaxLength(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    if (target.value.split("").length > 4) {
      let newValue = target.value.split("").slice(0, 4).join("");
      setInputValue(newValue);
    } else {
      setInputValue(e.target.value);
    }
  }

  function checkCode(inputValue: string, code: string) {
    if (inputValue !== code) {
      return toast("الكود الذي أدخلته غير صحيح", { type: "error" });
    }
    update({
      ...session,
      user: { ...(session?.user || {}), email_verified: true },
    });
    toast("تم توثيق الحساب بنجاح", {
      type: "success",
      onClose(isOpen) {
        if (!isOpen) router.push("/account/settings");
      },
    });
  }

  function checkVerifiedEmail() {
    if (user.email_verified) {
      return router.replace("/");
    }
    setCanSend(true);
  }

  return (
    <Container className="my-[100px] flex flex-col items-center">
      <h1 className="text-white text-4xl">مرحبا بك, {user?.firstName}!</h1>
      <h2 className="text-[#ccc] text-2xl mt-3">
        تم إرسال كود علي البريد الإلكتروني الذي أدخلته
      </h2>
      <div className="mt-20 rounded-xl bg-card p-6 w-[600px] max-w-full">
        <input
          type="number"
          className="mx-auto block bg-sub-card rounded-lg p-2 w-full text-white text-lg text-center outline-none"
          onChange={(e) => handleMaxLength(e)}
          value={inputValue}
        />
        <Button
          variant="main"
          className="mx-auto mt-6"
          style={{ padding: "10px 60px" }}
          onClick={() => checkCode(inputValue, code)}
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
