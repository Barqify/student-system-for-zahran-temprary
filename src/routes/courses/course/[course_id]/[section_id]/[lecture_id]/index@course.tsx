import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link, routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { callServer } from "~/assets/scripts/callServer";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";
import Support from "~/components/pages/course/content/support";
import { messagesContext, registerContext } from "~/root";
import TemplateScripts from "~/templateScripts";
import { Course } from "~/interfaces/course";
import Links from "~/components/pages/course/components/Links";
import { CourseReturnData } from "~/interfaces/course/returnData";
import Video from "~/components/pages/course/content/lecture/video";
import Lecture from "~/components/pages/course/content/lecture";
import type { Lecture as LectureType } from "~/interfaces/course/section/lecture";
import Quiz from "~/components/pages/course/content/quiz";
import { Quiz as QuizType } from "~/interfaces/course/section/lecture/quiz";
import { Toast } from "~/stores/toast";
import { setting } from "~/setting";

/**
 * this function check if the user has the section or not
 * @param course - course data
 * @param sectionId - section id
 * @returns the data of the section and the boolean value
 */
const checkSection = (course: Course, sectionId: number) => {
  // get current section
  const currentSection = course.sections.find((ele) => ele.id == sectionId);

  // check if the current section found
  if (
    (currentSection && currentSection.is_owned) ||
    course.sections[0].id == sectionId
  )
    return {
      status: true,
      data: currentSection,
    };
  else
    return {
      status: false,
      data: null,
    };
};

/**
 * this function check if the current lecture is a valid quiz
 * @param lecture - lecture data
 * @param quizId - the quiz id in url
 * @returns the quiz data if found
 */
const checkQuiz = (lecture: LectureType, quizId: string | null) => {
  // should add check for quiz id and the lecture quiz
  if (quizId) {
    // search in quizes linked with this lecture
    for (let quiz of lecture.quiz) {
      if (quizId == quiz.id.toString()) {
        return quiz;
      }
    }
  }

  // if the url not have quiz, return null
  return null;
};
export const useGetCourse = routeLoader$<CourseReturnData>(
  async ({ params, redirect, cookie, url }) => {
    const response = await callServer(`auth/course/${params.course_id}`, {
      headers: [
        {
          name: "Authorization",
          value: `Bearer ${cookie.get("token")?.value}`,
        },
      ],
    });

    if (response.status && response.response!.ok) {
      // course data
      const courseData = response.data! as Course;

      // get section data
      const section = checkSection(courseData, parseInt(params.section_id));

      // check section
      if (section.status) {
        // get lecture data
        const lecture = section.data?.lectures.find(
          (ele) => ele.id.toString() == params.lecture_id,
        ) as LectureType;
        // if lecture found return data, if not redirect to course page
        if (lecture) {
          // quiz param
          const quizId = url.searchParams.get("quiz");

          // quiz data
          const quizData = checkQuiz(lecture, quizId);

          // check solved quiz
          if (lecture.quiz_is_solved === false) {
            throw redirect(
              303,
              `/courses/course/${params.course_id}/${params.section_id}/${lecture.solved_quiz?.lecture_id}/?quiz=${lecture.solved_quiz?.id}&mustSolve=true`,
            );
          }
          return {
            current_course: params.course_id,
            current_section: params.section_id,
            current_lesson: params.lecture_id,
            data: response.data! as Course,
            section_data: section.data,
            lecture_data: lecture,
            quiz: quizData,
            quiz_must_solve: url.searchParams.get("mustSolve") ? true : false,
          };
        } else {
          throw redirect(303, `/courses/detail/${params.course_id}`);
        }
      } else {
        throw redirect(
          303,
          `/courses/checkout/${params.course_id}/${params.section_id}`,
        );
      }
    }
    throw redirect(303, `/user/register/login?next=${url.pathname}`);
  },
);

//
export default component$(() => {
  // load template scripts
  useVisibleTask$(loadTemplateScripts);

  // navagation
  const nav = useNavigate();

  // regiser store
  const registerStore = useContext(registerContext);

  // message store
  const messageStore = useContext(messagesContext);

  // course
  const course = useGetCourse();

  const support = ["01014934957", "01068610197"];

  const currentSupport =
    course.value.data.study_level == "3" ? support[1] : support[0];

  // has support
  const has_support =
    course.value.data.sections[0].id != parseInt(course.value.current_section);

  return (
    <>
      <div class="rbt-lesson-area bg-color-white">
        <div class="rbt-lesson-content-wrapper">
          <div class="rbt-lesson-leftsidebar">
            <div class="rbt-course-feature-inner rbt-search-activation">
              <div class="section-title">
                <h4 class="rbt-title-style-3">محتوي الكورس</h4>
              </div>
              {/* <div class="lesson-search-wrapper">
                <form action="#" class="rbt-search-style-1">
                  <input
                    class="rbt-search-active"
                    type="text"
                    placeholder="Search Lesson"
                  />
                  <button class="search-btn disabled">
                    <i class="feather-search" />
                  </button>
                </form>
              </div> */}
              <hr class="mt--10" />
              <Links course={course.value.data} />
            </div>
          </div>
          <div class="rbt-lesson-rightsidebar overflow-hidden lesson-video">
            <div class="lesson-top-bar">
              <div class="lesson-top-left">
                <div class="rbt-lesson-toggle">
                  <button
                    class="lesson-toggle-active btn-round-white-opacity"
                    title="Toggle Sidebar"
                  >
                    <i class="feather-arrow-left" />
                  </button>
                </div>
                <h5>{course.value.data.description}</h5>
              </div>
              <div class="lesson-top-right">
                <div class="rbt-btn-close">
                  <Link
                    href={`/courses/detail/${course.value.current_course}`}
                    title="Go Back to Course"
                    class="rbt-round-btn"
                  >
                    <i class="feather-x" />
                  </Link>
                </div>
              </div>
            </div>
            <div class="inner">
              {/* redner lecture if not quiz */}
              {!course.value.quiz && (
                <Lecture
                  lecture={course.value.lecture_data}
                  support={
                    has_support && setting.questionSupport.isWork
                      ? currentSupport
                      : ""
                  }
                />
              )}

              {/* render quiz if this is a quiz */}
              {course.value.quiz && (
                <Quiz
                  quiz={course.value.quiz}
                  mustSolve={course.value.quiz_must_solve}
                />
              )}
            </div>

            {/* <div class="bg-color-extra2 ptb--15 overflow-hidden">
              <div class="rbt-button-group">
                <a
                  class="rbt-btn icon-hover icon-hover-right btn-md bg-primary-opacity"
                  href="#"
                >
                  <span class="btn-icon">
                    <i class="feather-arrow-right" />
                  </span>
                  <span class="btn-text">الدرس السابق</span>
                </a>
                <a class="rbt-btn icon-hover btn-md" href="#">
                  <span class="btn-text">الدرس التالي</span>
                  <span class="btn-icon">
                    <i class="feather-arrow-left" />
                  </span>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div class="rbt-progress-parent">
        <svg
          class="rbt-back-circle svg-inner"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
    </>
  );
});
