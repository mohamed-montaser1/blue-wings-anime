import React from "react";
import ListItem from "./ListItem";
import { Container, Button } from "@components";

export default function FilterBar() {
  return (
    <div className="filter-bar mt-3 mb-9 hidden md:block">
      <Container className="bg-card rounded-3xl lg:px-[33px] flex items-center justify-between min-h-[100px] py-4 gap-4 max-[546px]:flex-col !px-6">
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
          size={"xl"}
          className="lg:text-xl md:text-lg sm:text-sm"
        >
          كل المانجا
        </Button>
      </Container>
    </div>
  );
}
