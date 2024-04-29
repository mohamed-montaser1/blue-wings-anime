"use client";

import React, { useState } from "react";
import { Button, Container, Input, Title } from "..";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Image from "next/image";
import { PlainIcon } from "@/../public/icons";
import Plain from "../../../public/icons/plain";

export default function Rate() {
  const [rate, setRate] = useState({
    text: "",
    num: 0,
  });
  return (
    <div>
      <Container className="mt-24">
        <Title className="mx-auto">قيم العمل الآن</Title>
        <Rater
          interactive
          total={5}
          rating={0}
          onRate={({ rating }) => {
            setRate({ ...rate, num: rating });
          }}
        />
        <Input className="!w-fit mx-auto mt-5">
          <textarea
            placeholder="أكتب سبب تقييمك"
            className="w-96 h-40 bg-transparent resize-none outline-none text-white"
            value={rate.text}
            onChange={(e) => setRate({ ...rate, text: e.target.value })}
          ></textarea>
        </Input>
        <Button
          variant="form-btn"
          className="mx-auto mt-4 px-16"
          onClick={() => console.log("DONE ===>", rate)}
        >
          <span>تقييم</span>
          <Plain color="white" />
        </Button>
      </Container>
    </div>
  );
}
