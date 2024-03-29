let Allproduct;
const cardList = document.querySelector(".cards_container");
const bestsellerList = document.querySelector("#bestSelling_cont");
const categoryList = document.querySelector(".browsebycategories");
const allitems = document.querySelector(".allitems");
const banner = document.querySelector(".banner_container");
const featureContainer = document.querySelector(".featured_elements");
const menu = document.querySelectorAll(".menu_list_item");
const collection = document.querySelector(".collection_cont");

let addcart = [];
let liked = [];
let id;
const user = JSON.parse(localStorage.getItem("user"))

if(user){
    addcart = user.addcart;
    liked = user.liked;
    id = user.id;
}
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

//Axtarish

const initSlider = () => {
  const slideButtons = document.querySelectorAll(".today .slideBtn");

  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      //console.log(cardList.clientWidth);
      const scrollAmount = cardList.clientWidth * direction;
      //console.log(scrollAmount);
      cardList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
};
const otherslider = () => {
  const slideButtons = document.querySelectorAll(".our_products .slideBtn");

  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      //console.log(allitems.clientWidth);
      const scrollAmount = allitems.clientWidth * direction;
      //console.log(scrollAmount);
      allitems.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
};
const categorySlider = () => {
  const slideButtons = document.querySelectorAll(".browse_categories .slideBtn");

  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("asdasdas");
      const direction = button.id === "prev-slide" ? -1 : 1;
      //console.log(categoryList.clientWidth);
      const scrollAmount = categoryList.clientWidth * direction;
     // console.log(scrollAmount);
      categoryList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
};
window.addEventListener("load",categorySlider);


(async () => {
  try {
    await fetch("http://localhost:3000/banner")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        data?.forEach((item) => {
          banner.innerHTML += `
          <img src="${item?.image}" />
        `;
        });
        const dotCont = document.querySelector(".pagination_dottes div");
        data.forEach((item) => {
          dotCont.innerHTML += `
        <div class="pagination_dot"></div>
        `;
        });
      });
  } catch (error) {
    //console.log(error);
  }
})();
let i = 0;

setInterval(() => {
  banner.scrollBy({
    left:
      i >= 4
        ? -banner.querySelector("img").clientWidth * 4
        : banner.querySelector("img").clientWidth,
    behavior: "smooth",
  });
  if (i >= 4) {
    i = 0;
  } else {
    i++;
  }
  const dottes = document.querySelectorAll(".pagination_dot");
  dottes.forEach((item, index) => {
    if (index == i) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}, 4000);

window.addEventListener("load", initSlider);
window.addEventListener("load", otherslider);
let bestSellers = [];
let flashSales = [];
let featureItem = [];
/*Products*/
function getProducts() {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        if (item?.bestSeller) {
          bestSellers.push(item);
        }
        if (item?.sale) {
          flashSales.push(item);
        }
        if (item?.feature) {
          featureItem.push(item);
        }
      });
      repeatProduct(flashSales, bestSellers, data, featureItem);
      getArrivals();
      //console.log(flashSales.length);
      Allproduct = data;
    });
}

menu.forEach((li) =>
  li.addEventListener("click", function () {
    //collection.innerHTML=" ";
    //console.log(li.textContent);
    let variable = li.textContent;
    if (variable.includes("&")) {
      variable = variable.replace(" & ", "3");
      //console.log(variable);
    }
    window.location.href = "categories.html?category=" + variable;
  })
);

function getCategories() {
  categoryList.innerHTML = "";
  fetch("http://localhost:3000/subcategory")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        categoryList.innerHTML += `
      <div class="category_cards">
      <img src="${item.icon}" />
      <p class="category_cards_name">${item.name}</p>
    </div>
      `;
      });
    });
}
const getArrivals = () => {
  featureItem.forEach((item, index) => {
    //console.log(item?.thumbnail);
    //console.log(index);
    document
      .querySelector(`#img_featured-${index + 1}`)
      .setAttribute("src", item?.thumbnail);
  });
};
getCategories();
getProducts();
const ratingFromBackend = 4.3;

// ulduz
function fillStars(rating, id) {
  //console.log(rating, id);
  const stars = document.querySelectorAll(`#rate_${id} input`);
  const rating2 = Math.round(rating * 2);
  stars.forEach((item) => {
    if (rating2 == item.value) {
      item.setAttribute("checked", true);
    }
  });
}

