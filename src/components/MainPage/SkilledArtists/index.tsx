import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Container,
  SectionHeader,
  SectionSwiper,
} from "../..";

import Slide from "../../Swiper/SectionSwiper/Slide";
import { ClockIcon } from "@icons/index";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { TUser } from "@/models/User";
import { CarouselItem } from "@/components/Ui/carousel";
import DateController from "@/utils/date";

export default function MostSkilledArtists() {
  const [data, setData] = useState<TUser[]>([]);
  useEffect(() => {
    axios
      .get("/api/artists")
      .then((v) => {
        console.log({ data: v });
        setData(v.data.artists);
      })
      .catch((e) => console.log({ e }));
  }, []);
  return (
    <Container className="lg:px-0 mt-20">
      <SectionHeader title="أمهر الرسامين" />
      <SectionSwiper>
        {data.map((artist, i) => (
          <CarouselItem className="basis-1/4" key={i}>
            <Slide
              title="فنان"
              image={artist.cover}
              avatar={
                <Avatar size="lg" className="absolute bottom-2 right-2">
                  <AvatarImage
                    src={artist.image}
                    alt={`artist-image-${artist.name}`}
                    size="lg"
                  />
                  <AvatarFallback>صورة فنان</AvatarFallback>
                </Avatar>
              }
            >
              <div className="details w-full mt-3">
                <h3 className="text-white text-right">
                  الفنان : {artist.name}
                </h3>
                <p className="text-slate-50 mb-2">
                  إيميل الفنان: {artist.email}
                </p>
                <Link href={`/user/${artist.slug_name}`}>
                  <Button
                    variant="main"
                    className="!py-2 mx-auto !my-4 min-h-fit"
                  >
                    زيارة الملف الشخصي
                  </Button>
                </Link>
                <div className="flex justify-between items-center mt-4 mb-5 flex-col lg:flex-row gap-2">
                  <span className="text-gray-300">عدد المنشورات: {artist.posts.length}</span>
                  <div className="creation-time flex gap-2">
                    <Image src={ClockIcon} alt="clock icon" />
                    <span className="text-slate-100 text-sm" dir="rtl">
                      {new DateController(artist.createdAt as number).format("DD MMM YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </Slide>
          </CarouselItem>
        ))}
      </SectionSwiper>
    </Container>
  );
}
