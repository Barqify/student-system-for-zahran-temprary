import { component$ } from "@builder.io/qwik";
interface Props {
  currentSupport: string;
}
export default component$<Props>((props) => {
  return (
    <>
      <section class="support gap-2 d-flex align-items-center mt--50">
        <p class="p-0 m-0">عندك سؤال ؟</p>
        <a
          class="rbt-btn btn-border hover-icon-reverse"
          href={`https://api.whatsapp.com/send/?phone=2${props.currentSupport}&text=&type=phone_number&app_absent=0`}
        >
          <span class="icon-reverse-wrapper">
            <span class="btn-text">اسألني دلوقت</span>
            <span class="btn-icon">
              <i class="feather-arrow-left"></i>
            </span>
            <span class="btn-icon">
              <i class="feather-arrow-left"></i>
            </span>
          </span>
        </a>
      </section>
    </>
  );
});
