"use client";
import React, { useEffect, useState } from "react";
import { Logo } from "@/../public/icons";
import Image from "next/image";
import Container from "../Container";
import Menu from "./Menu";
import Button from "../Button";
import { MenuIcon, UserIcon } from "@/../public/icons";
import MobileMenu from "./MobileMenu";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { status, data } = useSession();
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const isAuth = status === "authenticated";
  const router = useRouter();

  function handleActiveMenu() {
    setActiveMobileMenu((prev) => !prev);
  }
  return (
    <nav className="bg-card h-[120px] flex items-center">
      <Container className="flex justify-between items-center relative">
        <div className="flex gap-[20px] items-center">
          <Image
            src={Logo}
            width={190}
            height={70}
            alt="Logo"
            className="h-[90px]"
          />
          <Menu />
        </div>
        <div className="btn-container flex">
          {!isAuth ? (
            <Button variant="main" onClick={() => router.push("/login")}>
              <span className="max-[466px]:hidden">تسجيل الدخول</span>
              <Image src={UserIcon} alt="user-icon" />
            </Button>
          ) : (
            <Link
              href={"/account"}
              className="flex flex-row-reverse gap-2 cursor-pointer md:bg-sub-card md:p-4 md:rounded-xl"
            >
              <Image
                src={data.user!.image ?? ""}
                width={"50"}
                height={"40"}
                alt="user-icon"
                className="rounded-2xl w-10 aspect-square md:h-full md:w-[50px]"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-white text-left text-[14px] md:text-[16px]">
                  {data?.user?.name}
                </h3>
                <p className="text-[#ccc] text-[14px] md:block hidden text-left">
                  {data?.user?.email}
                </p>
              </div>
            </Link>
          )}
          <Button
            className="hidden max-[1199px]:block p-0"
            onClick={handleActiveMenu}
          >
            <Image src={MenuIcon} alt="menu-icon" className="min-w-6" />
          </Button>
        </div>
        <MobileMenu state={activeMobileMenu} />
      </Container>
    </nav>
  );
}
