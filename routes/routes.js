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
    const responded = await axios.post(API_END_POINT, {
        shoeName,
        image,
        qty,
        shoePrice,
        shoeColor,
        shoeSize,
    });
    if (responded.data) {
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
    const responded = await axios.get(API_END_POINT + `/brand/${brandname}`);
    const filteredByBrand = responded.data;
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
    const responded = await axios.get(API_END_POINT + `/brand/size/${size}`);
    const filteredBySize = responded.data;
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
    const responded = await axios.get(API_END_POINT + `/brand/${brandname}/size/${size}`);
    const filteredByBrandAndSize = responded.data;
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

// Router to update shoe stock levels
router.post("/brand/shoes/sold/updateInventory/:id", async (req, res) => {
    const id = req.params.id;
    const updated = await axios.post(API_END_POINT + `/brand/shoes/sold/updateInventory/${id}`);
    if (updated.data) {
        req.flash("success", "Added a shoe to the cart.");
        res.redirect("/");
    } else {
        req.flash("error", "Shoe not added correctly.");
        res.redirect("/");
    };
});

export default router;