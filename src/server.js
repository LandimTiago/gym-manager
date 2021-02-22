const express = require("express");
const nunjucks = require("nunjucks");
const methodOverride = require("method-override");

const routes = require("./routes");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(methodOverride("_method")); //tem que ser primeiro que o routes para sobrescrever os metodos
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("src/app/view", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5000, function () {
  console.log("server is runing");
});
