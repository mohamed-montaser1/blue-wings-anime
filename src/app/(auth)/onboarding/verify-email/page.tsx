"use client";

import { Button, Container } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import useUser from "@/hooks/useUser";
import { Session } from "next-auth";
import { TUseUserReturn, UpdateSession } from "@/lib/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

class verifyEmailController {
  data: Session | null;
  user: TUseUserReturn["user"];
  status: TUseUserReturn["status"];
  setUserAvatar: (filename: string) => void;
  avatar: string | null;
  update: UpdateSession;
  constructor(public router: AppRouterInstance) {
    const { avatar, setUserAvatar, status, user } = useUser({ required: true });
    const { data, update } = useSession();

    this.data = data;
    this.user = user;
    this.status = status;
    this.avatar = avatar;
    this.setUserAvatar = setUserAvatar;
    this.update = update;
  }
  handleMaxLength(
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValue: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (e.target.value.split("").length > 4) {
      let newValue = e.target.value.split("").slice(0, 4).join("");
      setInputValue(newValue);
    } else {
      setInputValue(e.target.value);
    }
  }
  checkCode(inputValue: string, code: string) {
    if (inputValue !== code) {
      return toast("الكود الذي أدخلته غير صحيح", { type: "error" });
    }
    toast("تم توثيق الحساب بنجاح", { type: "success" });
    this.update({
      ...this.data,
      user: { ...this.data?.user, email_verified: true },
    });
    setTimeout(() => {
      this.router.push("/");
    }, 1400);
  }
  sendCode(
    canSend: boolean,
    setCode: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (!this.user.email || !canSend) return;
    axios
      .post("/api/email-verification", {
        email: this.user.email,
      })
      .then((res) => {
        setCode(res.data.code);
      });
  }
  checkVerifiedEmail(
    setCanSend: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (this.user.email_verified) {
      return this.router.replace("/");
    }
    setCanSend(true);
  }
}

export default function VerifyEmail() {
  const { user } = useUser({ required: true });
  const router = useRouter();
  const [code, setCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [canSend, setCanSend] = useState(false);

  const { checkVerifiedEmail, checkCode, handleMaxLength, sendCode } =
    new verifyEmailController(router);
  useEffect(() => {
    checkVerifiedEmail(setCanSend);
  }, [user.email_verified, router]);

  useEffect(() => {
    sendCode(canSend, setCode);
  }, [user.email, canSend]);

  return (
    <Container className="my-[100px] flex flex-col items-center">
      <h1 className="text-white text-4xl">مرحبا بك, {user.firstName}!</h1>
      <h2 className="text-[#ccc] text-2xl mt-3">
        تم إرسال كود علي البريد الإلكتروني الذي أدخلته
      </h2>
      <div className="mt-20 rounded-xl bg-card p-6 w-[600px] max-w-full">
        <input
          type="number"
          className="mx-auto block bg-sub-card rounded-lg p-2 w-full text-white text-lg text-center outline-none"
          onChange={(e) => handleMaxLength(e, setInputValue)}
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
