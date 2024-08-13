import React, { createContext, useState } from "react";

type TCreatePostContext = {
  images: string[];
  phase: "text" | "images";
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setPhase: React.Dispatch<React.SetStateAction<"text" | "images">>;
};

type TProps = {
  children: React.ReactNode;
};

export const createPostContext = createContext<TCreatePostContext>({
  images: [],
  phase: "images",
  setImages: () => {},
  setPhase: () => {},
});

export function CreatePostContext({ children }: TProps) {
  const [images, setImages] = useState<string[]>([]);
  const [phase, setPhase] = useState<TCreatePostContext["phase"]>("images");
  return (
    <createPostContext.Provider value={{ images, phase, setImages, setPhase }}>
      {children}
    </createPostContext.Provider>
  );
}
