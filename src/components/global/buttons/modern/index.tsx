import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Button } from "../interfaces";

export default component$<Button>((props) => {
  return (
    <>
      <div class="rbt-button-group">
        <Link class="rbt-moderbt-btn" href={props.target}>
          <span class="moderbt-btn-text">{props.title}</span>
          <i class="feather-arrow-left" />
        </Link>
      </div>
    </>
  );
});
