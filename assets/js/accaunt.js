const user = JSON.parse(localStorage.getItem("user"));
console.log(user.name);
const getUserData = () => {
  if (user) {
    document.querySelector("input[name='name']").value = user.name;
    document.querySelector("input[name='Lname']").value = user.surname;
    document.querySelector("input[name='email']").value = user.email;
    document.querySelector("input[name='address']").value = user.address;
  }
};
getUserData();

document.querySelector('.cancel').addEventListener("click",()=>{
    getUserData();
})

function sendChanges() {
  const password = document.querySelector("input[name='crpassword']").value;
  if (password !== user.password) {
    return alert("Please enter correct password");
  }
  const newPassword = document.querySelector("input[name='cnpassword']").value;

  const data = {
    name: document.querySelector("input[name='name']").value,
    surname: document.querySelector("input[name='Lname']").value,
    username:
      document.querySelector("input[name='name']").value +
      " " +
      document.querySelector("input[name='Lname']").value,
    email: document.querySelector("input[name='email']").value,
    address: document.querySelector("input[name='address']").value,
  };
  if (newPassword) {
    Object.assign(data, { password: newPassword });
  }

  fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
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

document.querySelector(".saveChangesbtn").addEventListener("click", () => {
  sendChanges();
});
