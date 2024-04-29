import { TUseUserReturn, TUseUserProps } from "@/lib/types";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import defaultAvatar from "@/../public/uploads/default-profile.jpeg";
import { useRouter } from "next/navigation";

export default function useUser({ required }: TUseUserProps): TUseUserReturn {
  // main goal is to get user data from the server
  const router = useRouter();
  const { data: session, status } = useSession({
    required: typeof required === "undefined" ? false : required,
    onUnauthenticated() {
      // redirect to login page
      router.push("/login");
    },
  });

  const user: Session["user"] = session?.user;
  const avatar = user?.image.startsWith("https") ? user?.image : defaultAvatar;

  return { user: user, status, avatar };
}
