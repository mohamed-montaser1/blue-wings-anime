import { type RefCallBack } from "react-hook-form";

declare module "react-hook-form" {
  type RefCallBack = {
    current: any
  } & RefCallBack
}