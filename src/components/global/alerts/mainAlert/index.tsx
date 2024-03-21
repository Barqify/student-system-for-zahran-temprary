import {
  $,
  component$,
  useContext,
  useStyles$,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import { messagesContext } from "~/root";
import { ToastType } from "~/stores/toast/interfaces/toastType";
import MainStyle from "./style/main.css?inline";
interface Props {
  alerts: ToastType[];
}
export default component$<Props>((props) => {
  // styles
  useStyles$(MainStyle);

  // each message delay
  const delay = 5000;

  // messages store
  const messagesStore = useContext(messagesContext);

  // delete alert
  const DeleteAlert = $((id: number) => {
    messagesStore.splice(
      messagesStore.findIndex((ele) => ele.id == id),
      1
    );
  });

  // auto delete messages
  useVisibleTask$(({ track }) => {
    track(() => messagesStore.values());
    if (messagesStore.length != 0) {
      setTimeout(() => {
        try {
          DeleteAlert(messagesStore[messagesStore.length - 1].id);
        } catch {}
      }, delay);
    }
  });
  return (
    <>
      <section class="main-alerts">
      {/* <Alert /> */}

        {props.alerts.map((alert) => {
          return (
            <>
              <div
                class={{
                  alert: true,
                  [`alert-${alert.type}`]: true,
                  ["d-flex justify-center"]: true,
                }}
                role="alert"
              >
                {alert.message}
                <button
                  onClick$={() => DeleteAlert(alert.id)}
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                ></button>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
});
