import useUser from "@hooks/useUser";
import { Button, Input } from "../Ui";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaComment, FaShare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { type TPost as TPost } from "@/models/Post";
import DateController from "@/utils/date";
import { Heart, PlainIcon, PostHeart } from "@icons/index";
import { nanoid } from "nanoid";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";
import axios from "axios";

import { Avatar, AvatarImage, AvatarFallback } from "../Ui/Avatar";

type PostedPosts = { posts: TPost[] };

export function Posts({ posts }: PostedPosts) {
  return (
    <>
      {posts.map((post, i) => (
        <Post post={post} i={i} key={i} />
      ))}
    </>
  );
}

type PostProps = {
  post: TPost;
  i: number;
};

function Post({ post: p, i }: PostProps) {
  const { user } = useUser({ required: false });
  const [post, setPost] = useState(p);
  const [comments, setComments] = useState(p.comments.slice().reverse());
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const id = String(post._id);
  const path = location.href + "#" + id;

  useEffect(() => {
    const timer = setInterval(() => {
      setPost(post);
    }, 1000);

    return () => clearInterval(timer);
  });

  async function handleAddOneLike() {
    const form = new FormData();
    form.set("userId", user._id);
    const res = await axios.post(`/api/posts/info/${post._id}/like`, form);
    if (res.data.error) {
      toast.error(res.data.error);
    }
    setPost(res.data.data);
    console.log("#".repeat(30));
    console.log({ res });
    console.log("#".repeat(30));
  }

  async function handleAddComment() {
    if (comment.trim().length < 1) return;
    const form = new FormData();
    form.set("userId", user._id);
    form.set("content", comment);
    const res = await axios.post(`/api/posts/info/${post._id}/comment`, form);
    if (res.data.error) {
      toast.error(res.data.error);
      return;
    }

    setPost(res.data.data);
    setComments(res.data.data.comments.reverse());
    setComment("");
  }

  function handleToggleComments() {
    setShowComments((prev) => !prev);
  }

  return (
    <div key={i} className="bg-card my-4 p-3 rounded-lg" id={id}>
      <div className="user-info flex items-center justify-between">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={post.author?.image} alt={nanoid()} size="lg" />
            <AvatarFallback>صورة المستخدم</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="text-slate-200 text-lg">{post.author?.name}</h3>
            <span className="text-slate-400 text-sm">
              {new DateController(post.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
      <div className="content mt-4 flex flex-col gap-2">
        <p className="text-slate-300">{post.text}</p>
        <div
          className={`images grid grid-cols-1 md:grid-cols-2 gap-1 max-w-full`}
        >
          {post.images.map((image, i) => {
            if (i >= 4) return;
            return (
              <div
                className={`relative ${
                  post.images.length === 1 ||
                  (post.images.length === 3 && i === 2)
                    ? "col-span-2"
                    : ""
                }`}
                key={i}
              >
                <Image
                  src={image}
                  alt={`${i + 1}th image in post`}
                  key={i}
                  width={300}
                  height={300}
                  className={`w-full h-full object-cover`}
                />
                {i === 3 && post.images.length > 4 && (
                  <div className="bg-slate-900 w-full h-full absolute z-20 top-0 opacity-75 text-slate-100 text-4xl flex items-center justify-center">
                    +{post.images.length - 4}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="post-info flex items-center justify-between border-b-2 border-b-sub-card py-2">
        <div className="reacts flex gap-1 items-center">
          <Image src={PostHeart} alt="post-heart" />
          <span className="text-slate-200">{post.likes.length}</span>
        </div>
        <span className="text-slate-200">{post.comments.length} تعليق</span>
      </div>
      {user && (
        <div className="interactions mt-3 pb-3 border-b-2 border-sub-card grid grid-cols-3 gap-2">
          <Button
            variant="light-form-btn"
            className="flex-grow"
            style={{ maxWidth: "unset" }}
            onClick={handleAddOneLike}
          >
            <Image src={Heart} alt="heart" />
          </Button>
          <Button
            variant="light-form-btn"
            className="flex-grow"
            style={{ maxWidth: "unset" }}
            onClick={handleToggleComments}
          >
            <FaComment color="#9128FF" />
          </Button>
          <div className="relative">
            <Button
              variant="light-form-btn"
              className="flex-grow w-full"
              style={{ maxWidth: "unset" }}
              onClick={() => setShowShareDropdown((prev) => !prev)}
            >
              <FaShare color="#9128FF" />
            </Button>
            {showShareDropdown && (
              <div className="absolute z-[999] bg-sub-card w-full h-fit py-4 flex flex-col bottom-full mb-3 rounded-xl shadow-xl">
                <FacebookShareButton
                  url={path}
                  quote={`منشور ${post.author.name} في موقع blue wings`}
                  hashtag={`bluewings`}
                >
                  <FacebookIcon size={32} round className="inline" />
                  <span className="text-slate-200 flex-1 mx-1">
                    مشاركه عبر فيسبوك
                  </span>
                </FacebookShareButton>
                <br />
                <TwitterShareButton
                  url={path}
                  title={`منشور ${post.author.name} في موقع blue wings`}
                  hashtags={[
                    "bluewings",
                    "bluewingsm",
                    "manga",
                    post.author.slug_name,
                  ]}
                >
                  <TwitterIcon size={32} round className="inline" />
                  <span className="text-slate-200 !w-full mx-4">
                    مشاركه عبر تويتر
                  </span>
                </TwitterShareButton>
                <br />
                <WhatsappShareButton
                  url={path}
                  title={`منشور ${post.author.name} في موقع blue wings`}
                  separator=":  "
                >
                  <WhatsappIcon size={32} round className="inline" />
                  <span className="text-slate-200 !w-full mx-1">
                    مشاركه عبر واتساب
                  </span>
                </WhatsappShareButton>
                <br />
                <TelegramShareButton
                  title={`منشور ${post.author.name} في موقع blue wings`}
                  url={path}
                >
                  <TelegramIcon size={32} round className="inline" />
                  <span className="text-slate-200 !w-full mx-1">
                    مشاركة عبر تيليجرام
                  </span>
                </TelegramShareButton>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="comments block">
        {user && (
          <div className="create-comment mt-5 flex items-center gap-4">
            <Image
              src={user?.image}
              alt={`user-image`}
              width={40}
              height={40}
              className="rounded-full !w-10 !h-10"
            />
            <Input className="bg-sub-card">
              <input
                type="text"
                placeholder="أكتب تعليق علي هذا المنشور"
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
        {showComments && (
          <div className="mt-5">
            {comments.map((comment, i) => (
              <div
                key={i}
                className="flex gap-2 my-2 bg-sub-card rounded-lg p-3"
              >
                <Avatar>
                  <AvatarImage
                    size="lg"
                    src={comment.author?.image}
                    alt={`user-comment-${nanoid()}`}
                  />
                  <AvatarFallback>
                    {comment.author.name
                      .split(" ")
                      .map((e) => e[0].toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="text-slate-200">
                      {comment.author?.name}
                    </span>
                    <span className="text-slate-300 text-sm">
                      {new DateController(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-2">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeButton={false}
        closeOnClick={true}
        rtl
      />
    </div>
  );
}
