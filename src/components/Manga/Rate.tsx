"use client";

import React, { useReducer } from "react";
import { Button, Container, Input, Title } from "..";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Plain from "@/../public/icons/plain";
import { defaultState, ratingReducerFn } from "@/reducers/rate";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";

export default function Rate() {
  const [state, dispatch] = useReducer(ratingReducerFn, defaultState);
  const { user } = useUser({ required: false });
  const pathname = usePathname();
  const paths = pathname.split("/");
  const slug = paths.at(-1);

  return (
    <div>
      <Container className="mt-24">
        <Title className="mx-auto">قيم العمل الآن</Title>
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
          onClick={() =>
            dispatch({
              type: "SAVE",
              payload: { rating: state.rating, text: state.text, user, slug },
            })
          }
        >
          <span>تقييم</span>
          <Plain color="white" />
        </Button>
      </Container>
    </div>
  );
}
