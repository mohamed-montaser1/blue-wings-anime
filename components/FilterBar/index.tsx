import React from "react";
import Container from "../Container";
import Button from "../Button";
import Link from "next/link";

export default function FilterBar() {
  return (
    <div className="filter-bar mt-3 mb-9">
      <Container className="bg-card rounded-lg lg:px-[33px] flex items-center justify-between min-h-[100px] py-4 gap-4 max-[546px]:flex-col">
        <ul className="list flex gap-[50px] max-[991px]:gap-6 lg:text-xl text-white flex-wrap">
          <li>
            <Link href="#">أكشن</Link>
          </li>
          <li>
            <Link href="#">إيسيكاي</Link>
          </li>
          <li>
            <Link href="#">اثاره</Link>
          </li>
          <li>
            <Link href="#">اختبار</Link>
          </li>
          <li>
            <Link href="#">اعادة تجسيد</Link>
          </li>
          <li>
            <Link href="#">تنانين</Link>
          </li>
        </ul>
        <Button
          variant="main"
          className="px-16 py-[10px] lg:text-xl md:text-lg sm:text-sm max-[546px]:w-full flex justify-center"
        >
          كل المانجا
        </Button>
      </Container>
    </div>
  );
}
