import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import TemplateScripts from "~/templateScripts";


export default component$(() => {
  return (
    <>
      <section class="courses">
        courses
      </section>

      {/* template scripts */}
      <TemplateScripts />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
