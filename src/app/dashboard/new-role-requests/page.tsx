"use client";
import { Button } from "@/components";
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
import { TChangeRoleRequest } from "@/models/ChangeRoleRequest";
import { TUser } from "@/models/User";
import DateController from "@/utils/date";
import { Avatar, AvatarImage } from "@components/Ui/Avatar";
import { SettingsIcon } from "@icons/index";
import axios from "axios";
import { nanoid } from "nanoid";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function NewRoleRequests() {
  const [requests, setRequests] = useState<TChangeRoleRequest[]>([]);
  const [render, setRender] = useState(0);
  const { user } = useUser({ required: true });

  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/request-new-role");
      if (res.data.error) {
        toast(res.data.error, { type: "error" });
        return;
      }
      setRequests(res.data.data);
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
        <>
          <Table className="w-4/5 mx-auto border border-primary">
            <TableHeader>
              <TableRow className="border-b-primary">
                <TableHead className="text-center border border-primary">
                  الصورة الشخصية
                </TableHead>
                <TableHead className="text-center border border-primary">
                  إسم المستخدم
                </TableHead>
                <TableHead className="text-center border border-primary">
                  البريد الإلكتروني
                </TableHead>
                <TableHead className="text-center border border-primary">
                  المنصب القديم
                </TableHead>
                <TableHead className="text-center border border-primary">
                  المنصب المطلوب
                </TableHead>
                <TableHead className="text-center border border-primary">
                  تاريخ الطلب
                </TableHead>
                <TableHead className="text-center border border-primary">
                  التحكم
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request, i) => {
                if (!request.user || !request.user.email) return;
                return (
                  <UserData
                    index={i}
                    request={request}
                    key={i}
                    setRender={setRender}
                  />
                );
              })}
            </TableBody>
          </Table>
        </>
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
  const [user, setUser] = useState<TUser | null>(null);
  const SettingsRef = useRef<HTMLDivElement | null>(null);

  async function confirmRequest() {
    // TODO: Send Request To API To Confirm Request
    // TODO: Send User Email In The Request Body
    // TODO: Give User Feedback About His Request
    // TODO: Re Render The Table To Display The Updated Data
    const form = new FormData();
    form.set("email", String(user?.email));
    axios
      .post("/api/confirm-role", form)
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

  useEffect(() => {
    if (!request.user) {
      setUser(null);
      return;
    }
    setUser(request.user);
  }, [request.user, user]);

  return (
    <TableRow className="border-b-primary">
      <TableCell className="text-center border border-primary">
        <Avatar size="lg" className="mx-auto">
          <AvatarImage
            size="lg"
            src={user?.image}
            alt={`${user?.name}-${nanoid()}`}
          />
        </Avatar>
      </TableCell>
      <TableCell className="text-center border border-primary">
        {user?.name}
      </TableCell>
      <TableCell className="text-center border border-primary">
        {user?.email}
      </TableCell>
      <TableCell className="text-center border border-primary">
        {roles[request.role]}
      </TableCell>
      <TableCell className="text-center border border-primary">
        {roles[request.newRole]}
      </TableCell>
      <TableCell className="text-center border border-primary">
        {new DateController(request.requestDate).fromNow()}
      </TableCell>
      <TableCell className="text-center border border-primary relative">
        <Button
          variant="form-btn"
          className="mx-auto my-3"
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
              variant="default"
              className="!text-base max-w-full"
              onClick={confirmRequest}
            >
              تأكيد الطلب
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
