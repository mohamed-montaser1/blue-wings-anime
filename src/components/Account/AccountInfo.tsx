"use client";
import Image from "next/image";
import { UserOutlineIcon } from "@icons";
import { TRole } from "../../lib/types";
import { useEffect, useState } from "react";
import useUser from "@hooks/useUser";
import Avatar from "@/components/Ui/Avatar";
import DateController from "@/utils/date";

export const roles = {
  user: "مستخدم",
  editor: "محرر",
  artist: "فنان",
  admin: "مسؤول",
} as const;

export default function AccountInfo() {
  const { user, avatar } = useUser({ required: true });
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (!user?.joinDate) return;
    fromJoinDate();
  }, [user?.joinDate]);

  function fromJoinDate() {
    const dateController = new DateController(user.joinDate);
    setDate(dateController.format("DD MMM YYYY"));
  }
  return (
    <div className="personal-info">
      <div className="relative avatar-banner__container">
        <div className="profile-banner relative px-3 pt-5">
          <Image
            src={user?.cover || ""}
            width={"1000"}
            height={"400"}
            className="w-full h-64 object-cover rounded-lg"
            priority={false}
            alt="testing-banner"
          />
        </div>
        <div className="flex flex-col xs:flex-row items-center xs:items-start xs:gap-5">
          <div className="w-[200px] aspect-square bg-slate-500 rounded-full p-1 -translate-y-1/4 md:mr-7 border border-slate-900">
            <Avatar size={200} image={avatar} className="w-full h-full" />
          </div>
          <div className="xs:mt-5 -translate-y-1/4 xs:translate-y-0 flex items-center xs:items-start flex-col md:block">
            <h1 className="text-slate-100 text-[30px]">{user?.name}</h1>
            <p className="text-slate-400 md:text-xl max-w-full text-ellipsis overflow-hidden">
              عضو منذ {date}
            </p>
            <div className="role flex mt-4 gap-2">
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
      </div>
    </div>
  );
}
