const listCont = document.querySelector(".WishList_cont");
const { liked, id,addcart } = JSON.parse(localStorage.getItem("user"));
const cartItems = addcart;
const likes = liked;
let AllList = [];

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

function getProducts() {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        if (likes.includes(+item?.id)) {
          AllList.push(item);
        }
      });
      //console.log(AllList);

      getlist();
    });
}

getProducts();

function getlist() {
  listCont.innerHTML = "";
  AllList.forEach((item) => {
    const newPrice = Math.round(
      item.price - (item.price * item.discountPercentage) / 100
    );
    listCont.innerHTML += `
    <div class="card">
    <div class="card_case">
    ${
      item?.discountPercentage
        ? `
    <div class="sale_square">
      <p class="sale_square_text">-${Math.round(item.discountPercentage)}%</p>
    </div>`
        : `<div></div>`
    }
    <div class="icons">
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
    ${
      item?.discountPercentage
        ? `
    <div class="card_desc_price">
      <p class="product_price">${newPrice}$</p>
      <span class="product_exprice"><strike>${item.price}$</strike></span>
    </div>`
        : `<div class="card_desc_price">
    <p class="product_price">${item.price}$</p>
  </div>`
    }
    </div>
    </div>
    `;
  });
}
