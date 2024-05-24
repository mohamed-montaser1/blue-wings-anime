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
    if (type === "POST" || (type === "PUT" && !body)) {
      reject("You Should Pass The Request Body");
    }
    // Call The Correct Function Based On Fetch Method
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

/**
 *
 * @param url the request url
 * @param body request body
 * @description send GET request to the {url}
 * @returns {Promise} promise with response data or with rejection error message
 */
function handleGET<T>(url: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (!url.trim()) reject("Please Pass a Valid Request URL");
    axios
      .get<any, T>(url)
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

/**
 *
 * @param url the request url
 * @param body request body
 * @description send PUT request to the {url} with data of {body} content and type
 * @returns {Promise} promise with response data or with rejection error message
 */
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

/**
 * @param url the request url
 * @param body request body
 * @description send DELETE request to the {url} with data of {body} content and type
 * @returns {Promise} promise with response data or with rejection error message
 */
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
