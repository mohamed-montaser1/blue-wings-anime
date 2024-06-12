"use client";

import { Bio, Posts } from "@components/Account";
import { Container, AccountInfo } from "@components";

export default function AccountPage() {
  return (
    <Container>
      <AccountInfo />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <Bio />
        <Posts />
      </div>
    </Container>
  );
}
