import { component$, Signal, UseSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Course } from "~/interfaces/course";
// props
interface Props {
  course: Course;
}

// components
export default component$<Props>((props) => {
  // current date
  const currentDate = new Date();

  return (
    <>
      <div class="rbt-accordion-style rbt-accordion-02 for-right-content accordion">
        <div class="accordion" id="accordionExampleb2">
          {props.course.sections.map((ele) => {
            return (
              <>
                <div class="accordion-item card">
                  <h2
                    class="accordion-header card-header"
                    id={`headingTwo${ele.id}`}
                  >
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      data-bs-target={`#collapseTwo1${ele.id}`}
                      aria-controls={`collapseTwo1${ele.id}`}
                    >
                      {ele.title}
                      {/* <span class="rbt-badge-5 ml--10">1/2</span> */}
                    </button>
                  </h2>
                  <div
                    id={`collapseTwo1${ele.id}`}
                    class="accordion-collapse collapse show"
                    aria-labelledby={`headingTwo${ele.id}`}
                  >
                    <div class="accordion-body card-body">
                      <ul class="rbt-course-main-content liststyle">
                        {ele.lectures.map((lecture) => {
                          const is_owned =
                            ele.is_owned ||
                            props.course.sections[0].id == ele.id;

                          const course_url = `/courses/course/${props.course.id}/${ele.id}/${lecture.id}/`;
                          const checkout_url = `/courses/checkout/${props.course.id}/${ele.id}/`;

                          // lecture date
                          const lectureDate = lecture.schedule ? new Date(lecture.schedule): currentDate
                          
                          // check schedule
                          if (
                            lectureDate <= currentDate
                          ) {
                            return (
                              <>
                                <li>
                                  <Link
                                    href={is_owned ? course_url : checkout_url}
                                  >
                                    <div class="course-content-left">
                                      {lecture.type == "video" && (
                                        <i class="feather-play-circle" />
                                      )}
                                      {lecture.type != "video" && (
                                        <i class="feather-file-text" />
                                      )}{" "}
                                      <span class="text">{lecture.title}</span>
                                    </div>
                                    {/* add lock if not owned */}
                                    {!is_owned && (
                                      <div class="course-content-right">
                                        <span class="course-lock">
                                          <i class="feather-lock" />
                                        </span>
                                      </div>
                                    )}
                                  </Link>
                                </li>
                                {/* if quiz found render it */}
                                {lecture.quiz &&
                                  lecture.quiz.map((quiz) => {
                                    // quiz url
                                    const quizUrl = `${course_url}?quiz=${quiz.id}`;

                                    // quiz date
                                    const quizDate = new Date(quiz.date);

                                    // check if the quiz date is come or not
                                    if (currentDate > quizDate) {
                                      return (
                                        <li>
                                          <Link
                                            href={
                                              is_owned ? quizUrl : checkout_url
                                            }
                                          >
                                            <div class="course-content-left">
                                              <i class="feather-help-circle" />
                                              <span class="text">
                                                {quiz.name}
                                              </span>
                                            </div>
                                            {/* add lock if not owned */}
                                            {!is_owned && (
                                              <div class="course-content-right">
                                                <span class="course-lock">
                                                  <i class="feather-lock" />
                                                </span>
                                              </div>
                                            )}
                                          </Link>
                                        </li>
                                      );
                                    }
                                    return <></>;
                                  })}
                              </>
                            );
                          }
                          return <></>;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
});
