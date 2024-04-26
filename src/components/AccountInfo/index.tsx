"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultAvatar from "@/../public/uploads/default-profile.jpeg";
import { CameraIcon, UserOutlineIcon } from "@/../public/icons";
import { TRole } from "@/lib/types";
import { useState } from "react";

export default function AccountInfo() {
  const { data } = useSession();
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const user = data?.user;
  const avatar = user?.image.startsWith("https") ? user.image : defaultAvatar;
  const roles = {
    user: "مستخدم",
    editor: "محرر",
    artist: "فنان",
    admin: "مسؤول",
  };
  return (
    <div className="personal-info">
      <div
        className="avatar relative w-48 aspect-square flex justify-center mx-auto mt-10 mb-4"
        onMouseOver={() => setShowEditAvatar(true)}
        onMouseOut={() => setShowEditAvatar(false)}
      >
        <Image
          src={avatar}
          alt="avatar"
          width={192}
          height={192}
          className="rounded-full mx-auto w-full h-full"
        />
        <div
          className={`absolute h-[195px] aspect-square top-0 rounded-full transition-all duration-500 ease-in-out ${
            showEditAvatar
              ? "bg-card bg-opacity-90 opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex items-center justify-center`}
        >
          <Image
            src={CameraIcon}
            alt="camera-icon"
            className="w-14 cursor-pointer"
          />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-white text-[30px]">
          {user?.name || user?.username}
        </h1>
        <p className="text-[#ccc] text-xl">{user?.email}</p>
        <div className="role flex justify-center mt-4 gap-2">
          <Image
            src={UserOutlineIcon}
            alt="role-icon"
            className="text-main-color"
          />
          <span className="text-white text-lg">
            {roles[user?.role as TRole]}
          </span>
        </div>
      </div>
    </div>
  );
}
