import { Session } from "next-auth";

type TRatingState = {
  rating: number;
  text: string;
};

type Type = "SET_RATING" | "SET_TEXT" | "SAVE";

type TPayload = {
  rating: number;
  text: string;
  user?: Session["user"];
  slug?: string;
};

type TRatingAction<TP> = {
  type: Type;
  payload: TP;
};

export function ratingReducerFn(
  state: TRatingState,
  action: TRatingAction<TPayload>
) {
  switch (action.type) {
    case "SET_RATING":
      return {
        ...state,
        rating: action.payload.rating,
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.payload.text,
      };
    case "SAVE":
      saveRating(action.payload);
    default:
      return state;
  }
}

export const defaultState: TRatingState = {
  rating: 0,
  text: "",
};

type TSaveRateFn = any | void;

async function saveRating(payload: TPayload): Promise<TSaveRateFn> {
  const { rating, text, user, slug } = payload;

  console.log({ rating, text, user, slug });
  // const id = "";
  // axios.post(`/rate/${id}`, {
  //   userId: user,
  // });
}
