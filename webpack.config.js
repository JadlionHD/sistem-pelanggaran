const path = require("path");

// TERAKHIR DISINI
module.exports = {
  mode: "production",
  entry: "./src/resources/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "src/public/script")
  }
};
