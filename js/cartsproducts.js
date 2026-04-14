document.addEventListener("DOMContentLoaded", () => {
    let ProductsInCart = localStorage.getItem("ProductsInCart");
    let allProducts = document.querySelector(".cartProducts");
    let addedItem = ProductsInCart ? JSON.parse(ProductsInCart) : [];
    let products = [
        { id: 1, imgurl: "images/gamingChair.png", productName: "Gaming Chair", price: "280$", category: "Furniture", quantity: 0 },
        { id: 2, imgurl: "images/EaFc24 (1).png", productName: "EA FC 24", price: "100$", category: "Games", quantity: 0 },
        { id: 3, imgurl: "images/godOfWar.png", productName: "God Of War", price: "170$", category: "Games", quantity: 0 },
        { id: 4, imgurl: "images/Ps5.png", productName: "PS5", price: "800$", category: "Console", quantity: 0 },
        { id: 5, imgurl: "images/SpiderMan.png", productName: "Spider-Man", price: "300$", category: "Games", quantity: 0 },
        { id: 6, imgurl: "images/Xbox.png", productName: "XBOX Series x", price: "750$", category: "Console", quantity: 0 },
        { id: 7, imgurl: "images/ps5Con.png", productName: "PS5 Controller", price: "80$", category: "Controller", quantity: 0 },
        { id: 8, imgurl: "images/xboxcon.png", productName: "XBOX Controller", price: "60$", category: "Controller", quantity: 0 },
        { id: 9, imgurl: "images/gamingTShirt.png", productName: "Gaming T-Shirt", price: "25$", category: "T-shirt", quantity: 0 }
    ];

    if (ProductsInCart) {
        drawCartProducts(addedItem);
    }

    function drawCartProducts(products) {
        let html = products.map((item) => `
            <div class="added_item" data-id="${item.id}">
                <img class="added_item_img" src="${item.imgurl}" alt="${item.productName}">
                <div class="added_item_desc">
                    <p>Product: ${item.productName}</p>
                    <p>Price: ${item.price}</p>
                </div>
                <div class="addOrRemove">
                    <i class="fa-solid fa-minus minusBtn" style="color: #ff0000"></i>
                    <span class="itemCounter">${item.quantity}</span>
                    <i class="fa-solid fa-plus plusBtn" style="color: #00f010" data-id="${item.id}"></i>
                </div>
                <div class="added_item_action">
                    <button class="remove_from_cart" data-id="${item.id}">Remove From Cart</button>
                </div>
            </div>
        `).join("");
        allProducts.innerHTML = html;
    }

    allProducts.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove_from_cart')) {
            let id = parseInt(event.target.dataset.id);
            removeFromCart(id);
        } else if (event.target.classList.contains('plusBtn')) {
            let id = parseInt(event.target.dataset.id);
            addToCart(id);
        } else if (event.target.classList.contains('minusBtn')) {
            let id = parseInt(event.target.closest('.added_item').dataset.id);
            removeFromCart(id);
        }
    });

    function addToCart(id) {
        let item = addedItem.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
        } else {
            item = products.find(p => p.id === id);
            item.quantity = 1;
            addedItem.push(item);
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
        calculateTotalPrice(); // Call this function after updating the cart
    }

    let calcBtn = document.querySelector(".checkTotal")
    let price = document.querySelector(".price")
    calcBtn.addEventListener("click",calculateTotalPrice)
    function calculateTotalPrice() {
        let totalPrice = 0;
        addedItem.forEach(item => {
            let product = products.find(p => p.id === item.id);
            if (product) {
                // Convert price from string to number
                let price = parseFloat(product.price.replace('$', ''));
                totalPrice += price * item.quantity;
            }
        });
        console.log('Total Price: $' + totalPrice.toFixed(2)); // Display or use the totalPrice as needed
        price.innerHTML = totalPrice.toFixed(2) + "$"
    }
});
