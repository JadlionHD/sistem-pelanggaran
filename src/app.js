require("dotenv").config();

const Server = require("./structures/Server.js");
const server = new Server();

server.init();
