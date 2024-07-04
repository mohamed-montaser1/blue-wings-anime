"use client";
import { Avatar, Button, Container } from "@/components";
import useFetch from "@/hooks/useFetch";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TableBodyData, TableHeadData } from "../users/page";
import Image from "next/image";
import { TChangeRoleRequest } from "@/models/ChangeRoleRequest";
import { nanoid } from "nanoid";
import { SettingsIcon } from "@icons/index";
import DateController from "@/utils/date";
import { TUser } from "@/lib/types";
import { TbUvIndex } from "react-icons/tb";
import { roles } from "@/components/Account/AccountInfo";
import useUser from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function NewRoleRequests() {
  const [requests, setRequests] = useState<TChangeRoleRequest[]>([]);
  const [render, setRender] = useState(0);
  const { user } = useUser({ required: true });

  useEffect(() => {
    (async function () {
      const response = await useFetch("/api/request-new-role", "GET", {});
      setRequests(response.data.data);
    })();
  }, [render]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      redirect("/");
    }
  }, [user]);

  return (
    <div className="flex justify-center flex-1">
      {requests.length < 1 && (
        <h1 className="text-slate-200 text-4xl text-center mt-5">
          لا يوجد أي طلبات جديده
        </h1>
      )}
      {requests.length > 0 && (
        <table className="container my-16 h-fit">
          <thead className="border">
            <tr>
              <TableHeadData content="الصورة الشخصيه" />
              <TableHeadData content="إسم المستخدم" />
              <TableHeadData content="البريد الإلكتروني" />
              <TableHeadData content="المنصب القديم" />
              <TableHeadData content="المنصب المطلوب" />
              <TableHeadData content="تاريخ الطلب" />
              <TableHeadData content="التحكم" />
            </tr>
          </thead>
          <tbody>
            {requests.map((request, i) => (
              <UserData
                index={i}
                request={request}
                key={i}
                setRender={setRender}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

type UserDataProps = {
  index: number;
  request: TChangeRoleRequest;
  setRender: Dispatch<SetStateAction<number>>;
};

function UserData({ index, request, setRender }: UserDataProps) {
  const [isActive, setIsActive] = useState(false);
  const SettingsRef = useRef<HTMLDivElement | null>(null);

  async function confirmRequest() {
    // TODO: Send Request To API To Confirm Request
    // TODO: Send User Email In The Request Body
    // TODO: Give User Feedback About His Request
    // TODO: Re Render The Table To Display The Updated Data
    const form = new FormData();
    form.set("email", String(request.user.email));
    useFetch("/api/confirm-role", "POST", form)
      .then((res) => {
        if (res.status === 200) {
          toast("تم حفظ المنصب الجديد بنجاح", { type: "success" });
          setRender((p) => p + 1);
        }
      })
      .catch((error) => {
        console.log({
          error,
          msg: "Error while send confirm request to the server",
        });
      });
  }

  return (
    <tr key={index} className="border">
      <TableBodyData key={nanoid()}>
        <div className="p-4">
          <Avatar size={50} image={request.user.image} />
        </div>
      </TableBodyData>
      <TableBodyData key={nanoid()}>
        <span>{request.user.name}</span>
      </TableBodyData>
      <TableBodyData key={nanoid()}>
        <span>{request.user.email}</span>
      </TableBodyData>
      <TableBodyData key={nanoid()}>
        <span>{roles[request.role]}</span>
      </TableBodyData>
      <TableBodyData key={nanoid()}>
        <span>{roles[request.newRole]}</span>
      </TableBodyData>
      <TableBodyData key={nanoid()}>
        <span>{new DateController(request.requestDate).fromNow()}</span>
      </TableBodyData>
      <TableBodyData key={nanoid()}>
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
            variant="primary"
            className="!text-base max-w-full"
            onClick={confirmRequest}
          >
            تأكيد الطلب
          </Button>
          <Button variant="danger" className="!text-base max-w-full">
            رفض الطلب
          </Button>
        </div>
      </TableBodyData>
    </tr>
  );
}
