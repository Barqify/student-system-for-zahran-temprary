import { component$, useStyles$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Lottie from "~/components/global/animation/lottie";
import Modern from "~/components/global/buttons/modern";
import MainStyle from "../style/main.scss?inline";
export default component$(() => {
  const loc = useLocation();

  useStyles$(MainStyle)
  return (
    <>
      <section class="checkout-status rbt-section-gap">
          <section class="content d-flex flex-column align-items-center p-5">
            {/* animation */}
            <Lottie
              src="https://lottie.host/43091e38-7d4b-4729-bba0-0defa629bfb6/cH4lat6w4O.json"
              speed={1}
              style={{
                width: "250px",
                height: "250px",
              }}
              loop={false}
              autoPlay={true}
            />
            {/* messages */}
            <p>تم الدفع بنجاح ويمكنك الان مشاهدة الدروس</p>
            {/* button */}
            <Modern title="مشاهدة الدروس" target={`/courses/detail/${loc.params.course_id}`} />
          </section>
      </section>
    </>
  );
});
