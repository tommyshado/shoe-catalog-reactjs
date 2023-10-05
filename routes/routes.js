import { Router } from "express";
import axios from "axios";
import "dotenv/config";

// Router instance
const router = Router();

// Api endpoint
const API_END_POINT = "https://api-for-shoes.onrender.com/api/shoes";

// Router to get the shoes from the database and display the data to the ui
router.get("/", async (req, res) => {
    // GET the shoes from the api
    const shoes = (await axios.get(API_END_POINT)).data;
    // RENDER the shoes in the index page
    res.render("index", {
        shoe: shoes,
    });
});

router.get("/addShoes", (req, res) => {
    res.render("addShoes");
});

// Router to insert a shoe into the ui and database
router.post("/addShoes", async (req, res) => {
    const { shoeName, image, qty, shoePrice, shoeColor, shoeSize } = req.body;
    const responsed = await axios.post(API_END_POINT, {
        shoeName,
        image,
        qty,
        shoePrice,
        shoeColor,
        shoeSize,
    });
    if (responsed.data) {
        req.flash("success", "Added a shoe successfully.");
        res.redirect("/");
    } else {
        req.flash("error", "Not added a shoe successfully.");
        res.redirect("/addShoes");
    };
});

export default router;