import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { callServer } from "~/assets/scripts/callServer";
import { createFileObject } from "~/assets/scripts/createFileObject";
import LoadingStatus from "~/components/global/animation/lottie/animations/loadingStatus";
import { registerContext } from "~/root";
import { Props } from "..";

export default component$<Props>((props) => {
  // register store
  const registerStore = useContext(registerContext);

  // download file
  const downloadLoading = useSignal<boolean>();

  // file
  const file = useSignal<string>("");

  /**
   * this function download file from the server
   * @param path - the file path
   */

  const downloadFile = $(async (path: string) => {
    if (!downloadLoading.value) {
      // change loading
      downloadLoading.value = true;

      // response
      const response = await callServer("lecture", {
        method: "POST",
        headers: [
          {
            name: "Authorization",
            value: `Bearer ${registerStore.user.data?.token}`,
          },
        ],
        data: {
          path,
        },
      });

      if (response.response?.ok) {
        file.value = response.data!.file;
        console.log(file.value);
      }

      // click the download button
      setTimeout(() => {
        const downlaodButton = document.querySelector(
          "#download-button",
        ) as HTMLAnchorElement;
        downlaodButton.click();
      }, 100);

      // change loading
      downloadLoading.value = false;
    }
  });

  return (
    <>
      <div class="bg-color-white rbt-shadow-box m-5 mt--100">
        <h5 class="rbt-title-style-3">{props.lecture.title}</h5>
        <p>{props.lecture.title}</p>
        {!file.value && (
          <div class="submit-btn">
            <button
              class="rbt-btn btn-gradient hover-icon-reverse"
              // href={`data:application/octet-stream;base64, ${lecture.file}`}
              onClick$={() => downloadFile(props.lecture.file)}
            >
              <span class="icon-reverse-wrapper">
                {downloadLoading.value && <LoadingStatus />}
                {!downloadLoading.value && (
                  <>
                    <span class="btn-text">تحميل</span>
                    <span class="btn-icon">
                      <i class="feather-arrow-left"></i>
                    </span>
                    <span class="btn-icon">
                      <i class="feather-arrow-left"></i>
                    </span>
                  </>
                )}
              </span>
            </button>
            {downloadLoading.value && (
              <div class="alert alert-success mt--10" role="alert">
                جاري تحميل الملف ,الرجاء عدم الخروج من الصفحة
              </div>
            )}
          </div>
        )}
        {file.value && (
          <>
            <div class="alert alert-success mt--10" role="alert">
              تم تحميل الملف بنجاح
            </div>
            <div class="m-5">
              <a
                id="download-button"
                href={createFileObject(file.value)}
                download={props.lecture.title}
              ></a>
            </div>
          </>
        )}
      </div>
    </>
  );
});
