import "@/app/globals.css";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
}

export default function Container({ children, ...props }: Props) {
  return <div className={`container ${props.className}`}>{children}</div>;
}
