import Button from "@/components/Button";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Main>
        <h1 className="text-white text-[50px] text-center mt-20">404</h1>
        <p className="text-white text-center text-[30px]">
          هذه الصفحة غير موجودة ربما كانت وتم حذفها أو لم تكن موجودة
        </p>
        <Button
          variant="main"
          className="mx-auto mt-6"
          onClick={() => router.push("/")}
        >
          الذهاب للصفحة الرئيسية
        </Button>
      </Main>
    </>
  );
}
