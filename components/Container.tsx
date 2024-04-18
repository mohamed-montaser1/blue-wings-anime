interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  fluid?: boolean;
}

export default function Container({ children, fluid, ...props }: Props) {
  let normal = `w-full px-[15px] mx-auto ${props.className} lg:w-[960px] xl:w-[1140px] xxl:w-[1320px]`;
  let fluidClassNames = `w-full px-[15px] mx-auto`;
  return (
    <div {...props} className={fluid ? fluidClassNames : normal}>
      {children}
    </div>
  );
}
