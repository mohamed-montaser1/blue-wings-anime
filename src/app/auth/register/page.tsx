"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Image from "next/image";
import React from "react";
import { GoogleIcon } from "../../../../public/icons";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register() {
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
      <Title lineSize={"medium"}>إنشاء حساب</Title>
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
        لديك حساب بالفعل ؟
        <Link href={"/auth/login"} className="text-main-color">
          تسجيل الدخول
        </Link>
      </p>
    </Container>
  );
}
