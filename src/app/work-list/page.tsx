"use client";

import {
  Container,
  Title,
  WorkListContainer,
  WorkListFilterBar,
} from "@components";

export default function WorkList() {
  return (
    <Container className="py-20 min-h-screen">
      <Title className="mx-auto">صفحة الأعمال</Title>
      <WorkListFilterBar />
      <WorkListContainer />
    </Container>
  );
}
