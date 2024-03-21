import { $, component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { SingleLink } from "./interfaces";
import { registerContext } from "~/root";
import { userLinks } from "../sideNavbar/userLinks";
import LogOutButton from "../../buttons/logOut";
import { setting } from "~/setting";

export default component$(() => {
  const register = useContext(registerContext);

  const links: SingleLink[] = [
    {
      id: 0,
      title: "الرئيسية",
      path: "/",
    },
    // {
    //   id: 1,
    //   title: "الدروس",
    //   path: "/404",
    // },
    // {
    //   id: 2,
    //   title: "من هو الاستاذ لطفي",
    //   path: "/404",
    // },
    // {
    //   id: 3,
    //   title: "تواصل معي",
    //   path: "/404",
    // },
  ];

  // close nav

  const closeNav = $(() => {
    const closeButton = document.querySelector(
      ".close-button",
    ) as HTMLButtonElement;

    closeButton.click();
  });
  return (
    <>
      <div>
        {/* Start Header Area */}
        <header class="rbt-header rbt-header-10">
          <div class="rbt-sticky-placeholder" />
          {/* Start Header Top  */}
          {/* End Header Top  */}
          <div class="rbt-header-wrapper header-space-betwween header-sticky">
            <div class="container-fluid">
              <div class="mainbar-row rbt-navigation-center align-items-center">
                <div class="header-left rbt-header-content">
                  <div class="header-info">
                    <div class="logo">
                      <Link href={links[0].path}>
                        <img src={setting.logo} alt={setting.name} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="rbt-main-navigation d-none d-xl-block">
                  <nav class="mainmenu-nav">
                    <ul class="mainmenu d-flex justify-content-start gap-3">
                      {links.map((ele) => {
                        return (
                          <li key={ele.id} class="position-static">
                            <Link href={ele.path}>{ele.title}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
                <div class="header-right">
                  {register.auth && (
                    <>
                      {/* Navbar Icons */}
                      <ul class="quick-access">
                        {/* <li class="access-icon">
                          <a
                            class="search-trigger-active rbt-round-btn"
                            href="#"
                          >
                            <i class="feather-search" />
                          </a>
                        </li> */}
                        <li class="account-access rbt-user-wrapper d-none d-xl-block">
                          <a href="#">
                            <i class="feather-user" />
                            حسابي
                          </a>
                          <div class="rbt-user-menu-list-wrapper">
                            <div class="inner">
                              <div class="rbt-admin-profile">
                                <div class="admin-info">
                                  <span class="name">
                                    {register.user.data?.name.substring(0, 10)}
                                    ...
                                  </span>
                                </div>
                              </div>
                              <ul class="user-list-wrapper">
                                {userLinks.info.map((ele) => {
                                  return (
                                    <li key={ele.id}>
                                      <Link href={ele.target}>
                                        <i class={ele.icon} />
                                        <span>{ele.title}</span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                              <ul class="user-list-wrapper">
                                {userLinks.controle.map((ele) => {
                                  return (
                                    <li key={ele.id}>
                                      <Link href={ele.target}>
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
                            </div>
                          </div>
                        </li>
                        <li class="access-icon rbt-user-wrapper d-block d-xl-none">
                          <a class="rbt-round-btn" href="#">
                            <i class="feather-user" />
                          </a>
                          <div class="rbt-user-menu-list-wrapper">
                            <div class="inner">
                              <div class="rbt-admin-profile">
                                <div class="admin-info">
                                  <span class="name">
                                    {register.user.data?.name.substring(0, 10)}
                                    ...
                                  </span>
                                </div>
                              </div>
                              <ul class="user-list-wrapper">
                                {userLinks.info.map((ele) => {
                                  return (
                                    <li key={ele.id}>
                                      <Link href={ele.target}>
                                        <i class={ele.icon} />
                                        <span>{ele.title}</span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                              <ul class="user-list-wrapper">
                                {userLinks.controle.map((ele) => {
                                  return (
                                    <li key={ele.id}>
                                      <Link href={ele.target}>
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
                            </div>
                          </div>
                        </li>
                      </ul>
                    </>
                  )}
                  {!register.auth && (
                    <>
                      <section class="regiter-buttons d-none d-xl-flex gap-4">
                        <Link
                          class="rbt-btn btn-border hover-icon-reverse radius-round"
                          href="/user/register/login"
                        >
                          <span class="icon-reverse-wrapper">
                            <span class="btn-text">دخول</span>
                            <span class="btn-icon">
                              <i class="feather-arrow-left"></i>
                            </span>
                            <span class="btn-icon">
                              <i class="feather-arrow-left"></i>
                            </span>
                          </span>
                        </Link>
                        <Link
                          class="rbt-btn btn-gradient hover-icon-reverse radius-round"
                          href="/user/register/signin"
                        >
                          <span class="icon-reverse-wrapper">
                            <span class="btn-text">تسجيل</span>
                            <span class="btn-icon">
                              <i class="feather-arrow-left"></i>
                            </span>
                            <span class="btn-icon">
                              <i class="feather-arrow-left"></i>
                            </span>
                          </span>
                        </Link>
                      </section>
                    </>
                  )}
                  <div class="rbt-btn-wrapper d-none d-xl-block"></div>
                  {/* Start Mobile-Menu-Bar */}
                  <div class="mobile-menu-bar d-block d-xl-none">
                    <div class="hamberger">
                      <button class="hamberger-button rbt-round-btn">
                        <i class="feather-menu" />
                      </button>
                    </div>
                  </div>
                  {/* Start Mobile-Menu-Bar */}
                </div>
              </div>
            </div>
            {/* Start Search Dropdown  */}
            <div class="rbt-search-dropdown">
              <div class="wrapper">
                <div class="row">
                  <div class="col-lg-12">
                    <form action="#">
                      <input
                        type="text"
                        placeholder="What are you looking for?"
                      />
                      <div class="submit-btn">
                        <a class="rbt-btn btn-gradient btn-md" href="#">
                          Search
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="rbt-separator-mid">
                  <hr class="rbt-separator m-0" />
                </div>
              </div>
            </div>
            {/* End Search Dropdown  */}
          </div>
          {/* Start Side Vav */}
          <div class="rbt-offcanvas-side-menu rbt-category-sidemenu">
            <div class="inner-wrapper">
              <div class="inner-top">
                <div class="inner-title">
                  <h4 class="title">Course Category</h4>
                </div>
                <div class="rbt-btn-close">
                  <button class="rbt-close-offcanvas rbt-round-btn">
                    <i class="feather-x" />
                  </button>
                </div>
              </div>
              <nav class="side-nav w-100">
                <ul class="rbt-vertical-nav-list-wrapper vertical-nav-menu">
                  <li class="vertical-nav-item">
                    <a href="#">Course School</a>
                    <div class="vartical-nav-content-menu-wrapper">
                      <div class="vartical-nav-content-menu">
                        <h3 class="rbt-short-title">Course Title</h3>
                        <ul class="rbt-vertical-nav-list-wrapper">
                          <li>
                            <a href="#">Web Design</a>
                          </li>
                          <li>
                            <a href="#">Art</a>
                          </li>
                          <li>
                            <a href="#">Figma</a>
                          </li>
                          <li>
                            <a href="#">Adobe</a>
                          </li>
                        </ul>
                      </div>
                      <div class="vartical-nav-content-menu">
                        <h3 class="rbt-short-title">Course Title</h3>
                        <ul class="rbt-vertical-nav-list-wrapper">
                          <li>
                            <a href="#">Photo</a>
                          </li>
                          <li>
                            <a href="#">English</a>
                          </li>
                          <li>
                            <a href="#">Math</a>
                          </li>
                          <li>
                            <a href="#">Read</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="vertical-nav-item">
                    <a href="#">Online School</a>
                    <div class="vartical-nav-content-menu-wrapper">
                      <div class="vartical-nav-content-menu">
                        <h3 class="rbt-short-title">Course Title</h3>
                        <ul class="rbt-vertical-nav-list-wrapper">
                          <li>
                            <a href="#">Photo</a>
                          </li>
                          <li>
                            <a href="#">English</a>
                          </li>
                          <li>
                            <a href="#">Math</a>
                          </li>
                          <li>
                            <a href="#">Read</a>
                          </li>
                        </ul>
                      </div>
                      <div class="vartical-nav-content-menu">
                        <h3 class="rbt-short-title">Course Title</h3>
                        <ul class="rbt-vertical-nav-list-wrapper">
                          <li>
                            <a href="#">Web Design</a>
                          </li>
                          <li>
                            <a href="#">Art</a>
                          </li>
                          <li>
                            <a href="#">Figma</a>
                          </li>
                          <li>
                            <a href="#">Adobe</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="vertical-nav-item">
                    <a href="#">kindergarten</a>
                    <div class="vartical-nav-content-menu-wrapper">
                      <div class="vartical-nav-content-menu">
                        <h3 class="rbt-short-title">Course Title</h3>
                        <ul class="rbt-vertical-nav-list-wrapper">
                          <li>
                            <a href="#">Photo</a>
                          </li>
                          <li>
                            <a href="#">English</a>
                          </li>
                          <li>
                            <a href="#">Math</a>
                          </li>
                          <li>
                            <a href="#">Read</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="vertical-nav-item">
                    <a href="#">Classic LMS</a>
                    <div class="vartical-nav-content-menu-wrapper">
                      <div class="vartical-nav-content-menu">
                        <h3 class="rbt-short-title">Course Title</h3>
                        <ul class="rbt-vertical-nav-list-wrapper">
                          <li>
                            <a href="#">Web Design</a>
                          </li>
                          <li>
                            <a href="#">Art</a>
                          </li>
                          <li>
                            <a href="#">Figma</a>
                          </li>
                          <li>
                            <a href="#">Adobe</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="read-more-btn">
                  <div class="rbt-btn-wrapper mt--20">
                    <a
                      class="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none w-100 justify-content-center text-center"
                      href="#"
                    >
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
              </nav>
              <div class="rbt-offcanvas-footer"></div>
            </div>
          </div>
          {/* End Side Vav */}
          <a class="rbt-close_side_menu" href="javascript:void(0);" />
        </header>
        {/* Mobile Menu Section */}
        <div class="popup-mobile-menu">
          <div class="inner-wrapper">
            <div class="inner-top">
              <div class="content">
                <div class="logo">
                  <Link href={links[0].path} onClick$={closeNav}>
                    <img src={setting.logo} alt={setting.name} />
                  </Link>
                </div>
                <div class="rbt-btn-close">
                  <button class="close-button rbt-round-btn">
                    <i class="feather-x" />
                  </button>
                </div>
              </div>
              {/* <p class="description">
                Histudy is a education website template. You can customize all.
              </p> */}
              {/* <ul class="navbar-top-left rbt-information-list justify-content-start">
                <li>
                  <a href="mailto:hello@example.com">
                    <i class="feather-mail" />
                    example@gmail.com
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="feather-phone" />
                    (302) 555-0107
                  </a>
                </li>
              </ul> */}
            </div>
            <nav class="mainmenu-nav">
              <ul class="mainmenu">
                {links.map((ele) => {
                  return (
                    <li
                      onClick$={closeNav}
                      key={ele.id}
                      class="position-static"
                    >
                      <Link href={ele.path}>{ele.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div class="mobile-menu-bottom">
              {!register.auth && (
                <>
                  {/* register buttons */}
                  <section class="regiter-buttons d-flex flex-column gap-4">
                    <Link
                      onClick$={closeNav}
                      class="rbt-btn btn-border hover-icon-reverse radius-round"
                      href="/user/register/login"
                    >
                      <span class="icon-reverse-wrapper">
                        <span class="btn-text">دخول</span>
                        <span class="btn-icon">
                          <i class="feather-arrow-left"></i>
                        </span>
                        <span class="btn-icon">
                          <i class="feather-arrow-left"></i>
                        </span>
                      </span>
                    </Link>
                    <Link
                      onClick$={closeNav}
                      class="rbt-btn btn-gradient hover-icon-reverse radius-round"
                      href="/user/register/signin"
                    >
                      <span class="icon-reverse-wrapper">
                        <span class="btn-text">تسجيل</span>
                        <span class="btn-icon">
                          <i class="feather-arrow-left"></i>
                        </span>
                        <span class="btn-icon">
                          <i class="feather-arrow-left"></i>
                        </span>
                      </span>
                    </Link>
                  </section>
                </>
              )}

              {/* <div class="social-share-wrapper">
                <span class="rbt-short-title d-block">Find With Us</span>
                <ul class="social-icon social-default transparent-with-border justify-content-start mt--20">
                  <li>
                    <a href="https://www.facebook.com/">
                      <i class="feather-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com">
                      <i class="feather-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/">
                      <i class="feather-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkdin.com/">
                      <i class="feather-linkedin" />
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <a class="close_side_menu" href="javascript:void(0);" />
      </div>
    </>
  );
});
