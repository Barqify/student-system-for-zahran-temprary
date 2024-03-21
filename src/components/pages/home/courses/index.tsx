import { component$, useContext } from "@builder.io/qwik";
import SectionHeader from "~/components/global/headers/sectionHeader";
import Course from "~/components/global/boxes/course";
import MoreButton from "~/components/global/buttons/more";
import { registerContext } from "~/root";
import { CoursesInterface } from "~/interfaces/course/courses";
import course from "~/components/global/boxes/course";
import { setting } from "~/setting";
interface Props {
  courses: CoursesInterface;
}
export default component$<Props>((props) => {
  const registerStore = useContext(registerContext);

  // course type
  const courseType = ["revision", "season"];
  return (
    <>
      {/* Start Course Area */}
      {/* if user is register display only his courses */}
      {registerStore.auth &&
        courseType.map((courseType, index) => {
          // current level insted of current user
          const currentLevel = registerStore.user.data?.study_level;

          if (props.courses[currentLevel][courseType].length != 0) {
            return (
              <div
                key={index}
                class="rbt-course-area bg-color-extra2 rbt-section-gap"
              >
                <div class="container">
                  <div class="row mb--60">
                    <div class="col-lg-12">
                      <SectionHeader
                        title={
                          setting.coursesHeaderData[currentLevel][courseType]
                        }
                        subtitle={
                          courseType == "season" ? "محاضرات" : "مراجعات"
                        }
                      />
                    </div>
                  </div>
                  {/* Start Card Area */}
                  <div class="row g-5">
                    {/* Start Single Course  */}
                    {props.courses[currentLevel][courseType].map((course) => {
                      return (
                        <>
                          <div key={course.id} class="col-lg-4 col-md-6 col-12">
                            <Course course={course} />
                          </div>
                        </>
                      );
                    })}

                    {/* End Single Course  */}
                  </div>
                  {/* End Card Area */}
                  <div class="row">
                    <div class="col-lg-12">
                      {/* <MoreButton title="المزيد من الكورسات" target="/" /> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return <></>;
        })}

      {/* if not display all courses */}
      {!registerStore.auth &&
        Object.keys(props.courses)
          .reverse()
          .map((studyLevel, index) => {
            return courseType.map((courseType) => {
              if (props.courses[studyLevel][courseType].length != 0) {
                return (
                  <div
                    key={index}
                    class="rbt-course-area bg-color-extra2 rbt-section-gap"
                  >
                    <div class="container">
                      <div class="row mb--60">
                        <div class="col-lg-12">
                          <SectionHeader
                            title={
                              setting.coursesHeaderData[studyLevel][courseType]
                            }
                            subtitle={
                              courseType == "season" ? "محاضرات" : "مراجعات"
                            }
                          />
                        </div>
                      </div>
                      {/* Start Card Area */}
                      <div class="row g-5">
                        {/* Start Single Course  */}
                        {props.courses[studyLevel][courseType].map((course) => {
                          return (
                            <>
                              <div
                                key={course.id}
                                class="col-lg-4 col-md-6 col-12"
                              >
                                <Course course={course} />
                              </div>
                            </>
                          );
                        })}

                        {/* End Single Course  */}
                      </div>
                      {/* End Card Area */}
                      <div class="row">
                        <div class="col-lg-12">
                          {/* <MoreButton title="المزيد من الكورسات" target="/" /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return <></>;
            });
          })}

      {/* End Course Area */}
    </>
  );
});
