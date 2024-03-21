import ImgTestimonial7 from "~/media/assets/images/testimonial/testimonial-7.jpg?jsx";
import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  RequestEvent,
  RequestHandler,
  routeLoader$,
} from "@builder.io/qwik-city";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";
import { callServer } from "~/assets/scripts/callServer";
import { register } from "~/stores/register/register";
import Links from "~/components/pages/course/components/Links";
import { Course } from "~/interfaces/course";
interface CoursesInterface {
  id: number;
  name: string;
  description: string;
  sub_description: string;
  image: string;
  sections: {
    id: number;
    title: string;
    description: string;
    price: number;
    discound: number;
    total_price: number;
    is_free: number;
    is_owned: boolean;
    lectures: {
      id: string;
      file: string;
      title: string;
      type: string;
    }[];
  }[];
}

export const onGet: RequestHandler = async (e) => {
  const AuthResult = await register.checkAuth(e);

  if (!AuthResult.status) {
    throw e.redirect(
      303,
      `/user/register/login?next=/courses/detail/${e.params.id}`,
    );
  }
};

export const useGetCourse = routeLoader$<Course>(async (e) => {
  const response = await callServer(`auth/course/${e.params.id}`, {
    headers: [
      {
        name: "Authorization",
        value: `Bearer ${e.cookie.get("token")?.value}`,
      },
    ],
  });
  return response.data!;
});
export default component$(() => {
  // get course data
  const course = useGetCourse();
  
  // current month
  const currentMonth = useSignal<string>(
    course.value.sections[0].id.toString(),
  );

  // load templates scripts
  useVisibleTask$(loadTemplateScripts);

  return (
    <>
      {/* Start breadcrumb Area */}
      <div class="rbt-breadcrumb-default rbt-breadcrumb-style-3">
        <div class="breadcrumb-inner">
          <img src="/assets/images/bg/bg-image-10.jpg" alt="Education Images" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="content text-start">
                <h2 class="title">{course.value.description}</h2>
                <p class="description">{course.value.sub_description}</p>
                <div class="d-flex align-items-center mb--20 flex-wrap rbt-course-details-feature">
                  <div class="feature-sin rating">
                    <a href="#">
                      <i class="fa fa-star" />
                    </a>
                    <a href="#">
                      <i class="fa fa-star" />
                    </a>
                    <a href="#">
                      <i class="fa fa-star" />
                    </a>
                    <a href="#">
                      <i class="fa fa-star" />
                    </a>
                    <a href="#">
                      <i class="fa fa-star" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb Area */}
      <div class="rbt-course-details-area ptb--60">
        <div class="container">
          <div class="row g-5">
            <div class="col-lg-8">
              <div class="course-details-content">
                <div class="rbt-course-feature-box rbt-shadow-box thuumbnail">
                  {/* <img
                    style={{
                      width: "100%",
                      height: "400px",
                      "object-fit": "cover",
                    }}
                    src={`https://dashboard.zahranacademy.com/storage/${course.value.image}`}
                    alt={course.value.name}
                  /> */}
                </div>
                <div class="rbt-inner-onepage-navigation sticky-top mt--30">
                  <nav class="mainmenu-nav onepagenav">
                    <ul class="mainmenu">
                      <li class="current">
                        <a href="#overview">نظرة عامة</a>
                      </li>
                      <li>
                        <a href="#coursecontent">محتوي الكورس</a>
                      </li>
                      {/* <li>
                        <a href="#details">التفاصيل</a>
                      </li> */}
                      {/* <li>
                        <a href="#intructor">Intructor</a>
                      </li> */}
                    </ul>
                  </nav>
                </div>
                {/* Start Course Feature Box  */}
                <div class="rbt-course-feature-box overview-wrapper rbt-shadow-box mt--30">
                  <div class="rbt-course-feature-inner">
                    <div class="section-title">
                      <h4 class="rbt-title-style-3">هتتعلم ايه</h4>
                    </div>
                    <p>{course.value.description}</p>
                  </div>
                </div>
                {/* End Course Feature Box  */}
                {/* Start Course Content  */}
                <div
                  class="course-content rbt-shadow-box coursecontent-wrapper mt--30"
                  id="coursecontent"
                >
                  <div class="rbt-course-feature-inner">
                    <div class="section-title">
                      <h4 class="rbt-title-style-3">محتوي الكورس</h4>
                    </div>
                    <Links course={course.value} />
                  </div>
                </div>
                {/* End Course Content  */}
              </div>
            </div>
            <div class="col-lg-4">
              <div class="course-sidebar sticky-top rbt-shadow-box course-sidebar-top rbt-gradient-border">
                <div class="inner">
                  {/* Start Viedo Wrapper  */}
                  {/* <Link
                    class="video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15"
                    href={`/courses/course/${course.value.id}/${course.value.sections[0].lectures[0].id}`}
                  >
                    <div class="video-content">
                      <img
                        class="w-100 rbt-radius"
                        src={`https://dashboard.zahranacademy.com/storage/${course.value.image}`}
                        alt="Video Images"
                        style={{
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <div class="position-to-top">
                        <span class="rbt-btn rounded-player-2 with-animation">
                          <span class="play-icon" />
                        </span>
                      </div>
                      <span class="play-view-text d-block color-white">
                        <i class="feather-eye" /> الفيديو التقديمي
                      </span>
                    </div>
                  </Link> */}
                  {/* End Viedo Wrapper  */}
                  <div class="content-item-content">
                    <div class="buy-now-btn mt--15">
                      <div class="form-group">
                        <div class="rbt-short-item">
                          <div class="filter-select d-flex flex-column gap-4">
                            <span class="d-block">محتوي شهر</span>
                            <div class="filter-select rbt-modern-select search-by-category">
                              <select
                                name="study_level"
                                data-size="3"
                                class="max-width-auto"
                                bind:value={currentMonth}
                              >
                                {course.value.sections.map((ele) => {
                                  return (
                                    <>
                                      <option value={ele.id}>
                                        {ele.title}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      {course.value.sections.map((ele) => {
                        if (ele.id.toString() == currentMonth.value) {
                          if (
                            ele.is_owned ||
                            course.value.sections[0].id == ele.id
                          ) {
                            if (ele.lectures.length) {
                              return (
                                <>
                                  <Link
                                    class="rbt-btn btn-border icon-hover w-100 d-block text-center"
                                    href={`/courses/course/${course.value.id}/${ele.id}/${ele.lectures[0].id}`}
                                  >
                                    <span class="btn-text">مشاهدة المحتوي</span>
                                    <span class="btn-icon">
                                      <i class="feather-arrow-left" />
                                    </span>
                                  </Link>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <Link
                                    class="rbt-btn btn-border icon-hover w-100 d-block text-center"
                                    href=""
                                  >
                                    <span class="btn-text">
                                      جاري تحضير المحتوي
                                    </span>
                                    <span class="btn-icon">
                                      <i class="feather-arrow-left" />
                                    </span>
                                  </Link>
                                </>
                              );
                            }
                          } else {
                            return (
                              <>
                                <Link
                                  class="rbt-btn btn-border icon-hover w-100 d-block text-center"
                                  href={`/courses/checkout/${course.value.id}/${ele.id}/`}
                                >
                                  <span class="btn-text">شراء الان</span>
                                  <span class="btn-icon">
                                    <i class="feather-arrow-left" />
                                  </span>
                                </Link>
                              </>
                            );
                          }
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
