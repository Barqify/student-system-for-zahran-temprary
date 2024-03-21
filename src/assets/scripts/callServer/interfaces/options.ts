import { Header } from "./header";
import { Methods } from "./methods";

export interface Options {
  method?: Methods;
  headers?: Header[];
  data?: BodyInit | null | undefined;
  dataType?: "form" | "json";
  auth?: boolean
}