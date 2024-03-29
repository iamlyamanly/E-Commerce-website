const searchList = document.querySelector(".search_list ul");
const User = JSON.parse(localStorage.getItem("user"));
const activePage = window.location.pathname;
const likecircle=document.querySelector(".likecircle");
const cartcircle=document.querySelector(".cartcircle");
const cartImg=document.querySelector(".cartImg");
const wishlistImg=document.querySelector(".wishlistImg");


cartImg.addEventListener("click",()=>{
  window.location.href="cart.html"
});
wishlistImg.addEventListener("click",()=>{
  window.location.href="wishlist.html"
})

//console.log(activePage);


if (User) {

  const totallike=User.liked.length;
  const totalcart=User.addcart.length;
  likecircle.textContent=totallike;
  cartcircle.textContent=totalcart;
  const child = document.createElement('div');
  child.classList = 'page-header_head_profile header_icon';
  child.innerHTML = '  <img src="assets/images/user.png">  ';
 // console.log(child)
  document.querySelector(".page_header_head_other_icons").appendChild(child);
  child.addEventListener("click",()=>{
    window.location.href="myAccount.html"
  })
}

const searchInput = document.querySelector(".search_input");

const navLinks = document
  .querySelectorAll(".page_header_head_navbar>ul>li>a")
  .forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add("activepage");
    }
  });

let allproduct;

searchInput.addEventListener("input", function (e) {
  if (e.target.value) {
    searchList.style.display = "block";

    let ourdata = allproduct.filter(function (product) {
      let productTitle = product.title.toLowerCase();
      let searchTitle = e.target.value.toLowerCase();
      return productTitle.includes(searchTitle);
    });
    searchList.innerHTML = "";

    ourdata.forEach((item) => {
      searchList.innerHTML += `
          <li><a href="productDetail.html?id=${item.id}" class="searchproductdetail">${item?.title}</a></li>
        `;
    });
    //console.log(ourdata);
  } else {
    searchList.style.display = "none";
  }
});
function getProducts() {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      allproduct = data;
    });
}

getProducts();
