"use client";
import { Button, Container, Title, Input } from "@/components";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  GoogleIcon,
  LockIcon,
  PlainIcon,
  UserOutlineIcon,
} from "@/../public/icons";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/lib/loginSchema";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
  }, [status]);

  const handleSignInWithGoogle = () => {
    signIn("google").then((res) => {
      console.log("#".repeat(30), "RESPONSE", "#".repeat(30));
      if (res?.ok) {
        router.replace("/");
      } else {
        toast(res?.error, { type: "error" });
      }
    });
  };

  async function handleSignIn(data: FormValues) {
    signIn("credentials", {
      ...getValues(),
      redirect: false,
      callbackUrl: "/onboarding/verify-email",
    }).then((res) => {
      console.log(res);
      if (!res?.error) {
        toast("تم تسجيل الدخول بنجاح", { type: "success" });
        setTimeout(() => {
          router.replace(res?.url as string);
        }, 1000);
      } else {
        toast(res.error, { type: "error" });
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
