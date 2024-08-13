"use client";
import React, { useEffect, useState } from "react";
import { Logo, MenuIcon, UserIcon } from "@public/icons";
import Image from "next/image";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { Button, Container } from "@components";
import { usePathname, useRouter } from "next/navigation";
import AccountSettings from "./AccountSettings";
import useUser from "@hooks/useUser";
import { animatePageOut } from "@utils/animations";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useUser({ required: false });
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  function handleActiveMenu() {
    setActiveMobileMenu((prev) => !prev);
  }

  return (
    <nav className="bg-card shadow-2xl h-[120px] flex items-center fixed right-0 left-0 top-0 z-[10000]">
      <Container className="flex justify-between items-center relative">
        <div className="flex items-center">
          <Link
            href={"/"}
            onClick={() => {
              if (pathname !== "/") animatePageOut("/", router);
            }}
          >
            <Image
              src={Logo}
              width={190}
              height={90}
              alt="Logo"
              className="h-[90px] aspect-video cursor-pointer ml-4"
            />
          </Link>
          <Menu />
        </div>
        <div className="btn-container flex !w-fit">
          {status === "authenticated" ? (
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
            className="2xl:!hidden md:mr-3 !p-3 !min-w-0"
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
