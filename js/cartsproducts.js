document.addEventListener("DOMContentLoaded", () => {

    let ProductsInCart = localStorage.getItem("ProductsInCart");
    let allProducts = document.querySelector(".cartProducts");
    let addedItem = ProductsInCart ? JSON.parse(ProductsInCart) : [];

    // ================= DRAW CART =================
    function drawCartProducts(products) {

        if (products.length === 0) {
            allProducts.innerHTML = "<h3>Your cart is empty</h3>";
            return;
        }

        let html = products.map(item => `
            <div class="added_item" data-id="${item.id}">

                <img class="added_item_img" src="${item.imgurl}" alt="${item.productName}">

                <div class="added_item_desc">
                    <p>Product: ${item.productName}</p>
                    <p>Price: ${item.price}</p>
                </div>

                <div class="addOrRemove">
                    <button class="minusBtn" data-id="${item.id}">-</button>
                    <span class="itemCounter">${item.quantity}</span>
                    <button class="plusBtn" data-id="${item.id}">+</button>
                </div>

                <div class="added_item_action">
                    <button class="remove_from_cart" data-id="${item.id}">
                        Remove
                    </button>
                </div>

            </div>
        `).join("");

        allProducts.innerHTML = html;
    }

    drawCartProducts(addedItem);

    // ================= EVENTS =================
    allProducts.addEventListener('click', function(event) {

        let id = parseInt(event.target.dataset.id);

        if (event.target.classList.contains('remove_from_cart')) {
            removeFromCart(id);
        }

        if (event.target.classList.contains('plusBtn')) {
            increaseQuantity(id);
        }

        if (event.target.classList.contains('minusBtn')) {
            decreaseQuantity(id);
        }
    });

    // ================= FUNCTIONS =================

    function increaseQuantity(id) {
        let item = addedItem.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
        }
        updateCart();
    }

    function decreaseQuantity(id) {
        let item = addedItem.find(item => item.id === id);

        if (item) {
            item.quantity -= 1;

            if (item.quantity <= 0) {
                removeFromCart(id);
                return;
            }
        }

        updateCart();
    }

    function removeFromCart(id) {
        addedItem = addedItem.filter(item => item.id !== id);
        updateCart();
    }

    function updateCart() {
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        drawCartProducts(addedItem);
        calculateTotalPrice();
    }

    // ================= TOTAL PRICE =================
    let calcBtn = document.querySelector(".checkTotal")
    let priceDisplay = document.querySelector(".price")

    if (calcBtn) {
        calcBtn.addEventListener("click", calculateTotalPrice)
    }

    function calculateTotalPrice() {
        let totalPrice = 0;

        addedItem.forEach(item => {
            let price = parseFloat(item.price.replace('$', ''));
            totalPrice += price * item.quantity;
        });

        priceDisplay.innerHTML = totalPrice.toFixed(2) + "$";
    }

});
