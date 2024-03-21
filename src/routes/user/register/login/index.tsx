import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link, RequestHandler, useNavigate } from "@builder.io/qwik-city";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";
import LoadingStatus from "~/components/global/animation/lottie/animations/loadingStatus";
import { messagesContext, registerContext } from "~/root";
import { Toast } from "~/stores/toast";
import TemplateScripts from "~/templateScripts";

// export const onGet: RequestHandler = async (e) => {
//   /**
//    * get token and next for check if the user is login
//    * and this is redirect problem
//    */
//   const token = e.cookie.get("token")?.value;
//   const next= e.query.get("next");
//   if(token && next) {
//     throw e.redirect(303, next);
//   }
// }
export default component$(() => {
  // load template scripts
  useVisibleTask$(loadTemplateScripts);

  // register store
  const registerStore = useContext(registerContext);

  // message store
  const messageStore = useContext(messagesContext);

  // loading
  const loading = useSignal<boolean>(false);

  // nav
  const nav = useNavigate();

  // submit
  const submit = $(async function () {
    if (!loading.value) {
      // make loading start
      loading.value = true;

      // login form
      const loginForm = document.querySelector(
        "#login-form",
      ) as HTMLFormElement;

      const { status, response } = await registerStore.login({
        phone: loginForm.elements["phone"].value,
        password: loginForm.elements["password"].value,
      });

      if (status) {
          // check next
          // const next = new URLSearchParams(window.location.search).get("next");
          // if (next) await nav(next);
          // else await nav("/");

          // after login return to register to test redirect
          await nav("/");
          // success message
          const newMessage = new Toast("مرحبا بعودتك", "success");
          messageStore.push({
            id: newMessage.id,
            message: newMessage.message,
            type: newMessage.type,
          });
      } else {
        // stop loading
        loading.value = false;

        // error message
        const newMessage = new Toast("يرجي التأكد من بياناتك", "danger");
        messageStore.push({
          id: newMessage.id,
          message: newMessage.message,
          type: newMessage.type,
        });
      }
    }
  });
  return (
    <>
      <section class="login-form mt--30">
        <section class="container">
          <div class="rbt-contact-form contact-form-style-1 max-width-auto">
            <h3 class="title">تسجيل الدخول</h3>
            <form
              class="max-width-auto"
              id="login-form"
              preventdefault:submit
              onSubmit$={submit}
            >
              <div class="form-group">
                <input name="phone" type="number" required />
                <label>رقم الهاتف *</label>
                <span class="focus-border" />
              </div>
              <div class="form-group">
                <input name="password" type="password" required />
                <label>كلمة السر *</label>
                <span class="focus-border" />
              </div>
              {/* <div class="row gap-lg-0 gap-4 mb--30">
                <div class="col-lg-6 col-12">
                  <div class="rbt-checkbox max-width-auto">
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
                      <span class="btn-text">تسجيل الدخول</span>
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
                  <Link class="rbt-btn-link" href="/user/register/signin">
                    ليس لديك حساب ؟ تسجيل حساب
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
