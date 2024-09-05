"use client";
import useUser from "@/hooks/useUser";
import { redirect } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

export default function NewPostPage() {
  redirect("/post/new/images");
  return (
    <>
      <h1>لم تعد هذه الصفحة موجوده</h1>
    </>
  );
}
