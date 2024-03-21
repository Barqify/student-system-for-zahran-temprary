import { component$ } from "@builder.io/qwik";
import Lottie from "~/components/global/animation/lottie";

export default component$(() => {
  return (
    <>
      <section class="d-flex justify-content-center">
        <Lottie
          src="https://lottie.host/01144aab-492f-4f74-9bce-8855e78e6ac8/3rUzCNaQLr.json"
          style={{
            width: "400px",
            height: "400px",
          }}
          speed={2}
          loop
          autoPlay
        />
      </section>
    </>
  );
});
