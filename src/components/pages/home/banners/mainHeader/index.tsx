import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { registerContext } from "~/root";
import { setting } from "~/setting";

export default component$(() => {
  const registerStore = useContext(registerContext);

  return (
    <>
      {/* Start Banner Area */}
      <div class="main-header rbt-banner-5 height-650 bg_image">
        <div class="container">
          <div class="row content">
            <div class="col-md-12">
              <div class="inner text-start">
                <h2 class="title">
                  تعاني من <br />
                  فهم مادة
                  <span class="">{setting.subjectName} </span>؟
                </h2>
                <p class="description">{setting.slogan}</p>
                <div class="slider-btn rbt-button-group justify-content-start">
                  {/* <Link
                    class="rbt-btn btn-gradient hover-icon-reverse radius-round"
                    href="#"
                  >
                    <span class="icon-reverse-wrapper">
                      <span class="btn-text">استعراض الدروس</span>
                      <span class="btn-icon">
                        <i class="feather-arrow-left"></i>
                      </span>
                      <span class="btn-icon">
                        <i class="feather-arrow-left"></i>
                      </span>
                    </span>
                  </Link> */}
                  {!registerStore.auth && (
                    <section class="regiter-buttons d-flex gap-4">
                      <Link
                        class="rbt-btn btn-gradient hover-icon-reverse radius-round"
                        href="/user/register/signin"
                      >
                        <span class="icon-reverse-wrapper">
                          <span class="btn-text">ابدأ دلوقت</span>
                          <span class="btn-icon">
                            <i class="feather-arrow-left"></i>
                          </span>
                          <span class="btn-icon">
                            <i class="feather-arrow-left"></i>
                          </span>
                        </span>
                      </Link>
                      <Link
                        class="rbt-btn btn-border hover-icon-reverse radius-round"
                        href="/user/register/login"
                      >
                        <span class="icon-reverse-wrapper">
                          <span class="btn-text">دخول</span>
                          <span class="btn-icon">
                            <i class="feather-arrow-left"></i>
                          </span>
                          <span class="btn-icon">
                            <i class="feather-arrow-left"></i>
                          </span>
                        </span>
                      </Link>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Banner Area */}
    </>
  );
});
