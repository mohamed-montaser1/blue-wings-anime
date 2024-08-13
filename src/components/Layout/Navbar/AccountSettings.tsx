"use client";

import { signOut } from "next-auth/react";
import React, { useReducer, useState } from "react";
import { Button } from "@components";
import { DropdownMenu, DropdownOption } from "./DropdownMenu";
import {
  DashboardIcon,
  Heart,
  LogoutIcon,
  NewIcon,
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
      <div className="w-fit">
        <Button
          className="flex flex-row-reverse gap-2 cursor-pointer md:bg-sub-card md:rounded-xl w-fit"
          onClick={handleToggleDropdown}
          size={"xl"}
        >
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-white text-left text-base hidden sm:!inline">
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
              href={`/user/${user.slug_name}`}
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
            {(user.role === "admin" || user.role === "artist") && (
              <DropdownOption
                icon={NewIcon}
                text="منشور جديد"
                href="/post/new"
              />
            )}
            <DropdownOption icon={Heart} text="أعمالك المفضلة" href="/favs" />
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
