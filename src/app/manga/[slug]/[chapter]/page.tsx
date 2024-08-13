"use client";
import { Container } from "@/components";
import { Breadcrumbs, Button, Input, Title } from "@/components/Ui";
import { Avatar, AvatarFallback, AvatarImage } from "@components/Ui/Avatar";
import useFetch from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";
import { TChapter } from "@/models/Chapter";
import { TComment } from "@/models/Comment";
import DateController from "@/utils/date";
import { PlainIcon } from "@icons/index";
import axios from "axios";
import { nanoid } from "nanoid";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Chapter() {
  const pathname = usePathname();
  const { user } = useUser({ required: true });
  const [chapter, setChapter] = useState<TChapter>();
  const [comments, setComments] = useState<TComment[]>([]);
  const [comment, setComment] = useState("");

  const dropdownRef = useRef<HTMLSelectElement>(null);
  const slug = usePathname().split("/").at(-2) as string;
  const chapterNumber = usePathname().split("/").at(-1) as string;
  console.log({ slug, chapterNumber });
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `/api/manga/${slug}/chapters/${chapterNumber}`
      );
      setChapter(res.data.data);
      setComments(res.data.data.comments.reverse());
    })();
  }, []);

  async function handleAddComment() {
    if (comment.trim().length < 1) return;

    const form = new FormData();
    form.set("author", user.email);
    form.set("content", comment);

    const res = await axios.post(
      `/api/manga/${slug}/chapters/${chapterNumber}/comments`,
      form
    );
    console.log({ res });
    setComments(res.data.comments.reverse());
    console.log({ comments: res.data.comments.reverse() });
    setComment("");
  }

  return (
    <Container className="mt-14">
      <Breadcrumbs
        url={["الرئيسية", "قائمة المانجا", slug, chapterNumber]}
        key={nanoid()}
        className="mb-5"
      />
      <h1 className="text-slate-200 text-3xl text-center"></h1>
      <Title className="mx-auto mt-14">
        <span className="mx-2">الفصل رقم</span>
        {chapterNumber}
        <span className="mx-2">من</span>
        {slug}
      </Title>
      <div className="controls flex justify-between items-center">
        <Button
          variant="main"
          className="p-4 rounded-lg !min-w-fit"
          onClick={() => {
            dropdownRef.current?.focus();
          }}
        >
          <select
            className="border-none outline-none text-slate-200 bg-transparent !min-w-36 cursor-pointer"
            ref={dropdownRef}
            onChange={(e) => {
              let newUrl: string[] | string = pathname.split("/");
              newUrl.pop();
              newUrl.push(e.target.value);
              newUrl = newUrl.join("/");
              redirect(newUrl);
            }}
            value={chapter?.number}
          >
            <option disabled className="bg-sub-card text-slate-500">
              إختر الفصل
            </option>
            {Array.from({ length: 20 }).map((_, i) => {
              const idx = i + 1;
              return (
                <option
                  value={idx}
                  key={idx}
                  className="bg-card text-slate-300"
                >
                  الفصل {idx}
                </option>
              );
            })}
          </select>
        </Button>
        <div className="flex gap-2">
          <Button variant="main" className="!p-4">
            السابق
          </Button>
          <Button variant="main" className="!p-4">
            التالي
          </Button>
        </div>
      </div>
      <div className={`w-full relative mt-16`}>
        {chapter?.images.map((url, idx) => (
          <>
            <img
              src={url}
              alt={`${nanoid()}-chapterImage`}
              className="w-full"
              key={idx}
            />
          </>
        ))}
      </div>
      <div className="comments block">
        {user && (
          <div className="create-comment mt-5 flex items-center gap-4">
            <Image
              src={user?.image}
              alt={`user-image-${nanoid()}`}
              width={40}
              height={40}
              className="rounded-full !w-10 !h-10"
            />
            <Input className="bg-sub-card">
              <input
                type="text"
                placeholder="أكتب تعليق علي هذا العمل"
                className="w-full h-full bg-sub-card border-none outline-none text-slate-300"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyUp={(e) => (e.key === "Enter" ? handleAddComment() : null)}
              />
              <button onClick={handleAddComment}>
                <Image src={PlainIcon} alt="send" />
              </button>
            </Input>
          </div>
        )}
        <div className="mt-5">
          {comments.map((comment, i) => (
            <div key={i} className="flex gap-2 my-2 bg-sub-card rounded-lg p-3">
              <Avatar size="lg">
                <AvatarImage src={comment.author?.image} size="lg" />
                <AvatarFallback>{comment.author.name}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <span className="text-slate-200">{comment.author?.name}</span>
                  <span className="text-slate-300 text-sm">
                    {new DateController(comment.createdAt).fromNow()}
                  </span>
                </div>
                <p className="text-slate-400 mt-2">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
