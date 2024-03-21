import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";

export default component$(() => {
  // load template scripts
  useVisibleTask$(loadTemplateScripts);

  return (
    <>
      <div class="content">
        <div class="section-title">
          <h4 class="rbt-title-style-3">Enrolled Courses</h4>
        </div>
        <div class="advance-tab-button mb--30">
          <ul
            class="nav nav-tabs tab-button-style-2 justify-content-start"
            id="myTab-4"
            role="tablist"
          >
            <li role="presentation">
              <a
                href="#"
                class="tab-button active"
                id="home-tab-4"
                data-bs-toggle="tab"
                data-bs-target="#home-4"
                role="tab"
                aria-controls="home-4"
                aria-selected="true"
              >
                <span class="title">Enrolled Courses</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#"
                class="tab-button"
                id="profile-tab-4"
                data-bs-toggle="tab"
                data-bs-target="#profile-4"
                role="tab"
                aria-controls="profile-4"
                aria-selected="false"
              >
                <span class="title">Active Courses</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#"
                class="tab-button"
                id="contact-tab-4"
                data-bs-toggle="tab"
                data-bs-target="#contact-4"
                role="tab"
                aria-controls="contact-4"
                aria-selected="false"
              >
                <span class="title">Completed Courses</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <div
            class="tab-pane fade active show"
            id="home-4"
            role="tabpanel"
            aria-labelledby="home-tab-4"
          >
            <div class="row g-5">
              {/* Start Single Course  */}
              <div class="col-lg-4 col-md-6 col-12">
                <div class="rbt-card variation-01 rbt-hover">
                  <div class="rbt-card-img">
                    <a href="course-details.html">
                      <img
                        src="/assets/images/course/course-online-01.jpg"
                        alt="Card image"
                      />
                    </a>
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
                      <a href="course-details.html">React Front To Back</a>
                    </h4>
                    <ul class="rbt-meta">
                      <li>
                        <i class="feather-book" />
                        20 Lessons
                      </li>
                    </ul>
                    <div class="rbt-progress-style-1 mb--20 mt--10">
                      <div class="single-progress">
                        <h6 class="rbt-title-style-2 mb--10">Complete</h6>
                        <div class="progress">
                          <div
                            class="progress-bar wow fadeInLeft bar-color-success"
                            data-wow-duration="0.5s"
                            data-wow-delay=".3s"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow={90}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                          <span class="rbt-title-style-2 progress-number">
                            90%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="rbt-card-bottom">
                      <a
                        class="rbt-btn btn-sm bg-primary-opacity w-100 text-center"
                        href="#"
                      >
                        Download Certificate
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Course  */}
              {/* Start Single Course  */}
              <div class="col-lg-4 col-md-6 col-12">
                <div class="rbt-card variation-01 rbt-hover">
                  <div class="rbt-card-img">
                    <a href="course-details.html">
                      <img
                        src="/assets/images/course/course-online-01.jpg"
                        alt="Card image"
                      />
                    </a>
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
                      <a href="course-details.html">React Front To Back</a>
                    </h4>
                    <ul class="rbt-meta">
                      <li>
                        <i class="feather-book" />
                        20 Lessons
                      </li>
                    </ul>
                    <div class="rbt-progress-style-1 mb--20 mt--10">
                      <div class="single-progress">
                        <h6 class="rbt-title-style-2 mb--10">Complete</h6>
                        <div class="progress">
                          <div
                            class="progress-bar wow fadeInLeft bar-color-success"
                            data-wow-duration="0.5s"
                            data-wow-delay=".3s"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow={90}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                          <span class="rbt-title-style-2 progress-number">
                            90%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="rbt-card-bottom">
                      <a
                        class="rbt-btn btn-sm bg-primary-opacity w-100 text-center"
                        href="#"
                      >
                        Download Certificate
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Course  */}
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="profile-4"
            role="tabpanel"
            aria-labelledby="profile-tab-4"
          >
            <div class="row g-5">
              {/* Start Single Course  */}
              <div class="col-lg-4 col-md-6 col-12">
                <div class="rbt-card variation-01 rbt-hover">
                  <div class="rbt-card-img">
                    <a href="course-details.html">
                      <img
                        src="/assets/images/course/course-online-01.jpg"
                        alt="Card image"
                      />
                    </a>
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
                      <a href="course-details.html">React Front To Back</a>
                    </h4>
                    <ul class="rbt-meta">
                      <li>
                        <i class="feather-book" />
                        20 Lessons
                      </li>
                    </ul>
                    <div class="rbt-card-bottom">
                      <div class="rbt-price">
                        <span class="current-price">$40</span>
                        <span class="off-price">$86</span>
                      </div>
                      <a class="rbt-btn-link" href="course-details.html">
                        Learn More
                        <i class="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Course  */}
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="contact-4"
            role="tabpanel"
            aria-labelledby="contact-tab-4"
          >
            <div class="row g-5">
              {/* Start Single Course  */}
              <div class="col-lg-4 col-md-6 col-12">
                <div class="rbt-card variation-01 rbt-hover">
                  <div class="rbt-card-img">
                    <a href="course-details.html">
                      <img
                        src="/assets/images/course/course-online-01.jpg"
                        alt="Card image"
                      />
                    </a>
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
                      <a href="course-details.html">React Front To Back</a>
                    </h4>
                    <ul class="rbt-meta">
                      <li>
                        <i class="feather-book" />
                        20 Lessons
                      </li>
                    </ul>
                    <div class="rbt-progress-style-1 mb--20 mt--10">
                      <div class="single-progress">
                        <h6 class="rbt-title-style-2 mb--10">Complete</h6>
                        <div class="progress">
                          <div
                            class="progress-bar wow fadeInLeft bar-color-success"
                            data-wow-duration="0.5s"
                            data-wow-delay=".3s"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow={90}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                          <span class="rbt-title-style-2 progress-number">
                            90%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="rbt-card-bottom">
                      <a
                        class="rbt-btn btn-sm bg-primary-opacity w-100 text-center"
                        href="#"
                      >
                        Download Certificate
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Course  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