fillStars(ratingFromBackend);
function repeatProduct(flashSales, bestSellers, allItems, featureItem) {
  cardList.innerhtml = "";
  bestsellerList.innerHTML = "";
  allitems.innerHTML = "";
  flashSales.forEach(function (product) {
    const newPrice = Math.round(
      product.price - (product.price * product.discountPercentage) / 100
    );
    //console.log(cartItems.includes(+product.id));

    cardList.innerHTML += `
        <div class="card ">
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
         <a href="productDetail.html?id=${product.id}">
          <div class="card_case_img" >
            <img src="${product.thumbnail}" />
          </div>
          </a>
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
          <fieldset class="rate" id="rate_${product.id}">
      <input type="radio" id="rating10" name="flash_rating_${
        product.id
      }" value="10" /><label for="rating10" title="5 stars"></label>
      <input type="radio" id="rating9" name="flash_rating_${
        product.id
      }" value="9" /><label class="half" for="rating9" title="4 1/2 stars"></label>
      <input type="radio" id="rating8" name="flash_rating_${
        product.id
      }" value="8" /><label for="rating8" title="4 stars"></label>
      <input type="radio" id="rating7" name="flash_rating_${
        product.id
      }" value="7" /><label class="half" for="rating7" title="3 1/2 stars"></label>
      <input type="radio" id="rating6" name="flash_rating_${
        product.id
      }" value="6" /><label for="rating6" title="3 stars"></label>
      <input type="radio" id="rating5" name="flash_rating_${
        product.id
      }" value="5" /><label class="half" for="rating5" title="2 1/2 stars"></label>
      <input type="radio" id="rating4" name="flash_rating_${
        product.id
      }" value="4" /><label for="rating4" title="2 stars"></label>
      <input type="radio" id="rating3" name="flash_rating_${
        product.id
      }" value="3" /><label class="half" for="rating3" title="1 1/2 stars"></label>
      <input type="radio" id="rating2" name="flash_rating_${
        product.id
      }" value="2" /><label for="rating2" title="1 star"></label>
      <input type="radio" id="rating1" name="flash_rating_${
        product.id
      }" value="1" /><label class="half" for="rating1" title="1/2 star"></label>
  
  </fieldset>
        </div>
       
      </div>
    
        `;
  });
  bestSellers.forEach(function (product) {
    //console.log(product);
    bestsellerList.innerHTML += `
  <div class="card">
    <div class="card_case">
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
      <a href="productDetail.html?id=${product.id}">
      <div class="card_case_img" >
        <img src="${product.thumbnail}" />
      </div>
      </a>
      <div class="addtocart" onclick="add(${product?.id})">
      <p id="add_cart_${product.id}">${
      cartItems?.includes(+product.id) ? "Go to cart" : "Add to cart"
    }</p>
      </div>
    </div>
    <div class="card_desc">
      <p class="card_text">${product.title}</p>
      <div class="card_desc_price">
        <p class="product_price">${product.price}$</p>
      </div>
      
      <fieldset class="rate" id="rate_${product.id}">
      <input type="radio" id="rating10" name="best_rating_${
        product.id
      }" value="10" /><label for="rating10" title="5 stars"></label>
      <input type="radio" id="rating9" name="best_rating_${
        product.id
      }" value="9" /><label class="half" for="rating9" title="4 1/2 stars"></label>
      <input type="radio" id="rating8" name="best_rating_${
        product.id
      }" value="8" /><label for="rating8" title="4 stars"></label>
      <input type="radio" id="rating7" name="best_rating_${
        product.id
      }" value="7" /><label class="half" for="rating7" title="3 1/2 stars"></label>
      <input type="radio" id="rating6" name="best_rating_${
        product.id
      }" value="6" /><label for="rating6" title="3 stars"></label>
      <input type="radio" id="rating5" name="best_rating_${
        product.id
      }" value="5" /><label class="half" for="rating5" title="2 1/2 stars"></label>
      <input type="radio" id="rating4" name="best_rating_${
        product.id
      }" value="4" /><label for="rating4" title="2 stars"></label>
      <input type="radio" id="rating3" name="best_rating_${
        product.id
      }" value="3" /><label class="half" for="rating3" title="1 1/2 stars"></label>
      <input type="radio" id="rating2" name="best_rating_${
        product.id
      }" value="2" /><label for="rating2" title="1 star"></label>
      <input type="radio" id="rating1" name="best_rating_${
        product.id
      }" value="1" /><label class="half" for="rating1" title="1/2 star"></label>
  
  </fieldset>
    </div>
    
  </div>
`;
    fillStars(product.rating, product.id);
  });

  allItems.forEach(function (item) {
    const newPrice = Math.round(
      item.price - (item.price * item.discountPercentage) / 100
    );
    allitems.innerHTML += `
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
        <a href="productDetail.html?id=${item.id}">
        <div class="card_case_img" >
          <img src="${item.thumbnail}" />
        </div>
        </a>
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
        <fieldset class="rate" id="rate_${item.id}">
      <input type="radio" id="rating10" name="all_rating_${
        item.id
      }" value="10" /><label for="rating10" title="5 stars"></label>
      <input type="radio" id="rating9" name="all_rating_${
        item.id
      }" value="9" /><label class="half" for="rating9" title="4 1/2 stars"></label>
      <input type="radio" id="rating8" name="all_rating_${
        item.id
      }" value="8" /><label for="rating8" title="4 stars"></label>
      <input type="radio" id="rating7" name="all_rating_${
        item.id
      }" value="7" /><label class="half" for="rating7" title="3 1/2 stars"></label>
      <input type="radio" id="rating6" name="all_rating_${
        item.id
      }" value="6" /><label for="rating6" title="3 stars"></label>
      <input type="radio" id="rating5" name="all_rating_${
        item.id
      }" value="5" /><label class="half" for="rating5" title="2 1/2 stars"></label>
      <input type="radio" id="rating4" name="all_rating_${
        item.id
      }" value="4" /><label for="rating4" title="2 stars"></label>
      <input type="radio" id="rating3" name="all_rating_${
        item.id
      }" value="3" /><label class="half" for="rating3" title="1 1/2 stars"></label>
      <input type="radio" id="rating2" name="all_rating_${
        item.id
      }" value="2" /><label for="rating2" title="1 star"></label>
      <input type="radio" id="rating1" name="all_rating_${
        item.id
      }" value="1" /><label class="half" for="rating1" title="1/2 star"></label>
  
  </fieldset>
      </div>
    </div>
      `;
    fillStars(item.rating, item.id);
  });
}


