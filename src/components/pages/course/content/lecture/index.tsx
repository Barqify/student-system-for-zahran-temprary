import { component$ } from "@builder.io/qwik";
import { Lecture } from "~/interfaces/course/section/lecture";
import File from "./file";
import Video from "./video";

export interface Props {
  lecture: Lecture;
  support: string;
}
export default component$<Props>((props) => {
  if (props.lecture.type == "video") {
    return <Video lecture={props.lecture} support={props.support} />;
  } else {
    return <File lecture={props.lecture} support={""} />;
  }
});
