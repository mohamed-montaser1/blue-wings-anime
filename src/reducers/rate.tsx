import { Session } from "next-auth";

export type TRatingState = {
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

type TRatingAction<T> = {
  type: Type;
  payload: T;
};

export function ratingReducerFn(
  state: TRatingState,
  action: TRatingAction<TPayload>,
): TRatingState {
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
      return {
        ...state,
        text: action.payload.text,
      };
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
  // axios.post(`/rate/${id}`, {
  //   userId: user,
  // });
}
