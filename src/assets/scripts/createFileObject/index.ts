import { $ } from "@builder.io/qwik";

/**
 * this function create file object by using base64
 * @param file - the file string before decode
 */
const createFileObject = (file: string) => {

  // convert the file data to binary
  const binaryData = atob(file);

  // create array buffer
  const arrayBuffer = new ArrayBuffer(binaryData.length);

  // create unit array
  const byteArray = new Uint8Array(arrayBuffer);

  // move the data from binry data to the array buffer
  for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
  }

  // convert binary data to object
  const fileBlob = new Blob([arrayBuffer], { type: "application/pdf" });

  // url file
  const fileUrl = URL.createObjectURL(fileBlob);

  return fileUrl;
};

export {
  createFileObject
}