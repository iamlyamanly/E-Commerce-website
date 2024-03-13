let Allproduct;
const cardList=document.querySelector(".cards_container");
const bestsellerList=document.querySelector("#bestSelling_cont");
const categoryList=document.querySelector(".browsebycategories");
const allitems=document.querySelector(".allitems");
const banner = document.querySelector(".banner_container");


const initSlider=()=>{
    const slideButtons=document.querySelectorAll(".slideBtn");
    
    slideButtons.forEach(button=>{
        button.addEventListener("click",()=>{
            const direction=button.id==="prev-slide"?-1:1;
            console.log(cardList.clientWidth);
            const scrollAmount=cardList.clientWidth*direction;
            console.log(scrollAmount);
            cardList.scrollBy({left:scrollAmount,behavior:"smooth"})
        })
    })

}

(async() => {
  try{
    await fetch("http://localhost:3000/banner")
    .then((res)=>res.json())
    .then(data=>{
      console.log(data)
      data?.forEach(item=>{
        banner.innerHTML += `
          <img src="${item?.image}" />
        `
      })
      const dotCont = document.querySelector(".pagination_dottes div");
      data.forEach(item=>{
        dotCont.innerHTML+=`
        <div class="pagination_dot"></div>
        `
      })
    })
  } catch(error){
    console.log(error);
  }
})()

  setInterval(()=>{
    banner.scrollBy({left:banner.querySelector('img').clientWidth,behavior:"smooth"})
    
    const dottes = document.querySelectorAll(".pagination_dot");
    dottes.forEach(item=>{

    })
  },2000)

window.addEventListener("load",initSlider);
let bestSellers = [];
let flashSales=[];
/*Products*/
function getProducts(){
    fetch("http://localhost:3000/products")
    .then((res)=>res.json())
    .then((data)=>{
     data.forEach(item=>{
      if(item?.bestSeller){
        bestSellers.push(item);
      }
      if(item?.sale){
        flashSales.push(item)
      }
     })
     repeatProduct(flashSales,bestSellers,data);

     console.log(flashSales.length)
    Allproduct=data;
    })
}
function getCategories(){
  categoryList.innerHTML="";
    fetch("http://localhost:3000/subcategory")
    .then((res)=>res.json())
    .then((data)=>{
     data.forEach(item=>{
      console.log(item)
      categoryList.innerHTML +=`
      <div class="category_cards">
      <img src="${item.icon}" />
      <p class="category_cards_name">${item.name}</p>
    </div>
      `

    })
    })
}
getCategories();
getProducts();

function repeatProduct(flashSales,bestSellers,allItems){
    cardList.innerhtml="";
    bestsellerList.innerHTML="";
    allitems.innerHTML="";
    flashSales.forEach(function(product){
        console.log(product.discountPercentage)
        const newPrice=Math.round(product.price-(product.price*product.discountPercentage/100));
        cardList.innerHTML +=`
        <div class="card ">
        <div class="card_case addtocart">
          <div class="sale_square">
            <p class="sale_square_text">-${Math.round(product.discountPercentage)}%</p>
          </div>
          <div class="card_case_img">
            <img src="${product.thumbnail}" />
          </div>
        </div>
        <div class="card_desc">
          <p class="card_text">${product.title}</p>
          <div class="card_desc_price">
            <p class="product_price">${newPrice}$</p>
            <span class="product_exprice"><strike>${product.price}$</strike></span>
          </div>
        </div>
      </div>
        `;
    });
    bestSellers.forEach(function(product){
      console.log(product)
      bestsellerList.innerHTML +=`
      <div class="card">
      <div class="card_case">
        <div class="card_case_img">
          <img src="${product.thumbnail}" />
        </div>
      </div>
      <div class="card_desc">
        <p class="card_text">${product.title}</p>
        <div class="card_desc_price">
          <p class="product_price">${product.price}$</p>
        </div>
      </div>
    </div>
      `;
    });

    allItems.forEach(function(item){
      const newPrice=Math.round(item.price-(item.price*item.discountPercentage/100));
      allitems.innerHTML+=`
      <div class="card">
      <div class="card_case">
      ${item?.discountPercentage? `
      <div class="sale_square">
        <p class="sale_square_text">-${Math.round(item.discountPercentage)}%</p>
      </div>`:`<div></div>`}
        <div class="card_case_img">
          <img src="${item.thumbnail}" />
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
      `;
    });

}