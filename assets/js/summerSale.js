const summerSale=document.querySelector(".suitcoll");
const tohome=document.querySelector(".goHome");
const { addcart, liked, id } = JSON.parse(localStorage.getItem("user"));
const likes = liked;
const cartItems = addcart;
//console.log(cartItems);

//like
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
     // console.log(data);
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
const like = (id) => {
  if (likes.includes(id)) {
    var index = likes.indexOf(id);
    if (index !== -1) {
      likes.splice(index, 1);
    }
    document.querySelector(`#card_${id}`).innerHTML = "";
    document.querySelector(
      `#card_${id}`
    ).innerHTML = `      <img class="emptyHeart" src="assets/images/Vector (4).png" />
    `;
  } else {
    likes.push(id);
    document.querySelector(`#card_${id}`).innerHTML = "";
    document.querySelector(
      `#card_${id}`
    ).innerHTML = `                <img  src="assets/images/heart (1).png" style="width:18px;height:18px;" />

    `;
  }
  const data = { liked: likes };
  sendCommentToServer(data);
  //console.log(likes);
};


tohome.addEventListener("click",function(){
  window.location="index.html";
});

function getSummersale() {
    summerSale.innerHTML="";
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
       if(item.subcategory==="suit"){
        const newPrice=Math.round(item.price-(item.price*item.discountPercentage/100));
        summerSale.innerHTML+=`
        <div class="card">
        <div class="card_case">
        ${item?.discountPercentage? `
        <div class="sale_square">
          <p class="sale_square_text">-${Math.round(item.discountPercentage)}%</p>
        </div>`:`<div></div>`}
        <div class="icons">
        <div id="card_${item?.id}" class="absolute_icon" onclick="like(${
          item?.id
        })">
                  ${
                    !likes.includes(+item?.id)
                      ? `<img src="./assets/images/Vector (4).png" />`
                      : `<img src="./assets/images/heart (1).png" style="width:18px;height:18px;" />`
                  }
                </div>
            <div class="absolute_icon">
              <img src="assets/images/Group (7).png" />

            </div>
        </div>
            <div class="card_case_img">
            <img src="${item.thumbnail}" />
            </div>
            <div class="addtocart" onclick="add(${item?.id})">
            <p id="add_cart_${item.id}">${
            cartItems?.includes(+item.id) ? "Go to cart" : "Add to cart"
          }</p>
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
        </div>

        `
       }
        });
      });
  }
  getSummersale()