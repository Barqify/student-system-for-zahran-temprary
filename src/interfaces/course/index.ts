import { Section } from "./section";

export interface Course {
  id: number;
  name: string;
  description: string;
  sub_description: string;
  image: string;
  study_level: string;
  sections: Section[];
}