const road=document.querySelector(".roadmap>p");
const map=activePage.substring(activePage.lastIndexOf('/')+1).split(".")
const pagename=map[0].charAt(0).toUpperCase() + map[0].slice(1);
console.log(road.innerHTML=`Home/<span>${pagename}</span>`);