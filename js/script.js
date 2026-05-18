document.addEventListener("DOMContentLoaded", () => {

    // ================= USER INFO =================
    let userInfo = document.querySelector("#user-info")
    let userData = document.querySelector("#user")
    let links = document.querySelector("#links")
    let logOutBtn = document.querySelector("#logout")

    if (localStorage.getItem("username")) {
        links.remove()
        userInfo.style.display = "flex"
        userData.textContent = `Welcome: ${localStorage.getItem("username")}`
    } else {
        userInfo.style.display = 'none'
    }

    logOutBtn.addEventListener("click", () => {
        localStorage.clear()
        setTimeout(() => {
            window.location.href = "signup.html"
        }, 1000)
    })

    // ================= PRODUCTS DATA =================
    let products = [
        { id: 1, imgurl: "images/gamingChair.png", productName: "Gaming Chair", price: "280$", category: "Furniture", quantity: 0, ava: true},
        { id: 2, imgurl: "images/EaFc24 (1).png", productName: "EA FC 24", price: "100$", category: "Games", quantity: 0, ava: true},
        { id: 3, imgurl: "images/godOfWar.png", productName: "God Of War", price: "170$", category: "Games", quantity: 0, ava: true},
        { id: 4, imgurl: "images/Ps5.png", productName: "PS5", price: "800$", category: "Console", quantity: 0, ava: false },
        { id: 5, imgurl: "images/SpiderMan.png", productName: "Spider-Man", price: "300$", category: "Games", quantity: 0, ava: false},
        { id: 6, imgurl: "images/Xbox.png", productName: "XBOX Series X", price: "750$", category: "Console", quantity: 0, ava: true },
        { id: 7, imgurl: "images/ps5Con.png", productName: "PS5 Controller", price: "80$", category: "Controller", quantity: 0, ava: true },
        { id: 8, imgurl: "images/xboxcon.png", productName: "XBOX Controller", price: "60$", category: "Controller", quantity: 0, ava: true },
        { id: 9, imgurl: "images/gamingTShirt.png", productName: "Gaming T-Shirt", price: "25$", category: "T-shirt", quantity: 0, ava: true },
    ];

    // ================= DRAW PRODUCTS =================
    let allproducts = document.querySelector(".products");

    function drawItems() {
        allproducts.innerHTML = products.map(item => `
            <div class="product_item col-xl-3" data-id="${item.id}">
                
                <img src="${item.imgurl}" alt="${item.productName}">

                <div class="product_item_desc">
                    <p class="product_name">Product: ${item.productName}</p>
                    <p class="product_price">Price: ${item.price}</p>

                    <div class="availability">
                        <span class="product_status ${item.ava ? "in-stock" : "out-stock"}">
                            ${item.ava ? "In Stock" : "Out Of Stock"}
                        </span>
                    </div>

                    <p>Category: ${item.category}</p>
                </div>

                <div class="product_item_action">
                    <button class="add_to_cart btn" onClick="addToCart(${item.id})">Add To Cart</button>
                    <button class="remove_from_cart" style="display:none" onClick="removeFromCart(${item.id})">Remove</button>
                </div>

            </div>
        `).join("");
    }

    drawItems();

    // ================= DATA EXTRACTION FUNCTION =================
    function getProductData() {
        return products.map(item => ({
            name: item.productName,
            price: item.price,
            availability: item.ava ? "In Stock" : "Out Of Stock"
        }));
    }

    // ================= EXPORT TO CSV =================
    function exportToCSV() {
        let data = getProductData();

        let csv = "Name,Price,Availability\n" +
            data.map(p => `${p.name},${p.price},${p.availability}`).join("\n");

        console.log(csv);
    }

    // ================= CART =================
    let cartProductDiv = document.querySelector(".carts_products div")
    let badge = document.querySelector(".badge")

    let addedItems = localStorage.getItem("ProductsInCart")
        ? JSON.parse(localStorage.getItem("ProductsInCart"))
        : []

    function updateCartDisplay() {
        cartProductDiv.innerHTML = addedItems.map(item => `
            <div class="added_item" data-id="${item.id}">
                <p>${item.productName}</p>
                <p>${item.price}</p>
            </div>
        `)

        badge.style.display = addedItems.length ? "block" : "none"
        badge.textContent = addedItems.length
    }

    window.addToCart = function (id) {
    let item = products.find(p => p.id === id)

    // 🚫 prevent adding if out of stock
    if (!item || !item.ava) return;

    // ✅ no login required anymore
    if (!addedItems.some(p => p.id === id)) {
        addedItems.push(item)
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItems))
        updateCartDisplay()
    }
}

    window.removeFromCart = function (id) {
        addedItems = addedItems.filter(p => p.id !== id)
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItems))
        updateCartDisplay()
    }

    updateCartDisplay()

});
