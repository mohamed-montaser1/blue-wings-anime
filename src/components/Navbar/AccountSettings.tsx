"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Button, Avatar } from "@components";
import { DropdownMenu, DropdownOption } from "./DropdownMenu";
import { LogoutIcon, SettingsIcon } from "@icons";
import { usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { animatePageOut } from "@utils/animations";

export default function AccountSettings() {
  const router = useRouter();
  const pathname = usePathname();
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
          <div className="w-14">
            <Avatar width={50} height={50} image={avatar as string} />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-white text-left text-sm hidden xs:!inline">
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
              onClick={() => {
                if (pathname !== "/account") {
                  animatePageOut("/account", router);
                  setShowDropdown(false);
                }
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
