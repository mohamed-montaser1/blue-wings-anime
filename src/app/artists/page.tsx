"use client";
import { Button, Container, Title } from "@components";
import { Avatar, AvatarFallback, AvatarImage } from "@components/Ui/Avatar";
import { TUser } from "@models/User";
import DateController from "@utils/date";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Artists() {
  const [data, setData] = useState<TUser[]>([]);

  useEffect(() => {
    axios
      .get("/api/artists")
      .then((res) => {
        setData(res.data.artists);
      })
      .catch((err) => {
        toast("حدث مشكلة أثناء جلب بيانات الرسامين عاود المحاولة لاحقا", {
          type: "error",
          position: "bottom-center",
        });
        console.log({ errorWhileFetchingData: err });
      });
  }, []);

  return (
    <Container className="py-10">
      <Title className="mx-auto mb-20">أمهر الرسامين</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((user, i) => {
          return (
            <>
              <div
                className="card w-full min-h-52 bg-card pb-3 rounded-lg"
                key={i}
              >
                <div className="max-w-full h-56 relative">
                  <Image
                    src={user.cover}
                    alt="artist-cover"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <Avatar size="lg">
                    <AvatarImage src={user.image} size="lg" />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="card-body px-4">
                  <h2 className="text-slate-200 mt-3 text-xl">{user.name}</h2>
                  <p className="text-slate-400 max-w-full text-ellipsis overflow-hidden">
                    عضو {new DateController(user.createdAt).fromNow()}
                  </p>
                  <p className="text-slate-200 text-sm mt-1">
                    {user.bio.substr(0, 100)}
                    {user.bio.length > 100 ? "..." : ""}
                  </p>
                  <Link href={`/user/${user.slug_name}`}>
                    <Button variant="main" className="text-base mt-4">
                      زيارة الملف الشخصي
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {data.length < 1 && (
        <h1 className="text-slate-200 text-3xl text-center">
          لا يوجد فنانين حتى الآن !
        </h1>
      )}
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeButton={false}
        closeOnClick={true}
        rtl
      />
    </Container>
  );
}
