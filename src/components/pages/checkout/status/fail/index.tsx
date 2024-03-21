import { component$, useStyles$ } from "@builder.io/qwik";
import Lottie from "~/components/global/animation/lottie";
import Modern from "~/components/global/buttons/modern";
import MainStyle from "../style/main.scss?inline";
export default component$(() => {
  useStyles$(MainStyle);
  return (
    <>
      <section class="checkout-status rbt-section-gap">
        <section class="content d-flex flex-column align-items-center p-5">
          {/* animation */}
          <Lottie
            src="https://lottie.host/ce1558f3-8b92-4c1e-8b09-5c422a3feb49/sKtY3KYqGh.json"
            speed={1}
            style={{
              width: "250px",
              height: "250px",
            }}
            loop={false}
            autoPlay={true}
          />
          {/* messages */}
          <p>حدث خطأ في الدفع يرجي التواصل مع الدعم</p>
          {/* button */}

          <a
            class="rbt-moderbt-btn"
            href="https://api.whatsapp.com/send/?phone=201115956226&text=%D8%AD%D8%AF%D8%AB%20%D8%AE%D8%B7%D8%A3%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AF%D9%81%D8%B9&type=phone_number&app_absent=0"
          >
            <span class="moderbt-btn-text">تواصل مع الدعم الان</span>
            <i class="feather-arrow-left"></i>
          </a>
        </section>
      </section>
    </>
  );
});
