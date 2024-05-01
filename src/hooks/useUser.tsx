import { TUseUserReturn, TUseUserProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import defaultAvatar from "@/../public/uploads/default-profile.jpeg";
import { useRouter } from "next/navigation";

// main goal is to get user data from the server
export default function useUser({ required }: TUseUserProps): TUseUserReturn {
  const router = useRouter();
  const { data: session, status } = useSession({
    required,
    onUnauthenticated() {
      // redirect to login page
      router.push("/login");
    },
  });

  const user: TUseUserReturn["user"] = session?.user;
  let avatar;

  if (typeof user?.image === "string") {
    avatar = user?.image;
  } else {
    avatar = defaultAvatar;
  }
  return { user: user, status, avatar };
}
