import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";
import LoadingStatus from "~/components/global/animation/lottie/animations/loadingStatus";
import { messagesContext, registerContext } from "~/root";
import { register } from "~/stores/register/register";
import { Toast } from "~/stores/toast";
import TemplateScripts from "~/templateScripts";

export default component$(() => {
  // register store
  const registerStore = useContext(registerContext);

  // messages store
  const messageStore = useContext(messagesContext);

  // loading
  const loading = useSignal<boolean>(false);

  // load template scripts
  useVisibleTask$(loadTemplateScripts);

  const nav = useNavigate();
  // submit
  const submit = $(async () => {
    // make loading start
    loading.value = true;

    const form = document.querySelector("#sign-form") as HTMLFormElement;

    const { status, response } = await registerStore.sign({
      name: form.elements["name"].value,
      // email: form.elements["email"].value,
      password: form.elements["password"].value,
      study_level: form.elements["study_level"].value,
      department: form.elements["department"].value,
      phone: form.elements["phone"].value,
      parent_phone: form.elements["parent_phone"].value,
    });

    if (status) {
      await nav("/");
      const newMessage = new Toast("تم التسجيل بنجاح", "success");
      messageStore.push({
        id: newMessage.id,
        message: newMessage.message,
        type: newMessage.type,
      });
    } else {
      // stop loading
      loading.value = false;

      // error message
      const newMessage = new Toast(
        response.data.errors[Object.keys(response.data.errors)[0]][0],
        "danger",
      );
      messageStore.push({
        id: newMessage.id,
        message: newMessage.message,
        type: newMessage.type,
      });
    }
  });
  return (
    <>
      <section class="signin-form mt--30">
        <section class="container">
          <div class="rbt-contact-form contact-form-style-1 max-width-auto">
            <h3 class="title">تسجيل حساب جديد</h3>
            <form
              method="POST"
              class="max-width-auto"
              id="sign-form"
              preventdefault:submit
              onSubmit$={submit}
            >
              <div class="form-group">
                <input name="name" type="text" required />
                <label>اسم الطالب *</label>
                <span class="focus-border" />
              </div>
              <div class="form-group">
                <input name="phone" type="number" required />
                <label>رقم الهاتف *</label>
                <span class="focus-border" />
              </div>
              {/* <div class="form-group">
                <input name="email" type="email" required />
                <label>الايميل *</label>
                <span class="focus-border" />
              </div> */}
              <div class="form-group">
                <input name="parent_phone" type="text" required />
                <label>رقم ولي الامر *</label>
                <span class="focus-border" />
              </div>
              <div class="form-group">
                <input name="password" type="password" required />
                <label>كلمة السر *</label>
                <span class="focus-border" />
              </div>
              <div class="form-group">
                <input name="re_password" type="password" required />
                <label>تأكيد كلمة السر *</label>
                <span class="focus-border" />
              </div>
              {/* categories */}
              <section class="categories">
                <section class="row">
                  <section class="col-lg-6 col-12">
                    <div class="form-group">
                      <div class="rbt-short-item">
                        <div class="filter-select">
                          <span class="select-label d-block">
                            السنة الدراسية
                          </span>
                          <div class="filter-select rbt-modern-select search-by-category">
                            <select
                              name="study_level"
                              data-size="3"
                              class="max-width-auto"
                            >
                              <option value="1">الصف الاول الثانوي</option>
                              <option value="2">الصف الثاني الثانوي</option>
                              <option value="3">الصف الثالث الثانوي</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section class="col-lg-6 col-12">
                    <div class="form-group">
                      <div class="rbt-short-item">
                        <div class="filter-select">
                          <span class="select-label d-block">الشعبة</span>
                          <div class="filter-select rbt-modern-select search-by-category">
                            <select data-size="3" name="department">
                              <option value="scientific">لا يوجد</option>

                              <option value="scientific">علمي</option>
                              <option value="literary">أدبي</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
              </section>

              {/* <div class="row gap-lg-0 gap-4 mb--30">
                <div class="col-lg-6 col-12">
                  <div class="rbt-checkbox">
                    <input
                      class="w-auto"
                      type="checkbox"
                      id="rememberme"
                      name="rememberme"
                    />
                    <label for="rememberme">تذكرني</label>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="rbt-lost-password text-lg-end text-start">
                    <a class="rbt-btn-link" href="#">
                      هل نسيت كلمة السر?
                    </a>
                  </div>
                </div>
              </div> */}
              <div class="form-submit-group">
                <button
                  type="submit"
                  class="rbt-btn btn-md btn-gradient hover-icon-reverse w-100 d-flex justify-content-center"
                >
                  {loading.value && <LoadingStatus />}
                  {!loading.value && (
                    <span class="icon-reverse-wrapper">
                      <span class="btn-text">تسجيل الحساب</span>
                      <span class="btn-icon">
                        <i class="feather-arrow-left" />
                      </span>
                      <span class="btn-icon">
                        <i class="feather-arrow-left" />
                      </span>
                    </span>
                  )}
                </button>
              </div>
              {/* sign in */}
              <div class="col-12 mt--30">
                <div class="rbt-lost-password text-center">
                  <Link class="rbt-btn-link" href="/user/register/login">
                    لديك حساب ؟ تسجيل دخول
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  );
});
