import { TUseUserReturn, TUseUserProps, TUser } from "../lib/types";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// main goal is to get user data from the server
export default function useUser({ required }: TUseUserProps): TUseUserReturn {
  const router = useRouter();
  const [user, setUser] = useState<TUser>();
  // Get User Session From Next-Auth
  const {
    data: session,
    status,
    update,
  } = useSession({
    required,
    onUnauthenticated() {
      // redirect to login page
      router.push("/login");
    },
  });

  // Use useEffect to avoid too many renders caused by setting state directly in the component body
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user.email) return;
    setUser(session.user);
  }, [status]);

  const image = user?.image as string;

  function updateSession(
    properties: Partial<TUser>,
    cb: (session: Session | null) => void
  ) {
    const newUserAssign = Object.assign({}, user, properties);
    console.log({ newUserAssign });
    update({ ...session, user: Object.assign({}, user, properties) }).then(
      (newSession) => {
        console.log({ newSession, user: newSession?.user });
        setUser(newSession?.user);
        cb(newSession);
      }
    );
  }

  return { user, status, session, avatar: image, updateSession };
}
