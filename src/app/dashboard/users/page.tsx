"use client";
import { Avatar, Button, Container, Input } from "@/components";
import { roles } from "@/components/Account/AccountInfo";
import { TableBodyData } from "@/components/Dashboard/TableBodyData";
import { TableHeadData } from "@/components/Dashboard/TableHeadData";
import useFetch from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";
import { TUser, UserRole } from "@/models/User";
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

export default function Users() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [admins, setAdmins] = useState<TUser[]>([]);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [render, setRender] = useState(0);

  const { user } = useUser({ required: true });

  useEffect(() => {
    async function getUsers() {
      const res = await axios.get("/api/all");
      const data = res.data.users;
      const userRole = data.filter((user: TUser) => user.role !== "admin");
      const adminRole = data.filter((user: TUser) => user.role === "admin");
      setAdmins(adminRole);
      setUsers(userRole);
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
          <div className="flex justify-between container">
            <h1 className="text-slate-200 text-xl text-center">
              <span>عدد المستخدمين:</span>
              <span> {users.length}</span>
            </h1>
            <h1 className="text-slate-200 text-xl text-center">
              <span>عدد المسؤولين:</span>
              <span> {admins.length}</span>
            </h1>
          </div>
          <table className="container h-fit">
            <thead className="border">
              <tr>
                <TableHeadData content="الصوره الشخصيه" key={nanoid()} />
                <TableHeadData content="الإسم" key={nanoid()} />
                <TableHeadData content="البريد الإلكتروني" key={nanoid()} />
                <TableHeadData content="المنصب" key={nanoid()} />
                <TableHeadData content="الملف الشخصي" key={nanoid()} />
              </tr>
            </thead>
            <tbody className="border">
              {users.map((u, i) => {
                if (u?.email === user?.email) return;
                return (
                  <UserData
                    user={u}
                    index={i}
                    key={i}
                    setShowRolePopup={setShowRolePopup}
                    setSelectedUser={setSelectedUser}
                    setRender={setRender}
                  />
                );
              })}
            </tbody>
          </table>
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
    <tr key={index} className="border">
      <TableBodyData>
        <Avatar size={50} image={user.image} />
      </TableBodyData>
      <TableBodyData>{user.name}</TableBodyData>
      <TableBodyData>{user.email}</TableBodyData>
      <TableBodyData>{roles[user.role]}</TableBodyData>
      <TableBodyData>
        <Button
          variant="form-btn"
          className="mx-auto my-3"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <Image src={SettingsIcon} alt={`settings-icon-${nanoid()}`} />
        </Button>
        <div
          className={`absolute w-44 min-h-fit p-4 bg-card z-50 top-full left-0 rounded-xl flex-col items-stretch gap-3 shadow-2xl ${
            isActive ? "flex" : "hidden"
          }`}
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
      </TableBodyData>
    </tr>
  );
}
