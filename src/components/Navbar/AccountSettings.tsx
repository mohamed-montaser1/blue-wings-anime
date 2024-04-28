"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@/components";
import Image from "next/image";
import { DropdownMenu, DropdownOption } from "./DropdownMenu";
import { LogoutIcon, SettingsIcon } from "@/../public/icons";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

export default function AccountSettings() {
  const router = useRouter();
  const { user, avatar } = useUser({ required: true });
  const [showDropdown, setShowDropdown] = useState(false);

  function handleToggleDropdown() {
    setShowDropdown((prev) => !prev);
  }

  return (
    <>
      <div className="relative">
        <Button
          className="flex flex-row-reverse gap-2 cursor-pointer md:bg-sub-card !p-1 md:!p-4 md:rounded-xl"
          onClick={handleToggleDropdown}
        >
          <Image
            src={avatar as string}
            width={"50"}
            height={"40"}
            alt="user-icon"
            className="rounded-2xl w-10 aspect-square md:h-full md:w-[50px]"
          />

          <div className="flex flex-col justify-center">
            <h3 className="text-white text-left text-sm md:text-[16px]">
              <span className="hidden xs:inline">{user?.name}</span>
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
              onClick={() => {
                router.push("/account");
                setShowDropdown(false);
              }}
            />
            <DropdownOption
              icon={LogoutIcon}
              text="تسجيل الخروج"
              onClick={() => signOut()}
            />
          </DropdownMenu>
        )}
      </div>
    </>
  );
}
