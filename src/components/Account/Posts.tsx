import { cn } from "@/lib/utils";
import { TComment } from "@/models/Comment";
import { type TPost } from "@/models/Post";
import DateController from "@/utils/date";
import { HeartIcon, MessageCircle, Share, Share2 } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { SectionSwiper } from "../Swiper";
import { Button, Container, Input } from "../Ui";
import { Avatar, AvatarFallback, AvatarImage } from "../Ui/Avatar";
import { CarouselItem } from "../Ui/carousel";
import { Separator } from "../Ui/separator";
import twoLetterName from "@/utils/twoLetterName";
import { Heart, PostHeart } from "@icons/index";
import Plain from "@icons/plain";

type PostedPosts = { posts: TPost[] };

export function Posts({ posts }: PostedPosts) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
      {posts.map((post, i) => (
        <Post post={post} i={i} key={i} />
      ))}
    </div>
  );
}

type PostProps = {
  post: TPost;
  i: number;
};

function Post({ post, i }: PostProps) {
  const [image, setImage] = useState(""); // this will be the first image in images array
  const [showStatics, setShowStatics] = useState(false);
  const [showPostPopup, setShowPostPopup] = useState(false);
  useEffect(() => {
    if (!post) return;
    if (!post.images) return;

    setImage(post.images[0]);
  }, [post, post.images]);

  function handleOpenPost(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    setShowPostPopup(true);
  }

  function handleClosePost() {
    setShowPostPopup(false);
  }

  return (
    <>
      <div
        className="aspect-square relative cursor-pointer"
        onMouseEnter={() => setShowStatics(true)}
        onMouseLeave={() => setShowStatics(false)}
        onClick={handleOpenPost}
      >
        <Image
          src={image}
          alt={`post-${i}`}
          width={308}
          height={308}
          className="w-full aspect-square object-cover"
        />
        <div
          className={cn(
            "w-full h-full bg-black/65 absolute inset-0 flex items-center justify-center gap-6 cursor-pointer transition-opacity duration-300",
            showStatics ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="flex gap-1">
            <HeartIcon fill="white" />
            {post.likes.length}
          </span>
          <span className="flex gap-1">
            <MessageCircle fill="white" />
            {post.comments.length}
          </span>
        </div>
      </div>
      {showPostPopup && (
        <PostPopup post={post} handleClosePost={handleClosePost} />
      )}
    </>
  );
}

type TPostPopupProps = {
  post: TPost;
  handleClosePost: () => void;
};

function PostPopup({ post, handleClosePost }: TPostPopupProps) {
  const [createdAt, setCreatedAt] = useState<any>();
  const commentInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const fromNow = new DateController(post.createdAt as number).fromNow();
    setCreatedAt(fromNow);
  });

  return (
    <>
      <div className="overlay" onClick={handleClosePost}></div>
      <Container className="h-[90vh] flex !fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100001]">
        <SectionSwiper
          className="flex-[1.5] h-full relative"
          customBtns={true}
          showBtns={post.images.length > 1}
        >
          {post.images.map((image, i) => (
            <CarouselItem key={i} className="relative w-full h-full">
              <Image
                src={image}
                alt={`carousel-image-${i}`}
                width={1000}
                height={1000}
                className={"object-cover w-full h-[90vh]"}
                key={i}
              />
            </CarouselItem>
          ))}
        </SectionSwiper>
        <div className="comments h-full bg-card flex-1 rounded-l-lg pt-3 relative overflow-auto flex flex-col">
          <div className="top flex-1 px-3">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center">
                  <Avatar size="md">
                    <AvatarImage
                      src={post.author.image}
                      alt="user-image"
                      size="md"
                    />
                    <AvatarFallback>{post.author.name}</AvatarFallback>
                  </Avatar>
                  <span>{post.author.name}</span>
                </div>
                <span className="text-slate-300 text-sm">{createdAt}</span>
              </div>
              <Separator className="mt-4 bg-slate-500 block" />
            </div>
            <span className="inline-block mt-3 text-lg">{post.text}</span>
            {post.comments.length < 1 && (
              <h1 className="text-2xl text-slate-200 text-center mt-16 flex-1">
                لا توجد تعليقات حتى الآن.
              </h1>
            )}
            <div className="comments mt-5 h-full overflow-auto">
              {post.comments.map(
                (comment, idx) => (
                  <Comment comment={comment} idx={idx} />
                )
              )}
            </div>
          </div>

          <div className="h-40 bg-card z-[100] px-3 flex flex-col justify-between sticky -bottom-1">
            <Separator className="bg-slate-500 mx-auto" />
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="controls mt-3">
                  <Button variant={"ghost"} size={"icon"}>
                    <HeartIcon stroke="#18B2FF" />
                  </Button>
                  <Button variant={"ghost"} size={"icon"}>
                    <MessageCircle fillOpacity={0} stroke="#18B2FF" />
                  </Button>
                  <Button variant={"ghost"} size={"icon"}>
                    <Share2 stroke="#18B2FF" />
                  </Button>
                </div>
                <small className="text-slate-300">{createdAt}</small>
              </div>
              <span className="px-2">
                {post.likes.length}{" "}
                {post.likes.length > 1 ? "إعجابات" : "إعجاب"}
              </span>
            </div>
            <div className="border-t mt-3 border-slate-500 rounded-none flex items-center">
              <input
                type="text"
                className="w-full h-14 bg-transparent outline-none"
                placeholder="إضافة تعليق..."
                ref={commentInputRef}
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                style={{ transform: "rotateY(180deg)" }}
              >
                <Plain color="#18B2FF" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

type TCommentProps = {
  comment: TComment;
  idx: number;
};

function Comment({ comment, idx }: TCommentProps) {
  const smallName = twoLetterName(comment.author.name);
  const name = comment.author.name;
  const createdAt = new DateController(comment.createdAt as number).fromNow();
  return (
    <div key={idx} className="flex gap-3 my-5 items-start">
      <Avatar size="md">
        <AvatarImage
          src={comment.author.image}
          size="md"
          alt={`comment-author ${name}`}
        />
        <AvatarFallback>{smallName}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full">
        <div className="flex gap-4 items-center">
          <p className="text-slate-50 mb-1">
            <span className="text-slate-300 ml-3">{name}</span>
            {comment.content}
          </p>
        </div>
        <small className="text-slate-400">{createdAt}</small>
      </div>
    </div>
  );
}
