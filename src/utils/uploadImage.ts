import useFetch from "@hooks/useFetch";
import axios, { AxiosError } from "axios";

type TUploadImage = Promise<{ error: AxiosError; success: boolean } | string>;

export default function uploadImage(image: File, dir: string): TUploadImage {
  const form = new FormData();
  form.append("image", image);
  return axios
    .post(`/api/uploads/${dir}`, form)
    .then((res) => res.data.image)
    .catch((err) => ({ error: err, success: false }));
}
