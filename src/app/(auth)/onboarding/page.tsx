"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { TRole } from "@/lib/types";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type TRoles = {
  [key in TRole]: string;
};

export default function OnBoarding() {
  const [role, setRole] = useState<TRole>("user");
  const { status, data, update } = useSession();
  const router = useRouter();
  const firstName = data?.user?.name?.split(" ")[0];
  const roles: TRoles = {
    user: "مستخدم",
    editor: "محرر",
    artist: "فنان",
    admin: "مسؤول",
  };

  useEffect(() => {
    console.log(data);
    // if (status === "unauthenticated") {
    //   return router.replace("/");
    // }
  }, []);

  return (
    <Container className="my-[100px] flex flex-col items-center">
      <h1 className="text-white text-4xl">مرحبا بك, {firstName}!</h1>
      <h2 className="text-[#ccc] text-2xl mt-3">
        هذه الخطوة الأخيره لإنهاء إنشاء حسابك
      </h2>
      <div className="mt-20 rounded-xl bg-card p-6 w-[600px] max-w-full">
        <h3 className="text-center text-white text-2xl mb-9">
          إختر رتبتك في الموقع
        </h3>
        <div className="bg-sub-card p-5 rounded-xl select-none">
          <h4 className="text-[#ccc] text-xl text-center">{roles[role]}</h4>
        </div>
        <div
          className={`list bg-sub-card mt-2 rounded-xl p-5 text-center transition-transform ease-out duration-300`}
        >
          <ul className="flex flex-col gap-2">
            {Object.keys(roles).map((roleKey, idx) => {
              const cRole = roles[roleKey as TRole];
              return (
                <li
                  key={idx}
                  className={`text-xl cursor-pointer select-none ${
                    roleKey === role ? "text-main-color" : "text-white"
                  }`}
                  onClick={() => setRole(roleKey as TRole)}
                >
                  {cRole}
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          variant="main"
          className="mx-auto mt-6"
          style={{ padding: "10px 60px" }}
        >
          إنهاء
        </Button>
      </div>
    </Container>
  );
}
