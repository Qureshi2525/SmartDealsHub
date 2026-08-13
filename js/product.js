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

        // =====================================
        // PRODUCT DETAILS
        // =====================================

        document.getElementById("productImage").src =
            product.image;

        document.getElementById("productImage").alt =
            product.title;

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


        // =====================================
        // PRICE - GOOGLE STRUCTURED DATA
        // =====================================

        let priceNumber = null;

        if (typeof product.price === "number") {

            priceNumber = product.price;

        } else if (typeof product.price === "string") {

            const cleanedPrice =
                product.price
                    .replace(/[^0-9.]/g, "");

            if (cleanedPrice !== "") {

                priceNumber =
                    parseFloat(cleanedPrice);

            }

        }


        // =====================================
        // PRODUCT SCHEMA / JSON-LD
        // =====================================

        const schema = {

            "@context": "https://schema.org",

            "@type": "Product",

            "name": product.title,

            "image": [
                product.image
            ],

            "description": product.description,

            "brand": {
                "@type": "Brand",
                "name": product.brand
            }

        };


        // =====================================
        // ADD OFFER ONLY WHEN PRICE IS VALID
        // =====================================

        if (
            priceNumber !== null &&
            !isNaN(priceNumber) &&
            isFinite(priceNumber) &&
            priceNumber > 0
        ) {

            schema.offers = {

                "@type": "Offer",

                "url": window.location.href,

                "priceCurrency": "USD",

                "price": priceNumber,

                "availability":
                    "https://schema.org/InStock",

                "itemCondition":
                    "https://schema.org/NewCondition"

            };

        }


        // =====================================
        // ADD RATING ONLY IF VALID
        // =====================================

        const rating =
            parseFloat(product.rating);

        const reviewCount =
            parseInt(product.reviews || 0);


        if (
            !isNaN(rating) &&
            rating > 0 &&
            rating <= 5 &&
            reviewCount > 0
        ) {

            schema.aggregateRating = {

                "@type": "AggregateRating",

                "ratingValue": rating,

                "reviewCount": reviewCount

            };

        }


        // =====================================
        // UPDATE JSON-LD
        // =====================================

        const schemaElement =
            document.getElementById("productSchema");

        if (schemaElement) {

            schemaElement.textContent =
                JSON.stringify(schema);

        }


        // =====================================
        // SEO TITLE
        // =====================================

        document.title =
            `${product.title} | SmartDealsHub`;


        // =====================================
        // META DESCRIPTION
        // =====================================

        let descriptionTag =
            document.querySelector(
                'meta[name="description"]'
            );

        if (!descriptionTag) {

            descriptionTag =
                document.createElement("meta");

            descriptionTag.setAttribute(
                "name",
                "description"
            );

            document.head.appendChild(
                descriptionTag
            );

        }

        descriptionTag.setAttribute(
            "content",
            `${product.title} - ${product.description} Find product details, ratings and Amazon deals at SmartDealsHub.`
        );


        // =====================================
        // CANONICAL URL
        // =====================================

        let canonical =
            document.querySelector(
                'link[rel="canonical"]'
            );

        if (!canonical) {

            canonical =
                document.createElement("link");

            canonical.setAttribute(
                "rel",
                "canonical"
            );

            document.head.appendChild(
                canonical
            );

        }

        canonical.setAttribute(
            "href",
            window.location.href
        );


        // =====================================
        // PINTEREST
        // =====================================

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

            pinterestBtn.href =
                pinterestURL;

        }


        // =====================================
        // COPY LINK
        // =====================================

        window.copyProductLink = function () {

            navigator.clipboard
                .writeText(window.location.href)

                .then(() => {

                    alert(
                        "Product link copied successfully!"
                    );

                })

                .catch(() => {

                    alert(
                        "Unable to copy link."
                    );

                });

        };

    })

    .catch(error => {

        console.error(
            "Error loading product:",
            error
        );

    });