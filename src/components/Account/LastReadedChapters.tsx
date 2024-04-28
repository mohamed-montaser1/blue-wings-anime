import { Button, Container } from "..";
import React from "react";
import { Title } from "..";

export default function LastReadedChapters() {
  return (
    <Container className="mt-24">
      <Title lineSize="small" className="mx-auto">
        آخر الفصول المقروءة
      </Title>

      <div className="rounded-md border-secondary border-[1px] p-3 mt-10">
        <ul>
          {Array.from({ length: 4 }).map((x, i) => (
            <Chapter key={i} text="I Can Control All Opportunities 1" />
          ))}
        </ul>
        <Button variant="main" className="mx-auto mt-14">
          عرض المزيد
        </Button>
      </div>
    </Container>
  );
}

type ChapterProps = {
  text: string;
};

function Chapter({ text }: ChapterProps) {
  return (
    <>
      <li className="text-white text-lg p-4">{text}</li>
      <div className="h-[1px] w-full bg-secondary"></div>
    </>
  );
}
