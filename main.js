const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
const previeuwContainer = document.querySelector('.products-preview');
const previewBox = previeuwContainer.querySelectorAll('.preview');

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const products = document.querySelectorAll(".product");
let currentProduct = 0;

// Pop Up Preview
document.querySelectorAll('.shop-content .product-box').forEach(product => {
product.onclick = () => {
previeuwContainer.style.display = 'flex';
const name = product.getAttribute('data-name');
previewBox.forEach(preview => {
const target = preview.getAttribute('data-target');
if (name == target) {
preview.classList.add('active');
}
});
};
});

previewBox.forEach(close => {
close.querySelector('.bx-x').onclick = () => {
close.classList.remove('active');
previeuwContainer.style.display = 'none';
};
});

// open cart//
cartIcon.onclick = () => {
cart.classList.add("active");
}

// close cart//
closeCart.onclick = () => {
cart.classList.remove("active");
}

// cart working JS
if (document.readyState == 'loading') {
document.addEventListener('DOMContentLoaded', ready)
} else {
ready()
}

// Add a new function to update the cart icon
function updateCartIcon() {
const cartCount = document.getElementsByClassName('cart-box').length;
document.querySelector("#cart-icon span").innerText = cartCount;
}

// Making function
function ready() {
// Remove items from cart
const removeCartButtons = document.getElementsByClassName('cart-remove');
for (let i = 0; i < removeCartButtons.length; i++) {
const button = removeCartButtons[i];
button.addEventListener('click', removeCartItem);
}

//Quantity Changes
const quantityInputs = document.getElementsByClassName('cart-quantity');
for (let i = 0; i < quantityInputs.length; i++) {
const input = quantityInputs[i];
input.addEventListener('change', quantityChanged);
}

// Add to cart
const addCarts = document.getElementsByClassName('add-cart');
for (let i = 0; i < addCarts.length; i++) {
const button = addCarts[i];
button.addEventListener('click', addCartClicked);
}

// Buy Button Work
document
.getElementsByClassName('btn-buy')[0]
.addEventListener('click', buyButtonClicked);

// Call the updateCartIcon function to display the initial cart count
updateCartIcon();
}

// Buy Button
function buyButtonClicked() {
alert('Je bestelling is geplaatst');
const cartContent = document.getElementsByClassName('cart-content')[0];
while (cartContent.hasChildNodes()) {
cartContent.removeChild(cartContent.firstChild);
}
updatetotal();
updateCartIcon(); // Update cart count after purchase
}

// Remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    updateCartIcon(); // Update cart count after removal
}

// Quantity Changes
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }               
    updatetotal();
    updateCartIcon(); // Update cart count after quantity change
}

// Add To Cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    updateCartIcon(); // Update cart count after adding product
}


function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Deze product zit al in je winkelwagen");
            return;
        }
    }
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bx-trash cart-remove' ></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}


// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("€", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // If price contains some cents
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = '€' + total;
}

// Volgende/Vorige
prevBtn.addEventListener("click", () => {
    if (currentProduct > 0) {
        currentProduct--;
        products[currentProduct].scrollIntoView({ behavior: "smooth" });
    }
});

nextBtn.addEventListener("click", () => {
    if (currentProduct < products.length - 1) {
        currentProduct++;
        products[currentProduct].scrollIntoView({ behavior: "smooth" });
    }
});
