import { component$ } from "@builder.io/qwik";
import { Lecture } from "~/interfaces/course/section/lecture";
import { Props } from "..";
import Support from "../../support";



export default component$<Props>((props) => {
  // is mediadelivery boolean value
  const is_mediadelivery = props.lecture.file.includes("mediadelivery");
  return (
    <>
      {is_mediadelivery && (
        <div style="position:relative;padding-top:56.25%;">
          <iframe
            src={`${props.lecture.file}?autoplay=false&loop=false&muted=false&preload=true`}
            loading="lazy"
            style="border:0;position:absolute;top:0;height:100%;width:100%;"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {/* is youtube */}
      {!is_mediadelivery && (
        <iframe
          height="500px"
          width="100%"
          src={props.lecture.file}
          allowFullScreen
          allow="autoplay"
        />
      )}
      {/* content */}
      <div class="content">
        <div class="section-title">
          <h4>عن الدرس</h4>
          <p>{props.lecture.title}</p>
        </div>

        {/* the support */}
        {props.support && (
          <>
            <Support currentSupport={props.support} />
          </>
        )}
      </div>
    </>
  );
});
