import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutQuantity } from "./checkout/checkoutHeader.js";

updateCheckoutQuantity();
renderOrderSummary();
renderPaymentSummary();