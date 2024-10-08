"use client";
import { roles } from "@/components/Account/AccountInfo";
import useAsk from "@/hooks/useAsk";
import { slugifyOptions } from "@/lib/slugifyOptions";
import {
  imageTypesAllowed,
  imageTypesAllowedKey,
} from "@/utils/imageTypesAllowed";
import uploadImage from "@/utils/uploadImage";
import { Button, Container, Input } from "@components";
import { Avatar, AvatarFallback, AvatarImage } from "@components/Ui/Avatar";
import useUser from "@hooks/useUser";
import { CameraIcon, TrashIcon, UserIcon } from "@icons/index";
import { TUser, UserRole } from "@models/User";
import axios from "axios";
import Image, { StaticImageData } from "next/image";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from "slugify";

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
  cover: "/default-cover.jpg",
  image: "/default-profile.jpg",
  role: "user",
} as const;

export default function EditPage() {
  const { avatar, status, user, updateSession } = useUser({ required: true });
  const profileBeforeChanges: TProfile = {
    image: avatar,
    cover: user?.cover,
    name: user?.name,
    role: user?.role,
    bio: user?.bio,
  };
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [showChangeRoleRequest, setShowChangeRoleRequest] = useState(false);
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
      cover: user?.cover,
      name: user?.name,
      role: user?.role,
      bio: user?.bio,
    };
    setProfile(defaultProfile);

    async function checkIfThereIsUserWithSameName() {
      const isAnyUserWithSameName = await axios.get(
        `/api/user/${user?.slug_name}/exists`
      );
      const error = isAnyUserWithSameName.data?.error;
      if (error) {
        toast.error(error);
        toast.error("يجب عليك تغيير إسمك ليظهر حسابك");
      }
    }
    checkIfThereIsUserWithSameName();
  }, [
    status,
    avatar,
    user?.name,
    user?.bio,
    user?.cover,
    user?.role,
    user?.slug_name,
  ]);

  async function saveImage(
    img: File | string,
    msg: string,
    cb: (result: string | object) => void
  ) {
    if (typeof img === "string") {
      cb(img);
      return;
    }

    if (!imageTypesAllowed.includes(img.type as imageTypesAllowedKey)) {
      toast(`يجب عليك إدخال صورة بإمتداد ${imageTypesAllowed.join(" , ")}`, {
        type: "error",
      });
      return;
    }
    return uploadImage(img)
      .then((result) => {
        cb(result);
        return result;
      })
      .catch((error) => {
        console.error({ uploadingError: error });
        toast(msg, { type: "error" });
        cb(error);
        return;
      });
  }

  const setUserAvatar = (image: string | object) => {
    if (avatar instanceof Object) {
      console.log({ callbackError: "there is an error", error: image });
    }
  };

  const setUserCover = (cover: string | object) => {
    if (avatar instanceof Object) {
      console.log({ callbackError: "there is an error", error: cover });
      return;
    }
  };

  async function handleSaveChanges() {
    type TSaves = Partial<TUser>;
    const saveChangesPromise = new Promise<TSaves>(async (resolve) => {
      let changes: Partial<TProfile> = {};
      const keys = Object.keys(profile) as Array<keyof typeof changes>;
      let saves: TSaves = {};

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
          if (cover.toString().startsWith("default")) {
            saves = { ...saves, cover: `/default-cover.jpg` };
          } else {
            const coverUrl = await saveImage(
              cover,
              "حدث خطأ ما أثناء حفظ الصورة الشخصيه الجديده",
              setUserCover
            );
            if (coverUrl) {
              saves = { ...saves, cover: coverUrl };
            }
          }
        }
        if (image) {
          const avatarUrl = await saveImage(
            image,
            "حدث خطأ ما أثناء حفظ الصورة الشخصيه الجديده",
            setUserAvatar
          );
          if (avatarUrl) {
            saves = { ...saves, image: avatarUrl };
          }
        }
      }
      // Save Username And New Role if found
      if (changes.role) {
        saves = { ...saves, role: changes.role };
      }
      if (changes.name) {
        saves = {
          ...saves,
          name: changes.name,
          slug_name: slugify(changes.name, slugifyOptions),
        };
      }
      if (changes.bio) {
        saves = { ...saves, bio: changes.bio };
      }
      resolve(saves);
    });

    saveChangesPromise.then((saves) => {
      updateSession(saves, (newSession) => {
        setProfile(newSession?.user);
        toast("تم تعديل الملف الشخصي بنجاح", { type: "success" });
      });
    });
  }

  function handleChangeImage(
    e: ChangeEvent<HTMLInputElement>,
    prop: "cover" | "image"
  ) {
    e.preventDefault();
    setIsDirty(true);
    const image = e.target.files?.[0] as File;
    if (image) {
      setProfile((p) => ({
        ...p,
        files: { ...p.files, [prop]: image } as typeof p.files,
      }));
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
            alt="user-cover"
          />
          <div className="btn-container absolute right-5 top-7 flex flex-col gap-2">
            <input
              type="file"
              hidden
              accept=".png, .jpg, .jpeg"
              id="cover-file"
              onChange={(e) => handleChangeImage(e, "cover")}
            />
            <Button
              variant={"form-btn"}
              size={"icon"}
              onClick={() => document.getElementById("cover-file")?.click()}
            >
              <Image src={CameraIcon} alt="camera-icon" />
            </Button>
            <Button
              variant={"form-btn"}
              size={"icon"}
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
        <div className="w-[200px] aspect-square bg-slate-500 rounded-full p-1 -translate-y-1/2 ml-7 border border-slate-900 flex items-center justify-center">
          <Avatar size="xl">
            <AvatarImage
              src={(profile.image || defaultProfileValues.image) as string}
              size="xl"
            />
            <AvatarFallback>صورة المستخدم {user?.name}</AvatarFallback>
          </Avatar>
          <input
            type="file"
            hidden
            accept=".png, .jpg, .jpeg, .gif"
            id="file"
            onChange={(e) => handleChangeImage(e, "image")}
          />
          <Button
            variant={"light-form-btn"}
            size={"icon"}
            className="!absolute top-3/4 right-0 shadow-md"
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
        <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Input className="bg-sub-card">
            <Image src={UserIcon} alt="lock-icon" />
            <input
              type="text"
              placeholder="إسم المستخدم"
              className="input"
              dir="rtl"
              value={profile.name}
              maxLength={25}
              onChange={(e) => {
                setProfile((prev: TProfile) => ({
                  ...prev,
                  name: e.target.value,
                }));
                setIsDirty(true);
              }}
            />
          </Input>
          <Input
            className="items-center bg-sub-card cursor-pointer hover:bg-page transition-colors duration-300 ease-in-out"
            onClick={() => setShowChangeRoleRequest((p) => !p)}
          >
            <input
              type="text"
              value={roles[profile.role]}
              className="input opacity-50 cursor-pointer"
              readOnly
            />
          </Input>
          <Input className="bg-sub-card md:col-span-2 lg:col-span-1">
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
            maxLength={200}
            value={profile.bio}
            onChange={(e) => {
              setProfile((prev: TProfile) => ({
                ...prev,
                bio: e.target.value,
              }));
              setIsDirty(true);
            }}
          ></textarea>
        </Input>
        <Button variant={`main`} size={"lg"} className="mt-3 text-lg" onClick={handleSaveChanges}>
          حفظ التغييرات
        </Button>
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeOnClick
        closeButton={false}
        rtl
      />
      {showChangeRoleRequest && user.role !== "admin" && (
        <ChangeRole setShowChangeRoleRequest={setShowChangeRoleRequest} />
      )}
    </Container>
  );
}

