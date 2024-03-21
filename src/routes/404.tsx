import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class="rbt-error-area bg-gradient-11 rbt-section-gap">
        <div class="error-area">
          <div class="container">
            <div class="row justify-content-center text-center">
              <div class="col-10">
                {/* <h1 class="title">404!</h1> */}
                <h3 class="sub-title">الصفحة غير موجودة في الوقت الحالي</h3>
                <p>جاري العمل علي إنشاء الصفحة</p>
                <Link class="rbt-btn btn-gradient icon-hover" href="/">
                  <span class="btn-text">الرجوع الي الرئيسية</span>
                  <span class="btn-icon">
                    <i class="feather-arrow-left"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
