import { component$, useContext } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { registerContext } from "~/root";

export default component$(() => {
  const register = useContext(registerContext);
  const nav = useNavigate();

  return (
    <>
      <Link
        href="/"
        onClick$={async () => {
          register.logOut();
          await nav("/");
        }}
      >
        <i class="feather-log-out" />
        <span>تسجيل الخروج</span>
      </Link>
    </>
  );
});
