"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Logo, MenuIcon, UserIcon } from "@/../public/icons";
import Image from "next/image";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { Button, Container } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import AccountSettings from "./AccountSettings";
import useUser from "@/hooks/useUser";
import Loading from "@/app/loading";
import { TUseUserReturn } from "@/lib/types";
import { animatePageOut } from "@/utils/animations";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useUser({ required: false });
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [isAuth, setIsAuth] = useState<TUseUserReturn["status"]>();

  useEffect(() => {
    setIsAuth(status);
  }, [status]);

  function handleActiveMenu() {
    setActiveMobileMenu((prev) => !prev);
  }
  return (
    <nav className="bg-card shadow-2xl h-[120px] flex items-center fixed right-0 left-0 top-0 z-[10000]">
      <Container className="flex justify-between items-center relative">
        <div className="flex items-center">
          <Image
            src={Logo}
            width={190}
            height={70}
            alt="Logo"
            className="h-[90px] aspect-video cursor-pointer"
            onClick={() => {
              if (pathname !== "/") animatePageOut("/", router);
            }}
          />
          <Menu />
        </div>
        <div className="btn-container flex">
          {isAuth === "authenticated" ? (
            <AccountSettings />
          ) : (
            <Button
              variant="main"
              onClick={() =>
                pathname !== "/login" ? animatePageOut("/login", router) : null
              }
            >
              <span className="max-[640px]:!hidden">تسجيل الدخول</span>
              <Image src={UserIcon} alt="user-icon" />
            </Button>
          )}
          <Button
            className="xl:hidden md:mr-3 !p-3 !min-w-0"
            onClick={handleActiveMenu}
          >
            <Image src={MenuIcon} alt="menu-icon" className="min-w-6" />
          </Button>
        </div>
        <MobileMenu active={activeMobileMenu} />
      </Container>
    </nav>
  );
}
