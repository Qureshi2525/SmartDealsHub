fetch("../data/products.json")

.then(res => res.json())

.then(products => {

    let kitchen = products.filter(
        p => p.category.toLowerCase() === "kitchen"
    );

    let output = "";

    kitchen.forEach(product => {

        output += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="product-card h-100">

                <img
                    src="${product.image}"
                    class="product-img"
                    alt="${product.title}"
                    loading="lazy"
                >

                <div class="product-content">

                    <span class="badge bg-success mb-2">
                        ${product.badge || "Kitchen Deal"}
                    </span>

                    <h5>
                        ${product.title}
                    </h5>

                    <p class="text-muted">
                        ${product.brand || ""}
                    </p>

                    <p>
                        ${product.description || ""}
                    </p>

                    <p class="mb-2">
                        <i class="fa-solid fa-star text-warning"></i>
                        ${product.rating || ""}
                        
                        <small class="text-muted">
                            (${product.reviews || 0} reviews)
                        </small>
                    </p>

                    <h5 class="text-success">
                        ${product.price}

                        ${
                            product.oldPrice
                            ? `<del class="text-muted ms-2 fs-6">
                                ${product.oldPrice}
                               </del>`
                            : ""
                        }
                    </h5>

<div class="d-flex gap-2 mt-3">

    <a
        href="../product.html?id=${product.id}"
        class="btn btn-warning"
        style="
            width: 50%;
            white-space: nowrap;
            border-radius: 6px;
            font-weight: 600;
        "
    >
        <i class="fa-solid fa-eye me-1"></i>
        View Details
    </a>

    <a
        href="${product.affiliate}"
        target="_blank"
        rel="nofollow sponsored noopener"
        class="btn btn-success"
        style="
            width: 50%;
            white-space: nowrap;
            border-radius: 6px;
            font-weight: 600;
        "
    >
        <i class="fa-solid fa-cart-shopping me-1"></i>
        Buy Now
    </a>

</div>

                </div>

            </div>

        </div>

        `;

    });

    document.getElementById("products").innerHTML = output;

})

.catch(error => {

    console.error("Error loading products:", error);

    document.getElementById("products").innerHTML = `

        <div class="col-12 text-center">

            <p class="text-danger">
                Unable to load kitchen products.
            </p>

        </div>

    `;

});