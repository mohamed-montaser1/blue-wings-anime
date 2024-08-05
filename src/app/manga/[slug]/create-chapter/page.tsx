"use client";
import { Button, Container, Input, Title } from "@/components";
import useFetch from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";
import { TManga } from "@/models/Manga";
import uploadImage from "@/utils/uploadImage";
import axios, { AxiosError } from "axios";
import { redirect, usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateChapter() {
  const { user } = useUser({ required: true });
  const imagesInputFile = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [mangaName, setMangaName] = useState("");

  const path = usePathname();
  const slug = path.split("/").at(-2);

  useEffect(() => {
    const mangaName = path.split("/");
    mangaName.pop();
    mangaName.shift();
    setMangaName(mangaName.at(-1) as string);
  }, [path]);

  useEffect(() => {
    if (!user) return;
    if (user.role === "editor") {
      (async () => {
        const res = await axios.get(`/api/manga/${slug}`)
        const manga = res.data.manga;
        const author = manga.author.name;
        if (author !== user.name) {
          redirect("/");
        }
      })();
    } else {
      redirect("/");
    }
  }, [user]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const images = await uploadImages();
    if (images.length < 1) {
      toast.error("يجب عليك تحميل الصور أولاً");
      return;
    }
    const formData = new FormData();
    formData.append("images", JSON.stringify(images));
    try {
      await axios.post(`/api/manga/${mangaName}/chapters`, formData)
      toast.success("تم إضافة الفصل بنجاح");
    } catch (error) {
      let e = error as unknown as AxiosError;
      switch (e.response?.status) {
        case 400:
          toast.error("تأكد من صحة الصور وصلاحية الإمتدادات");
          break;
        case 404:
          toast.error(`لا توجد مانجا بهذا الإسم (${slug})`);
          break;
        case 500:
          toast.error("حدث خطأ في الخادم الرجاء المحاولة لاحقاً");
          break;
      }
    }
  }
  function uploadImages() {
    return new Promise<string[]>((resolve, reject) => {
      const imagesURLs: string[] = [];

      if (files.length > 0) {
        const uploadPromises = Array.from(files).map((file) => {
          return uploadImage(file, `manga/${mangaName}`)
            .then((newUrl) => `/uploads/manga/${mangaName}/${newUrl}`)
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
  return (
    <Container>
      <h1 className="text-center mx-auto mt-16 text-4xl font-bold text-white">
        إنشاء فصل جديد في {mangaName}
      </h1>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center">
        <input
          type="file"
          multiple
          hidden
          accept=".png, .jpg, .jpeg, .webp, .gif"
          ref={imagesInputFile}
          onChange={(e) => setFiles(e.target.files as unknown as File[])}
          id="files-input"
        />
        <p className="text-slate-400 mb-5" data-required>
          يجب رفع الصور مرقمة لتظهر بنفس الترتيب في صفحة الفصل مثلا
          &quot;01&quot; &quot;02&quot;
          وهكذا
        </p>
        <label
          htmlFor="files-input"
          className="bg-primary text-white text-xl px-4 max-w-fit min-h-14 justify-center rounded-xl flex items-center gap-2.5 mb-3"
        >
          تحميل الصور
        </label>
        <Button variant="primary" className="px-8">
          رفع الصور
        </Button>
      </form>
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
