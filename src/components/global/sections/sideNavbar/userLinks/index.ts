import { SideLinks } from "../interfaces";
const mainLink = "/user/dashboard";

export const userLinks: SideLinks = {
  info: [
    // {
    //   id: 0,
    //   title: "لوحة التحكم",
    //   target: `${mainLink}`,
    //   icon: "feather-home",
    // },
    {
      id: 1,
      title: "معلوماتي",
      target: `${mainLink}/profile`,
      icon: "feather-user",
    },
    // {
    //   id: 2,
    //   title: "كورساتي",
    //   target: `${mainLink}/courses`,
    //   icon: "feather-book-open",
    // },
    // {
    //   id: 3,
    //   title: "سجل الدفع",
    //   target: `${mainLink}/order/history`,
    //   icon: "feather-shopping-bag",
    // },
  ],
  controle: [
    {
      id: 4,
      title: "الاعدادات",
      target: `${mainLink}/profile/edit`,
      icon: "feather-home",
    },
  ],
};
