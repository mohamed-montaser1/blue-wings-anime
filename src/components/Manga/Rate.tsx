"use client";

import React, { useReducer } from "react";
import { Button, Container, Input, Title } from "@components";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Plain from "@icons/plain";
import { defaultState, ratingReducerFn } from "@reducers/rate";
import useUser from "@hooks/useUser";
import { TManga } from "@/models/Manga";
import { toast } from "react-toastify";
import useFetch from "@/hooks/useFetch";

type TProps = {
  data: TManga;
};

export default function Rate({ data }: TProps) {
  const [state, dispatch] = useReducer(ratingReducerFn, defaultState);
  const { user } = useUser({ required: false });

  async function handleSaveRate() {
    if (!state.rating) {
      toast.error("يجب عليك تحديد عدد النجوم في التقييم");
      return;
    }
    if (state.text.trim().length < 1) {
      toast.error("يجب عليك كتابة ما لا يقل عن 10 حروف في نص التقييم");
      return;
    }

    const res = await useFetch(`/api/manga/${data.slug}/rate`, "POST", {
      stars: state.rating,
      text: state.text,
      user_name: user.slug_name,
    });

    console.log({ res })
  }

  return (
    <div className="my-24">
      <Container className="">
        <Title className="mx-auto">قيم العمل الآن</Title>
        <div className="large">
          <Rater
            interactive
            total={5}
            rating={0}
            onRate={({ rating }) => {
              dispatch({
                type: "SET_RATING",
                payload: { text: state.text, rating },
              });
            }}
          />
        </div>
        <Input className="!w-fit mx-auto mt-5">
          <textarea
            placeholder="أكتب سبب تقييمك"
            className="w-96 h-40 bg-transparent resize-none outline-none text-white"
            value={state.text}
            onChange={(e) =>
              dispatch({
                type: "SET_TEXT",
                payload: { rating: state.rating, text: e.target.value },
              })
            }
          ></textarea>
        </Input>
        <Button
          variant="form-btn"
          className="mx-auto mt-4 px-16"
          // onClick={() => console.log("DONE ===>", state)}
          onClick={handleSaveRate}
        >
          <span>تقييم</span>
          <Plain color="white" />
        </Button>
      </Container>
    </div>
  );
}
