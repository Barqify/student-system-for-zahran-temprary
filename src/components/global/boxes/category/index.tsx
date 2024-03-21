import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface Props {
  data: {
    path: string;
    icon: string;
    title: string;
    subtitle: string;
  }


}
export default component$<Props>((props) => {
  return (
    <>
      <Link
        class="rbt-cat-box rbt-cat-box-1 text-center"
        href={props.data.path}
      >
        <div class="inner">
          <div class="icons">
            <img
              src={props.data.icon}
              alt="category icon"
            />
          </div>
          <div class="content">
            <h5 class="title">{props.data.title}</h5>
            <div class="read-more-btn">
              <span class="rbt-btn-link">
                {props.data.subtitle}
                <i class="feather-arrow-right" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
});
