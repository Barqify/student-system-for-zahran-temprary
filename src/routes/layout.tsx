import {
  component$,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import NavBar from "~/components/global/sections/navbar";
import Footer from "~/components/global/sections/footer";
import ToTop from "~/components/global/boxes/toTop";
import { templateStyle } from "~/assets/scripts/templateStyle";
import { messagesContext, registerContext } from "~/root";
import MainAlert from "~/components/global/alerts/mainAlert";
import { register } from "~/stores/register/register";
import PageLoading from "~/components/global/animation/lottie/animations/pageLoading";


export const useCheckAuth = routeLoader$(register.checkAuth);

export default component$(() => {
  // check auth and stores
  const checkResult = useCheckAuth();
  const registerStore = useContext(registerContext);
  const messagesStore = useContext(messagesContext);

  // location
  const location = useLocation();

  // first load
  const firstLoad = useSignal(true);

  useVisibleTask$(() => {
    if (checkResult.value.status) {
      registerStore.setAuth(checkResult.value.user);
    } else {
      registerStore.logOut();
    }
    // this part to fix isNavigating when navigate between layouts
    firstLoad.value = false;
  });
  return (
    <>
      {/* loading bar */}
      <PageLoading appear={location.isNavigating && !firstLoad.value} />

      {/* main alerts */}
      <MainAlert alerts={messagesStore} />

      <section class="main-page mt--10">
        {/* navbar */}
        <NavBar />

        {/* main */}
        <main class="rbt-main-wrapper">
          <Slot />
        </main>

        {/* footer */}
        <Footer />
      </section>

      {/* to top */}
      <ToTop />
    </>
  );
});

export const head: DocumentHead = {
  links: templateStyle,
};
