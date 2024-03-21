import { $ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { callServer } from "~/assets/scripts/callServer";
import { UserData } from "../user/interfaces/userData";
import { user } from "../user/user";
import { Register } from "./interfaces/register";
import { UserLoginData } from "./interfaces/userLoginData";
import { UserSignData } from "./interfaces/userSignData";

export const register: Register = {
  mainPath: "/",
  auth: false,
  user: { ...user },
  status: "rejected",

  setToken: $(function (this: Register, token: string) {
    const expirationDate = new Date();
    const days = 10;
    expirationDate.setTime(
      expirationDate.getTime() + days * 24 * 60 * 60 * 1000,
    );
    document.cookie = `token=${token};expires=${expirationDate};path=/`;
  }),
  // login
  login: $(async function (this: Register, data: UserLoginData) {
    const response = await callServer("auth/login", {
      method: "POST",
      data: data,
      dataType: "json",
    });

    if (response.response?.ok) {
      // set auth
      this.setAuth(response.data!.data as UserData);

      return {
        status: true,
        response,
      };
    }
    return {
      status: false,
      response,
    };
  }),

  sign: $(async function (this: Register, data: UserSignData) {
    const response = await callServer("auth/register", {
      method: "POST",
      data: data,
      dataType: "json",
    });
    if (response.response?.ok) {
      this.setAuth(response.data!.data as UserData);

      return {
        status: true,
        response,
      };
    }
    return {
      status: false,
      response,
    };
  }),
  // logout
  logOut: $(function (this: Register) {
    this.auth = false;
    this.user.clear();
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }),

  setAuth: $(async function (this: Register, data: UserData) {
    
    // set user value
    await this.user.setUser(data);

    // change auth status
    this.auth = true;

    // set token
    this.setToken(data.token);

    console.log("user data: ", data);
  }),

  getProfile: $(async function(this: Register, token: string){
    const response = await callServer("auth/profile", {
      headers: [
        {
          name: "Authorization",
          value: `Bearer ${token}`,
        },
      ],
    });

    if (response.response!.ok) {
      return response.data;
    } else {
      return null;
    }
  }),
  checkAuth: $(async function (this: Register, e) {
    let token = e.cookie.get("token")?.value;
    let falseReturn = {
      status: false,
      user: null,
      next: e.url.pathname,
    };
    if (token) {
      // get user data
      const userData = await register.getProfile(token);
      if (userData) {
        return {
          status: true,
          user: {
            ...userData
          },
        };
      } else {
        return falseReturn;
      }
    } else {
      return falseReturn;
    }
  }),
};
