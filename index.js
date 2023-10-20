import express from "express";
import exphbs from "express-handlebars";
import router from "./routes/shoes.js";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import cartRouter from "./routes/cart.js";

// APP instance
const app = express();

// initialise session middleware - flash-express depends on it
app.use(
  session({
    secret: "codeXer",
    resave: false,
    saveUninitialized: true,
  })
);

// initialise the flash middleware
app.use(flash());

// Handlebars view engine
const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");
app.set("views", "./views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Routes Middlewares
app.use("/", router);
app.use("/", cartRouter);

// PORT variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 app started at PORT", PORT);
});
