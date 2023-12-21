import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js'
import {formatCurrency} from './utils/money.js';

updateCheckoutQuantity();

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (productId === product.id) {
            matchingProduct = product;
        }
    })

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingProduct.id}">
                Update
                </span>
                <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">

                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${matchingProduct.id}">Save</span>

                <span class="cancel-input link-primary js-cancel-input" data-product-id = "${matchingProduct.id}">Cancel</span>

                <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
});

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

// Delete button
document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
           const productId = link.dataset.productId; 
           removeFromCart(productId);
           console.log(cart)

           const container = document.querySelector(`.js-cart-item-container-${productId}`);
           container.remove();

           updateCheckoutQuantity();
        })
    })

//Update button
document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
             
            container.classList.add('is-editing-quantity');
            
        })
    });

// Save button
document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
             
            container.classList.remove('is-editing-quantity');

            //Get input value
            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            
            const quantityInputValue = Number(quantityInput.value);

            //Validate the input
            if (quantityInputValue > 0) {
                //Update cart
                updateQuantity(productId, quantityInputValue);

                //Update checkout header and quantity label
                updateCheckoutQuantity();
                updateQuantityLabel(productId, quantityInputValue);
            } else {
                alert('The input value is invalid, please try another');

                document.querySelector(`.js-quantity-input-${productId}`).value = '';
            }

            console.log(cart)
        })
    });

//Update input when clicking enter
document.querySelectorAll('.js-quantity-input')
    .forEach((input) => {
        input.addEventListener('keydown', event => {

            if (event.key === 'Enter') {
                //Select the current input
                const inputElement = event.target;
                console.log(event.target) 
                //Get input value
                const quantityInputValue = Number(inputElement.value);

                // Get product ID
                const productId = inputElement.dataset.productId;

                //Validate the input
                if (quantityInputValue > 0) {
                    //Update cart
                    updateQuantity(productId, quantityInputValue);

                    //Update checkout header and quantity label
                    updateCheckoutQuantity();
                    updateQuantityLabel(productId, quantityInputValue);
                } else {
                    alert('The input value is invalid, please try another');

                    document.querySelector(`.js-quantity-input-${productId}`).value = '';
                    }
            }
        })
    })

// Cancel input
document.querySelectorAll('.js-cancel-input')
.forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
            
        container.classList.remove('is-editing-quantity');
    })
});

function updateCheckoutQuantity() {
    const cartQuantity = calculateCartQuantity();

    if (cartQuantity === 1 || cartQuantity === 0) {
        document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} item`;
    } else {
        document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} items`;
    }
}

function updateQuantityLabel (productId, quantityInputValue) {
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

    quantityLabel.innerHTML = quantityInputValue;
}