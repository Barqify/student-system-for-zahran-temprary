import {
  component$,
  Slot,
  useContext,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { callServer } from "~/assets/scripts/callServer";
import { templateStyle } from "~/assets/scripts/templateStyle";
import MainAlert from "~/components/global/alerts/mainAlert";
import PageLoading from "~/components/global/animation/lottie/animations/pageLoading";
import { messagesContext, registerContext } from "~/root";
import { register } from "~/stores/register/register";
import { Toast } from "~/stores/toast";
import { UserData } from "~/stores/user/interfaces/userData";
import TemplateScripts from "~/templateScripts";

export const useCheckAuth = routeLoader$<{ user: UserData; status: boolean }>(
  register.checkAuth,
);

export default component$(() => {
  const authResult = useCheckAuth();
  const nav = useNavigate();
  const location = useLocation();
  const registerStore = useContext(registerContext);
  const messagesStore = useContext(messagesContext);

  useVisibleTask$(() => {
    if (authResult.value.status) {
      registerStore.setAuth(authResult.value.user);
    } else {
      const newMessage = new Toast("يجب عليك تسجيل الدخول اولا", "danger");
      messagesStore.push({
        id: newMessage.id,
        message: newMessage.message,
        type: newMessage.type,
      });
      nav(`/user/register/login?next=${authResult.value.next}`);
    }
  });
  return (
    <>
      <PageLoading appear={location.isNavigating}/>
      <section class="main-page mt--10">
        <MainAlert alerts={messagesStore} />
        {authResult.value.status && <Slot />}
      </section>
    </>
  );
});

export const head: DocumentHead = {
  links: templateStyle,
};
