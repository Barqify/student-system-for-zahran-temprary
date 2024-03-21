import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { callServer } from "~/assets/scripts/callServer";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";
import CechkoutAlert from "~/components/pages/checkout/alert";
import Fawaterk from "~/components/pages/checkout/methods/fawaterk";
import Kashier from "~/components/pages/checkout/methods/kashier";
import { messagesContext, registerContext } from "~/root";
import { register } from "~/stores/register/register";
import { Toast } from "~/stores/toast";
import { UserData } from "~/stores/user/interfaces/userData";

interface GetOrderData {
  data: {
    hash: string;
    currency: string;
    orderId: number;
    summary: {
      amount: number;
      tax: number;
      online_payment: number;
      total: number;
    };
    section: {
      id: number;
      title: string;
      description: string;
      price: number;
      discound: number;
      total_price: number;
      course_id: number;
      course: {
        id: number;
        name: string;
        sub_description: string;
        description: string;
        image: string;
        study_level: string;
        department: string;
        instructor_id: number;
        perview: string;
        created_at: string;
        updated_at: string;
      };
    };
  };
  auth: {
    status: boolean;
    user: UserData | null;
    next: string;
  };
  message?: string;
}

// check section
/**
 *
 * this function check if the user has the section or not
 */
async function checkSection(
  token: string,
  course_id: string,
  section_id: string,
) {
  const response = await callServer(`auth/course/${course_id}`, {
    headers: [
      {
        name: "Authorization",
        value: `Bearer ${token}`,
      },
    ],
  });

  if (response.status) {
    const course = response.data;

    for (let i = 0; i < course.sections.length; i++) {
      if (
        course.sections[i].id == parseInt(section_id) &&
        course.sections[i].is_owned
      ) {
        return true;
      }
    }
  }

  return false;
}
export const useGetOrderData = routeLoader$<GetOrderData>(async (e) => {
  // first check auth
  const authResult = await register.checkAuth(e);
  const course_id = e.params.course_id;
  const section_id = e.params.section_id;

  if (authResult.status) {
    if (
      await checkSection(
        e.cookie.get("token")?.value as string,
        course_id,
        section_id,
      )
    ) {
      throw e.redirect(308, `/courses/detail/${course_id}`);
    } else {
      const response = await callServer("payment", {
        method: "POST",
        headers: [
          {
            name: "Authorization",
            value: `Bearer ${e.cookie.get("token")?.value}`,
          },
        ],
        data: {
          section_id: section_id,
        },
        dataType: "json",
      });

      return {
        data: response.data,
        auth: authResult,
      };
    }
  } else {
    return {
      data: {},
      auth: authResult,
      message: "يجب عليك التسجيل اولا",
    };
  }
});

export default component$(() => {
  // order data
  const orderData = useGetOrderData();
  const nav = useNavigate();
  const messagesStore = useContext(messagesContext);
  const registerStore = useContext(registerContext);

  // current method
  type Methods = "visaWallet" | "fawry";
  const currentMethod = useSignal<Methods>("visaWallet");
  const methods: {
    id: number;
    name: Methods;
    title: string;
  }[] = [
    {
      id: 1,
      name: "visaWallet",
      title: "فيزا او محفظة",
    },
    {
      id: 2,
      name: "fawry",
      title: "فوري",
    },
  ];
  /**
   *
   * this function change current methods
   * @param current - the current method you will change to it
   *
   */
  const changeCurrentMethod = $((current: Methods) => {
    currentMethod.value = current;
  });

  // load template script
  useVisibleTask$(loadTemplateScripts);

  // check auth
  useVisibleTask$(() => {
    console.log(orderData.value.data);
    if (!orderData.value.auth.status) {
      // push message
      const message = new Toast(orderData.value.message!, "danger");
      messagesStore.push({
        id: message.id,
        message: message.message,
        type: message.type,
      });

      nav(`/user/register/login?next=${orderData.value.auth.next}`);
    }
  });
  return (
    <>
      {orderData.value.auth.status && (
        <div>
          <div class="checkout_area bg-color-white rbt-section-gap">
            <div class="container">
              <div class="row g-5 checkout-form">
                <div class="col-12">
                  <div class="row pl--50 pl_md--0 pl_sm--0">
                    {/* Cart Total */}
                    <div class="col-12 mb--60">
                      <h4 class="checkout-title">تفاصيل الطلب</h4>
                      <div class="checkout-cart-total">
                        <h4>
                          الطلبات <span>المجموع</span>
                        </h4>
                        <ul>
                          <li>
                            {orderData.value.data.section.course.description} -{" "}
                            {orderData.value.data.section.title}{" "}
                            <span>
                              {orderData.value.data.summary.amount} جنيه
                            </span>
                          </li>
                          <li>
                            مصاريف ادارية{" "}
                            <span>
                              {orderData.value.data.summary.online_payment} جنية
                            </span>
                          </li>
                        </ul>
                        <p>
                          السعر قبل المصاريف{" "}
                          <span>
                            {orderData.value.data.summary.amount} جنيه
                          </span>
                        </p>
                        <h4 class="mt--30">
                          مجموع الطلب{" "}
                          <span>{orderData.value.data.summary.total} جنيه</span>
                        </h4>
                      </div>
                    </div>
                    {/* Payment Method */}
                    <div class="col-12 mb--60">
                      <div class="plceholder-button mt--50">
                        <CechkoutAlert />
                        {registerStore.auth && (
                          <>
                            <section class="payment">
                              <div class="advance-tab-button">
                                <ul
                                  class="nav nav-tabs tab-button-style-2"
                                  id="myTab-4"
                                  role="tablist"
                                >
                                  {methods.map((method) => {
                                    return (
                                      <>
                                        <li key={method.id} role="presentation">
                                          <a
                                            href="#"
                                            class={`tab-button ${
                                              method.id == 1 ? "active" : ""
                                            }`}
                                            id="home-tab-4"
                                            data-bs-toggle="tab"
                                            data-bs-target="#home-4"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="false"
                                            onClick$={() =>
                                              changeCurrentMethod(method.name)
                                            }
                                          >
                                            <span class="title">
                                              {method.title}
                                            </span>
                                          </a>
                                        </li>
                                      </>
                                    );
                                  })}
                                </ul>
                              </div>
                              <section class="payment-methods">
                                <section class="row">
                                  {currentMethod.value == "visaWallet" && (
                                    <>
                                      <section class="col-12">
                                        <section class="kashier">
                                          <Kashier
                                            data={{
                                              hash: orderData.value.data.hash,
                                              amount:
                                                orderData.value.data.summary
                                                  .total,
                                              orderId:
                                                orderData.value.data.orderId,
                                              curreny:
                                                orderData.value.data.currency,
                                              section_id:
                                                orderData.value.data.section.id,
                                                course_id: orderData.value.data.section.course_id,
                                              user: registerStore.user.data!,
                                            }}
                                          />
                                        </section>
                                      </section>
                                    </>
                                  )}
                                  {currentMethod.value == "fawry" && (
                                    <>
                                      <section class="col-12">
                                        <section class="fawaterk">
                                          <Fawaterk
                                            sectionId={orderData.value.data.section.id.toString()}
                                            orderData={orderData.value}
                                          />
                                        </section>
                                      </section>
                                    </>
                                  )}
                                </section>
                              </section>
                            </section>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rbt-separator-mid">
            <div class="container">
              <hr class="rbt-separator m-0" />
            </div>
          </div>
        </div>
      )}
    </>
  );
});
