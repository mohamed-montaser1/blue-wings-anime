"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components";
import Image from "next/image";
import { DropdownMenu, DropdownOption } from "./DropdownMenu";
import { LogoutIcon, SettingsIcon } from "@/../public/icons";
import { useRouter } from "next/navigation";
import defaultAvatar from "@/../public/uploads/default-profile.jpeg";

export default function AccountSettings() {
  const { data } = useSession();
  const router = useRouter();
  const user = data?.user;
  const [showDropdown, setShowDropdown] = useState(false);
  const avatar = user?.image.startsWith("https") ? user.image : defaultAvatar;

  function handleToggleDropdown() {
    setShowDropdown((prev) => !prev);
  }

  return (
    <div className="relative">
      <Button
        className="flex flex-row-reverse gap-2 cursor-pointer md:bg-sub-card md:p-4 md:rounded-xl"
        onClick={handleToggleDropdown}
      >
        <Image
          src={avatar}
          width={"50"}
          height={"40"}
          alt="user-icon"
          className="rounded-2xl w-10 aspect-square md:h-full md:w-[50px]"
        />
        <div className="flex flex-col justify-center">
          <h3 className="text-white text-left text-[14px] md:text-[16px]">
            {user?.name}
          </h3>
          <p className="text-[#ccc] text-[14px] md:block hidden text-left">
            {user?.email}
          </p>
        </div>
      </Button>
      {showDropdown && (
        <DropdownMenu>
          <DropdownOption
            icon={SettingsIcon}
            text="عرض الملف الشخصي"
            onClick={() => router.push("/account")}
          />
          <DropdownOption
            icon={LogoutIcon}
            text="تسجيل الخروج"
            onClick={() => signOut()}
          />
        </DropdownMenu>
      )}
    </div>
  );
}
