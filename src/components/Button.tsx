interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: "main" | "";
}

interface Styles {
  [key: string]: string;
}

export default function Button({ children, variant, ...props }: Props) {
  let styles: Styles = {
    main: "from-main-color to-secondary-color bg-gradient-to-br",
  };
  let style = variant ? styles[variant] : "";
  return (
    <button
      {...props}
      className={`text-white text-[20px] px-[14px] py-[5px] rounded-[10px] flex items-center gap-[10px] ${style} ${props.className}`}
    >
      {children}
    </button>
  );
}
