"use client";
import { Avatar, Button, Container } from "@/components";
import { AvatarImage } from "@/components/Ui/Avatar";
import { createPostContext } from "@/context/CreatePostContext";
import useUser from "@/hooks/useUser";
import { imageTypesAllowed } from "@/utils/imageTypesAllowed";
import uploadImage from "@/utils/uploadImage";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function NewPostPage() {
  const { user } = useUser({ required: true });
  redirect("/post/new/images");
  return (
    <>
      <h1>لم تعد هذه الصفحة موجوده</h1>
    </>
  );
}
