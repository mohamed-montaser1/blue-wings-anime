"use client";
import { Avatar, Button, Container } from "@/components";
import { AvatarImage } from "@/components/Ui/Avatar";
import { createPostContext } from "@/context/CreatePostContext";
import useUser from "@/hooks/useUser";
import { imageTypesAllowed } from "@/utils/imageTypesAllowed";
import uploadImage from "@/utils/uploadImage";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useContext, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function NewPostImagesPage() {
  const { user } = useUser({ required: true });
  const { images, phase, setImages, setPhase } = useContext(createPostContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function handleUploadImages() {
    if (inputRef.current?.files) {
      const id = toast.loading("جاري رفع الصور", { isLoading: true });
      const images = Array.from(inputRef.current.files);
      const promises: Promise<string>[] = [];
      for (let img of images) {
        promises.push(uploadImage(img));
      }
      Promise.all(promises).then((imgsName: string[]) => {
        setImages(imgsName);
        toast.update(id, {
          isLoading: false,
          render: "تم رفع الصور بنجاح",
          type: "success",
          autoClose: 2000,
        });
        setTimeout(() => {
          setPhase("text");
          // redirect("/post/new/text");
          router.push("/post/new/text");
        }, 2000);
      });
    }
  }
  return (
    <Container className="min-h-[85svh] flex flex-col items-center justify-center gap-2">
      <h1>قم برفع صور المنشور هنا</h1>
      <Button variant={"main"} onClick={() => inputRef.current?.click()}>
        ارفع الصور من جهازك
      </Button>
      <input
        type="file"
        accept={imageTypesAllowed.join(", ")}
        hidden
        ref={inputRef}
        multiple
        onChange={handleUploadImages}
      />
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
