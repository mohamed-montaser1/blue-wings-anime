"use client";
import { Button, Container, Input } from "@/components";
import { roles } from "@/components/Account/AccountInfo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Ui/table";
import useUser from "@/hooks/useUser";
import { TUser, UserRole } from "@/models/User";
import { Avatar, AvatarFallback, AvatarImage } from "@components/Ui/Avatar";
import { SettingsIcon } from "@icons/index";
import axios, { AxiosError } from "axios";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsersAC() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [render, setRender] = useState(0);

  const { user } = useUser({ required: true });

  useEffect(() => {
    async function getUsers() {
      const res = await axios.get("/api/all");
      const data = res.data.users;
      const users = data.filter((user: TUser) => user.role !== "admin");
      setUsers(users);
    }
    getUsers();
  }, [render]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      redirect("/");
    }
  }, [user]);

  return (
    <div className="flex items-center flex-1 flex-col my-11 gap-6">
      {users.length < 1 && (
        <h1 className="text-slate-200 text-4xl text-center mt-5">
          لا يوجد أي مستخدمين
        </h1>
      )}
      {users.length > 0 && (
        <>
          <Table className="w-4/5 mx-auto border border-primary">
            <TableHeader>
              <TableRow className="border-b-primary">
                <TableHead
                  key={nanoid()}
                  className="text-center border border-primary"
                >
                  الصورة الشخصية
                </TableHead>
                <TableHead
                  key={nanoid()}
                  className="text-center border border-primary"
                >
                  الإسم
                </TableHead>
                <TableHead
                  key={nanoid()}
                  className="text-center border border-primary"
                >
                  البريد الإلكتروني
                </TableHead>
                <TableHead
                  key={nanoid()}
                  className="text-center border border-primary"
                >
                  المنصب
                </TableHead>
                <TableHead
                  key={nanoid()}
                  className="text-center border border-primary"
                >
                  الملف الشخصي
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u, i) => {
                if (u?.email === user?.email) return;
                return (
                  <UserData
                    key={nanoid()}
                    index={i}
                    setRender={setRender}
                    setSelectedUser={setSelectedUser}
                    setShowRolePopup={setShowRolePopup}
                    user={u}
                  />
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
      {showRolePopup && (
        <RolePopup
          selectedUser={selectedUser}
          setShowRolePopup={setShowRolePopup}
          setRender={setRender}
        />
      )}

      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeButton={false}
        closeOnClick={true}
        rtl
      />
    </div>
  );
}

function UserData({
  user,
  index,
  setShowRolePopup,
  setSelectedUser,
  setRender,
}: UserDataProps) {
  const SettingsRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  async function handleEditRole(e: any, user: TUser) {
    setShowRolePopup(true);
    setSelectedUser(user);
  }

  async function handleRemoveAccount() {
    try {
      await axios.delete(`/api/user/${user.slug_name}`);
      setRender((prev) => prev + 1);
      toast.success("تم حذف الحساب بنجاح");
    } catch (error) {
      let e = error as unknown as AxiosError;
      console.log({ error });
      switch (e.response?.status) {
        case 404:
          toast.error("لا يوجد مستخدم بهذا الإسم !");
          break;
        case 500:
          toast.error(
            "حدث خطأ ما في الخادم أثناء محاولة حذف هذا المستخدم يرجى المحاوله لاحقاً"
          );
          break;
      }
    }
  }

  return (
    <TableRow className="border-b-primary">
      <TableCell className="text-center border border-primary">
        <Avatar className="mx-auto" size="lg">
          <AvatarImage src={user.image} size="lg" />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((e) => e[0].toUpperCase())
              .join("")}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="text-center border border-primary">
        {user.name}
      </TableCell>
      <TableCell className="text-center border border-primary">
        {user.email}
      </TableCell>
      <TableCell className="text-center border border-primary">
        {roles[user.role]}
      </TableCell>
      <TableCell className="text-center border border-primary relative">
        <Button
          variant={"form-btn"}
          onClick={() => setIsActive((prev) => !prev)}
        >
          <Image src={SettingsIcon} alt={`settings-icon-${nanoid()}`} />
        </Button>
        {isActive && (
          <div
            className={`flex absolute w-44 min-h-fit p-4 bg-card z-50 top-full left-0 rounded-xl flex-col items-stretch gap-3 shadow-2xl`}
            ref={SettingsRef}
          >
            <Button
              variant="light-form-btn"
              className="!text-base max-w-full"
              onClick={(e) => handleEditRole(e, user)}
            >
              تعديل المنصب
            </Button>
            <Link
              href={`/user/${user.slug_name}`}
              className="max-w-full inline-block"
            >
              <Button
                variant="light-form-btn"
                className="!text-base !w-full !max-w-full"
              >
                زيارة الحساب
              </Button>
            </Link>
            <Button
              variant="danger"
              className="!text-base max-w-full"
              onClick={handleRemoveAccount}
            >
              حذف الحساب
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}

type Props = {
  selectedUser: TUser | null;
  setShowRolePopup: Dispatch<SetStateAction<boolean>>;
  setRender: Dispatch<SetStateAction<number>>;
};

function RolePopup({ selectedUser, setShowRolePopup, setRender }: Props) {
  const [role, setRole] = useState<UserRole>(selectedUser?.role || "user");

  async function handleChangeUserRole() {
    if (role === selectedUser?.role) {
      setShowRolePopup(false);
      return;
    }
    const res = await axios.put(`/api/user/edit/${selectedUser?.email}`, {
      role,
    });
    if (res.data.error) {
      toast.error(res.data.error);
      return;
    }
    if (res.status === 201) {
      setShowRolePopup(false);
      toast(`تم تعديل بيانات ${selectedUser?.name.split(" ")[0]} بنجاح`, {
        type: "success",
      });
      setRender((prev) => prev + 1);
      return;
    }
    toast(
      `حدث خطأ أثناء تعديل بيانات المستخدم ${selectedUser?.name.split(" ")[0]}`,
      {
        type: "error",
      }
    );
    toast("عاود المحاولة لاحقاً", { type: "error" });
  }

  function handleClosePopup(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("overlay")) {
      setShowRolePopup(false);
    }
  }

  return (
    <div className="overlay" onClick={handleClosePopup}>
      <Container>
        <Input className="bg-sub-card shadow-lg">
          <select
            className="bg-sub-card text-slate-300 p-2 rounded-xl w-full border-none outline-none"
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
          حفظ المنصب الجديد
        </Button>
      </Container>
    </div>
  );
}

type UserDataProps = {
  user: TUser;
  index: number;
  setShowRolePopup: Dispatch<SetStateAction<boolean>>;
  setSelectedUser: Dispatch<SetStateAction<TUser | null>>;
  setRender: Dispatch<SetStateAction<number>>;
};
