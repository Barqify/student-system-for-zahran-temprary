import { $ } from "@builder.io/qwik";
import { User } from "./interfaces/user";
import { UserData } from "./interfaces/userData";

export const user: User = {
  data: null,
  setUser: $(function (this: User, data: UserData) {
    this.data = data;
  }),
  clear: $(function(this: User) {
    this.data = null;
  })
};
