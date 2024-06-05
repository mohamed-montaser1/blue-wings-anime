"use client";

import {
  Container,
  AccountInfo,
  LastReadedChapters,
  FavoriteManga,
  ReadingLater,
} from "@components";

export default function AccountPage() {
  return (
    <Container>
      <AccountInfo />
      <LastReadedChapters />
      <FavoriteManga />
      <ReadingLater />
    </Container>
  );
}
