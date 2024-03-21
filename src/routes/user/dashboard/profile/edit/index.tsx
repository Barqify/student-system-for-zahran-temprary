import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
  useVisibleTaskQrl,
} from "@builder.io/qwik";
import { callServer } from "~/assets/scripts/callServer";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";
import LoadingStatus from "~/components/global/animation/lottie/animations/loadingStatus";
import { messagesContext, registerContext } from "~/root";
import { appendMessage, Toast } from "~/stores/toast";
import { UserData } from "~/stores/user/interfaces/userData";

export default component$(() => {
  // load template scripts
  useVisibleTask$(loadTemplateScripts);

  // register store
  const registerStore = useContext(registerContext);

  // messages store
  const messagesStore = useContext(messagesContext);

  // loading
  const loading = useSignal<boolean>(false);

  // bind user data
  const name = useSignal<string>(registerStore.user.data?.name as string);
  const phone = useSignal<string>(registerStore.user.data?.phone as string);
  const parentPhone = useSignal<string>(
    registerStore.user.data?.parent_phone as string,
  );
  const studyLevel = useSignal<string>(
    registerStore.user.data?.study_level as string,
  );
  const department = useSignal<string>(
    registerStore.user.data?.department as string,
  );

  // update input data
  /**
   * this function update input data to in first time load
   */
  const updateInputData = $(() => {
    name.value = registerStore.user.data?.name as string;
    phone.value = registerStore.user.data?.phone as string;
    parentPhone.value = registerStore.user.data?.parent_phone as string;
    studyLevel.value = registerStore.user.data?.study_level as string;
    department.value = registerStore.user.data?.department as string;
  });
  useVisibleTask$(async () => {
    updateInputData();
  });

  // update user data
  /**
   * this function update user profile data
   */
  const updateUserData = $(async () => {
    if (!loading.value) {
      // change loading
      loading.value = true;

      // make request
      const response = await callServer("auth/updateProfile", {
        method: "POST",
        headers: [
          {
            name: "Authorization",
            value: `Bearer ${registerStore.user.data?.token}`,
          },
        ],
        data: {
          name: name.value,
          phone: phone.value,
          parent_phone: parentPhone.value,
          study_level: studyLevel.value,
          department: department.value,
        },
        dataType: "json",
      });

      if (response.response?.ok) {
        // set user
        registerStore.user.setUser(response.data!.data as UserData);

        // success message
        appendMessage(
          {
            message: "تم تحديث البيانات",
            type: "success",
          },
          messagesStore,
        );
      } else {
        // error message
        appendMessage(
          {
            message:
              response.data!.errors[Object.keys(response.data!.errors)[0]][0],
            type: "danger",
          },
          messagesStore,
        );
      }
      // change loading
      loading.value = false;
    }
  });

  // password data
  const currentPassword = useSignal<string>("");
  const newPassword = useSignal<string>("");
  const reNewPassword = useSignal<string>("");

  // clear passwords input
  /**
   * this function clear password fields after reset password
   */
  const clearPasswordsInput = $(() => {
    currentPassword.value = "";
    newPassword.value = "";
    reNewPassword.value = "";
  });
  
  // update user password
  /**
   * this function update user password for the current user
   */
  const updateUserPassword = $(async () => {
    if (!loading.value) {
      // change loading
      loading.value = true;

      // response
      const response = await callServer("auth/updatePassword", {
        method: "POST",
        headers: [
          {
            name: "Authorization",
            value: `Bearer ${registerStore.user.data?.token}`,
          },
        ],
        data: {
          current_password: currentPassword.value,
          password: newPassword.value,
          password_confirmation: reNewPassword.value,
        },
        dataType: "json",
      });

      if (response.response?.ok) {
        // clear inputs
        clearPasswordsInput();

        // success message
        appendMessage(
          {
            message: "تم تحديث كلمة السر",
            type: "success",
          },
          messagesStore,
        );
      } else {
        // error message
        appendMessage(
          {
            message:
              response.data!.errors[Object.keys(response.data!.errors)[0]][0],
            type: "danger",
          },
          messagesStore,
        );
      }
      // change loading
      loading.value = false;
    }
  });

  return (
    <>
      <div class="content">
        <div class="section-title">
          <h4 class="rbt-title-style-3">الاعدادات</h4>
        </div>
        <div class="advance-tab-button mb--30">
          <ul
            class="nav nav-tabs tab-button-style-2 justify-content-start"
            id="settinsTab-4"
            role="tablist"
          >
            <li role="presentation">
              <a
                href="#"
                class="tab-button active"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
              >
                <span class="title">معلوماتي</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#"
                class="tab-button"
                id="password-tab"
                data-bs-toggle="tab"
                data-bs-target="#password"
                role="tab"
                aria-controls="password"
                aria-selected="false"
              >
                <span class="title">كلمة السر</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <div
            class="tab-pane fade active show"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {/* Start Profile Row  */}
            <form
              preventdefault:submit
              onSubmit$={updateUserData}
              class="rbt-profile-row rbt-default-form row row--15"
            >
              <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="rbt-form-group">
                  <label for="name">الإسم</label>
                  <input id="name" type="text" bind:value={name} required />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="rbt-form-group">
                  <label for="phone">رقم الهاتف</label>
                  <input id="phone" type="tel" bind:value={phone} required />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="rbt-form-group">
                  <label for="parent_phone">رقم هاتف ولي الامر</label>
                  <input
                    id="parent_phone"
                    type="tel"
                    bind:value={parentPhone}
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                <label for="study_level">السنة الدراسية</label>

                <div class="form-group">
                  <div class="rbt-short-item">
                    <div class="filter-select">
                      <div class="filter-select rbt-modern-select search-by-category">
                        <select
                          id="study_level"
                          name="study_level"
                          data-size="3"
                          class="max-width-auto"
                          bind:value={studyLevel}
                        >
                          <option value="1">الصف الاول الثانوي</option>
                          <option value="2">الصف الثاني الثانوي</option>
                          <option value="3">الصف الثالث الثانوي</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {studyLevel.value == "2" && (
                <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label for="department">الشعبة</label>

                  <div class="form-group">
                    <div class="rbt-short-item">
                      <div class="filter-select">
                        <div class="filter-select rbt-modern-select search-by-category">
                          <select
                            data-size="3"
                            name="department"
                            bind:value={department}
                          >
                            <option value="scientific">علمي</option>
                            <option value="literary">أدبي</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div class="col-12 mt--20">
                <div class="rbt-form-group">
                  <button class="rbt-btn btn-gradient">
                    {loading.value && <LoadingStatus />}
                    {!loading.value && "تحديث المعلومات"}
                  </button>
                </div>
              </div>
            </form>
            {/* End Profile Row  */}
          </div>
          <div
            class="tab-pane fade"
            id="password"
            role="tabpanel"
            aria-labelledby="password-tab"
          >
            {/* Start Profile Row  */}
            <form
              preventdefault:submit
              onSubmit$={updateUserPassword}
              class="rbt-profile-row rbt-default-form row row--15"
            >
              <div class="col-12">
                <div class="rbt-form-group">
                  <label for="currentpassword">كلمة السر الحالية</label>
                  <input
                    id="currentpassword"
                    type="password"
                    placeholder="كلمة السر الحالية"
                    bind:value={currentPassword}
                    required
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="rbt-form-group">
                  <label for="newpassword">كلمة السر الجديدة</label>
                  <input
                    id="newpassword"
                    type="password"
                    placeholder="كلمة السر الجديدة"
                    bind:value={newPassword}
                    required
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="rbt-form-group">
                  <label for="retypenewpassword">
                    إعادة كتابة كلمة السر الجديدة
                  </label>
                  <input
                    id="retypenewpassword"
                    type="password"
                    placeholder="إعادة كتابة كلمة السر الجديدة"
                    bind:value={reNewPassword}
                    required
                  />
                </div>
              </div>
              <div class="col-12 mt--10">
                <div class="rbt-form-group">
                  <button class="rbt-btn btn-gradient">
                    {loading.value && <LoadingStatus />}
                    {!loading.value && "تحديث كلمة السر"}{" "}
                  </button>
                </div>
              </div>
            </form>
            {/* End Profile Row  */}
          </div>
        </div>
      </div>
    </>
  );
});
