"use client";
import {
  imageTypesAllowed,
  imageTypesAllowedKey,
} from "@/app/account/settings/page";
import { Button, Container, Input } from "@/components";
import useFetch from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";
import { classifications } from "@/utils/classifications";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Manga = {
  title: string;
  status: string;
  author: string;
  type: string;
  keywords: string[];
  story: string;
  credit: File | null;
};

export default function CreateManga() {
  const { user } = useUser({ required: true });
  const [manga, setManga] = useState<Manga>({
    title: "",
    author: "",
    status: "",
    type: "",
    keywords: [],
    story: "",
    credit: null,
  });
  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      redirect("/");
    }
  }, [user]);

  async function handleSubmit() {
    // TODO: Validate Form    [DONE]
    // TODO: Send Values to /api/manga/create API End Point    []
    // TODO: Give User Feedback about his Request    []
    if (!manga.title.trim()) {
      toast("يجب عليك إدخال إسم المانجا", { type: "error" });
      return;
    }
    if (!manga.status) {
      toast("يجب عليك إدخال حالة المانجا", { type: "error" });
      return;
    }
    if (manga.keywords.length < 1) {
      toast("يجب عليك إدخال كلمات مفتاحية", { type: "error" });
      return;
    }
    if (!manga.type) {
      toast("يجب عليك إدخال نوع العمل", { type: "error" });
      return;
    }
    if (!manga.author.trim()) {
      toast("يجب عليك إدخال اسم المؤلف", { type: "error" });
      return;
    }
    if (!manga.story.trim()) {
      toast("يجب عليك إدخال قصة العمل", { type: "error" });
      return;
    }
    if (
      !manga.credit ||
      !imageTypesAllowed.includes(manga.credit.type as imageTypesAllowedKey)
    ) {
      toast("يجب عليك إدخال صورة كريدت صالحة!", { type: "error" });
      return;
    }

    const form = new FormData();
    form.set("name", manga.title);
    form.set("keywords", JSON.stringify(manga.keywords));
    form.set("type", manga.type);
    form.set("author", manga.author);
    form.set("status", manga.status);
    const res = await useFetch("/api/manga/create", "POST", form);
    console.log({ res });
  }

  return (
    <Container className="mt-20">
      <div className="flex items-center gap-14 flex-wrap justify-center">
        <Input className="flex-1" data-required>
          <input
            type="text"
            placeholder="إسم العمل"
            className="input"
            value={manga.title}
            onChange={(e) => setManga((p) => ({ ...p, title: e.target.value }))}
          />
        </Input>
        <Input className="flex-1" data-required>
          <select
            className="bg-inherit text-slate-300 border-none outline-none flex-1"
            onChange={(e) =>
              setManga((p) => ({
                ...p,
                keywords: [
                  ...p.keywords,
                  classifications[e.target.value].value,
                ],
              }))
            }
          >
            <option disabled>الكلمات المفتاحيه</option>
            {Object.keys(classifications).map((keyword, i) => (
              <option value={keyword} key={i}>
                {classifications[keyword].value}
              </option>
            ))}
          </select>
        </Input>
        <Input className="flex-1" data-required>
          <select
            className="bg-inherit text-slate-300 border-none outline-none flex-1"
            value={manga.status}
            onChange={(e) =>
              setManga((p) => ({ ...p, status: e.target.value }))
            }
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
            value={manga.type}
            onChange={(e) => setManga((p) => ({ ...p, type: e.target.value }))}
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
            value={manga.author}
            onChange={(e) =>
              setManga((p) => ({ ...p, author: e.target.value }))
            }
          />
        </Input>
      </div>
      <div className="mt-5">
        <Input className="flex-1 h-52" data-required>
          <textarea
            className="resize-none bg-card input h-52"
            placeholder="أدخل قصة العمل"
            value={manga.story}
            onChange={(e) => setManga((p) => ({ ...p, story: e.target.value }))}
          ></textarea>
        </Input>

        <Input className="!w-fit mt-5" data-required>
          <label className="text-slate-200 cursor-pointer">
            أضف صورة الكريدت الخاصه بالأنمي
            <input
              type="file"
              accept=".gif, .png, .jpg, .jpeg"
              hidden
              onChange={(e) =>
                setManga((p) => ({ ...p, credit: e.target.files![0] || null }))
              }
            />
          </label>
        </Input>
      </div>
      <div className="mt-14 flex flex-col gap-3">
        <h3 className="text-slate-200 text-2xl flex gap-3">
          <span>نوع العمل (الكلمات المفتاحية أيضاً):</span>
          <div className="flex items-center gap-2 flex-wrap">
            {manga.keywords.map((keyword, i) => (
              <span className="text-primary" key={i}>
                {keyword} {i !== manga.keywords.length - 1 && ","}
              </span>
            ))}
          </div>
        </h3>

        <h3 className="text-slate-200 text-2xl flex gap-3">
          <span>الإيميل الخاص بالمنشئ (يجب أن يكون مسجلاً علي الموقع):</span>
          <span className="text-primary">{manga.author}</span>
        </h3>

        <Button variant="main" className="mx-auto my-6" onClick={handleSubmit}>
          إنشاء المانجا
        </Button>
      </div>

      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeOnClick
        closeButton={false}
      />
    </Container>
  );
}
