import type { ToastType } from "./interfaces/toastType";
import { Types } from "./interfaces/types";
import { $ } from "@builder.io/qwik";
class Toast implements ToastType {
  public static uuid: number = -1;
  public id: number;
  constructor(public message: string, public type: Types) {
    this.id = Toast.uuid;
    Toast.uuid += 1;
  }
}
// append
/**
 * this function append new message to the store context
 * @param data - the data of message
 * @param messagesStore - the context
 */
const appendMessage = $(async (data: {message: string, type: Types }, messagesStore) => {
  const newMessage = new Toast(data.message, data.type);
  messagesStore.push({
    id: newMessage.id,
    message: newMessage.message,
    type: newMessage.type,
  });
})
export { Toast, appendMessage };
