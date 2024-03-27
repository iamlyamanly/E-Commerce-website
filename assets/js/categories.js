const collection=document.querySelector(".collection_cont");
const gohome=document.querySelector(".goHome");

gohome.addEventListener("click",function(){
  console.log(gohome)
  window.location="index.html";
});


const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
let product = urlParams.get("category");
console.log(product);
if(product.includes('3')){
  product = product.replace('3',' & ');
 }
 console.log(product)
let Allproduct = [];

function getProducts() {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        if(item?.category==product){
            Allproduct.push(item);
        }
      });
      getCategoryProduct();

    });
}

getProducts()

const getCategoryProduct = () => {
    console.log(Allproduct);
    collection.innerHTML="";
    Allproduct.forEach(item=>{
        const newPrice=Math.round(item.price-(item.price*item.discountPercentage/100));
        collection.innerHTML+=`
        <div class="card">
        <div class="card_case">
        ${item?.discountPercentage? `
        <div class="sale_square">
          <p class="sale_square_text">-${Math.round(item.discountPercentage)}%</p>
        </div>`:`<div></div>`}
        <div class="icons">
            <div class="absolute_icon">
              <img src="assets/images/Vector (4).png" />
            </div>
            <div class="absolute_icon">
              <img src="assets/images/Group (7).png" />

            </div>
        </div>
            <div class="card_case_img">
            <img src="${item.thumbnail}" />
            </div>
            <div class="addtocart">
            <p>Add To Cart</p>
            </div>
        </div>
        <div class="card_desc">
        <p class="card_text">${item.title}</p>
        ${item?.discountPercentage? `
        <div class="card_desc_price">
          <p class="product_price">${newPrice}$</p>
          <span class="product_exprice"><strike>${item.price}$</strike></span>
        </div>`:`<div class="card_desc_price">
        <p class="product_price">${item.price}$</p>
      </div>`}
        </div>
        </div>`
    })
}