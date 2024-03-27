let query=window.location.search;
let productId = new URLSearchParams(query).get("id");
const product=document.querySelectorAll(".card");
const detail=document.querySelector(".detail_cont");
const related=document.querySelector(".Related");
const { liked, id,addcart } = JSON.parse(localStorage.getItem("user"));
const cartItems = addcart;
const likes = liked;

//like and addtocart
function sendCommentToServer(data) {
  //console.log(data);
  fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
    });
}
const add = (id) => {
  if (cartItems.includes(id)) {
    window.location.href = "cart.html";
  } else {
    cartItems.push(id);
    document.querySelector(`#add_cart_${id}`).textContent = "Go to cart";
  }
  const element = { addcart: cartItems };
  sendCommentToServer(element);
};
 
function getcrops(){
    fetch("http://localhost:3000/products/" +productId)
    .then((res) => res.json())
    .then((crop) => {

        repeatCrop(crop);
        _getProducts(crop.subcategory);

        //console.log(crop.subcategory)
    });
}

function _getProducts(subCategory){
    console.log(subCategory)
    fetch("http://localhost:3000/products?subcategory=" +subCategory)
    .then((res) => res.json())
    .then((crop) => {
        //console.log(crop)
    related.innerHTML="";
    crop.forEach((product)=>{
    const newPrice = Math.round(
            product.price - (product.price * product.discountPercentage) / 100
          );
        related.innerHTML+=`
        <div class="card " >
        <div class="card_case">
        <div class="card_case_elements">
        <div class="sale_square">
          <p class="sale_square_text">-${Math.round(
            product.discountPercentage
          )}%</p>
        </div>
        <div class="icons">
        <div id="card_${product?.id}" class="absolute_icon" onclick="like(${
          product?.id
        })">
                  ${
                    !likes.includes(+product?.id)
                      ? `<img src="./assets/images/Vector (4).png" />`
                      : `<img src="./assets/images/heart (1).png" style="width:18px;height:18px;" />`
                  }
                </div>
            <div class="absolute_icon">
              <img src="assets/images/Group (7).png" />

            </div>
        </div>
        
        </div>
        
          <div class="card_case_img">
           <a href="productDetail.html?id=${product.id}" ><img src="${product.thumbnail}" /></a> 
          </div>
          <div class="addtocart" onclick="add(${product?.id})">
      <p id="add_cart_${product.id}">${
      cartItems?.includes(+product.id) ? "Go to cart" : "Add to cart"
    }</p>
      </div>
        </div>
        <div class="card_desc">
          <p class="card_text">${product.title}</p>
          <div class="card_desc_price">
            <p class="product_price">${newPrice}$</p>
            <span class="product_exprice"><strike>${
              product.price
            }$</strike></span>
          </div>
        </div>
       
      </div>

   `



    })
    });

    

}
getcrops();


function repeatCrop(crop){
    detail.innerHTML="";
    detail.innerHTML+=`
    <div class="detail">
         <div class="product_img">
            <div class="product_mini_img">
                <div class="mini_img">
                    <img src="${crop.images[0]}"/>
                </div>
                <div class="mini_img">
                    <img src="${crop.images[1]}"/>
                </div>
                <div class="mini_img">
                    <img src="${crop.images[2]}"/>
                </div>
                <div class="mini_img">
                    <img src="${crop.images[3]}"/>
                </div>

            </div>
            </div>
            <div class="products_img">
                <img src="${crop.thumbnail}">
            </div>
          </div>
            <div class="product_detail">
                <p class="products_name">${crop.title}</p>
                <p class="products_price">$${crop.price}</p>
                <p class="products_desc">${crop.description}</p>
                <hr>
                <div class="procucts_color">
                <p>Colours:
                   <div class="color_ell">
                    <div class="ell1"></div>
                    <div class="ell2"></div>
                   </div>
                   </p>
                  </div>
                  <div class="procucts_color">
                   <p >Size: 
                    <div class="sizes">
                      <div class="size_card">XS</div>
                      <div class="size_card">S</div>
                      <div class="size_card">M</div>
                      <div class="size_card">L</div>
                      <div class="size_card">XL</div>

                    </div>
                   </p>
                  </div>
                  <div class="buynow">
                  <div class="product_counter">
                  <button class="button_counter decrement">-</button>
                  <p class="counter_value">2</p>
                  <button class="button_counter border1" id="increment">+</button>
                  </div>
                  <button class="all_products pr_btn">Buy Now</button>
                  <div class="product_like"><img src="assets/images/heart (2).png"></div>
                </div>
                <div class="procucts_delivery">
                  <div class="free">
                    <img src="assets/images/icon-delivery (1).png">
                    <div>
                      <p class="delivery_head">Free Delivery</p>
                      <p class="delivery_desc">Enter your postal code for Delivery Availability</p>
                    </div>
                  </div>
                  <hr>
                  <div class="free">
                    <img src="assets/images/Icon-return.png">
                    <div>
                      <p class="delivery_head">Return Delivery</p>
                      <p class="delivery_desc">Free 30 Days Delivery Returns.Details</p>
                    </div>
                  </div>
                </div>
            </div>
    `
    


}