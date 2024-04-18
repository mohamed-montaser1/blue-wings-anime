import React, { useEffect, useState } from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Container from "../Container";
import Menu from "./Menu";
import Button from "../Button";
import { MenuIcon, UserIcon } from "@/public/icons";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [activeMobileMenu, setActiveMobileMenu] = useState<boolean>(false);
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
        <div className="btn-container flex gap-[10px]">
          <Button variant="main">
            <span className="max-[466px]:hidden">تسجيل الدخول</span>
            <Image src={UserIcon} alt="user-icon" />
          </Button>
          <Button
            className="hidden max-[1199px]:block"
            onClick={handleActiveMenu}
          >
            <Image src={MenuIcon} alt="menu-icon" />
          </Button>
        </div>
        <MobileMenu state={activeMobileMenu} />
      </Container>
    </nav>
  );
}
