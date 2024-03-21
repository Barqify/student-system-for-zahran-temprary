import {
  $,
  component$,
  useComputed$,
  useContext,
  useContextProvider,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  routeLoader$,
  useContent,
} from "@builder.io/qwik-city";
import { callServer } from "~/assets/scripts/callServer";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";
import Lottie from "~/components/global/animation/lottie";
import MainBanner from "~/components/pages/home/banners/mainHeader";
import Categories from "~/components/pages/home/categories";
import Courses from "~/components/pages/home/courses";
import { Course } from "~/interfaces/course";
import { CoursesInterface } from "~/interfaces/course/courses";

import { registerContext } from "~/root";
import { setting } from "~/setting";

export const useGetCourses = routeLoader$<CoursesInterface>(async (e) => {
  let response: CoursesInterface = {
    "3": {
      revision: [],
      season: [],
    },
    "2": {
      revision: [],
      season: [],
    },
    "1": {
      revision: [],
      season: [],
    },
  };
  let token = e.cookie.get("token")?.value;

  // check if we have user token send it with request
  // if (token) {

  // get and set data
  for (let level in response) {
    // get response level
    const levelResponse = await callServer(`courses/level/${level}`);

    // filter and set data
    response[level].season = levelResponse
      .data!.data.filter((course) => course.course_type == "season")
      .reverse();
    response[level].revision = levelResponse
      .data!.data.filter((course) => course.course_type == "revision")
      .reverse();
  }
  // } else {
  //   response = await callServer("auth/courses");
  // }

  // console.log(response)
  return response as CoursesInterface;
});
export default component$(() => {
  const courses = useGetCourses();
  // load template scripts
  useVisibleTask$(loadTemplateScripts);
  useVisibleTask$(() => {
    console.log(courses.value);
  });
  return (
    <>
      <section class="home">
        {/* main banner */}
        <MainBanner />

        {/* categories */}
        {/* <Categories /> */}

        {/* courses */}
        <Courses courses={courses.value} />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: setting.name,
  meta: [
    {
      name: "description",
      content: setting.descirption,
    },
  ],
};
