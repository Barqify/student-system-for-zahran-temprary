import { component$ } from "@builder.io/qwik";

export default component$(() => {
  const message = `تنبيه هام : لا تقم بإعادة تحميل الصفحة او الخروج منها بعد اتمام عملية الدفع ويجب عليك الانتظار حتي يظهر لك انه يمكنك مشاهدة الدروس`
    return (
        <>
            <section class="checkout-alert">
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                  <div>{ message }</div>
                </div>
            </section>
        </>
    );
});
