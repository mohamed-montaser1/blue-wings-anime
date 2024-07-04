import { Logo } from "@icons/index";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="p-4 flex flex-col items-center w-72 bg-card shadow-xl h-screen sticky right-0 top-0">
      <Link href={"/"} className="border-b-2 border-b-sub-card pb-4">
        <Image src={Logo} alt="logo" width={150} />
      </Link>
      <ul className="mt-5 flex flex-col gap-2">
        <SidebarLink
          href="/dashboard/users"
          content={"المستخدمين"}
          key={nanoid()}
        />
        <SidebarLink
          href="/dashboard/users"
          content={"تعديل أسماء الأقسام"}
          key={nanoid()}
        />
        <SidebarLink
          href="/dashboard/manga/create"
          content={"إنشاء مانجا"}
          key={nanoid()}
        />
        <SidebarLink
          href="/dashboard/manga/create"
          content={"حذف مانجا"}
          key={nanoid()}
        />
        <SidebarLink
          href="/dashboard/posts"
          content={"منشورات الرسامين"}
          key={nanoid()}
        />
        <SidebarLink
          href="/dashboard/new-role-requests"
          content={"طلبات تعديل المنصب"}
          key={nanoid()}
        />
        <SidebarLink
          href="/dashboard/new-role-requests"
          content={"تعديل الأعمال الأولية"}
          key={nanoid()}
        />
        <SidebarLink
          href="/dashboard/new-role-requests"
          content={"تعديل المدونه"}
          key={nanoid()}
        />
      </ul>
    </aside>
  );
}

type SidebarLinkProps = {
  href: string;
  content: string | JSX.Element;
  // icon: string | StaticImageData;
};

function SidebarLink({ href, content }: SidebarLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex justify-center gap-2 bg-sub-card p-4 rounded-2xl shadow-lg hover:bg-opacity-70 transition-all duration-300 ease-in-out"
      >
        {/* <Image src={icon} alt={nanoid()} /> */}
        <span className="text-slate-200">{content}</span>
      </Link>
    </li>
  );
}
