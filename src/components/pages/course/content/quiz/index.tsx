import {
  $,
  component$,
  QRL,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Quiz } from "~/interfaces/course/section/lecture/quiz";
import Info from "./components/info";
import { States } from "./interfaces/states";
import Questions from "./components/questions";
import { Question } from "~/interfaces/course/section/lecture/quiz/question";
import Result from "./components/result";
import { Result as ResultType } from "./interfaces/result";
import { Option } from "./components/questions/interfaces/option";
import Loading from "./components/loading";
import { Answer } from "./components/questions/interfaces/answer";
import { callServer } from "~/assets/scripts/callServer";
import { useContent } from "@builder.io/qwik-city";
import { messagesContext, registerContext } from "~/root";
import { Toast } from "~/stores/toast";

interface Props {
  quiz: Quiz;
  mustSolve: boolean;
}
// options
// options
export const options: Option[] = [
  {
    id: 1,
    title: "أ",
    value: "a",
  },
  {
    id: 2,
    title: "ب",
    value: "b",
  },
  {
    id: 3,
    title: "ج",
    value: "c",
  },
  {
    id: 4,
    title: "د",
    value: "d",
  },
];

// get option title
/**
 * this function get option title insted of option value
 * @param value - the value of the option
 * @returns option title
 */
export const getOptionTilte = $((value: string) => {
  return options.find((option) => option.value == value)?.title;
});
export default component$<Props>((props) => {
  // messageStore
  const messageStore = useContext(messagesContext);

  // register store
  const registerStore = useContext(registerContext);

  // current state
  const currentState = useSignal<States>("loading");

  // quiz
  const quizStartData = useSignal<Quiz>();

  // questions
  const questions = useSignal<Question[]>([]);

  // change current state
  /**
   * this function change the current state of quiz
   */
  const changeCurrentState = $((state: States) => {
    currentState.value = state;
  });

  // clear local
  /**
   * this functoin after set results clear local storage of questions and answers
   */
  const clearLocal = $(() => {
    localStorage.removeItem("questions_data");
    localStorage.removeItem(`answers_${props.quiz.id}`);
  });

  // set questions
  /**
   * this function set questions
   */
  const setQuestions = $((questionsData: Question[]) => {
    questions.value = questionsData;
    changeCurrentState("questions");
    
  });

  // set quiz start data
  /**
   * this function set the all quiz data
   */
  const setQuizStartData = $((quizData: Quiz) => {
    quizStartData.value = quizData;

    // set questions
    setQuestions(quizStartData.value.questions);
  });

  // result
  const result = useSignal<ResultType>();

  // set result
  /**
   * this function set result for current quiz
   * @param data - the data of result
   */

  const setResult = $((data: ResultType) => {
    result.value = data;
    changeCurrentState("result");

    // clear local
    clearLocal();
  });

  // local answers
  const localAnswers = useSignal<Answer[]>([]);

  // check time
  /**
   * this function check if the quiz time is end or not
   * @param start - the start time
   * @param period - the period in min
   */
  const checkTime = $((start: string, period: number) => {
    // start time
    const startTime = new Date(start);

    // end time
    const endTime = new Date(startTime.getTime() + period * 60 * 1000);

    // current Time
    const currentTime = new Date();

    if (currentTime < endTime) {
      return true;
    } else {
      return false;
    }
  });

  // check submit
  /**
   * this function check if the user submit before or not
   */
  const checkSubmit = $(async () => {
    // response
    // send to the backend first question
    const response = await callServer(
      `quiz-check-submit/${props.quiz.questions[0].id}`,
      {
        headers: [
          {
            name: "Authorization",
            value: `Bearer ${registerStore.user.data?.token}`,
          },
        ],
      },
    );

    return response.data! as ResultType;
  });
  // check start
  /**
   * this function if the user start the quiz before , and if true enter the user to the quiz
   */
  const checkStart = $(async () => {
    let questions_data = localStorage.getItem("questions_data") as
      | Quiz
      | string;

    // check submit
    const resultData = await checkSubmit();

    console.log("result: ", resultData);
    if (resultData.status) {
      await setResult(resultData);

      return;
    }

    // check if we have question data in local
    if (questions_data) {
      console.log("QA", questions_data);
      questions_data = JSON.parse(questions_data as string) as Quiz;

      // set local answers
      localAnswers.value = JSON.parse(
        localStorage.getItem(`answers_${props.quiz.id}`)! || "[]",
      );

      if (questions_data.id == props.quiz.id) {
        if (
          await checkTime(questions_data.start_time, questions_data.duration)
        ) {
          // set questions
          await setQuizStartData(questions_data);
          return;
        } else {
          // store result
          const response = await callServer("quiz-answer", {
            method: "POST",
            headers: [
              {
                name: "Authorization",
                value: `Bearer ${registerStore.user.data?.token}`,
              },
            ],
            data: {
              answers: localAnswers.value,
              quiz_id: props.quiz.id,
            },
          });
          await setResult(response.data!);
          return;
        }
      }
    }

    // // check if must submit
    // if (!resultData.status) {
    //   // store result
    //   const response = await callServer("quiz-answer", {
    //     method: "POST",
    //     headers: [
    //       {
    //         name: "Authorization",
    //         value: `Bearer ${registerStore.user.data?.token}`,
    //       },
    //     ],
    //     data: {
    //       answers: localAnswers.value,
    //       quiz_id: props.quiz.id,
    //     },
    //   });
    //   await setResult(response.data!);
    //   return;
    // }

    await changeCurrentState("info");
  });

  useVisibleTask$(() => {
    setTimeout(() => {
      checkStart();
    }, 1000);

    // check must solve for message
    if(props.mustSolve) {

        // warn message
        
        const newMessage = new Toast("يجب عليك حل الامتحان قبل مشاهدة الدرس", "warning");
        messageStore.push({
          id: newMessage.id,
          message: newMessage.message,
          type: newMessage.type,
        });
    }
  });
  
  return (
    <>
      <section class="quiz mt--100 m-5">
        {/* loading */}
        {currentState.value == "loading" && <Loading />}

        {/* info */}
        {currentState.value == "info" && (
          <Info quiz={props.quiz} setQuizStartData={setQuizStartData} />
        )}
        {/* question */}
        {currentState.value == "questions" && (
          <Questions
            data={questions.value}
            quizStartData={quizStartData.value!}
            setResult={setResult}
            answers={localAnswers.value}
          />
        )}
        {/* result */}
        {currentState.value == "result" && (
          <Result result={result.value!} quiz={props.quiz} />
        )}
      </section>
    </>
  );
});
