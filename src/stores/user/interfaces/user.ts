import { QRL } from "@builder.io/qwik";
import { UserData } from "./userData";


export interface User {
  data: UserData | null;
  setUser: QRL<(data: UserData) => void>;
  clear: QRL<() => void>;
}