"use client";

import React, { useReducer, useRef } from "react";
import { Button, Container, Input, Title } from "@components";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Plain from "@icons/plain";
import { defaultState, ratingReducerFn } from "@reducers/rate";
import useUser from "@hooks/useUser";
import { TManga } from "@/models/Manga";
import { Id, toast } from "react-toastify";
import useFetch from "@/hooks/useFetch";
import axios, { AxiosError } from "axios";

type TProps = {
  data: TManga;
};

export default function Rate({ data }: TProps) {
  const [state, dispatch] = useReducer(ratingReducerFn, defaultState);
  const { user } = useUser({ required: false });
  const toastId = useRef<Id | null>(null);

  async function handleSaveRate() {
    toastId.current = toast.loading("جاري حفظ التقييم");
    if (!state.rating) {
      setTimeout(() => {
        toast.update(toastId.current as unknown as Id, {
          type: "error",
          render: "يجب تحديد عدد النجوم",
          autoClose: 3000,
          isLoading: false,
          closeOnClick: true,
        });
      }, 500);
      return;
    }
    if (state.text.trim().length < 10) {
      setTimeout(() => {
        toast.update(toastId.current as unknown as Id, {
          type: "error",
          render: "يجب عليك كتابة ما لا يقل عن 10 حروف في نص التقييم",
          autoClose: 3000,
          isLoading: false,
          closeOnClick: true,
        });
      }, 500);
      return;
    }

    try {
      const res = await axios.post(`/api/manga/${data.slug}/rate`, {
        stars: state.rating,
        text: state.text,
        user_name: user.slug_name,
      });
      if (res.status === 201) {
        toast.update(toastId.current, {
          type: "success",
          render: "تم حفظ التقييم بنجاح",
          autoClose: 3000,
          isLoading: false,
          closeOnClick: true,
        });
      }
      console.log({ res });
    } catch (error) {
      let e = error as unknown as AxiosError;
      switch (e.response?.status) {
        case 409:
          toast.update(toastId.current, {
            type: "error",
            render: "لقد قمت بكتابة تقييم سابق علي هذه المانجا",
            autoClose: 3000,
            isLoading: false,
            closeOnClick: true,
          });
          break;
      }
    }
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
