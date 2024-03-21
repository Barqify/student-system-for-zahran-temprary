import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Button } from "../interfaces";

export default component$<Button>((props) => {
  return (
    <>
      <div class="load-more-btn mt--60 text-center">
        <Link
          class="rbt-btn btn-gradient btn-lg hover-icon-reverse"
          href={props.target}
        >
          <span class="icon-reverse-wrapper">
            <span class="btn-text">{props.title}</span>
            <span class="btn-icon">
              <i class="feather-arrow-left" />
            </span>
            <span class="btn-icon">
              <i class="feather-arrow-left" />
            </span>
          </span>
        </Link>
      </div>
    </>
  );
});
