import { setting } from "~/setting";
import { Header } from "./interfaces/header";
import { Options } from "./interfaces/options";

// default headers
const defaultHeaders: Header[] = [
  {
    name: "Accept",
    value: "application/json",
  },
  {
    name: "Content-Type",
    value: "application/json",
  },
];

// base url
const baseUrl = setting.dashboard + "/api";

/**
 *
 * this function handel all request to the main server
 */
export async function callServer(url: string, options: Options = {}) {
  // full url
  const fullUrl = `${baseUrl}/${url}`;

  // set method
  const method = options.method || "GET";

  // headers
  const headers = new Headers();

  // set init headers
  for (const header of defaultHeaders) {
    headers.append(header.name, header.value);
  }

  // check for options header
  if (options && options.headers) {
    // set options header
    for (const header of options.headers) {
      headers.append(header.name, header.value);
    }
  }
  // handel request
  let response = null;

  if (method == "GET") {
    response = await fetch(fullUrl, {
      headers,
      method,
    });
  } else if (method == "POST") {
    // handel first data
    const data = options.data;
    let correctData = null;

    if (options.dataType == "form") {
      correctData = new FormData();

      for (const key in data) {
        correctData.append(key, data[key]);
      }
    } else {
      correctData = JSON.stringify(data);
    }
    response = await fetch(fullUrl, {
      headers,
      method,
      body: correctData,
    });
  }

  // final data
  let finalData = null;
  try {
    await response?.json().then((data) => {
      finalData = data;
    });
  } catch {}

  // console.log(response)
  return {
    status: response?.status,
    data: finalData,
    response,
  };
}
