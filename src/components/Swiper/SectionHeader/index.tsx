import React from "react";
import { Title } from "@components";

interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      <Title center>{title}</Title>
    </div>
  );
}
