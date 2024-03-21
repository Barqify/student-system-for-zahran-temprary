import { $ } from "@builder.io/qwik";

const templateScripts = [
  "/assets/js/vendor/modernizr.min.js",
  "/assets/js/vendor/jquery.js",
  "/assets/js/vendor/bootstrap.min.js",
  "/assets/js/vendor/bootstrap-select.min.js",
  "/assets/js/vendor/sal.js",
  "/assets/js/vendor/swiper.js",
  "/assets/js/vendor/magnify.min.js",
  "/assets/js/vendor/jquery-appear.js",
  "/assets/js/vendor/odometer.js",
  "/assets/js/vendor/backtotop.js",
  "/assets/js/vendor/isotop.js",
  "/assets/js/vendor/imageloaded.js",
  "/assets/js/vendor/wow.js",
  "/assets/js/vendor/waypoint.min.js",
  "/assets/js/vendor/easypie.js",
  "/assets/js/vendor/text-type.js",
  "/assets/js/vendor/jquery-one-page-nav.js",
  "/assets/js/vendor/jquery-ui.js",
  "/assets/js/vendor/magnify-popup.min.js",
  "/assets/js/vendor/countdown.js",
  "/assets/js/vendor/plyr.js",
  "/assets/js/vendor/paralax-scroll.js",
  "/assets/js/main.js",
];

/**
 * this function load template scripts
 */

const loadTemplateScripts = $(async ({ cleanup }: { cleanup: Function }) => {
  const scripts: HTMLElement[] = [];
  console.log("init scripts: ", scripts);
  for (let i = 0; i < templateScripts.length; i++) {
    const script = document.createElement("script");
    script.src = templateScripts[i];
    if (i >= templateScripts.length - 1) {
      setTimeout(() => {
        document.body.appendChild(script);
      }, 1000);
    } else {
      document.body.appendChild(script);
    }
    scripts.push(script);
  }

  cleanup(() => {
    scripts.forEach((script) => {
      document.body.removeChild(script);
    });
    console.log("clean scripts: ", scripts);
  });
});

export { loadTemplateScripts };
