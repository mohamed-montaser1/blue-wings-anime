"use client";
import { Button, Container, Input } from "@/components";
import useFetch from "@/hooks/useFetch";
import { TArticle } from "@/models/Article";
import uploadImage from "@/utils/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z, ZodError } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(5, { message: "يجب إدخال عنوان مكون من 5 أحرف علي الأقل" }),
  content: z
    .string()
    .min(100, { message: "يجب إدخال محتوى المقاله مكون من 100 حرف علي الأقل" }),
});

export default function CreateBlogPage() {
  const UploadImageInputRef = useRef<HTMLInputElement>(null);
  const {
    getValues,
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createBlogSchema),
  });
  const [image, setImage] = useState<File | null>(null);

  function handleImageInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  }

  async function createBlog() {
    /*
      TODO: Send API Request To Api Endpoint
      TODO: If Response is OK toast a successful message to user
      TODO: else toast a detailed error message to user
    */
    type TResponse = {
      success: boolean;
      error: null | ZodError[] | string;
      data: null | TArticle;
    };

    const imageUrl = await uploadImage(image as File, "blog");
    try {
      const body = {
        title: getValues().title,
        content: getValues().content,
        image: "/uploads/blog/" + imageUrl,
      };
      await useFetch<typeof body, TResponse>(
        "/api/blog",
        "POST",
        body
      );
      toast.success("تم إنشاء المقالة بنجاح");
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    Object.keys(errors).map((key) => {
      toast.error(errors[key]?.message as string);
    });
  }, [errors]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("جاري إنشاء المقالة");
    }
  }, [isLoading]);

  return (
    <Container className="mt-16">
      <h1 className="text-4xl text-slate-200 text-center mb-6">
        قم بإنشاء مقالة الآن !
      </h1>
      <form
        onSubmit={handleSubmit(createBlog, function (errors) {
          if (!image) {
            toast.error("يجب إدخال صورة للمقالة");
          }
        })}
      >
        <Input className="mb-5">
          <input
            type="text"
            placeholder="عنوان المقالة"
            className="bg-transparent text-lg text-slate-300 w-full border-none outline-none"
            {...register("title")}
          />
        </Input>
        <Input className="h-80">
          <textarea
            className="bg-transparent resize-none w-full text-slate-300 border-none outline-none"
            placeholder="محتوى المقالة"
            {...register("content")}
          ></textarea>
        </Input>
        <input
          type="file"
          hidden
          accept=".png, .jpg, .gif, .jpeg, .webp"
          ref={UploadImageInputRef}
          onChange={handleImageInputChange}
        />
        <Button
          variant="light-form-btn"
          className="mt-5"
          onClick={() => UploadImageInputRef.current?.click()}
          type="button"
        >
          إرفع صورة المقالة
        </Button>
        <Button variant="main" className="mx-auto" type="submit">
          إنشاء المقالة
        </Button>
      </form>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeOnClick
        closeButton={false}
      />
    </Container>
  );
}