type ChangeRoleProps = {
  setShowChangeRoleRequest: Dispatch<SetStateAction<boolean>>;
};

function ChangeRole({ setShowChangeRoleRequest }: ChangeRoleProps) {
  const { user } = useUser({ required: true });
  const [role, setRole] = useState(user?.role || "");
  useEffect(() => {
    setRole(user?.role);
  }, [user]);
  function handleClosePopup(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("overlay")) {
      setShowChangeRoleRequest(false);
    }
  }
  async function handleChangeUserRole() {
    console.log({ role, userRole: user.role });
    if (role === user.role) {
      setShowChangeRoleRequest(false);
      return;
    }

    const res = await axios.post("/api/request-new-role", {
      email: user.email,
      role,
    });
    if (res.data.error) {
      toast(res.data.error, { type: "error" });
      return;
    }
    // TODO: Give User Feedback about his request
    toast("تم إرسال طلب تغيير المنصب بنجاح سيتم مراجعته في اقرب وقت", {
      type: "success",
    });
    setShowChangeRoleRequest(false);
  }
  return (
    <div className="overlay" onClick={handleClosePopup}>
      <Container>
        <Input className="bg-card shadow-2xl">
          <select
            className="bg-card text-slate-300 p-2 rounded-xl w-full border-none outline-none"
            onChange={(e) => setRole(e.target.value as UserRole)}
            value={role}
          >
            <option value="user">مستخدم</option>
            <option value="artist">فنان</option>
            <option value="editor">محرر</option>
            <option value="admin">مسؤول</option>
          </select>
        </Input>
        <Button
          variant="danger"
          className="mx-auto mt-5"
          onClick={() => handleChangeUserRole()}
        >
          إرسال طلب تعديل المنصب
        </Button>

        <ToastContainer
          theme="dark"
          position="bottom-right"
          closeButton={false}
          closeOnClick={true}
          rtl
        />
      </Container>
    </div>
  );
}
