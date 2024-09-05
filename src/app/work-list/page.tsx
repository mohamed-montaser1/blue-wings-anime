"use client";

import {
  Container,
  Title,
  WorkListContainer,
  WorkListFilterBar,
} from "@components";

export default function WorkList() {
  return (
    <Container className="py-20">
      <Title className="mx-auto">قائمة الأعمال</Title>
      <WorkListFilterBar />
      <WorkListContainer />
    </Container>
  );
}
