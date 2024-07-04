import useUser from "@hooks/useUser";
import { Avatar, Button, Input } from "../Ui";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { FaComment, FaShare, FaTimes } from "react-icons/fa";
import {
  imageTypesAllowed,
  imageTypesAllowedKey,
} from "@/app/account/settings/page";
import { ToastContainer, toast } from "react-toastify";
import uploadImage from "@utils/uploadImage";
import useFetch from "@/hooks/useFetch";
import { type TPost as TPost } from "@/models/Post";
import DateController from "@/utils/date";
import { Heart, PlainIcon, PostHeart, TrashIcon } from "@icons/index";
import { nanoid } from "nanoid";
import { TUser } from "@/models/User";

// export default function Posts({ children }: TPosts) {
//   const [posts, setPosts] = useState<TPost[]>([]);
//   const { user } = useUser({ required: true });
//   const pathname = usePathname();
//   useEffect(() => {
//     console.log({ pathname });
//     if (!user) return;
//     console.log({ userPosts: user.posts });
//     setPosts((user.posts as TPost[]).sort((a, b) => b.createdAt - a.createdAt));
//   }, [user]);
//   return (
//     <div>
//       <CreatePost setPosts={setPosts} user={user as TUser} />
//       <PostedPosts posts={posts} />
//     </div>
//   );
// }

type TCreatePostProps = {
  setPosts: Dispatch<SetStateAction<TPost[]>>;
  user: TUser;
};

export function CreatePost({ setPosts, user }: TCreatePostProps) {
  const PostImageRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [postText, setPostText] = useState("");

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const fileList = e.target.files;
      const filesArray = Array.from(fileList);
      for (let file of filesArray) {
        if (!imageTypesAllowed.includes(file.type as imageTypesAllowedKey)) {
          toast("يجب عليك إدخال صورة بإمتداد jpg او png او jpeg", {
            type: "error",
          });
          return;
        }
      }
      setFiles((prev) => [...prev, ...filesArray]);
    }
  }
  function uploadImages() {
    return new Promise<string[]>((resolve, reject) => {
      const imagesURLs: string[] = [];

      if (files.length > 0) {
        const uploadPromises = files.map((file) => {
          return uploadImage(file, "posts-images")
            .then((newUrl) => `/uploads/posts-images/${newUrl}`)
            .catch((err) => {
              console.log({ errorWhileUploadImagesToServer: err });
              throw err; // This will make Promise.all reject if any single upload fails
            });
        });

        Promise.all(uploadPromises)
          .then((results) => {
            resolve(results);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        resolve(imagesURLs);
      }
    });
  }
  async function handlePost() {
    const images = await uploadImages();
    if (postText.trim() === "") {
      if (images.length < 1) {
        toast("يجب عليك أن تدخل صور او نص علي الأقل لرفع المنشور", {
          type: "error",
        });
        return;
      }
    }
    const form = new FormData();
    form.set("post-text", postText);
    form.set("post-images", JSON.stringify(images));
    form.set("email", user.email);
    const res = await useFetch<FormData, { data: TPost[] }>(
      "/api/posts/create",
      "POST",
      form
    );
    setPosts(res.data.data.slice().reverse());
    setPostText("");
    setFiles([]);
  }

  return (
    <div className="bg-card rounded-lg p-4">
      <div className="bg-sub-card p-2 rounded-lg flex">
        <Avatar image={user?.image} size={48} className="!w-12 h-12" />
        <Input className="bg-sub-card">
          <textarea
            className="resize-none input !h-24 leading-7"
            placeholder={`ما اللذي يدور في ذهنك, ${user?.name.split(" ")[0]} ؟`}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </Input>
      </div>
      <div className="mt-4">
        {files.length > 0 &&
          files.map((file, i) => (
            <div className="flex items-center justify-between" key={i}>
              <p className="text-slate-200 my-2">
                {file.name.length > 20
                  ? file.name.substr(0, 30) + "..."
                  : file.name}
              </p>
              <button
                className="text-slate-200 flex items-center bg-red-600 px-1 hover:bg-red-700 transition-colors duration-300 ease-linear"
                onClick={() => {
                  setFiles(files.filter((f) => f !== file));
                }}
              >
                <span>حذف</span>
                <FaTimes />
              </button>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center">
        <Button
          variant="light-form-btn"
          className="mt-5 !text-lg"
          onClick={() => PostImageRef.current?.click()}
        >
          <input
            type="file"
            hidden
            id="post-img"
            multiple
            accept=".jpg, .png, .jpeg"
            ref={PostImageRef}
            onChange={handleChangeImage}
          />
          <Image
            src={"/icons/image-icon.png"}
            alt="image-icon"
            width={25}
            height={25}
          />
          إرفع صورة
        </Button>
        <Button
          variant="main"
          className="mt-5 !px-9 min-h-11 !text-lg"
          onClick={handlePost}
        >
          نشر
        </Button>
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeOnClick
        closeButton={false}
      />
    </div>
  );
}

type PostedPosts = { posts: TPost[] };

export function Posts({ posts }: PostedPosts) {
  return (
    <>
      {posts.map((post, i) => (
        <Post post={post} i={i} />
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

  async function handleAddOneLike() {
    const form = new FormData();
    form.set("userId", user._id);
    const res = await useFetch(
      `/api/posts/info/${post._id}/like`,
      "POST",
      form
    );
    setPost(res.data.data);
    console.log("#".repeat(30));
    console.log({ res });
    console.log("#".repeat(30));
  }

  async function handleAddComment() {
    const form = new FormData();
    form.set("userId", user._id);
    form.set("content", comment);
    const res = await useFetch(
      `/api/posts/info/${post._id}/comment`,
      "POST",
      form
    );
    setPost(res.data.data);
    setComments(res.data.data.comments.reverse());
    setComment("");
  }

  return (
    <div key={i} className="bg-card mt-4 p-3 rounded-lg">
      <div className="user-info flex items-center justify-between">
        <div className="flex gap-2">
          <Avatar
            image={post.author?.image}
            size={50}
            className="!w-[50px] !h-[50px] !mx-0"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-slate-200 text-lg">{post.author?.name}</h3>
            <span className="text-slate-400 text-sm">
              {new DateController(post.createdAt).fromNow()}
            </span>
          </div>
        </div>
        {(user as TUser)?._id === post.author?._id && (
          <Button variant="light-form-btn">
            <Image src={TrashIcon} alt="trash-icon" />
          </Button>
        )}
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
          >
            <FaComment color="#9128FF" />
          </Button>
          <Button
            variant="light-form-btn"
            className="flex-grow"
            style={{ maxWidth: "unset" }}
          >
            <FaShare color="#9128FF" />
          </Button>
        </div>
      )}
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
                placeholder="اكتب ما يدور في ذهنك"
                className="w-full h-full bg-sub-card border-none outline-none text-slate-300"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
              <Avatar
                image={comment.author?.image}
                size={40}
                className="!h-12 !w-12"
              />
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
    </div>
  );
}
