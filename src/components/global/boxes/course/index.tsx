import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Course } from "~/interfaces/course";
import { setting } from "~/setting";
import ModernButton from "../../buttons/modern";
interface Props {
  course: Course;
}
export default component$<Props>((props) => {
  return (
    <>
      <div class="rbt-card variation-01 rbt-hover">
        <div class="rbt-card-img">
          <Link href={`/courses/detail/${props.course.id}`}>
            <img
              style={{
                "max-height": "200px",
              }}
              src={`${props.course.image}`}
              alt={props.course.name}
            />
            {/* <div class="rbt-badge-3">
              <span>-50%</span>
              <span>خصم</span>
            </div> */}
          </Link>
        </div>
        <div class="rbt-card-body">
          <div class="rbt-card-top">
            <div class="rbt-review">
              <div class="rating">
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
              </div>
            </div>
          </div>
          <h4 class="rbt-card-title">
            <Link href={`/courses/detail/${props.course.id}`}>
              {props.course.description}
            </Link>
          </h4>
          {/* <ul class="rbt-meta">
            <li>
              <i class="feather-book" />
              20 درس
            </li>
          </ul> */}
          <p class="rbt-card-text">{props.course.description}</p>
          <div class="rbt-author-meta mb--20">
            {/* <div class="rbt-avater">
              <Link href="#">
                <img src={props.course.image} alt={props.course.name} />
              </Link>
            </div> */}
            <div class="rbt-author-info">
              بواسطة{" "}
              <Link href={`/courses/detail/${props.course.id}`}>
                {setting.teacher}
              </Link>
            </div>
          </div>
          <div class="rbt-card-bottom">
            {false && <>
              <div class="rbt-price">
              <span class="current-price">
                {props.course.sections[0] && props.course.sections[0]!.price}{" "}
                جنية
              </span>
              {/* <span class="off-price">$120</span> */}
            </div>
            </>}

            <ModernButton
              target={`/courses/detail/${props.course.id}/`}
              title="مشاهدة التفاصيل"
            />
          </div>
        </div>
      </div>
    </>
  );
});
