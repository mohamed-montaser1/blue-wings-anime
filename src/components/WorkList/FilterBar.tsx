import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Button, Container, Title } from "@components";
import {
  classifications,
  TClassification,
  TClassificationKey,
} from "@/utils/classifications";
import { manga_rating, manga_status, manga_types } from "@/models/Manga";
import star from "@icons/star.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
const classifications_keys = Object.keys(classifications);

const FILTER_ITEMS_DATA: FilterItemProps[] = [
  {
    name: "تصنيف العمل",
    query_name: "classification",
    content: classifications_keys.map((key, i) => ({
      title: classifications[key as TClassificationKey],
      query: key,
    })),
  },
  {
    name: "حالة العمل",
    query_name: "status",
    content: manga_status.map((status) => ({ title: status, query: status })),
  },
  {
    name: "نوع العمل",
    query_name: "type",
    content: manga_types.map((type) => ({ title: type, query: type })),
  },
  {
    name: "تقييم العمل",
    query_name: "rating",
    content: manga_rating.map((rate) => ({
      title: "star",
      query: rate,
    })),
  },
];

export default function WorkListFilterBar() {
  const searchParams = useSearchParams();
  let query = searchParams.get("query");
  const [showFilters, setShowFilters] = useState(false);
  console.log(query);
  return (
    <div className="bg-slate-400">
      <h2 className="font-bold text-2xl">التصفيات</h2>
      <div className="flex gap-1">
        {FILTER_ITEMS_DATA.map((el, i) => (
          <FilterItem
            name={el.name}
            query_name={el.query_name}
            content={el.content}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

type FilterItemProps = {
  name: string;
  query_name: string;
  content: {
    title: string;
    query: string | number;
  }[];
};

function FilterItem({ name, content }: FilterItemProps) {
  console.log({ content });
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-card text-slate-200">{name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-80 w-[400px] bg-red-500 relative">
        {content.map((el) => (
          <Button variant={"ghost"}>{el.title}</Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
