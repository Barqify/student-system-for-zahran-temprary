import { component$ } from "@builder.io/qwik";
import Lottie from "../..";

export default component$(() => {
  return (
    <>
      <Lottie
        src="https://lottie.host/696d759d-4df3-4dc8-9473-e0990d1ad55e/BsfhUXQgOc.json"
        style={{
          width: "50px",
          height: "50px",
        }}
        speed={2}
        loop
        autoPlay
      />
    </>
  );
});
