import { Course } from ".";
import { Section } from "./section";
import { Lecture } from "./section/lecture";
import { Quiz } from "./section/lecture/quiz";

export interface CourseReturnData {
  current_course: string;
  current_section: string;
  current_lesson: string;
  data: Course;
  section_data: Section;
  lecture_data: Lecture;
  quiz: Quiz | null;
  quiz_must_solve: boolean;
}