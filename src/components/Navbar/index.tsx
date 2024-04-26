"use client";
import React, { useState } from "react";
import { Logo, MenuIcon, UserIcon } from "@/../public/icons";
import Image from "next/image";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { Button, Container } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AccountSettings from "./AccountSettings";

export default function Navbar() {
  const { status } = useSession();
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
            <AccountSettings />
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
