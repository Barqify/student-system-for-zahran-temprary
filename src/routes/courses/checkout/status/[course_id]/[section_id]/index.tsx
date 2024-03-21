import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { callServer } from "~/assets/scripts/callServer";
import Fail from "~/components/pages/checkout/status/fail";
import Success from "~/components/pages/checkout/status/success";
import { register } from "~/stores/register/register";

export const useCheckPayment = routeLoader$(async (e) => {
  const authStatus = (await register.checkAuth(e)).status;

  if (authStatus) {
    const response = await callServer("paymentcheck", {
      headers: [
        {
          name: "Authorization",
          value: `Bearer ${e.cookie.get("token")?.value}`,
        },
      ],
      method: "POST",
      data: {
        section_id: e.params.section_id,
        queryString: e.url.searchParams.toString(),
      },
      dataType: "json",
    });
    console.log(response.data);
  } else {
    throw e.redirect(301, "/");
  }
});
export default component$(() => {
  const pyamentStatus = useSignal<boolean>(true);
  return (
    <>
      <section class="checkout-status-page">
        <section class="container">
          {pyamentStatus.value && <Success />}

          {!pyamentStatus.value && <Fail />}
        </section>
      </section>
    </>
  );
});
