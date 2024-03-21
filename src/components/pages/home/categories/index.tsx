import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import SectionHeader from "~/components/global/headers/sectionHeader";
import CategoryBox from "~/components/global/boxes/category";

export default component$(() => {
  return (
    <>
      <div class="rbt-categories-area rbt-section-gapTop bg-color-white rbt-section-gapBottom">
        <div class="container">
          <div class="row">
            <SectionHeader
              subtitle="الاقسام"
              title="تمتع بأفضل الاقسام الدراسية"
            />
          </div>
          <div class="row g-5 mt--20">
            {Array(8).fill("").map((ele) => {
              return (
                <>
                  {/* Start Category Box Layout  */}
                  <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <CategoryBox
                      data={{
                        path: "/",
                        icon: "assets/images/category/web-design.png",
                        title: "الصف الاول الثانوي",
                        subtitle: "3 كورسات",
                      }}
                    />
                  </div>
                  {/* End Category Box Layout  */}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
});
