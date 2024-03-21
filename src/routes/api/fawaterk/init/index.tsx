import { RequestHandler } from "@builder.io/qwik-city";
import { json } from "stream/consumers";
import { OrderData } from "~/interfaces/checkout/orderData";

import { fawaterkData } from "~/stores/fawaterk";

export const onRequest: RequestHandler = async (e) => {
  // const body = (await e.parseBody()) as { orderData: string };
  // const orderData = JSON.parse(body.orderData) as OrderData;
  // const headers = new Headers();
  // // headers.append("Content-Type", "application/json");
  // headers.append("Authorization", `Bearer ${fawaterkData.token}`);
  // headers.append("Content-Type", "application/json");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 6792b68e34221f62add51524f736aeae1c578b2411011e9550");
  
  var raw = JSON.stringify({
    "payment_method_id": 3,
    "cartTotal": 100,
    "currency": "EGP",
    "customer": {
      "first_name": "mohamed",
      "last_name": "mohamed",
      "email": "test@test.test",
      "phone": "01060871014"
    },
    "cartItems": [
      {
        "name": "test",
        "price": "100",
        "quantity": "1"
      }
    ]
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  await fetch("https://app.fawaterk.com/api/v2/invoiceInitPay", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


  return e.json(200, {
    id: 0,
  });
};
