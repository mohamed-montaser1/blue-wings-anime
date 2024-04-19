interface Props {
  children: React.ReactNode;
  className?: string;
  active: boolean;
  link: string;
}

export default function MenuItem({ children, className, active, link }: Props) {
  return (
    <li>
      <a
        href={link}
        className={`flex items-center gap-[10px] text-[12px] cursor-pointer ${className} ${
          active ? "text-secondary-color text-[14px]" : "text-white"
        } hover:text-secondary-color transition-colors duration-300 ease-in`}
      >
        {children}
      </a>
    </li>
  );
}
