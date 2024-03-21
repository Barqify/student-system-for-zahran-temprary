import { RequestHandler } from "@builder.io/qwik-city";
import CryptoJS from 'crypto-js';


export const onGet: RequestHandler = async ({ json }) => {
  function generateKashierOrderHash() {
    const mid = 'MID-21160-856'; // your merchant id
    const amount = '345'; // eg: 22.00
    const currency = 'EGP'; // eg: "EGP"
    const orderId = Date.now(); // eg: 99
    const secret = 'a19077da-8f03-4e01-a161-107bd493add4';
    const path = `/?payment=${mid}.${orderId}.${amount}.${currency}`;
    
    const hash = CryptoJS.HmacSHA256(path, secret).toString(CryptoJS.enc.Hex);
    
    return {
      hash,
      orderId
    };
  }
  json(200, { data: generateKashierOrderHash() });
};
