"use client";
import { Button, Container, Input, Slide, Title } from "@/components";
import useFetch from "@/hooks/useFetch";
import { TManga } from "@/models/Manga";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Rater from "react-rater";

export default function CreateChapter() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<TManga[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setIsSearching(true);
    setResults([]);
    setQ(e.target.value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      // API Request here
      async function MatchedManga() {
        const res = await useFetch(`/api/manga?q=${e.target.value}`, "GET", {});
        setResults(res.data.manga);
        setIsSearching(false);
      }
      MatchedManga();
    }, 1000);

    setDebounceTimer(timer);
  }

  return (
    <Container className="py-7">
      <h1 className="text-3xl mb-10 text-slate-200 text-center font-bold">
        قم بإنشاء فصل جديد الآن
      </h1>
      <Title>التصفية</Title>
      <section className="filters flex gap-5">
        <Input className="flex-[4]">
          <input
            type="text"
            placeholder="التصفية بإسم العمل"
            className="text-slate-300 placeholder:text-slate-300 w-full h-full bg-transparent border-none outline-none"
            onChange={handleSearch}
          />
        </Input>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
        {isSearching && q.length > 1 && (
          <h2 className="text-slate-300 text-center text-2xl col-span-4">
            جاري البحث...
          </h2>
        )}
        {results.length === 0 && q.length > 0 && !isSearching && (
          <h2 className="text-slate-300 text-center text-2xl col-span-4">
            لا توجد نتائج بحث!
          </h2>
        )}
        {results.length === 0 && q.length === 0 && (
          <h2 className="text-slate-300 text-center text-2xl w-full col-span-4">
            قم بالبحث عن المانجا التي تريد إضافة فصل جديد بها
          </h2>
        )}
        {results.map((el, i) => (
          <Slide title="مانجا" key={i} image={el.credit}>
            <div className="mt-4">
              <h3 className="text-slate-200 text-lg">{el.name}</h3>
              <p className="text-slate-400">
                {el.story.substr(0, 100)}
                {el.story.length > 100 && "..."}
              </p>
              <Rater
                // @ts-ignore
                className="w-fit flex"
                total={5}
                rating={3}
                interactive={false}
              />
              <Link href={`/manga/${el.slug}/create-chapter`}>
                <Button variant="main" className="mt-3 !max-w-full w-full">
                  إنشاء فصل جديد
                </Button>
              </Link>
            </div>
          </Slide>
        ))}
      </section>
    </Container>
  );
}
