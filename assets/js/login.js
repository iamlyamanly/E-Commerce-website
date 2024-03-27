const login=document.querySelector(".login");
const Email=document.querySelector(".email");
const Password=document.querySelector(".password");

login.addEventListener("click",()=>{
  account();
})

function account(){
    console.log("gfhgfh")
    fetch("http://localhost:3000/users")
    .then((response)=>response.json())
    .then((data)=>{
        data.forEach((person)=>{
            if(person.email=== Email.value && person.password===Password.value ){
                window.location.href="./index.html";
                console.log(person)
                localStorage.setItem('user',JSON.stringify(person));
            }else{
                window.location.href="404.html"
            }
            
        });
    })
}
