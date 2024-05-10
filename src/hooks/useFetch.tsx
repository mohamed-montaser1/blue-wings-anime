import axios from "axios";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";
type ObjectInterface = {
  [key: string]: any;
};

export default function useFetch<DT extends ObjectInterface>(
  url: string,
  type: RequestMethod,
  body: DT
): Promise<DT> {
  return new Promise<DT>((resolve, reject) => {
    if (!type) reject("You Should Pass The Request Type");
    if (type === "POST" || type === "PUT") {
      if (!body) reject("You Should Pass The Request Body");
    }
    switch (type) {
      case "GET":
        handleGET<DT>(url)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        break;
      case "POST":
        handlePOST<DT>(url, body)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        break;
      case "PUT":
        handlePUT<DT>(url, body)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        break;
      case "DELETE":
        handleDELETE<DT>(url, body)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        break;
      default:
        reject("You Should Pass Valid Request Type");
        break;
    }
  });
}

function handleGET<T>(url: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .get<any, T>(url)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

function handlePOST<T extends ObjectInterface>(
  url: string,
  body: T
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .post<any, T, T>(url, body)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

function handlePUT<T extends ObjectInterface>(
  url: string,
  body: T
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .put<any, T>(url, body)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

function handleDELETE<T extends ObjectInterface>(
  url: string,
  body?: T
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .delete<any, T>(url, body)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}
