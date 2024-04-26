"use client";

import { Container } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AccountInfo from "@/components/AccountInfo";
import LastReadedChapters from "@/components/AccountInfo/LastReadedChapters";

export default function AccountPage() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);
  return (
    <Container>
      <AccountInfo />
      <LastReadedChapters />
    </Container>
  );
}
