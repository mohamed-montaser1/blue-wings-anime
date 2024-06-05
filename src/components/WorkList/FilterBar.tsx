import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@components";

const FILTER_ITEMS_DATA: FilterItemProps[] = [
  { query: "newest", name: "الأحدث" },
  { query: "oldest", name: "الأقدم" },
  { query: "highest-rating", name: "الأعلى تقييماً" },
  { query: "lowest-rating", name: "الأقل تقييماً" },
];

export default function WorkListFilterBar() {
  const searchParams = useSearchParams();
  let query = searchParams.get("query");
  const [showFilters, setShowFilters] = useState(false);
  console.log(query);
  return (
    <div className="mt-16 flex justify-between">
      <h1 className="text-white text-2xl font-semibold">فلاتر البحث</h1>
      <div className="relative">
        <Button
          variant="form-btn"
          className="h-fit"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          فلاتر
        </Button>
        {showFilters && (
          <ul className="bg-card rounded-xl text-white p-2 border-none outline-none flex flex-col gap-2 absolute left-0 px-4 top-[120%] min-w-60">
            {FILTER_ITEMS_DATA.map((item) => (
              <FilterItem
                query={item.query}
                name={item.name}
                key={Math.random()}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type FilterItemProps = {
  query: string;
  name: string;
};

function FilterItem({ query, name }: FilterItemProps) {
  return (
    <li className="text-lg">
      <Link
        href={`?query=${query}`}
        className="hover:text-primary transition-colors duration-300 ease-out"
      >
        {name}
      </Link>
    </li>
  );
}
