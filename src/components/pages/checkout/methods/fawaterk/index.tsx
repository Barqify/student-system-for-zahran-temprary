import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Form, routeAction$, useNavigate } from "@builder.io/qwik-city";
import { json } from "stream/consumers";
import { callServer } from "~/assets/scripts/callServer";
import LoadingStatus from "~/components/global/animation/lottie/animations/loadingStatus";
import { OrderData } from "~/interfaces/checkout/orderData";
import { registerContext } from "~/root";
import { fawaterkData } from "~/stores/fawaterk";
import { UserData } from "~/stores/user/interfaces/userData";

interface Props {
  orderData: OrderData;
  sectionId: string;
}
export default component$<Props>((props) => {
  // nav
  const nav = useNavigate();

  const registerStore = useContext(registerContext);

  // stages
  type Stages = "generate" | "code";
  const currentStage = useSignal<Stages>("generate");
  const fawaterkResponse = useSignal<{
    invoice_id: number;
    invoice_key: string;
    payment_data: {
      fawryCode: string;
      expireDate: string;
    };
  }>({
    invoice_id: 0,
    invoice_key: "",
    payment_data: {
      fawryCode: "",
      expireDate: "",
    },
  });
  const loading = useSignal<boolean>(false);

  // handel generate fawry code
  const handelGenerate = $(async () => {
    if(!loading.value) {
      loading.value = true;

      // response
      const response = await callServer(`fawaterk/executePayment/${props.sectionId}`, {
        headers: [
          {
            name: "Authorization",
            value: `Bearer ${registerStore.user.data?.token}`
          }
        ]
      });
  
      if (response.response!.ok) {
        console.log("data: ", response.data)
        fawaterkResponse.value = response.data!.data;
        localStorage.setItem("fawry_data", JSON.stringify(fawaterkResponse.value));
      }
      loading.value = false;
    }

  });

  // check status
  const checkStatus = $(async () => {
    if(!loading.value) {
      loading.value = true;
      // headers
      const response = await callServer(`fawaterk/paymentStatus/${props.sectionId}`, {
        headers: [
          {
            name: "Authorization",
            value: `Bearer ${registerStore.user.data?.token}`
          }
        ]
      })
  
      if(response.response!.ok) {
        if(response.data!.status) {
          await nav(`/courses/detail/${props.orderData.data.section.course_id}`);
        }
      }
      loading.value = false;
    }

  });

  return (
    <>
      <section class="fawaterk-fawry">
        <div class="rbt-card variation-03 rbt-hover">
          {currentStage.value == "generate" && (
            <>
              <section class="generate d-flex justify-content-center">
                {fawaterkResponse.value.payment_data && fawaterkResponse.value.payment_data.fawryCode != "" && (
                  <>
                    <section class="fawry-code d-flex flex-column align-items-center">
                      <span>{fawaterkResponse.value.payment_data.fawryCode}</span>
                      <p>
                        يرجي اعطاء الكود الي البائع, وبعد الدفع قم بالضغط علي
                        إعادة تحميل الحالة
                      </p>
                      <button
                        onClick$={checkStatus}
                        class="rbt-btn btn-gradient hover-icon-reverse"
                      >
                      {loading.value && <LoadingStatus />}
                      {!loading.value && (
                        <span class="icon-reverse-wrapper">
                          <span class="btn-text">إعادة تحميل الحالة</span>
                          <span class="btn-icon">
                            <i class="feather-arrow-left"></i>
                          </span>
                          <span class="btn-icon">
                            <i class="feather-arrow-left"></i>
                          </span>
                        </span>
                      )}
                      </button>
                    </section>
                  </>
                )}
                {fawaterkResponse.value.payment_data.fawryCode == "" && (
                  <>
                    <button
                      onClick$={handelGenerate}
                      class="rbt-btn btn-gradient hover-icon-reverse"
                    >
                      {loading.value && <LoadingStatus />}
                      {!loading.value && (
                        <span class="icon-reverse-wrapper">
                          <span class="btn-text">توليد الكود</span>
                          <span class="btn-icon">
                            <i class="feather-arrow-left"></i>
                          </span>
                          <span class="btn-icon">
                            <i class="feather-arrow-left"></i>
                          </span>
                        </span>
                      )}
                    </button>
                  </>
                )}
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
});
