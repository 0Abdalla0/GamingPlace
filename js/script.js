document.addEventListener("DOMContentLoaded", () => {
    // User Info and Logout
    let userInfo = document.querySelector("#user-info")
    let userData = document.querySelector("#user")
    let links = document.querySelector("#links")
    let logOutBtn = document.querySelector("#logout")

    if (localStorage.getItem("username")) {
        links.remove()
        userInfo.style.display = "flex"
        userData.textContent = `Welcome: ${localStorage.getItem("username")}`
    }
    else
    {
        userInfo.style.display='none'
    }

    logOutBtn.addEventListener("click", () => {
        localStorage.clear()
        setTimeout(() => {
            window.location.href = "signup.html"
        }, 1000)
    })

    // Products Data
    let products = [
      {
        id: 1,
        imgurl: "images/gamingChair.png",
        productName: "Gaming Chair",
        price: 280 + "$",
        category: "Furniture",
        quantity: 0,
        ava: true,
      },
      {
        id: 2,
        imgurl: "images/EaFc24 (1).png",
        productName: "EA FC 24",
        price: 100 + "$",
        category: "Games",
        quantity: 0,
        ava: true,
      },
      {
        id: 3,
        imgurl: "images/godOfWar.png",
        productName: "God Of War",
        price: 170 + "$",
        category: "Games",
        quantity: 0,
        ava: true,
      },
      {
        id: 4,
        imgurl: "images/Ps5.png",
        productName: "PS5",
        price: 800 + "$",
        category: "Console",
        quantity: 0,
        ava: true,
      },
      {
        id: 5,
        imgurl: "images/SpiderMan.png",
        productName: "Spider-Man",
        price: 300 + "$",
        category: "Games",
        quantity: 0,
        ava: true,
      },
      {
        id: 6,
        imgurl: "images/Xbox.png",
        productName: "XBOX Series x",
        price: 750 + "$",
        category: "Console",
        quantity: 0,
        ava: true,
      },
      {
        id: 7,
        imgurl: "images/ps5Con.png",
        productName: "PS5 Controller",
        price: 80 + "$",
        category: "Controller",
        quantity: 0,
        ava: true,
      },
      {
        id: 8,
        imgurl: "images/xboxcon.png",
        productName: "XBOX Controller",
        price: 60 + "$",
        category: "Controller",
        quantity: 0,
        ava: true,
      },
      {
        id: 9,
        imgurl: "images/gamingTShirt.png",
        productName: "Gaming T-Shirt",
        price: 25 + "$",
        category: "T-shirt",
        quantity: 0,
        ava: false,
      },
    ];

    // Draw Products
    let allproducts = document.querySelector(".products");
function drawItems() {
  allproducts.innerHTML = products
    .map(
      (item) => `
        <div class="product_item col-xl-3" data-id="${item.id}">
            <img src="${item.imgurl}" alt="${item.productName}">
            <div class="product_item_desc">
                <p>Product: ${item.productName}</p>
                <p>Price: ${item.price}</p>

                <div class="availability">
                  ${
                    item.ava
                      ? `<span class="badge bg-success bg-opacity-10 rounded-pill px-3 py-2 small">In Stock</span>`
                      : `<span class="badge bg-danger bg-opacity-10 rounded-pill px-3 py-2 small">Out Of Stock</span>`
                  }
                </div>

                <p>Category: ${item.category}</p>
            </div>

            <div class="product_item_action">
                <button class="add_to_cart btn" style="display:block" onClick="addToCart(${item.id})">Add To Cart</button>
                <button class="remove_from_cart" style="display:none" onClick="removeFromCart(${item.id})">Remove From Cart</button>
            </div>

            <i class="fa-solid fa-heart fav" style="color: white"></i>
        </div>
      `,
    )
    .join("");
}
    drawItems()

    // Cart and Favorites Handling
    let cartProductDiv = document.querySelector(".carts_products div")
    let badge = document.querySelector(".badge")
    // Add and remove Btns
    let actionBtn = document.querySelectorAll(".product_item_action")
    actionBtn.forEach(btn=>{
        
        let addToCartBtn = btn.querySelector(".add_to_cart")
        let removeFromCartBtn = btn.querySelector(".remove_from_cart")
        
        btn.addEventListener("click",()=>{
            if (addToCartBtn.style.display==='block') {
                removeFromCartBtn.style.display='block'
                addToCartBtn.style.display='none'
            }
            else
            {
                removeFromCartBtn.style.display='none'
                addToCartBtn.style.display='block'    
            }
            
        })
    })
    
    let addedItems = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : []
    function updateCartDisplay() {
        cartProductDiv.innerHTML = addedItems.map(item => `
            <div class="added_item" data-id="${item.id}">
            <img class="added_item_img" src="${item.imgurl}" alt="${item.productName}">
            <div class="added_item_desc">
            <p>Product: ${item.productName}</p>
            <p>Price: ${item.price}</p>
            </div>
            <div class="added_item_action">
            <button class="remove_from_cart" onClick="removeFromCart(${item.id})">Remove From Cart</button>
            </div>
            </div>
            `)
            
            badge.style.display = addedItems.length ? "block" : "none"
            badge.textContent = addedItems.length
        }
        //fav function & send to cart page 
        let favorites = document.querySelectorAll(".fav")
        favorites.forEach(heart => {
            heart.addEventListener("click", function() {
                if(localStorage.getItem("username")){
                    if (heart.style.color === "white") {
                        heart.style.color = "#ff0026"
                    } else {
                        heart.style.color = "white"
                    }
                }
        else    
        {window.location="signin.html"}
    })
});
//remove  Function  Globally
window.removeFromCart =  function(id) {
    let choosenItem = products.find((item) => item.id === id)
    
    let itemDiv = document.querySelector(`.cart_item[data-id='${choosenItem.id}']`)
    if (itemDiv) {
        itemDiv.remove()
    }
    addedItems = addedItems.filter(item => item.id !== id)
    // console.log('Updated cart items:', addedItems); ///////////////////
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItems))
    
    updateCartDisplay()
}
//add  Function  Globally
window.addToCart = function(id) {
    if(localStorage.getItem("username")){
        let choosenItem = products.find(item => item.id === id);
        if (!choosenItem) return;
        if (addedItems.some(item => item.id === id)) return; // Prevent adding duplicate items
        choosenItem.quantity++
        addedItems.push(choosenItem);
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItems));
        updateCartDisplay();
    }
    else
    {
        window.location ="signin.html"
    }
    };

    let shoppingCartIcon = document.querySelector(".shopping_cart")
    let cartsProducts = document.querySelector(".carts_products")
    shoppingCartIcon.addEventListener("click", () => {
        if (cartProductDiv.innerHTML != "") {
            cartsProducts.style.display = cartsProducts.style.display === "none" ? "block" : "none"
        }
        })
        updateCartDisplay()
        // INCREASING AND DECREASING QUNTITY
        let addBtn = document.querySelector(".plusBtn")
        
    window.addBtn=function(id){
        let choosenItem = products.find(item => item.id === id);
        if (!choosenItem) return;
        if (addedItems.some(item => item.id === id)) return; // Prevent adding duplicate items
        choosenItem.quantity++
        addedItems.push(choosenItem);
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItems));
        updateCartDisplay();
    }
        
})//End OF CODE