import express from "express";
import exphbs from "express-handlebars";
import router from "./routes/routes.js";
import bodyParser from "body-parser";

// APP instance
const app = express();


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
app.use("/api/shoes", router);

// PORT variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 app started at PORT", PORT);
});
