import { Lecture } from "./lecture";

export interface Section {
  id: number;
  title: string;
  description: string;
  price: number;
  discound: number;
  total_price: number;
  is_owned: boolean;
  is_free: number;
  lectures: Lecture[];
}