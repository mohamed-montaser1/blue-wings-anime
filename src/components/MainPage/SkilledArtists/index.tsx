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
import { TPost } from "@/models/Post";

export default function MostSkilledArtists() {
  const [data, setData] = useState<TUser[]>([]);
  const [posts, setPosts] = useState<TPost[]>([]);
  useEffect(() => {
    axios
      .get("/api/artists")
      .then((v) => {
        setData(v.data.artists);
      })
      .catch((e) => console.log({ e }));
  }, []);
  useEffect(() => {
    async function getLastPosts() {
      const response = await axios.get("/api/posts/artists");
      const posts = response.data.posts;
      setPosts(posts);
    }
    getLastPosts();
  }, []);
  return (
    <Container className="lg:px-0 mt-20">
      <SectionHeader title="أمهر الرسامين" />
      <SectionSwiper>
        {posts.map((post, i) => (
          <CarouselItem className="basis-1/4" key={i}>
            <Slide
              title="منشور"
              image={post.images[0]}
              avatar={
                <Avatar size="lg" className="absolute bottom-2 right-2">
                  <AvatarImage
                    src={post.author.image}
                    alt={`artist-image-${post.author.name}`}
                    size="lg"
                  />
                  <AvatarFallback>صورة فنان</AvatarFallback>
                </Avatar>
              }
            >
              <div className="details w-full mt-3">
                <h3 className="text-slate-300 text-right text-lg">
                  {post.author.role === "admin" ? "المسؤول" : "الفنان"} : {post.author.name}
                </h3>
                <p className="text-slate-200 mb-4">
                  {post.text.slice(0, 201)}
                  {post.text.length > 200 && "..."}
                </p>
                <div className="flex justify-between items-center mt-4 mb-5 flex-col lg:flex-row gap-2">
                  <div className="creation-time flex gap-2">
                    <Image src={ClockIcon} alt="clock icon" />
                    <span className="text-slate-100 text-sm" dir="rtl">
                      {new DateController(post.createdAt as number).format(
                        "DD MMM YYYY"
                      )}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/user/${post.author.slug_name}`}
                  className="flex justify-center"
                >
                  <Button variant={"main"} size={"default"}>
                    زيارة الملف الشخصي
                  </Button>
                </Link>
              </div>
            </Slide>
          </CarouselItem>
        ))}
      </SectionSwiper>
    </Container>
  );
}
