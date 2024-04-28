import React from "react";
import Container from "../Container";
import Button from "../Button";
import ListItem from "./ListItem";

export default function FilterBar() {
  return (
    <div className="filter-bar mt-3 mb-9">
      <Container className="bg-card rounded-3xl lg:px-[33px] flex items-center justify-between min-h-[100px] py-4 gap-4 max-[546px]:flex-col">
        <ul className="list flex gap-[50px] max-[991px]:gap-6 lg:text-xl text-white flex-wrap">
          <ListItem href="#">أكشن</ListItem>
          <ListItem href="#">إيسيكاي</ListItem>
          <ListItem href="#">اثاره</ListItem>
          <ListItem href="#">اختبار</ListItem>
          <ListItem href="#">اعادة تجسيد</ListItem>
          <ListItem href="#">تنانين</ListItem>
        </ul>
        <Button
          variant="main"
          className="!px-12 !py-[15px] lg:text-xl md:text-lg sm:text-sm max-[546px]:w-full flex justify-center hover:bg-opacity-80 transition-opacity ease-in-out duration-300"
        >
          كل المانجا
        </Button>
      </Container>
    </div>
  );
}
