import { $, component$, QRL, useContext, useSignal } from "@builder.io/qwik";
import { callServer } from "~/assets/scripts/callServer";
import LoadingStatus from "~/components/global/animation/lottie/animations/loadingStatus";
import { Quiz } from "~/interfaces/course/section/lecture/quiz";
import { Question } from "~/interfaces/course/section/lecture/quiz/question";
import { registerContext } from "~/root";
// import { Props } from "../..";

interface Props {
  quiz: Quiz;
  setQuizStartData: QRL<(quizData: Quiz) => void>;
}
export default component$<Props>((props) => {
  // register store
  const registerStore = useContext(registerContext);

  // loading
  const loadingStatus = useSignal<boolean>(false);

  // start before
  const startBefore = useSignal<boolean>(false);

  /**
   * this function start the quiz for the user
   */
  const startQuiz = $(async () => {
    if (!loadingStatus.value) {
      // change status
      loadingStatus.value = true;

      // response
      const response = await callServer(`quiz-start/${props.quiz.id}`, {
        headers: [
          {
            name: "Authorization",
            value: `Bearer ${registerStore.user.data?.token}`,
          },
        ],
      });

      if (response.response?.ok) {
        const data = response.data!.data as Quiz;
        // const questions = data.questions;
        // console.log("data", data)
        // console.log("questions", questions)

        // set questions data in local storage
        localStorage.setItem("questions_data", JSON.stringify(data));

        // change the current state
        // props.setQuestions(questions);

        props.setQuizStartData(data);
      } else {
        startBefore.value = true;
      }
      loadingStatus.value = false;
    }
  });
  return (
    <>
      <div class="bg-color-white rbt-shadow-box">
        <h5 class="rbt-title-style-3">{props.quiz.name}</h5>
        <p>
          المدة: {props.quiz.duration}{" "}
          {props.quiz.duration < 11 ? "دقائق" : "دقيقة"}
        </p>
        <p>درجة الامتحان: {props.quiz.total_degree}</p>
        {!startBefore.value && (
          <div class="submit-btn">
            <button
              onClick$={startQuiz}
              class="rbt-btn btn-gradient hover-icon-reverse"
            >
              {loadingStatus.value && <LoadingStatus />}
              {!loadingStatus.value && (
                <span class="icon-reverse-wrapper">
                  <span class="btn-text">بدأ الامتحان</span>
                  <span class="btn-icon">
                    <i class="feather-arrow-left"></i>
                  </span>
                  <span class="btn-icon">
                    <i class="feather-arrow-left"></i>
                  </span>
                </span>
              )}
            </button>
          </div>
        )}
        {startBefore.value && (
          <div class="alert alert-danger" role="alert">
            لا يمكن بدأ الاختبار اكثر من مرة
          </div>
        )}
      </div>
    </>
  );
});
