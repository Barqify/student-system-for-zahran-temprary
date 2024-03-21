import {
  $,
  component$,
  QRL,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { callServer } from "~/assets/scripts/callServer";
import LoadingStatus from "~/components/global/animation/lottie/animations/loadingStatus";
import { Quiz } from "~/interfaces/course/section/lecture/quiz";
import { Question } from "~/interfaces/course/section/lecture/quiz/question";
import { registerContext } from "~/root";
import { options } from "../..";
import { Result } from "../../interfaces/result";
import { Answer } from "./interfaces/answer";
import { Option } from "./interfaces/option";

interface Props {
  data: Question[];
  quizStartData: Quiz;
  // quiz_id: number;
  // startTime: string;
  setResult: QRL<(data: Result) => void>;
  answers?: Answer[];
}

export default component$<Props>((props) => {
  // register store
  const register_store = useContext(registerContext);

  // answers
  const answers = useSignal<Answer[]>(props.answers || []);

  // current question
  const current_question = useSignal<number>(
    answers.value.length ? answers.value.length - 1 : 0,
  );

  // is last
  const is_last = useSignal<boolean>(
    current_question.value == answers.value.length - 1,
  );

  // is first
  const is_first = useSignal<boolean>(current_question.value == 0);

  // add answer
  /**
   * this function add the user ansers
   */
  const addAnswer = $((id: number, option: Option) => {
    const current_answer = answers.value[current_question.value];
    if (current_answer) {
      current_answer.answer = option.value;
      current_answer.option = option.id;
    } else {
      answers.value.push({
        quiz_question_id: id,
        option: option.id,
        answer: option.value,
      });
    }
    // add answer to local storage
    localStorage.setItem(
      `answers_${props.quizStartData.id}`,
      JSON.stringify(answers.value),
    );
  });

  // is answer
  /**
   * check if the user answer the question or not
   */
  const isAnswer = $(() => {
    const answer = answers.value[current_question.value];
    if (answer) return true;
    else return false;
  });

  // reset checked
  /**
   * this function reset checkes for all radio inputs
   */
  const resetChecked = $(() => {
    const inputs = document.querySelectorAll(
      ".form-check-input",
    ) as NodeListOf<HTMLInputElement>;

    inputs.forEach((input) => {
      input.checked = false;
    });
  });
  // next action
  /**
   * this function handel when user click next button
   */
  const nextAction = $(async () => {
    if ((await isAnswer()) && current_question.value != props.data.length - 1) {
      current_question.value += 1;

      // handle is last
      if (current_question.value == props.data.length - 1) {
        is_last.value = true;
      } else {
        is_last.value = false;
      }

      // handle is first
      if (is_first.value) is_first.value = false;
    }
    // resetChecked();
  });

  // prev action
  /**
   * this function handel when user click prev button
   */
  const prevAction = $(() => {
    if (current_question.value != 0) {
      current_question.value -= 1;
      if (is_last.value) is_last.value = false;
    }

    if (current_question.value == 0) {
      is_first.value = true;
    } else {
      is_first.value = false;
    }
    // resetChecked();

    console.log(answers.value);
    console.log(`current question: ${current_question.value}`);
  });

  // loading
  const loading = useSignal<boolean>(false);

  // submit
  /**
   * this function send the answers to the backend
   */
  const submit = $(async () => {
    // change loading
    loading.value = true;

    // response
    const response = await callServer("quiz-answer", {
      method: "POST",
      headers: [
        {
          name: "Authorization",
          value: `Bearer ${register_store.user.data?.token}`,
        },
      ],
      data: {
        answers: answers.value,
        quiz_id: props.quizStartData.id,
      },
    });
    if (response.response?.ok) {
      props.setResult(response.data! as Result);
    }
    // change loading
    loading.value = false;
  });

  // time
  const hours = useSignal<number>();
  const minutes = useSignal<number>();
  const seconds = useSignal<number>();

  // get end time
  /**
   * this function get end time
   * @param startTime - the start of time
   * @param duration - duration of time
   * @returns end time after calc with start and duration
   */
  const getEndTime = $((startTime: string, duration: number): number => {
    // set start time
    const start = new Date(startTime);

    // calc the duration to milliseconds
    const calcDuration = duration * 60 * 1000;

    // set end time
    const endTime = new Date(start.getTime() + calcDuration).getTime();

    return endTime;
  });

  // update time id
  const updateTimeId = useSignal();

  // update time
  /**
   * this function update timer after calc the time to minutes and seconds
   * @param endTime - the end time
   */
  const updateTime = $((endTime: number) => {
    // the current time
    const now = new Date().getTime();

    // time remaining
    const timeRemaining = endTime - now;

    hours.value = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    // minutes
    minutes.value = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );

    // seconds
    seconds.value = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    if (timeRemaining <= 0) {
      // stop interval
      clearInterval(updateTimeId.value as number);

      // submit the answers
      current_question.value = props.data.length - 1;
      is_last.value = true;
      submit();
    }
  });

  useVisibleTask$(() => {
    console.log(props.data);
    updateTimeId.value = setInterval(async () => {
      updateTime(
        await getEndTime(
          props.quizStartData.start_time,
          props.quizStartData.duration,
        ),
      );
    }, 1000);
  });
  return (
    <>
      <div class="inner">
        <div class="content">
          <form id="quiz-form" class="quiz-form-wrapper">
            {/* Start Single Quiz  */}
            <div id="question-1" class="question">
              <div class="quize-top-meta">
                <div class="quize-top-left d-flex gap-2">
                  <span>
                    رقم السؤال:{" "}
                    <strong>
                      {props.data.length}/{current_question.value + 1}
                    </strong>
                  </span>
                  {/* <span>
                    Attempts Allowed: <strong>2</strong>
                  </span> */}
                </div>
                <div class="quize-top-right">
                  <span>
                    الوقت المتبقي:{" "}
                    <strong>
                      {hours.value}:{minutes.value}:{seconds.value}
                    </strong>
                  </span>
                </div>
              </div>
              <hr />
              {props.data.map((question, index) => {
                if (index == current_question.value) {
                  return (
                    <div key={question.id} class="rbt-single-quiz">
                      <h4>{question.title}</h4>

                      {/* image */}
                      <img
                        class="rounded mx-auto d-block"
                        src={question.image}
                        alt={question.title}
                      />
                      {/* options */}
                      <div class="row g-3 mt--10">
                        {options.map(async (option) => {
                          return (
                            <div key={option.id} class="col-lg-6">
                              <div class="rbt-form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name={`rbt-radio`}
                                  id={`rbt-radio-${index}-${option.id}`}
                                  onClick$={() =>
                                    addAnswer(question.id, option)
                                  }
                                  checked={
                                    (await isAnswer()) &&
                                    answers.value[current_question.value]
                                      .option == option.id
                                      ? true
                                      : false
                                  }
                                />
                                <label
                                  class="form-check-label"
                                  for={`rbt-radio-${index}-${option.id}`}
                                >
                                  {option.title}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else return <></>;
              })}
            </div>
            {/* End Single Quiz  */}
            <div class="rbt-quiz-btn-wrapper mt--30 d-flex gap-5">
              <button
                class="rbt-btn bg-primary-opacity btn-sm"
                id=""
                type="button"
                onClick$={prevAction}
                disabled={is_first.value || loading.value}
              >
                السابق
              </button>
              {is_last.value && (
                <button
                  class="rbt-btn bg-primary-opacity btn-sm"
                  id=""
                  type="button"
                  onClick$={submit}
                >
                  {loading.value && <LoadingStatus />}
                  {!loading.value && "تسليم"}
                </button>
              )}
              {!is_last.value && (
                <button
                  class="rbt-btn bg-primary-opacity btn-sm"
                  id=""
                  type="button"
                  onClick$={nextAction}
                >
                  التالي
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
});
