import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";
import { registerContext } from "~/root";

export default component$(() => {
  // load template scripts
  useVisibleTask$(loadTemplateScripts);

  // register store
  const registerStore = useContext(registerContext);
  const studyLevel = {
    "1": "الصف الأول الثانوي",
    "2": "الصف الثاني الثانوي",
    "3": "الصف الثالث الثانوي",
  };
  return (
    <>
      <div class="content">
        <div class="section-title">
          <h4 class="rbt-title-style-3">معلوماتي</h4>
        </div>
        {/* Start Profile Row  */}
        <div class="rbt-profile-row row row--15">
          <div class="col-lg-4 col-md-4">
            <div class="rbt-profile-content b2">الاسم</div>
          </div>
          <div class="col-lg-8 col-md-8">
            <div class="rbt-profile-content b2">
              {registerStore.user.data?.name}
            </div>
          </div>
        </div>
        {/* End Profile Row  */}
        {/* Start Profile Row  */}
        <div class="rbt-profile-row row row--15 mt--15">
          <div class="col-lg-4 col-md-4">
            <div class="rbt-profile-content b2">رقم الهاتف</div>
          </div>
          <div class="col-lg-8 col-md-8">
            <div class="rbt-profile-content b2">
              {registerStore.user.data?.phone}
            </div>
          </div>
        </div>
        {/* End Profile Row  */}
        {/* Start Profile Row  */}
        <div class="rbt-profile-row row row--15 mt--15">
          <div class="col-lg-4 col-md-4">
            <div class="rbt-profile-content b2">رقم هاتف ولي الامر</div>
          </div>
          <div class="col-lg-8 col-md-8">
            <div class="rbt-profile-content b2">
              {registerStore.user.data?.parent_phone}
            </div>
          </div>
        </div>
        {/* End Profile Row  */}
        {/* Start Profile Row  */}
        <div class="rbt-profile-row row row--15 mt--15">
          <div class="col-lg-4 col-md-4">
            <div class="rbt-profile-content b2">السنة الدراسية</div>
          </div>
          <div class="col-lg-8 col-md-8">
            <div class="rbt-profile-content b2">
              {studyLevel[registerStore.user.data?.study_level]}
            </div>
          </div>
        </div>
        {/* End Profile Row  */}
        {/* Start Profile Row  */}
        {registerStore.user.data?.study_level == "2" && (
          <div class="rbt-profile-row row row--15 mt--15">
            <div class="col-lg-4 col-md-4">
              <div class="rbt-profile-content b2">الشعبة</div>
            </div>
            <div class="col-lg-8 col-md-8">
              <div class="rbt-profile-content b2">
                {registerStore.user.data?.department == "scientific"
                  ? "علمي"
                  : "أدبي"}
              </div>
            </div>
          </div>
        )}

        {/* End Profile Row  */}
      </div>
    </>
  );
});
