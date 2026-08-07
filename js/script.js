// ================================
// SmartDealsHub Script v2.0
// ================================

let allProducts = [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Load Products
fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        allProducts = products;
        displayProducts(products);
        updateWishlistCount();
    })
    .catch(error => console.error(error));

// ================================
// Display Products
// ================================

function displayProducts(products) {

    let output = "";

    products.forEach(product => {

        output += `
        <div class="col-lg-4 col-md-6 mb-4">

            <div class="product-card">

                <div class="badge-sale">
                    ${product.badge || "Best Seller"}
                </div>

                <img src="${product.image}" class="product-img" alt="${product.title}">

                <div class="product-content">

                    <h5 class="product-title">${product.title}</h5>

                    <p><strong>Category:</strong> ${product.category}</p>

                    <div class="rating">
                        ⭐⭐⭐⭐⭐ (${product.rating})
                    </div>

                    <h4 class="product-price">${product.price}</h4>

                    <div class="d-grid gap-2 mt-3">

                        <a href="product.html?id=${product.id}"
                           class="btn btn-primary">

                           View Details

                        </a>

                        <a href="${product.affiliate}"
                           target="_blank"
                           class="btn btn-warning">

                           Buy on Amazon

                        </a>

                        <button
                            class="btn btn-outline-danger"
                            onclick="addToWishlistById(${product.id})">

                            ❤️ Add to Wishlist

                        </button>

                    </div>

                </div>

            </div>

        </div>
        `;

    });

    document.getElementById("products").innerHTML = output;

}

// ================================
// Search
// ================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const filtered = allProducts.filter(product =>

            product.title.toLowerCase().includes(keyword) ||

            product.category.toLowerCase().includes(keyword)

        );

        displayProducts(filtered);

    });

}

// ================================
// Wishlist
// ================================

function addToWishlistById(id){

    const product = allProducts.find(p => p.id === id);

    if(!product) return;

    const exists = wishlist.find(item => item.id === id);

    if(exists){

        alert("Already added ❤️");
        return;

    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();

    alert("Added to Wishlist ❤️");

}

function updateWishlistCount(){

    const count = document.getElementById("wishlistCount");

    if(count){

        count.innerText = wishlist.length;

    }

}
// ================================
// Category Filter
// ================================

const categoryFilter = document.getElementById("categoryFilter");

if(categoryFilter){

    categoryFilter.addEventListener("change", function(){

        let value = this.value;

        if(value === "all"){

            displayProducts(allProducts);

        }else{

            let filtered = allProducts.filter(product =>
                product.category === value
            );

            displayProducts(filtered);

        }

    });

}

// ================================
// Product Sorting
// ================================

const sortProducts = document.getElementById("sortProducts");

if(sortProducts){

    sortProducts.addEventListener("change", function(){

        let products = [...allProducts];

        switch(this.value){

            case "low":

                products.sort((a,b)=>
                    parseFloat(a.price.replace("$","")) -
                    parseFloat(b.price.replace("$",""))
                );

                break;

            case "high":

                products.sort((a,b)=>
                    parseFloat(b.price.replace("$","")) -
                    parseFloat(a.price.replace("$",""))
                );

                break;

            case "rating":

                products.sort((a,b)=> b.rating-a.rating);

                break;

        }

        displayProducts(products);

    });

}