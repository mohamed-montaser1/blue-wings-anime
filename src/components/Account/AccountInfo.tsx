"use client";
import Image from "next/image";
import { CameraIcon, UserOutlineIcon } from "@icons";
import { TRole } from "@lib/types";
import { FormEvent, useState } from "react";
import useUser from "@hooks/useUser";
import axios from "axios";
import Avatar from "@components/Avatar";

export default function AccountInfo() {
  const { user, avatar, setUserAvatar } = useUser({ required: true });
  const [showEditAvatar, setShowEditAvatar] = useState(false);

  const roles = {
    user: "مستخدم",
    editor: "محرر",
    artist: "فنان",
    admin: "مسؤول",
  };

  async function handleChangeImage(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const target = e?.target as HTMLInputElement;
    const img = target.files![0];
    const form = new FormData();
    form.append("image", img);
    const res = await axios.post<{ image: string }>("/api/uploads", form);
    const filename = res.data.image;
    setUserAvatar(filename);
  }

  return (
    <div className="personal-info">
      <div
        className="account-avatar relative w-48 aspect-square flex justify-center mx-auto mt-10 mb-4"
        onMouseOver={() => setShowEditAvatar(true)}
        onMouseOut={() => setShowEditAvatar(false)}
      >
        <div>
          <Avatar width={192} height={192} image={avatar as string} />
        </div>
        <div
          className={`absolute h-[195px] aspect-square top-0 rounded-full transition-all duration-500 ease-in-out ${
            showEditAvatar
              ? "bg-secondary bg-opacity-90 opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex items-center justify-center`}
        >
          <label>
            <input
              type="file"
              className="hidden"
              accept=".jpg, .jpeg, .png"
              onChange={handleChangeImage}
            />
            <Image
              src={CameraIcon}
              alt="camera-icon"
              className="w-14 cursor-pointer"
            />
          </label>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-white text-[30px]">
          {user?.name || user?.username}
        </h1>
        <p className="text-[#ccc] md:text-xl max-w-full text-ellipsis overflow-hidden">
          {user?.email}
        </p>
        <div className="role flex justify-center mt-4 gap-2">
          <Image
            src={UserOutlineIcon}
            alt="role-icon"
            className="text-primary"
          />
          <span className="text-white text-lg">
            {roles[user?.role as TRole]}
          </span>
        </div>
      </div>
    </div>
  );
}
