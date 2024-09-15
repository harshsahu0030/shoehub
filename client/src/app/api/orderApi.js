import axios from "axios";

//create order
export const getRazorpayApiKeyApi = async () => {
  const { data } = await axios.get(`/api/v1/razorpay/getkey`);
  return data;
};

//create order
export const checkoutOrderApi = async (amount) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(`/api/v1/checkout`, amount, config);
  return data;
};

//create order
export const createOrderApi = async (orderData) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    `/api/v1/paymentverification`,
    orderData,
    config
  );
  return data;
};
// //create order
// export const createOrderApi = async (finalShippingInfoForm) => {
//   const config = { headers: { "Content-Type": "application/json" } };
//   const { data } = await axios.post(
//     `/api/v1/orders/new`,
//     {
//       shippingInfo: finalShippingInfoForm,
//     },
//     config
//   );
//   return data;
// };
