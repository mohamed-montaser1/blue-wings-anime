import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";

interface Props {
  children: React.ReactNode;
  className?: string;
  active: boolean;
  link: string;
}

export default function MenuItem({ children, className, active, link }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    if (pathname !== link) {
      animatePageOut(link, router);
    }
  };

  return (
    <li>
      <a
        onClick={handleClick}
        className={`flex items-center gap-2.5 text-sm cursor-pointer ${className} ${
          active ? "text-secondary text-sm" : "text-white"
        } hover:text-secondary transition-colors duration-300 ease-in`}
      >
        {children}
      </a>
    </li>
  );
}
