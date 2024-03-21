import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";

export default component$(() => {
  // load template scripts
  useVisibleTask$(loadTemplateScripts);
  return (
    <>
      <div class="content">
        <div class="section-title">
          <h4 class="rbt-title-style-3">Dashboard</h4>
        </div>
        <div class="row g-5">
          {/* Start Single Card  */}
          <div class="col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="rbt-counterup variation-01 rbt-hover-03 rbt-border-dashed bg-primary-opacity">
              <div class="inner">
                <div class="rbt-round-icon bg-primary-opacity">
                  <i class="feather-book-open" />
                </div>
                <div class="content">
                  <h3 class="counter without-icon color-primary">
                    <span class="odometer" data-count={30}>
                      00
                    </span>
                  </h3>
                  <span class="rbt-title-style-2 d-block">
                    Enrolled Courses
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End Single Card  */}
          {/* Start Single Card  */}
          <div class="col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="rbt-counterup variation-01 rbt-hover-03 rbt-border-dashed bg-secondary-opacity">
              <div class="inner">
                <div class="rbt-round-icon bg-secondary-opacity">
                  <i class="feather-monitor" />
                </div>
                <div class="content">
                  <h3 class="counter without-icon color-secondary">
                    <span class="odometer" data-count={10}>
                      00
                    </span>
                  </h3>
                  <span class="rbt-title-style-2 d-block">ACTIVE COURSES</span>
                </div>
              </div>
            </div>
          </div>
          {/* End Single Card  */}
          {/* Start Single Card  */}
          <div class="col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="rbt-counterup variation-01 rbt-hover-03 rbt-border-dashed bg-violet-opacity">
              <div class="inner">
                <div class="rbt-round-icon bg-violet-opacity">
                  <i class="feather-award" />
                </div>
                <div class="content">
                  <h3 class="counter without-icon color-violet">
                    <span class="odometer" data-count={7}>
                      00
                    </span>
                  </h3>
                  <span class="rbt-title-style-2 d-block">
                    Completed Courses
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End Single Card  */}
        </div>
      </div>
    </>
  );
});
