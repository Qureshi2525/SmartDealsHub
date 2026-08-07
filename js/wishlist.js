let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const container = document.getElementById("wishlistProducts");

if (wishlist.length === 0) {

    container.innerHTML = `
        <div class="col-12 text-center">

            <h3>Your Wishlist is Empty ❤️</h3>

            <a href="index.html" class="btn btn-primary mt-3">

                Shop Now

            </a>

        </div>
    `;

} else {

    let output = "";

    wishlist.forEach(product => {

        output += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="product-card">

                <img src="${product.image}" class="product-img">

                <div class="product-content">

                    <h5>${product.title}</h5>

                    <p>${product.price}</p>

                    <div class="d-grid gap-2">

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

                        class="btn btn-danger"

                        onclick="removeWishlist(${product.id})">

                        Remove

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    container.innerHTML = output;

}

function removeWishlist(id){

    wishlist = wishlist.filter(product => product.id !== id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    location.reload();

}