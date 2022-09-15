function checkSelectLogin(ev) {
  const passInp = document.querySelector("input#password");

  const userInp = document.querySelector("input#username");

  if (ev.value === "4") {
    userInp.placeholder = "NIS";
    passInp.name = "tgl_lahir";

    userInp.type = "number";
    passInp.type = "date";
  } else {
    userInp.placeholder = "Username";
    passInp.name = "Password";

    userInp.type = "text";
    passInp.type = "password";
  }
  return;
}

module.exports = checkSelectLogin;
