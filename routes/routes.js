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

// Router to filter for a shoe by brand name
router.get("/brand/:brandname", async (req, res) => {
    const { brandname } = req.params;
    const responsed = await axios.get(API_END_POINT + `/brand/${brandname}`);
    const filteredByBrand = responsed.data;
    if (filteredByBrand) {
        req.flash("success", "Successfully filtered for shoe brand.");
        res.render("index", {
            filteredShoe: filteredByBrand,
        });
    } else {
        req.flash("error", "Shoe not available.");
        res.redirect("/");
    };
});

// Router to filter for a shoe by size
router.get("/brand/size/:size", async (req, res) => {
    const { size } = req.params;
    const responsed = await axios.get(API_END_POINT + `/brand/size/${size}`);
    const filteredBySize = responsed.data;
    if (filteredBySize) {
        req.flash("success", "Successfully filtered for a shoe size.");
        res.render("index", {
            filteredShoe: filteredBySize,
        });
    } else {
        req.flash("error", "Shoe not available.");
        res.redirect("/");
    };
});

// Router to filter for a shoe by brand name and size
router.get("/brand/:brandname/size/:size", async (req, res) => {
    const { brandname, size } = req.params;
    const responsed = await axios.get(API_END_POINT + `/brand/${brandname}/size/${size}`);
    const filteredByBrandAndSize = responsed.data;
    if (filteredByBrandAndSize) {
        req.flash("success", "Successfully filtered for a shoe brand and size.");
        res.render("index", {
            filteredShoe: filteredByBrandAndSize,
        });
    } else {
        req.flash("error", "Shoe not available.");
        res.redirect("/");
    };
});

export default router;