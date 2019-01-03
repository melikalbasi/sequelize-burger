// Require npm packages
var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

var app = express();

var db = require("./models")

// Serve static content for the app from public directory
app.use(express.static("public"));

// Parse application body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    // Log server-side when our server has started
    console.log("Server is listening on: http://localhost:" + PORT);
  });
});