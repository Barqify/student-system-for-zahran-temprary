import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface Props {
  color?: string;
  subtitle: string;
  title: string;
}
export default component$<Props>((props) => {
  return (
    <>
      <div class="col-lg-12">
        <div class="section-title text-center">
          <span
            class={`subtitle ${
              props.color ? props.color : "bg-primary-opacity"
            }`}
          >
            {props.subtitle}
          </span>
          <h2 class="title">{props.title}</h2>
        </div>
      </div>
    </>
  );
});
