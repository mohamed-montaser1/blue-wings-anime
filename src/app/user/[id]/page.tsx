"use client";
import { Avatar, Container } from "@components";
import { roles } from "@components/Account/AccountInfo";
import useFetch from "@hooks/useFetch";
import { TRole } from "@lib/types";
import { TUser } from "@models/User";
import { UserOutlineIcon } from "@icons/index";
import Image from "next/image";
import { useEffect, useState } from "react";
import DateController from "@/utils/date";

type TProps = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: TProps) {
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    useFetch<{}, { user: TUser; error?: string }>(
      `/api/user/${id}`,
      "GET",
      {}
    ).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
        return;
      }
      console.log({ res });
      setUser(res.data.user);
    });
  }, []);

  if (error) {
    return (
      <h1 className="text-slate-200 text-4xl text-center mt-10">{error}</h1>
    );
  }

  return (
    <Container className="personal-info">
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
        <div className="flex gap-5">
          <div className="w-[200px] aspect-square bg-slate-500 rounded-full p-1 -translate-y-1/4 mr-7 border border-slate-900">
            <Avatar size={200} image={user?.image || ""} />
          </div>
          <div className="mt-5">
            <h1 className="text-slate-100 text-[30px]">{user?.name}</h1>
            <p className="text-slate-400 md:text-xl max-w-full text-ellipsis overflow-hidden">
              عضو {new DateController(user?.createdAt as number).fromNow()}
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
    </Container>
  );
}
