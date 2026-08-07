fetch("../data/products.json")

.then(res=>res.json())

.then(products=>{

let kitchen = products.filter(p=>p.category==="Kitchen");

let output="";

kitchen.forEach(product=>{

output +=`

<div class="col-lg-4 col-md-6 mb-4">

<div class="product-card">

<img src="${product.image}" class="product-img">

<div class="product-content">

<h5>${product.title}</h5>

<p>${product.price}</p>

<a href="../product.html?id=${product.id}"

class="btn btn-warning">

View Details

</a>

</div>

</div>

</div>

`;

});

document.getElementById("products").innerHTML=output;

});