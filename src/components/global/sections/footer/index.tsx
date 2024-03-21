import ImgMainLogo from "~/media/assets/images/logo/main-logo.png?jsx";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { setting } from "~/setting";

export default component$(() => {
  return (
    <>
      {/* Start Footer aera */}
      <footer class="rbt-footer footer-style-1">
        <div class="footer-top">
          <div class="container">
            <div class="row row--15 mt_dec--30">
              {/* col-lg-4 col-md-6 col-sm-6 col-12 mt--30 */}
              <div class="col-12 col-lg-6 mt--30">
                <div class="footer-widget d-flex flex-column align-items-center">
                  <div class="logo">
                    <Link href="/">
                      <img src={setting.logo} alt={setting.name} />
                    </Link>
                  </div>
                  <p class="description mt--20 text-center">
                    {setting.description}
                  </p>
                </div>
              </div>
              {/* <div class="offset-lg-1 col-lg-2 col-md-6 col-sm-6 col-12 mt--30">
                <div class="footer-widget">
                  <h5 class="ft-title">Useful Links</h5>
                  <ul class="ft-link">
                    <li>
                      <a href="12-marketplace.html">Marketplace</a>
                    </li>
                    <li>
                      <a href="04-kindergarten.html">kindergarten</a>
                    </li>
                    <li>
                      <a href="13-university-classic.html">University</a>
                    </li>
                    <li>
                      <a href="09-gym-coaching.html">GYM Coaching</a>
                    </li>
                    <li>
                      <a href="faqs.html">FAQ</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-2 col-md-6 col-sm-6 col-12 mt--30">
                <div class="footer-widget">
                  <h5 class="ft-title">Our Company</h5>
                  <ul class="ft-link">
                    <li>
                      <a href="contact.html">Contact Us</a>
                    </li>
                    <li>
                      <a href="become-a-teacher.html">Become Teacher</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="instructor.html">Instructor</a>
                    </li>
                    <li>
                      <a href="event-list.html">Events</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt--30">
                <div class="footer-widget">
                  <h5 class="ft-title">Get Contact</h5>
                  <ul class="ft-link">
                    <li>
                      <span>Phone:</span> <a href="#">(406) 555-0120</a>
                    </li>
                    <li>
                      <span>E-mail:</span>{" "}
                      <a href="mailto:hr@example.com">rainbow@example.com</a>
                    </li>
                    <li>
                      <span>Location:</span> North America, USA
                    </li>
                  </ul>
                  <ul class="social-icon social-default icon-naked justify-content-start mt--20">
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
                </div>
              </div> */}
              <div class="col-12 col-lg-6 mt--30">
                <div class="footer-widget d-flex flex-column align-items-center">
                  <h5 class="ft-title">تواصل معنا</h5>
                  <ul class="ft-link">
                    <li>
                      <span>رقم الهاتف:</span>{" "}
                      <a
                        href={`https://api.whatsapp.com/send/?phone=2${setting.phoneNumber}&text=&type=phone_number&app_absent=0`}
                      >
                        {setting.phoneNumber}
                      </a>
                    </li>
                    <li>
                      <span>العنوان:</span> البحيرة - حوش عيسي
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* End Footer aera */}
      <div>
        <div class="rbt-separator-mid">
          <div class="container">
            <hr class="rbt-separator m-0" />
          </div>
        </div>
        {/* Start Copyright Area  */}
        <div class="copyright-area copyright-style-1 ptb--20">
          <div class="container">
            <div class="row align-items-center">
              {/* col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 */}
              <div class="d-flex justify-content-center ">
                <p class="rbt-link-hover text-center text-lg-start">
                  Copyright © 2023 <Link href="#">Kormava</Link> All Rights
                  Reserved
                </p>
              </div>
              {/* <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12">
                <ul class="copyright-link rbt-link-hover justify-content-center justify-content-lg-end mt_sm--10 mt_md--10">
                  <li>
                    <a href="#">Terms of service</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html">Privacy policy</a>
                  </li>
                  <li>
                    <a href="subscription.html">Subscription</a>
                  </li>
                  <li>
                    <a href="login.html">Login &amp; Register</a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        {/* End Copyright Area  */}
      </div>
    </>
  );
});
