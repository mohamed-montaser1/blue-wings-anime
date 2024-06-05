import React from "react";
import { Button } from "@components";

export default function MangaWatchingHistory() {
  const DEMO_HISTORY_DATA: string[] = [
    "I Can Control All Opportunities 1",
    "Hunter X Hunter",
  ];
  return (
    <div className="bg-card p-4 rounded-lg" style={{ gridArea: "history" }}>
      <h2 className="text-slate-300 text-xl">تاريخ تصفحك للمانجا</h2>
      <ul className="my-4">
        {DEMO_HISTORY_DATA.map((el, i) => (
          <li
            key={i}
            className="border-y border-sub-card border-solid text-slate-200 text-lg py-2"
          >
            {el}
          </li>
        ))}
      </ul>
      <Button variant="main" className="mx-auto">
        عرض كل تاريخ التصفح
      </Button>
    </div>
  );
}
