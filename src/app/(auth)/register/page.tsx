"use client";
import { Button, Container, Input, Title } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GoogleIcon,
  LockIcon,
  MailBoxIcon,
  PlainIcon,
  UserOutlineIcon,
} from "@icons";
import registerSchema from "@lib/registerSchema";
import { TRegisterError } from "@lib/types";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });
  const passwordRefOne = useRef<HTMLInputElement>();
  const passwordRefTwo = useRef<HTMLInputElement>();

  let { ref: passwordOneRef, ...passwordOneRegister } = register("password");
  let { ref: passwordTwoRef, ...passwordTwoRegister } =
    register("confirmPassword");

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/account/settings" });
  };
  async function handleRegularSignUp(_: FormValues) {
    try {
      const res = await axios.post("/api/auth/register", getValues());
      console.log({ res });
      toast(res.data.message, { type: "success" });
      signIn("credentials", {
        email: getValues().email,
        password: getValues().password,
        callbackUrl: "/onboarding/verify-email",
      });
    } catch (e: unknown) {
      let error = e as unknown as TRegisterError;
      const errorMsg = error.response.data.message;
      toast(errorMsg, { type: "error" });
    }
  }

  function showPassword(n: number) {
    const input = n === 1 ? passwordRefOne.current : passwordRefTwo.current;
    input!.type = input!.type === "text" ? "password" : "text";
  }

  function handleOnInvalid(
    errors: FieldErrors<FormValues>,
    event: React.BaseSyntheticEvent
  ) {
    console.log({ errors });
  }

  return (
    <Container className="flex flex-col items-center my-[100px]">
      <Title>إنشاء حساب</Title>
      <form
        className="mt-[80px] flex flex-col w-[603px] max-w-full items-center"
        // @ts-ignore
        onSubmit={handleSubmit(handleRegularSignUp, handleOnInvalid)}
        ref={formRef}
      >
        <div className="input-container w-full">
          <Input>
            <Image src={UserOutlineIcon} alt="user-outline-icon" />
            <input
              type="text"
              placeholder="إسم المستخدم"
              className="input"
              tabIndex={1}
              {...register("username")}
            />
          </Input>
          {errors.username && (
            <p className="error">{`${errors.username.message}`}</p>
          )}
        </div>
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
              ref={(e) => {
                passwordOneRef(e);
                passwordRefOne!.current = e as HTMLInputElement;
              }}
              {...passwordOneRegister}
            />
            <span
              className="text-primary cursor-pointer select-none"
              onClick={() => showPassword(1)}
            >
              إظهار كلمة المرور
            </span>
          </Input>
          {errors.password && (
            <p className="error">{`${errors.password.message}`}</p>
          )}
        </div>
        <div className="input-container w-full">
          <Input className="items-center">
            <Image src={LockIcon} alt="lock-icon" />
            <input
              type="password"
              placeholder="تأكيد كلمة المرور"
              className="input"
              dir="rtl"
              tabIndex={3}
              ref={(e) => {
                passwordTwoRef(e);
                passwordRefTwo!.current = e as HTMLInputElement;
              }}
              {...passwordTwoRegister}
            />
            <span
              className="text-primary cursor-pointer select-none"
              onClick={() => showPassword(2)}
            >
              إظهار كلمة المرور
            </span>
          </Input>
          {errors.confirmPassword && (
            <p className="error">{`${errors.confirmPassword.message}`}</p>
          )}
        </div>{" "}
        <Button variant="form-btn" size={"xl"} type="submit">
          <span className="text-primary ml-2 text-lg">إنشاء حساب جديد</span>
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
          إنشاء حساب بإستخدام Google
        </span>
        <Image src={GoogleIcon} alt="google-icon" className="h-10" />
      </Button>
      <p className="mt-[20px] text-white">
        لديك حساب بالفعل ؟{" "}
        <Link href={"/login"} className="text-primary">
          تسجيل الدخول
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
