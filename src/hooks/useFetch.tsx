import axios from "axios";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type ObjectInterface = {
  [key: string]: any;
};
type TResponse<T> = { data: T };

export default function useFetch<
  DT extends ObjectInterface,
  RS extends ObjectInterface
>(url: string, type: RequestMethod, body: DT): Promise<TResponse<RS>> {
  return new Promise<TResponse<RS>>((resolve, reject) => {
    if (!type) reject("You Should Pass The Request Type");
    if (type === "POST" || type === "PUT") {
      if (!body) reject({ m: "You Should Pass The Request Body", body });
    }
    // Call The Correct Function Based On Fetch Method
    switch (type) {
      case "GET":
        handleGET<RS>(url)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        break;
      case "POST":
        handlePOST<DT, RS>(url, body)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        break;
      case "PUT":
        handlePUT<DT, RS>(url, body)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        break;
      case "DELETE":
        handleDELETE<DT, RS>(url, body)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        break;
      default:
        reject("You Should Pass Valid Request Type");
        break;
    }
  });
}

/**
 *
 * @param url the request url
 * @param body request body
 * @description send GET request to the {url}
 * @returns {Promise} promise with response data or with rejection error message
 */
function handleGET<T>(url: string): Promise<TResponse<T>> {
  return new Promise((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .get<any, TResponse<T>, T>(url)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

/**
 *
 * @param url the request url
 * @param body request body
 * @description send POST request to the {url} with data of {body} content and type
 * @returns {Promise} promise with response data or with rejection error message
 */
function handlePOST<T extends ObjectInterface, D extends ObjectInterface>(
  url: string,
  body: T
): Promise<TResponse<D>> {
  return new Promise((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .post<any, TResponse<D>, T>(url, body)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

/**
 *
 * @param url the request url
 * @param body request body
 * @description send PUT request to the {url} with data of {body} content and type
 * @returns {Promise} promise with response data or with rejection error message
 */
function handlePUT<T extends ObjectInterface, D extends ObjectInterface>(
  url: string,
  body: T
): Promise<TResponse<D>> {
  return new Promise((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .put<any, TResponse<D>, T>(url, body)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

/**
 * @param url the request url
 * @param body request body
 * @description send DELETE request to the {url} with data of {body} content and type
 * @returns {Promise} promise with response data or with rejection error message
 */
function handleDELETE<T extends ObjectInterface, D extends ObjectInterface>(
  url: string,
  body?: T
): Promise<TResponse<D>> {
  return new Promise((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .delete<any, TResponse<D>, T>(url, body)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}
