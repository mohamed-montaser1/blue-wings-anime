"use client";
import { Avatar, Button, Container, Input } from "@components";
import Image, { StaticImageData } from "next/image";
import { CameraIcon, TrashIcon, UserIcon } from "@icons/index";
import useUser from "@hooks/useUser";
import { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRole } from "@models/User";
import useAsk from "@/hooks/useAsk";
import uploadImage from "@/utils/uploadImage";
import { useRouter } from "next/navigation";

type TProfile = {
  image: string | StaticImageData;
  cover: string | StaticImageData;
  name: string;
  role: UserRole;
  bio: string;
  files?: {
    [K in keyof Pick<TProfile, "image" | "cover">]: File | string;
  };
};

const defaultProfileValues = {
  cover: "/uploads/profiles-covers/default.jpg",
  image: "/uploads/profiles-pictures/default.jpg",
  role: "user",
} as const;

const imageTypesAllowed = ["image/jpg", "image/jpeg", "image/png"] as const;

export default function EditPage() {
  const router = useRouter();
  const { avatar, status, user, updateSession } = useUser({ required: true });
  console.log({ role: user?.role });
  const profileBeforeChanges: TProfile = {
    image: avatar,
    cover: user?.cover,
    name: user?.name,
    role: user?.role,
    bio: user?.bio,
  };
  const [isDirty, setIsDirty] = useState<boolean>(false);
  useAsk(isDirty);
  const [profile, setProfile] = useState<TProfile>({
    image: "",
    cover: "",
    name: "",
    role: "user",
    bio: "",
  });

  useEffect(() => {
    if (status === "loading") return;
    const defaultProfile: TProfile = {
      image: avatar,
      cover: user.cover,
      name: user.name,
      role: user.role,
      bio: user.bio,
    };
    setProfile(defaultProfile);
  }, [status, avatar, user?.name]);

  async function saveImage(img: File | string, dir: string, msg: string, cb: (result: string | object) => void) {
    if (typeof img === "string") {
      cb(img);
      return;
    }

    if (!imageTypesAllowed.includes(img.type as (typeof imageTypesAllowed)[number])) {
      toast("يجب عليك إدخال صورة بإمتداد jpg او png او jpeg", { type: "error" });
      return;
    }
    console.log({ img, dir });
    const result = await uploadImage(img, dir);
    if (result instanceof Object) {
      console.error({ uploadingError: result });
      toast(msg, { type: "error" });
    }
    cb(result);
  }

  const setUserAvatar = (avatar: string | object) => {
    if (avatar instanceof Object) {
      console.log({ callbackError: "there is an error" });
    }
    updateSession({ image: `/uploads/profiles-pictures/${avatar}` });
  };
  const setUserCover = (cover: string | object) => {
    if (avatar instanceof Object) {
      console.log({ callbackError: "there is an error" });
    }
    console.log({ cover });
    updateSession({ cover: `/uploads/profiles-covers/${cover}` });
  };

  async function handleSaveChanges() {
    const saveChangesPromise = new Promise(async (resolve, reject) => {
      let changes: Partial<TProfile> = {};
      const keys = Object.keys(profile) as Array<keyof typeof changes>;

      for (let key of keys) {
        if (profileBeforeChanges[key] !== profile[key]) {
          changes = { ...changes, [key]: profile[key] };
        }
      }

      if (Object.keys(changes).length < 1) return;
      // There is Changes In The Images
      if (changes.files) {
        const { cover, image } = changes.files;
        if (cover) {
          await saveImage(cover, "profiles-covers", "حدث خطأ ما أثناء حفظ الصورة الشخصيه الجديده", setUserCover);
        }
        if (image) {
          await saveImage(image, "profiles-pictures", "حدث خطأ ما أثناء حفظ الصورة الشخصيه الجديده", setUserAvatar);
        }
      }
      // Save Username And New Role if found
      if (changes.role) {
        updateSession({ role: changes.role as UserRole });
      }
      if (changes.name) {
        updateSession({ name: changes.name });
      }
      resolve(true);
    });

    saveChangesPromise.then(() => {
      toast("تم تعديل الملف الشخصي بنجاح", { type: "success" });
      toast("سيتم توجيهك لصفحتك الشخصيه لمعاينة النتيجه", { type: "success" });
      setTimeout(() => {
        router.push("/account");
      }, 4000);
    });
  }

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>, prop: "cover" | "image") {
    e.preventDefault();
    setIsDirty(true);
    const image = e.target.files?.[0] as File;
    if (image) {
      setProfile((p) => ({ ...p, files: { ...p.files, [prop]: image } as typeof p.files }));
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setProfile((prev) => ({ ...prev, [prop]: newImage }));
      };
      reader.readAsDataURL(image);
    }
  }

  return (
    <Container className="my-20 bg-card rounded-lg">
      <div className="relative avatar-banner__container" dir="ltr">
        <div className="profile-banner relative px-3 pt-5">
          <Image
            src={profile.cover ?? defaultProfileValues.cover}
            width={"1000"}
            height={"400"}
            className="w-full h-64 object-cover rounded-lg"
            priority={false}
            alt="testing-banner"
          />
          <div className="btn-container absolute right-5 top-7 flex flex-col gap-2">
            <input
              type="file"
              hidden
              accept=".png, .jpg, .jpeg"
              id="cover-file"
              onChange={(e) => handleChangeImage(e, "cover")}
            />
            <Button variant="form-btn" onClick={() => document.getElementById("cover-file")?.click()}>
              <Image src={CameraIcon} alt="camera-icon" />
            </Button>
            <Button
              variant="form-btn"
              onClick={() =>
                setProfile((prev) => ({
                  ...prev,
                  cover: defaultProfileValues.cover,
                  files: {
                    ...prev.files,
                    cover: "default.jpg",
                  } as TProfile["files"],
                }))
              }
            >
              <Image src={TrashIcon} alt="trash-icon" />
            </Button>
          </div>
        </div>
        <div className="w-[200px] aspect-square bg-slate-500 rounded-full p-1 -translate-y-1/2 ml-7 border border-slate-900">
          <Avatar width={200} height={200} image={profile.image || defaultProfileValues.image} />
          <input
            type="file"
            hidden
            accept=".png, .jpg, .jpeg"
            id="file"
            onChange={(e) => handleChangeImage(e, "image")}
          />
          <Button
            variant="light-form-btn"
            className="absolute top-3/4 right-0 shadow-md"
            onClick={() => document.getElementById("file")?.click()}
          >
            <Image src={CameraIcon} alt="camera-icon" />
          </Button>
        </div>
      </div>
      <div className="-translate-y-[50px]">
        <p className="text-slate-400 mb-5" data-required>
          لن يتم حفظ اي تعديلات حتى تضغط علي زر حفظ التغييرات
        </p>
        <div className="row flex gap-20">
          <Input className="bg-sub-card flex-1">
            <Image src={UserIcon} alt="lock-icon" />
            <input
              type="text"
              placeholder="إسم المستخدم"
              className="input"
              dir="rtl"
              value={profile.name}
              onChange={(e) => {
                setProfile((prev) => ({ ...prev, name: e.target.value }));
                setIsDirty(true);
              }}
            />
          </Input>
          <Input className="items-center py-0 flex-1 bg-sub-card">
            <select
              dir="rtl"
              tabIndex={4}
              className="py-2.5 w-full bg-sub-card outline-none text-white"
              value={profile.role}
              onChange={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  role: e.target.value as UserRole,
                }));
                setIsDirty(true);
              }}
            >
              <option value="user" defaultChecked>
                مستخدم
              </option>
              <option value="editor">محرر</option>
              <option value="artist">فنان</option>
            </select>
          </Input>
          <Input className="bg-sub-card flex-1">
            <Image src={UserIcon} alt="lock-icon" />
            <input
              type="text"
              placeholder="البريد الإلكتروني"
              className="input opacity-50"
              dir="rtl"
              readOnly
              value={user?.email}
            />
          </Input>
        </div>
        <Input className="bg-sub-card my-3">
          <textarea
            className="resize-none input !h-36 leading-7"
            placeholder="نبذة مختصرة"
            value={profile.bio}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, bio: e.target.value }));
              setIsDirty(true);
            }}
          ></textarea>
        </Input>
        <Button variant="main" className="my-5" onClick={handleSaveChanges}>
          حفظ التغييرات
        </Button>
      </div>
      <ToastContainer theme="dark" position="bottom-right" closeOnClick closeButton={false} />
    </Container>
  );
}
