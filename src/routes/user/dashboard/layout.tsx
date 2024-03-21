import {
  component$,
  Slot,
  useContext,
  useTask$,
  $,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { resourceUsage } from "process";
import SideNavbar from "~/components/global/sections/sideNavbar";
import { messagesContext, registerContext } from "~/root";
import { register } from "~/stores/register/register";
import { Toast } from "~/stores/toast";

export const useCheckAuth = routeLoader$(register.checkAuth);

export default component$(() => {
  const authResult = useCheckAuth();
  const registerStore = useContext(registerContext);
  const messagesStore = useContext(messagesContext);

  const nav = useNavigate();

  useVisibleTask$(async () => {
    if(authResult.value.status) {
      await registerStore.setAuth(authResult.value.user)
    } else {
      const newMessage = new Toast("يجب عليك تسجيل الدخول اولا", "danger");
      messagesStore.push({
        id: newMessage.id,
        message: newMessage.message,
        type: newMessage.type,
      });
      nav("/user/register/login");
    }
  });
  return (
    <>
      {registerStore.auth && (
        <>
          {/* Start Card Style */}
          <div class="rbt-dashboard-area mt--50 rbt-section-overlayping-top rbt-section-gapBottom">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  {/* Start Dashboard Top  */}
                  {/* <div class="rbt-dashboard-content-wrapper">
                    <div class="tutor-bg-photo bg_image bg_image--23 height-350" />
                    <div class="rbt-tutor-information">
                      <div class="rbt-tutor-information-left">
                        <div class="tutor-content">
                          <h5 class="title">Emily Hannah</h5>
                          <ul class="rbt-meta rbt-meta-white mt--5">
                            <li>
                              <i class="feather-book" />5 Courses Enroled
                            </li>
                            <li>
                              <i class="feather-award" />4 Certificate
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* End Dashboard Top  */}
                  <div class="row g-5">
                    <div class="col-lg-3">
                      {/* side navar */}
                      <SideNavbar />
                    </div>
                    <div class="col-lg-9">
                      <div class="rbt-dashboard-content bg-color-white rbt-shadow-box mb--60">
                        <Slot />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Card Style */}
        </>
      )}
    </>
  );
});
