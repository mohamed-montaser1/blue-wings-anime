"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  GoogleIcon,
  LockIcon,
  PlainIcon,
  UserOutlineIcon,
} from "@/../public/icons";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/lib/loginSchema";
import { ToastContainer, toast } from "react-toastify";
import LoginLayout from "./layout";

import "react-toastify/dist/ReactToastify.css";
import RootLayout from "@/app/layout";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { status } = useSession();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, []);

  const handleSignInWithGoogle = () => signIn("google");

  async function handleSignIn(data: FormValues) {
    signIn("credentials", {
      ...getValues(),
      redirect: false,
    }).then((res) => {
      console.log(res);
      if (res?.ok) {
        toast("تم تسجيل الدخول بنجاح", { type: "success" });
        redirect("/onboarding/verify-email");
      } else if (res?.status === 401 && !res?.ok) {
        toast("لا يوجد مستخدم مسجل بهذا الإيميل", { type: "error" });
        toast("أو أن كلمة المرور خاطئه", { type: "error" });
      }
    });
  }

  return (
    <Container className="flex flex-col items-center mt-16">
      <Title lineSize={"medium"}>تسجيل الدخول</Title>
      <form
        className="mt-[80px] flex flex-col w-[603px] max-w-full items-center"
        ref={formRef}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="input-container w-full">
          <Input>
            <Image src={UserOutlineIcon} alt="user-outline-icon" />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="input"
              tabIndex={2}
              {...register("email")}
            />
          </Input>
          {errors.email && <p className="error">{`${errors.email.message}`}</p>}
        </div>
        <div className="input-container w-full">
          <Input className="items-center">
            <Image src={LockIcon} alt="lock-icon" />
            <input
              type="password"
              placeholder="كلمة المرور"
              className="input"
              dir="rtl"
              tabIndex={3}
              {...register("password")}
            />
          </Input>
          {errors.password && (
            <p className="error">{`${errors.password.message}`}</p>
          )}
        </div>
        <Button
          variant="form-btn"
          className={`py-[10px] px-[50px] h-[57px] disabled:bg-sub-card`}
          type="submit"
        >
          <span className="text-main-color">تسجيل الدخول</span>
          <Image src={PlainIcon} alt="plain-icon" />
        </Button>
      </form>
      <span className="text-white text-2xl my-7">أو</span>
      <div className="w-[600px] bg-card min-h-[100px] rounded-3xl grid place-items-center">
        <Button
          className="bg-sub-card px-[40px] py-[15px]"
          onClick={handleSignInWithGoogle}
        >
          <span>تسجيل الدخول بإستخدام Google</span>
          <Image src={GoogleIcon} alt="google-icon" />
        </Button>
      </div>
      <p className="mt-[20px] text-white">
        ليس لديك حساب بالفعل ؟
        <Link href={"/register"} className="text-main-color">
          إنشئ حساب جديد
        </Link>
      </p>

      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeButton={false}
        closeOnClick={true}
      />
    </Container>
  );
}
