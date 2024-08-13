"use client";
import { Button, Container } from "@/components";
import { createPostContext } from "@/context/CreatePostContext";
import useUser from "@/hooks/useUser";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/Ui/Avatar";
import { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/Ui/textarea";
import axios from "axios";

export default function NewPostTextPage() {
  const { user } = useUser({ required: true });
  const { images, phase } = useContext(createPostContext);
  const [postText, setPostText] = useState("");
  console.log({ phase });
  const router = useRouter();
  if (phase !== "text") {
    router.push("/post/new/images");
  }

  async function handlePost() {
    if (postText.trim().length < 1) {
      toast.error("الرجاء الكتابة قبل النشر");
      return;
    }
    const id = toast.loading("جاري النشر", { isLoading: true });
    const form = new FormData();
    form.set("post-text", postText);
    form.set("post-images", JSON.stringify(images));
    form.set("email", user.email);
    const res = await axios.post(`/api/posts/create`, form);
    if (res.data.error) {
      toast.error(res.data.error);
      return;
    }
    toast.update(id, {
      isLoading: false,
      type: "success",
      render: "تم النشر بنجاح",
      autoClose: 3000,
    });
  }

  return (
    <Container className="min-h-[85svh] flex flex-col items-center justify-center gap-2">
      <div className="w-[400px] flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Avatar size="md">
            <AvatarImage src={user?.image} alt="user-image" size="md" />
            <AvatarFallback>صورة المستخدم</AvatarFallback>
          </Avatar>
          <h1 className="text-xl">{user?.name}</h1>
        </div>
        <Textarea
          placeholder="ما اللذي تفكر به !"
          className="bg-card"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <Button
          variant={"default"}
          className="self-center mt-4"
          onClick={handlePost}
        >
          نشر
        </Button>
      </div>
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
