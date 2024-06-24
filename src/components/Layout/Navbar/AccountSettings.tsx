"use client";

import { signOut } from "next-auth/react";
import React, { useReducer, useState } from "react";
import { Button } from "@components";
import { DropdownMenu, DropdownOption } from "./DropdownMenu";
import {
  DashboardIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
  UserId,
} from "@icons";
import useUser from "@hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AccountSettings() {
  const { user } = useUser({ required: true });
  const router = useRouter();
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
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-white text-left text-sm hidden xs:!inline">
              {user?.name}
            </h3>
            <Image src={UserIcon} alt="user-icon" />
          </div>
        </Button>
        {showDropdown && (
          <DropdownMenu userName={user.name}>
            <DropdownOption
              icon={SettingsIcon}
              text="عرض الملف الشخصي"
              href={`/user/${user.name}`}
            />
            <DropdownOption
              icon={UserId}
              text="إعدادات الملف الشخصي"
              href="/account/settings"
            />
            {user.role === "admin" && (
              <DropdownOption
                icon={DashboardIcon}
                text="لوحة التحكم"
                href="/dashboard/users"
              />
            )}
            <DropdownOption
              icon={LogoutIcon}
              text="تسجيل الخروج"
              href="#"
              onClick={() => {
                router.push("/");
                signOut();
              }}
            />
          </DropdownMenu>
        )}
      </div>
    </>
  );
}
