const checkSelectLogin = require("./app/checkSelectLogin.js");

document.querySelector("#sebagai").addEventListener("change", (ev) => {
  var aa = document.querySelector("#sebagai");
  checkSelectLogin(aa);
  console.log(aa.value);
});
