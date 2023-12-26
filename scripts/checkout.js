import { renderOrderSummary, updateCheckoutQuantity } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

updateCheckoutQuantity();
renderOrderSummary();
renderPaymentSummary();