import { Quiz } from "./quiz";

export interface Lecture {
  id: number;
  file: string;
  title: string;
  type: string;
  schedule: string;
  quiz:  Quiz[];
  quiz_is_solved: boolean | null;
  solved_quiz: null | Quiz
}