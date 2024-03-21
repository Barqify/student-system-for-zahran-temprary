import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { registerContext } from "~/root";
import { setting } from "~/setting";
import { UserData } from "~/stores/user/interfaces/userData";
interface Props {
  data: {
    hash: string;
    amount: number;
    orderId: number;
    curreny: string;
    section_id: number;
    course_id: number;
    user: UserData;
  };
}
export default component$<Props>((props) => {
  const kashirData = setting.paymentMethods.kashir;
  return (
    <>
      {kashirData.isWork && (
        <>
          <script
            id="kashier-iFrame"
            src="https://checkout.kashier.io/kashier-checkout.js"
            data-amount={props.data.amount}
            data-hash={props.data.hash}
            data-currency="EGP"
            data-orderId={props.data.orderId}
            data-merchantId={kashirData.mid}
            data-merchantRedirect={`${setting.url}/courses/checkout/status/${props.data.course_id}/${props.data.section_id}`}
            data-mode={kashirData.mode}
            data-metaData={JSON.stringify({ metaData: props.data.user })}
            data-description="ORDER-DESCRIPTION"
            data-redirectMethod="get"
            data-failureRedirect="false"
            data-allowedMethods="card,wallet"
            data-type="external"
            data-brandColor="#00bcbc"
            data-display="ar"
          ></script>
        </>
      )}
      {!kashirData.isWork && (
        <div class="alert alert-success d-flex align-items-center" role="alert">
          <div>جاري العمل علي اضافة طرق الدفع عن طريق فيزا ومحفظة الهاتف</div>
        </div>
      )}
    </>
  );
});
