"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Image from "next/image";
import React from "react";
import { GoogleIcon } from "../../../../public/icons";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/");
  }
  function handleSignIn() {
    signIn("google");
  }
  return (
    <Container className="flex flex-col items-center mt-16">
      <Title lineSize={"medium"}>تسجيل الدخول</Title>
      {/* Inputs Version */}
      {/* <form className="mt-[80px] flex flex-col w-[603px] max-w-full items-center">
        <Input>
          <Image src={UserOutlineIcon} alt="user-outline-icon" />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="input"
          />
        </Input>
        <Input className="items-center">
          <Image src={LockIcon} alt="lock-icon" />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="input"
            dir="rtl"
          />
          <span className="text-main-color cursor-pointer">
            إظهار كلمة المرور
          </span>
        </Input>
        <Button variant="form-btn" className="py-[10px] px-[50px] h-[57px]">
          <span className="text-main-color">تسجيل الدخول</span>
          <Image src={PlainIcon} alt="plain-icon" />
        </Button>
      </form> */}
      {/* <div className="w-[600px] bg-card min-h-[100px] mt-[80px] rounded-3xl grid place-items-center"> */}
      <Button
        className="bg-sub-card px-[40px] py-[15px] mt-[50px]"
        onClick={handleSignIn}
      >
        <span>تسجيل الدخول بإستخدام Google</span>
        <Image src={GoogleIcon} alt="google-icon" />
      </Button>
      {/* </div> */}
      <p className="mt-[20px] text-white">
        ليس لديك حساب بالفعل ؟
        <Link href={"/auth/register"} className="text-main-color">
          إنشئ حساب جديد
        </Link>
      </p>
    </Container>
  );
}
