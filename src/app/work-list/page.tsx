"use client";
import FilterBar from "@components/WorkList/FilterBar";
import { Container, Title } from "@components";
import React from "react";
import WorkListContainer from "@/components/WorkList/WorkListContainer";

export default function WorkList() {
  return (
    <Container className="py-20">
      <Title className="mx-auto">قائمة الأعمال</Title>
      <FilterBar />
      <WorkListContainer />
    </Container>
  );
}
