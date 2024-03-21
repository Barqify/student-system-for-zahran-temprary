import { QRL } from "@builder.io/qwik";
import { RequestEventLoader } from "@builder.io/qwik-city";
import { User } from "~/stores/user/interfaces/user";
import { UserData } from "~/stores/user/interfaces/userData";
import { status } from "./status";
import { UserLoginData } from "./userLoginData";
import { UserSignData } from "./userSignData";

export interface Register {
  auth: boolean;
  status: status;
  user: User;
  login: QRL<(data: UserLoginData) => Promise<{status: boolean; response: Promise<object>}>>;
  sign: QRL<(data: UserSignData) => Promise<{status: boolean; response: Promise<object>}>>;
  mainPath: string;
  logOut: QRL<() => void>;
  getProfile: QRL<(token: string) => Promise<Response> | null>
  setToken: QRL<(token: string) => void>;
  setAuth: QRL<(data: UserData) => void>;
  checkAuth: QRL<(e: RequestEventLoader) => {status: boolean, user: UserData, next?: string}>;
}
