"use client";
import { Button, Container, Title, Input } from "@/components";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  GoogleIcon,
  LockIcon,
  PlainIcon,
  UserOutlineIcon,
} from "@/../public/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "@/lib/registerSchema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import { TRegisterError } from "@/lib/types";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
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
  const [userRole, setUserRole] = useState("user");

  let { ref: passwordOneRef, ...passwordOneRegister } = register("password");
  let { ref: passwordTwoRef, ...passwordTwoRegister } =
    register("confirmPassword");

  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    // signOut();
    if (status === "authenticated") {
      router.push("/");
    }
  }, []);

  const handleSignInWithGoogle = async () => {
    const res = await signIn("google", { callbackUrl: "/onboarding/role" });
    console.log(res);
  };
  async function handleRegularSignUp(_: FormValues) {
    try {
      const res = await axios.post("/api/auth/register", {
        ...getValues(),
        role: userRole,
      });
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

  return (
    <Container className="flex flex-col items-center my-[100px]">
      <Title lineSize={"medium"}>إنشاء حساب</Title>
      <form
        className="mt-[80px] flex flex-col w-[603px] max-w-full items-center"
        onSubmit={handleSubmit(handleRegularSignUp)}
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
              ref={(e) => {
                passwordOneRef(e);
                passwordRefOne!.current = e as HTMLInputElement;
              }}
              {...passwordOneRegister}
            />
            <span
              className="text-main-color cursor-pointer"
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
              className="text-main-color cursor-pointer"
              onClick={() => showPassword(2)}
            >
              إظهار كلمة المرور
            </span>
          </Input>
          {errors.confirmPassword && (
            <p className="error">{`${errors.confirmPassword.message}`}</p>
          )}
        </div>{" "}
        <div className="input-container w-full">
          <Input className="items-center py-0">
            <select
              className="input"
              dir="rtl"
              tabIndex={4}
              className="bg-card w-full text-white py-[10px] outline-none"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="user" defaultChecked>
                مستخدم
              </option>
              <option value="editor" defaultChecked>
                محرر
              </option>
              <option value="artist" defaultChecked>
                فنان
              </option>
            </select>
          </Input>
        </div>
        <Button
          variant="form-btn"
          className={`py-[10px] px-[50px] h-[57px] disabled:bg-sub-card`}
          aria-disabled={isSubmitting}
        >
          <span className="text-main-color">إنشاء حساب جديد</span>
          <Image src={PlainIcon} alt="plain-icon" />
        </Button>
      </form>
      <span className="text-white text-2xl my-7">أو</span>
      <div className="w-[600px] bg-card min-h-[100px] rounded-3xl flex items-center justify-center">
        <Button
          className="bg-sub-card px-[40px] py-[15px]"
          onClick={handleSignInWithGoogle}
        >
          <span>تسجيل الدخول بإستخدام Google</span>
          <Image src={GoogleIcon} alt="google-icon" />
        </Button>
      </div>
      <p className="mt-[20px] text-white">
        لديك حساب بالفعل ؟
        <Link href={"/login"} className="text-main-color">
          تسجيل الدخول
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
