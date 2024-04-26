interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
}

export default function Container({ children, ...props }: Props) {
  return (
    <div
      className={`w-full sm:w-[540px] md:w-[720px] px-[15px] mx-auto lg:w-[960px] xl:w-[1140px] xxl:w-[1320px] ${props.className}`}
    >
      {children}
    </div>
  );
}
