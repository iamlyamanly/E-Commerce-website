const { addcart, id } = JSON.parse(localStorage.getItem("user"));
let itemArray = [];
const productCart = document.querySelector(".card_container");
const pricetotal = document.querySelectorAll(".pricetotal");
const order = document.querySelector(".ordercard_container");
addcart.sort();
let totalArray = [];
let totalPrice = 0;
const totalelprice=[];

const getCartProducts = async () => {
  try {
    await fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((res) => {
        res.forEach((item) => {
          if (addcart.includes(+item.id)) {
            itemArray.push(item);
          }
        });
        getCartEl();
        getLastPrices();
        sumPrice();
        cancelItem();
        orderEl();
      });
  } catch (error) {
    console.log(error);
  }
};

const cancelItem = () => {
  const deleteItem = document.querySelectorAll(".cancel");
  deleteItem.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index !== -1) {
        addcart.splice(index, 1);
      }
      console.log(addcart);

      getCartEl();
      sendarraytoserver();
    });
  });
};

getCartProducts();
function sendarraytoserver() {
  //console.log(data);
  fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ addcart: addcart }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
    });
}
function getCartEl() {
  console.log(itemArray);
  if (productCart) {
    productCart.innerHTML = "";
    itemArray.forEach((product, index) => {
      productCart.innerHTML += `
              <div class="cart_item">
                  <div class="cart_item_item">
                      <div class="cancel"><img src="assets/images/Vector (10).png"/></div>
                      <img  src="${product.thumbnail}">
                      <p>${product.title}</p>
                  </div>
                  <p  class="price">$${product.price}</p>
                  <input min="1" value="1" class="cart_item_counter" type="number" />
                  <p class="last_price">$${product.price}</p>
              </div>
      
          
          `;
      totalArray.push(product.price);
    });
  }
}
function orderEl() {
  console.log(itemArray);
  let totalArray=[]
  if (order) {
    order.innerHTML = "";
    itemArray.forEach((product, index) => {
      order.innerHTML += `
      <div class="ordercard">
  
      <div class="oneProduct">
             <img src="${product.thumbnail}">
                  <p>${product.title}</p>
                  </div>
                          
       <div class="onePrice"><p>${product.price}</p></div>
            </div>    

      `;
      totalArray.push(product.price);

    })
    let totalPrice=0;
    totalArray.forEach(item=>{
      totalPrice+=item;

    })
    document.querySelectorAll(".SubtotalPr").forEach((item)=>{
      item.innerHTML=totalPrice+"$";
    })

  }
}


const sumPrice = () => {
  totalPrice = 0;
  totalArray.forEach((item) => {
    totalPrice += item;
  });
  pricetotal.forEach((item) => {
    item.textContent = "$" + totalPrice;
  });
};


const getLastPrices = () => {
  document.querySelectorAll(".cart_item_counter").forEach((item, index) => {
    item?.addEventListener("change", (e) => {
      const quantity = parseInt(e.target.value);
      console.log(quantity);
      console.log(
        item.parentElement.querySelector(".price").textContent.replace("$", "")
      );
      let content = +item.parentElement
        .querySelector(".price")
        .textContent.replace("$", "");
      console.log(content);
      item.nextElementSibling.textContent = `$${content * quantity}`;
      totalArray[index] = content * quantity;
      pricetotal.textContent = `${content * quantity}`;
      sumPrice();
    });
  });

};



