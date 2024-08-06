"use client";
import { Button, Container, Input } from "@/components";
import useUser from "@/hooks/useUser";
import { classifications, TClassification } from "@/utils/classifications";
import { imageTypesAllowed } from "@/utils/imageTypesAllowed";
import uploadImage from "@/utils/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Id, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

type FieldsType = {
  title: string;
  status: string;
  author: string;
  type: string;
  story: string;
  credit: File | null;
};

const createMangaSchema = z.object({
  title: z.string().min(1, "يجب إدخال اسم المانجا"),
  status: z.enum(["Ongoing", "Completed", "Hiatus"], {
    required_error: "يجب تحديد حالة المانجا",
  }),
  type: z.enum(["Manga", "Manhwa", "Manhua", "Comic", "Novel"], {
    required_error: "يجب تحديد نوع المانجا",
  }),
  story: z.string().min(10, "يجب أن تحتوي القصة على الأقل على 10 أحرف"),
  author: z
    .string()
    .email("يجب إدخال بريد الكتروني صالح")
    .nonempty("يجب إدخال اسم المؤلف"),
  credit: z
    .any()
    .refine((files) => files?.length == 1, "يجب إدخال صورة الكريديت")
    .refine(
      (files) => imageTypesAllowed.includes(files?.[0]?.type),
      `الإمتدادات المتاحه للصور: ${imageTypesAllowed.join(" , ")}`
    ),
});

export default function CreateManga() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<FieldsType>({
    resolver: zodResolver(createMangaSchema),
  });
  const { user } = useUser({ required: true });
  const [keywords, setKeywords] = useState<
    TClassification[keyof TClassification]["value"][]
  >([]);
  const toastId = useRef<null | Id>(null);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      redirect("/");
    }
  }, [user]);
  useEffect(() => {
    Object.keys(errors).map((key) => {
      toast.error(errors[key as keyof FieldsType]?.message as string);
    });
  }, [errors]);

  async function createManga(values: FieldsType, e: any) {
    // TODO: send API Request to /api/manga/create
    // TODO: check if error ? display it : continue
    // TODO: if there is no errors ? display success message and redirect to its url
    const { author, credit, status, story, title, type } = getValues();
    const image =
      // @ts-ignore
      "/uploads/credits/" + (await uploadImage(credit[0], "credits"));
    const form = {
      title,
      type,
      author,
      status,
      story,
      credit: image,
      keywords,
    };

    try {
      toastId.current = toast.loading("جاري إنشاء المانجا");
      const res = await axios.post("/api/manga/create", form);
      setTimeout(() => {
        toast.update(toastId.current as unknown as Id, {
          type: "success",
          render: "تم الإنشاء بنجاح",
          isLoading: false,
          autoClose: 4000,
        });
      }, 500);
    } catch (error) {
      let e = error as unknown as AxiosError;
      switch (e.response!.status) {
        case 404:
          toast.update(toastId.current as unknown as Id, {
            type: "error",
            render: "لا يوجد مستخدم بهذا البريد الإلكتروني",
            isLoading: false,
            autoClose: 4000,
          });
          break;
        case 409:
          toast.update(toastId.current as unknown as Id, {
            type: "error",
            render: "يوجد مانجا بالفعل بهذا الإسم",
            isLoading: false,
            autoClose: 4000,
          });
          break;
        case 500:
          toast.update(toastId.current as unknown as Id, {
            type: "error",
            render: "حدث خطأ ما في السيرفر. عاود المحاولة لاحقاً",
            isLoading: false,
            autoClose: 4000,
          });
          break;
      }
    }
  }

  return (
    <Container className="mt-7">
      <h1 className="text-slate-200 text-3xl text-center mb-10">
        قم بإنشاء عمل جديد الآن
      </h1>
      <form onSubmit={handleSubmit(createManga)}>
        <div className="flex items-center gap-14 flex-wrap justify-center">
          <Input className="flex-1" data-required>
            <input
              type="text"
              placeholder="إسم العمل"
              className="input"
              {...register("title")}
            />
          </Input>
          <Input className="flex-1" data-required>
            <select
              className="bg-inherit text-slate-300 border-none outline-none flex-1"
              onChange={(e) =>
                setKeywords((prev) => [
                  ...prev,
                  classifications[e.target.value as keyof TClassification]
                    .value,
                ])
              }
            >
              <option disabled>الكلمات المفتاحيه</option>
              {Object.keys(classifications).map((keyword, i) => (
                <option value={keyword} key={i}>
                  {classifications[keyword as keyof TClassification].value}
                </option>
              ))}
            </select>
          </Input>
          <Input className="flex-1" data-required>
            <select
              className="bg-inherit text-slate-300 border-none outline-none flex-1"
              {...register("status")}
            >
              <option disabled>حالة العمل</option>
              {["Ongoing", "Completed", "Hiatus"].map((el, i) => (
                <option value={el} key={i}>
                  {el}
                </option>
              ))}
            </select>
          </Input>
          <Input className="flex-1" data-required>
            <select
              className="bg-inherit text-slate-300 border-none outline-none flex-1"
              {...register("type")}
            >
              <option disabled>نوع العمل</option>
              {["Manga", "Manhwa", "Manhua", "Comic", "Novel"].map((el, i) => (
                <option value={el} key={i}>
                  {el}
                </option>
              ))}
            </select>
          </Input>
          <Input className="flex-1" data-required>
            <input
              type="email"
              placeholder="البريد الخاص بالمنشئ"
              className="input"
              {...register("author")}
            />
          </Input>
        </div>
        <div className="mt-5">
          <Input className="flex-1 h-52" data-required>
            <textarea
              className="resize-none bg-card input h-52"
              placeholder="أدخل قصة العمل"
              // value={manga.story}
              // onChange={(e) =>
              //   setManga((p) => ({ ...p, story: e.target.value }))
              // }
              {...register("story")}
            ></textarea>
          </Input>

          <Input className="!w-fit mt-5" data-required>
            <label className="text-slate-200 cursor-pointer">
              أضف صورة الكريدت الخاصه بالأنمي
              <input
                type="file"
                accept=".gif, .png, .jpg, .jpeg"
                hidden
                {...register("credit", {
                  required: "يجب أن يكون الملف صورة",
                  validate: {
                    isImage: (files) =>
                      (files as unknown as File[])[0]?.type.startsWith(
                        "image/"
                      ) || "يجب أن يكون الملف صورة",
                  },
                })}
              />
            </label>
          </Input>
        </div>
        <div className="mt-14 flex flex-col gap-3">
          <h3 className="text-slate-200 text-2xl flex gap-3">
            <span>نوع العمل (الكلمات المفتاحية أيضاً):</span>
            <div className="flex items-center gap-2 flex-wrap">
              {keywords.map((keyword, i) => (
                <span className="text-primary" key={i}>
                  {keyword} {i !== keywords.length - 1 && ","}
                </span>
              ))}
            </div>
          </h3>

          <h3 className="text-slate-200 text-2xl flex gap-3">
            <span>الإيميل الخاص بالمنشئ (يجب أن يكون مسجلاً علي الموقع):</span>
            <span className="text-primary">{getValues().author}</span>
          </h3>

          <Button variant="main" className="mx-auto my-6" type="submit">
            إنشاء المانجا
          </Button>
        </div>
      </form>

      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeOnClick
        closeButton={false}
        rtl
      />
    </Container>
  );
}
