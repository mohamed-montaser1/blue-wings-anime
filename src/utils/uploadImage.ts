import axios, { AxiosError } from "axios";

type TUploadImage = Promise<string>;

export default function uploadImage(image: File): TUploadImage {
  const form = new FormData();
  form.append("image", image);
  return axios
    .post(`/api/uploads`, form)
    .then((res) => res.data.filename)
    .catch((err) => ({ error: err, success: false }));
}
