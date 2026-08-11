// =====================================
// SmartDealsHub Product Details
// =====================================

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

fetch("data/products.json")
    .then(res => res.json())
    .then(products => {

        const product = products.find(p => p.id === id);

        if (!product) {
            document.body.innerHTML = `
                <h2 class="text-center mt-5">
                    Product Not Found
                </h2>
            `;
            return;
        }

        // ==============================
        // PRODUCT DETAILS
        // ==============================

        document.getElementById("productImage").src = product.image;

        document.getElementById("productTitle").innerText =
            product.title;

        document.getElementById("productBrand").innerText =
            product.brand;

        document.getElementById("productPrice").innerText =
            product.price;

        document.getElementById("productDescription").innerText =
            product.description;

        document.getElementById("productRating").innerText =
            product.rating;

        document.getElementById("productBadge").innerText =
            product.badge || "";

        document.getElementById("buyButton").href =
            product.affiliate;


        // ==============================
        // SEO
        // ==============================

        document.title =
            `${product.title} | SmartDealsHub`;

        let descriptionTag =
            document.querySelector('meta[name="description"]');

        if (descriptionTag) {

            descriptionTag.setAttribute(
                "content",
                `${product.title} - ${product.description} Find product details, ratings and Amazon deals at SmartDealsHub.`
            );

        }


        // ==============================
        // PINTEREST
        // ==============================

        const pinterestURL =
            `https://www.pinterest.com/pin/create/button/?url=${
                encodeURIComponent(window.location.href)
            }&media=${
                encodeURIComponent(product.image)
            }&description=${
                encodeURIComponent(product.title)
            }`;

        const pinterestBtn =
            document.getElementById("pinterestBtn");

        if (pinterestBtn) {
            pinterestBtn.href = pinterestURL;
        }


        // ==============================
        // WHATSAPP
        // ==============================

        const currentURL =
            window.location.href;

        const whatsappShare =
            document.getElementById("whatsappShare");

        if (whatsappShare) {

            whatsappShare.href =
                `https://wa.me/?text=${
                    encodeURIComponent(
                        product.title + " " + currentURL
                    )
                }`;

        }


        // ==============================
        // FACEBOOK
        // ==============================

        const facebookShare =
            document.getElementById("facebookShare");

        if (facebookShare) {

            facebookShare.href =
                `https://www.facebook.com/sharer/sharer.php?u=${
                    encodeURIComponent(currentURL)
                }`;

        }


        // ==============================
        // X / TWITTER
        // ==============================

        const twitterShare =
            document.getElementById("twitterShare");

        if (twitterShare) {

            twitterShare.href =
                `https://twitter.com/intent/tweet?url=${
                    encodeURIComponent(currentURL)
                }&text=${
                    encodeURIComponent(product.title)
                }`;

        }


        // ==============================
        // COPY LINK
        // ==============================

        window.copyLink = function () {

            navigator.clipboard
                .writeText(window.location.href)
                .then(() => {

                    alert("Product Link Copied!");

                })
                .catch(() => {

                    alert("Unable to copy link.");

                });

        };

    })

    .catch(error => {

        console.error(
            "Error loading product:",
            error
        );

    });