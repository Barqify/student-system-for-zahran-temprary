import { component$ } from "@builder.io/qwik";
import { Quiz } from "~/interfaces/course/section/lecture/quiz";
import { getOptionTilte, options } from "../..";
import { Result } from "../../interfaces/result";

interface Props {
  quiz: Quiz;
  result: Result;
}
export default component$<Props>((props) => {
  return (
    <>
      <section class="quiz-result">
        <div class="inner">
          <div class="content">
            <div class="section-title">
              <p class="mb--10">{props.quiz.name}</p>
              <h5>
                الدرجة الكاملة: {props.result.total} /{" "}
                {props.result.total_strudent_answers}
              </h5>
            </div>

            <div class="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
              <table class="rbt-table table table-borderless">
                <thead>
                  <tr>
                    <th>السؤال</th>
                    <th>اجابتك</th>
                    <th>الاجابة الصحيحة</th>
                    <th>درجتك</th>
                    <th>الحالة</th>
                    <th>مشاهدة السؤال</th>
                  </tr>
                </thead>
                <tbody>
                  {props.result.data.map((answer) => {
                    return (
                      <>
                        <tr>
                          <td class="d-flex align-items-center">
                            <p class="b3">{answer.question_title}</p>
                          </td>
                          <td>
                            <p class="b3">{getOptionTilte(answer.answer)}</p>
                          </td>
                          <td>
                            <p class="b3">
                              {getOptionTilte(answer.correct_answer)}
                            </p>
                          </td>
                          <td>
                            <p class="b3">
                              {answer.status ? answer.degree : 0}
                            </p>
                          </td>
                          <td>
                            <span
                              class={`rbt-badge-5 bg-color-success-opacity color-${
                                answer.status ? "success" : "danger"
                              }`}
                            >
                              اجابة {answer.status ? "صحيحة" : "خاطئة"}
                            </span>
                          </td>
                          <td>
                            {/* <button
                              style={{
                                background: "none",
                                border: "none",
                                outline: "none",
                              }}
                              class="rbt-btn-link"
                            >
                              عرض<i class="feather-arrow-left"></i>
                            </button> */}
                            <div>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  outline: "none",
                                }}
                                type="button"
                                class="rbt-btn-link"
                                data-bs-toggle="modal"
                                data-bs-target={`#staticBackdrop-${answer.id}`}
                              >
                                عرض<i class="feather-arrow-left"></i>
                              </button>
                              {/* Modal */}
                              <div
                                class="modal fade"
                                id={`staticBackdrop-${answer.id}`}
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabIndex={-1}
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog modal-dialog-centered">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1
                                        class="modal-title fs-5"
                                        id="staticBackdropLabel"
                                      >
                                        {answer.question_title}
                                      </h1>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      />
                                    </div>
                                    <div class="modal-body">
                                      <img
                                        class="rounded mx-auto d-block"
                                        src={answer.question_image}
                                        alt={answer.question_title}
                                      />
                                    </div>
                                    <div class="modal-footer d-flex justify-content-start">
                                      <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        اغلاق
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
