import { Question } from "./question";

export interface Quiz {
  id: number;
  name: string;
  description: string;
  date: string;
  duration: number;
  lecture_id: number;
  total_degree: string;
  created_at: string;
  updated_at: string;
  start_time: string;
  questions: Question[];
}
