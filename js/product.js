const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

fetch("data/products.json")
.then(res => res.json())
.then(products => {

    const product = products.find(p => p.id === id);

    if(!product){
        document.body.innerHTML = "<h2 class='text-center mt-5'>Product Not Found</h2>";
        return;
    }

    document.getElementById("productImage").src = product.image;
    document.getElementById("productTitle").innerText = product.title;
    document.getElementById("productBrand").innerText = product.brand;
    document.getElementById("productPrice").innerText = product.price;
    document.getElementById("productDescription").innerText = product.description;
    document.getElementById("productRating").innerText = product.rating;
    document.getElementById("productBadge").innerText = product.badge;
    document.getElementById("buyButton").href = product.affiliate;
const pinterestURL =
`https://www.pinterest.com/pin/create/button/?url=${
encodeURIComponent(window.location.href)
}&media=${
encodeURIComponent(product.image)
}&description=${
encodeURIComponent(product.title)
}`;

document.getElementById("pinterestBtn").href = pinterestURL;
});
const currentURL = window.location.href;

document.getElementById("whatsappShare").href =
`https://wa.me/?text=${encodeURIComponent(product.title + " " + currentURL)}`;

document.getElementById("facebookShare").href =
`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;

document.getElementById("twitterShare").href =
`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(product.title)}`;

function copyLink(){

navigator.clipboard.writeText(window.location.href);

alert("Product Link Copied!");

}
