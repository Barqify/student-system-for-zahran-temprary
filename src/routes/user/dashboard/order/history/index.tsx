import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { loadTemplateScripts } from "~/assets/scripts/loadTemplateScripts";

export default component$(() => {
  // load template scripts
  useVisibleTask$(loadTemplateScripts);
  
  return (
    <>
      <div class="content">
        <div class="section-title">
          <h4 class="rbt-title-style-3">Order History</h4>
        </div>
        <div class="rbt-dashboard-table table-responsive mobile-table-750">
          <table class="rbt-table table table-borderless">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Course Name</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>#5478</th>
                <td>App Development</td>
                <td>January 27, 2023</td>
                <td>$100.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-success-opacity color-success">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <th>#4585</th>
                <td>Graphic</td>
                <td>May 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-primary-opacity">Processing</span>
                </td>
              </tr>
              <tr>
                <th>#9656</th>
                <td>Graphic</td>
                <td>March 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-warning-opacity color-warning">
                    On Hold
                  </span>
                </td>
              </tr>
              <tr>
                <th>#2045</th>
                <td>Application</td>
                <td>March 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-danger-opacity color-danger">
                    Canceled
                  </span>
                </td>
              </tr>
              <tr>
                <th>#5478</th>
                <td>App Development</td>
                <td>January 27, 2023</td>
                <td>$100.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-success-opacity color-success">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <th>#4585</th>
                <td>Graphic</td>
                <td>May 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-primary-opacity">Processing</span>
                </td>
              </tr>
              <tr>
                <th>#9656</th>
                <td>Graphic</td>
                <td>March 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-warning-opacity color-warning">
                    On Hold
                  </span>
                </td>
              </tr>
              <tr>
                <th>#2045</th>
                <td>Application</td>
                <td>March 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-danger-opacity color-danger">
                    Canceled
                  </span>
                </td>
              </tr>
              <tr>
                <th>#5478</th>
                <td>App Development</td>
                <td>January 27, 2023</td>
                <td>$100.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-success-opacity color-success">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <th>#4585</th>
                <td>Graphic</td>
                <td>May 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-primary-opacity">Processing</span>
                </td>
              </tr>
              <tr>
                <th>#9656</th>
                <td>Graphic</td>
                <td>March 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-warning-opacity color-warning">
                    On Hold
                  </span>
                </td>
              </tr>
              <tr>
                <th>#2045</th>
                <td>Application</td>
                <td>March 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-danger-opacity color-danger">
                    Canceled
                  </span>
                </td>
              </tr>
              <tr>
                <th>#5478</th>
                <td>App Development</td>
                <td>January 27, 2023</td>
                <td>$100.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-success-opacity color-success">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <th>#4585</th>
                <td>Graphic</td>
                <td>May 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-primary-opacity">Processing</span>
                </td>
              </tr>
              <tr>
                <th>#9656</th>
                <td>Graphic</td>
                <td>March 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-warning-opacity color-warning">
                    On Hold
                  </span>
                </td>
              </tr>
              <tr>
                <th>#2045</th>
                <td>Application</td>
                <td>March 27, 2023</td>
                <td>$200.99</td>
                <td>
                  <span class="rbt-badge-5 bg-color-danger-opacity color-danger">
                    Canceled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});
