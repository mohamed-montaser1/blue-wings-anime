"use client";
import Image from "next/image";
import { CameraIcon, UserOutlineIcon } from "@icons";
import { TRole } from "@lib/types";
import { FormEvent, useState } from "react";
import useUser from "@hooks/useUser";
import axios from "axios";
import Avatar from "@/components/Ui/Avatar";

export const roles = {
  user: "مستخدم",
  editor: "محرر",
  artist: "فنان",
  admin: "مسؤول",
};

export default function AccountInfo() {
  const { user, avatar, setUserAvatar } = useUser({ required: true });

  async function handleChangeImage(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const target = e?.target as HTMLInputElement;
    const img = target.files![0];
    const form = new FormData();
    form.append("image", img);
    const res = await axios.post<{ image: string }>("/api/uploads/profiles-pictures", form);
    const filename = res.data.image;
    setUserAvatar(filename);
  }

  return (
    <div className="personal-info">
      <div className="account-avatar relative w-48 aspect-square flex justify-center mx-auto mt-10 mb-4">
        <Avatar width={192} height={192} image={avatar as string} />
      </div>
      <div className="text-center">
        <h1 className="text-white text-[30px]">{user?.name || user?.username}</h1>
        <p className="text-[#ccc] md:text-xl max-w-full text-ellipsis overflow-hidden">{user?.email}</p>
        <div className="role flex justify-center mt-4 gap-2">
          <Image src={UserOutlineIcon} alt="role-icon" className="text-primary" />
          <span className="text-white text-lg">{roles[user?.role as TRole]}</span>
        </div>
      </div>
    </div>
  );
}
