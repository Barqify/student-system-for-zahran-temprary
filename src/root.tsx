import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useTask$,
  type NoSerialize,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  routeLoader$,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/global/router-head/index";
import type { Register } from "./stores/register/interfaces/register";
import { register } from "./stores/register/register";
import { ToastType } from "./stores/toast/interfaces/toastType";

export const registerContext = createContextId<Register>("register_context");

export const messagesContext = createContextId<ToastType[]>("messages_context");

export default component$(() => {
  const registerStore = useStore(register);

  const messagesStore = useStore([]);
  useContextProvider(messagesContext, messagesStore);
  useContextProvider(registerContext, registerStore);
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <meta http-equiv="pragma" content="no-cache" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body dir="rtl" lang="ar">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
