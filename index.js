// import all required library
const express = require("express");
const app = express();
const logger = require("morgan");
const router = require("./src/index");
const fileUpload = require("express-fileupload");
//
const bodyParser = require("body-parser");
const keys = require("./src/config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const exphbs = require("express-handlebars");
//
const cors = require("cors");
require("dotenv/config");

//PAYMENT

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get("/premium", (req, res) => {
  res.render("index", {
    stripePublishableKey: keys.stripePublishableKey
  });
});

// Charge Route
app.post("/charge", (req, res) => {
  // const amount = 2500;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount: 704,
        description: "Premium Account AyoTest App",
        currency: "usd",
        customer: customer.id
      })
    )
    .then(charge => res.render("success"));
});

//END PAYMENT

// use the library
let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(fileUpload());

// port setting
const port = process.env.SERVER_PORT;

// image
app.use(express.static(__dirname + "/uploads/admin"));
app.use(express.static(__dirname + "/uploads/users"));
app.use(express.static(__dirname + "/views"));

// parent route
app.use("/api", router);

// listening to port
app.listen(port, () => {
  console.log("listening to port " + port);
});

// page not found handler
app.get("*", (req, res) => {
  console.log("404 not found");
});
