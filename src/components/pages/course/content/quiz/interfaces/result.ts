export interface Result {
  status: boolean;
  total: number;
  total_strudent_answers: number;
  data: {
    id: number;
    question_title: string;
    question_image: string;
    degree: string;
    correct_answer: string;
    answer: string;
    status: boolean;
  }[];
}
