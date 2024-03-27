const staff=document.querySelector(".staff")

const otherslidr = () => {
    const slideButtons = document.querySelectorAll(".slideBtn");
  
    slideButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.id === "prev-slide" ? -1 : 1;
        //console.log(allitems.clientWidth);
        const scrollAmount = staff.clientWidth * direction;
        //console.log(scrollAmount);
        staff.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });
  };
  otherslidr();