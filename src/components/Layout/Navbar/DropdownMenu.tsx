import { TDropdownMenuProps, TDropdownOptionProps } from "@lib/types";
import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";
import { nanoid } from "nanoid";
import useUser from "@/hooks/useUser";

function DropdownMenu({ children, userName }: TDropdownMenuProps) {
  const { avatar } = useUser({ required: true });
  return (
    <div className="shadow-xl rounded-lg bg-card md:bg-sub-card md:rounded-xl absolute top-full left-0 mt-6 min-w-64 w-full min-h-14 z-50">
      <Link
        href={"#"}
        id="DropdownOption"
        className={`rounded-xl w-full p-4 bg-secondary-800 rounded-b-none select-none flex items-center gap-4`}
      >
        <Image src={avatar} className={`rounded-full w-12 aspect-square`} alt="icon" width={50} height={50} />
        <span className="text-white text-sm">مرحبا {userName.split(" ")[0]}</span>
      </Link>
      <div id="DropdownMenu" className="flex flex-col gap-2 md:p-2">
        {children}
      </div>
    </div>
  );
}

function DropdownOption({ icon, text, imageProps, base, href, onClick, ...props }: TDropdownOptionProps) {
  return (
    <Link
      href={href}
      id={`DropdownOption_${nanoid()}`}
      onClick={onClick}
      className={`rounded-xl w-full transition-colors duration-300 ease-in-out p-4 ${
        !base ? "hover:bg-card" : "bg-secondary-800 rounded-b-none"
      } select-none flex items-center gap-4`}
      {...props}
    >
      <Image src={icon} className={`rounded-full ${props.className}`} alt="icon" {...imageProps} />
      <span className="text-white text-sm">{parse(text)}</span>
    </Link>
  );
}

export { DropdownMenu, DropdownOption };
