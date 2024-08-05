"use client";
import { Button, Container, Input, Title } from "@/components";
import useFetch from "@/hooks/useFetch";
import { slugifyOptions } from "@/lib/slugifyOptions";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from "slugify";

export default function Page() {
  const [name, setName] = useState("");

  async function handleDeleteManga() {
    if (name.trim().length < 1) {
      toast.error("يجب عليك كتابة إسم المانجا");
      return;
    }
    const slug = slugify(name, slugifyOptions);
    try {
      const res = await axios.delete(`/api/manga/${slug}`);
      if (res.status === 200) {
        toast.success("تم حذف المانجا بنجاح");
        return;
      }
    } catch (error) {
      console.log({ error });
      toast.error("حدث خطأ ما يرجى المحاولة مره أخرى لاحقاً");
    }
  }

  return (
    <Container className="flex mt-10 flex-col items-center gap-5">
      <Title>صفحة حذف المانجا</Title>
      <div className="w-full gap-5 flex flex-col">
        <Input className="w-full">
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-slate-300"
            placeholder="أدخل إسم المانجا الذي تريد حذفه"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Input>
        <Button
          variant="danger"
          className="mx-auto"
          onClick={handleDeleteManga}
        >
          حذف بشكل نهائي
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
