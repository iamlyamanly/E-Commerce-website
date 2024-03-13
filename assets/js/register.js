const form = document.querySelector(".crAccount>form");
const registerbtn = document.querySelector(".crAccount_btn");
registerbtn.addEventListener("click", function (e) {
  e.preventDefault();
  formValidate();
  console.log("clicked");
});
function formValidate() {
  const nameRegex = /^[a-z,',-]+(\s)[a-z,',-]+$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //input check
  if (form.Name.value !== "" && nameRegex.test(form.Name.value)) {
    console.log("True name");
  }
  if (form.Email.value !== "" && emailRegex.test(form.Email.value)) {
    console.log("True email");
  }
  if (form.Password.value !== "" && passwordRegex.test(form.Password.value)) {
    console.log("True password");
  }
  if (
    nameRegex.test(form.Name.value) &&
    passwordRegex.test(form.Password.value) &&
    emailRegex.test(form.Email.value)
  ) {

    const person = {
      username: form.Name.value,
      email: form.Email.value,
      password: form.Password.value,
    };
    console.log(person);
    SendData(person);
    form.reset();
  } else {
    console.log("Something went wrong");
  }
}

function SendData(data) {
  fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(() => {
      window.location.href = "../logIn.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
