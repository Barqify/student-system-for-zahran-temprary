import { component$ } from "@builder.io/qwik";
import Lottie from "../..";
interface Props {
  appear: boolean;
}
export default component$<Props>((props) => {

  return (
    <>
        <section class="progress w-100 position-fixed top-0 left-0" style={{
          height: "12px",
          zIndex: 50,
        }}>
          <section class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: "100%",
              display: props.appear? "block":"none",
            }}
          ></section>

        </section>
    </>
  );
});
