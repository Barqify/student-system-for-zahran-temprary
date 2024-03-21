import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { registerContext } from "~/root";
import LogOutButton from "../../buttons/logOut";
import { userLinks } from "./userLinks";

export default component$(() => {
  const registerStore = useContext(registerContext);

  return (
    <>
      {/* Start Dashboard Sidebar  */}
      <div class="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
        <div class="inner">
          <div class="content-item-content">
            <div class="rbt-default-sidebar-wrapper">
              <div class="section-title mb--20">
                <h6 class="rbt-title-style-2">مرحبا {registerStore.user.data?.name}</h6>
              </div>
              <nav class="mainmenu-nav">
                <ul class="dashboard-mainmenu rbt-default-sidebar-list">
                  {userLinks.info.map((ele) => {
                    return (
                      <li key={ele.id}>
                        <Link
                          class="d-flex justify-content-center align-items-center"
                          href={ele.target}
                        >
                          <i class={ele.icon} />
                          <span>{ele.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div class="section-title mt--40 mb--20">
                <h6 class="rbt-title-style-2">المستخدم</h6>
              </div>
              <nav class="mainmenu-nav">
                <ul class="dashboard-mainmenu rbt-default-sidebar-list">
                  {userLinks.controle.map((ele) => {
                    return (
                      <li key={ele.id}>
                        <Link
                          class="d-flex justify-content-center align-items-center"
                          href={ele.target}
                        >
                          <i class={ele.icon} />
                          <span>{ele.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <LogOutButton />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* End Dashboard Sidebar  */}
    </>
  );
});
