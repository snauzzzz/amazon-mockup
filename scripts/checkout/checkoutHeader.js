import { calculateCartQuantity } from "../../data/cart.js";
export function updateCheckoutQuantity() {
    const cartQuantity = calculateCartQuantity();

    if (cartQuantity === 1 || cartQuantity === 0) {
        document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} item`;
    } else {
        document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} items`;
    }
}