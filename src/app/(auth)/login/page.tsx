"use client";
import { Button, Container, Title, Input } from "@components";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  GoogleIcon,
  LockIcon,
  MailBoxIcon,
  PlainIcon,
  UserOutlineIcon,
} from "@icons";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@lib/loginSchema";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { animatePageOut } from "@utils/animations";

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
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/account");
    }
  }, [status, router]);

  const handleSignInWithGoogle = () => {
    signIn("google", { callbackUrl: "/account/settings" }).then((res) => {
      if (res?.ok) {
        router.replace("/account");
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
      if (!res?.error) {
        toast("تم تسجيل الدخول بنجاح", { type: "success" });
        setTimeout(() => {
          // router.replace(res?.url as string);
          animatePageOut(res?.url as string, router);
        }, 1000);
      } else {
        toast(res.error, { type: "error" });
      }
    });
  }

  function showPassword() {
    if (passwordInputRef.current) {
      console.log({ input: passwordInputRef.current });
      if (passwordInputRef.current.type === "text") {
        passwordInputRef.current.type = "password";
      } else {
        passwordInputRef.current.type = "text";
      }
    }
  }

  return (
    <Container className="flex flex-col items-center my-16">
      <Title>تسجيل الدخول</Title>
      <form
        className="mt-[80px] flex flex-col w-[603px] max-w-full items-center"
        ref={formRef}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="input-container w-full">
          <Input>
            <Image src={MailBoxIcon} alt="user-outline-icon" />
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
              ref={passwordInputRef}
            />
            <span
              className="text-primary cursor-pointer select-none"
              onClick={() => showPassword()}
            >
              إظهار كلمة المرور
            </span>
          </Input>
          {errors.password && (
            <p className="error">{`${errors.password.message}`}</p>
          )}
        </div>
        <Button variant="form-btn" size={"xl"} type="submit">
          <span className="text-primary ml-2 text-lg">تسجيل الدخول</span>
          <Image src={PlainIcon} alt="plain-icon" />
        </Button>
      </form>
      <div className="my-8 flex items-center gap-5 w-[603px] max-w-full">
        <hr className="flex-1 border-slate-200" />
        <span className="text-white text-2xl">أو</span>
        <hr className="flex-1 border-slate-200" />
      </div>
      <Button variant={"border"} size={"xxl"} onClick={handleSignInWithGoogle}>
        <span className="inline-block max-[450px]:hidden text-lg ml-3">
          تسجيل الدخول بإستخدام Google
        </span>
        <Image src={GoogleIcon} alt="google-icon" className="h-10" />
      </Button>
      <p className="mt-5 text-white">
        ليس لديك حساب ؟{" "}
        <Link href={"/register"} className="text-primary">
          إنشاء حساب جديد
        </Link>
      </p>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeButton={false}
        closeOnClick={true}
        rtl
      />
    </Container>
  );
}
