import { StarIcon } from "@icons/index";
import Image from "next/image";
import React from "react";
import Button from "../../Ui/Button";

export default function PremiumMember() {
  return (
    <div
      className="bg-card p-4 rounded-lg max-w-[832px] h-fit"
      style={{ gridArea: "membership" }}
    >
      <h2 className="flex gap-2 w-fit">
        <Image src={StarIcon} alt="star icon" />
        <span className="text-slate-300 text-xl">عضوية مميزة</span>
      </h2>
      <p className="text-slate-100 mt-3 text-lg">
        الآن يمكنك شراء العضويات المميزة لمتابعة عملكم هذا بالإضافة إلى
        أعمــــــالكم المُفضلة الأخرى, قبل صدورها علي أي موقع آخر وبجودة حسنة,
        كل هذا والمزيــــــــد دون اختصارات أو إعلانات مزعجة!
      </p>
      <Button variant="main" className="mt-3">
        إشترك الآن
      </Button>
    </div>
  );
}
