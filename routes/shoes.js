import { Router } from "express";
import axios from "axios";

// Router instance
const router = Router();

// Api endpoint
const shoesAPI = "https://api-for-shoes.onrender.com/api/shoes";

// Router to get the shoes from the database and display the data to the ui
router.get("/", async (req, res) => {
    // GET the shoes from the api
    const shoes = (await axios.get(shoesAPI)).data;
    // RENDER the shoes in the index page
    res.render("index", {
        shoes: shoes.data,
    });
});

router.get("/addShoes", (req, res) => {
    res.render("addShoes");
});

// Router to insert a shoe into the ui and database
router.post("/addShoes", async (req, res) => {
    const { shoeName, image, description, ageGroup, qty, shoePrice, shoeColor, shoeSize } = req.body;
    const responded = await axios.post(shoesAPI, {
        shoeName,
        description,
        ageGroup,
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
router.get("/shoe/:brandname", (req, res) => {
    res.render("shoe");
});

router.get("/brand/:brandname", async (req, res) => {
    const brandname = req.params.brandname;

    if (brandname) {
        const responded = await axios.get(shoesAPI + `/brand/${brandname}`, {
            brandname
        });
        const filteredByBrand = responded.data;

        if (filteredByBrand) {
            req.flash("success", "Successfully filtered for shoe brand.");
            res.render("index", {
                shoes: filteredByBrand.data,
                brand: brandname
            });
        } else {
            req.flash("error", "Shoe not available.");
            res.redirect("/");
        };
    } else {
        res.redirect("/");
    };
});

router.post("/brand", async (req, res) => {
    const { brandname } = req.body;

    if (brandname) {
        const responded = await axios.post(shoesAPI + `/brand/${brandname}`, {
            brandname
        });
        const filteredByBrand = responded.data;

        if (filteredByBrand) {
            req.flash("success", "Successfully filtered for shoe brand.");
            res.render("index", {
                shoes: filteredByBrand.data,
                brand: brandname
            });
        } else {
            req.flash("error", "Shoe not available.");
            res.redirect("/");
        };
    } else {
        res.redirect("/");
    };
});

// Router to filter for a shoe by size
router.get("/brand/size/:size", async (req, res) => {
    const { size } = req.params;
    const responded = await axios.get(shoesAPI + `/brand/size/${size}`);
    const filteredBySize = responded.data;

    if (filteredBySize) {
        req.flash("success", "Successfully filtered for a shoe size.");
        res.render("index", {
            shoes: filteredBySize.data,
        });
    } else {
        req.flash("error", "Shoe not available.");
        res.redirect("/");
    };
});

// Router to filter for a shoe by brand name and size
router.get("/brand/:brandname/size/:size", async (req, res) => {
    const { brandname, size } = req.params;
    const responded = await axios.get(shoesAPI + `/brand/${brandname}/size/${size}`);
    const filteredByBrandAndSize = responded.data;

    if (filteredByBrandAndSize) {
        req.flash("success", "Successfully filtered for a shoe brand and size.");
        res.render("index", {
            shoes: filteredByBrandAndSize.data,
        });
    } else {
        req.flash("error", "Shoe not available.");
        res.redirect("/");
    };
});

// Routers to filter by colors
router.get("/brand/color/:color", async (req, res) => {
    const color = req.params.color;
    const responded = await axios.get(shoesAPI + `/brand/color/${color}`);
    const filtered = responded.data
    if (filtered) {
        req.flash("success", "Successfully filtered by color.");
        res.render("index", {
            shoes: filtered.data
        });
    };
});

router.get("/brand/:brandname/color/:color", async (req, res) => {
    const { brandname, color } = req.params;
    const responded = await axios.get(shoesAPI + `/brand/${brandname}/color/${color}`);
    const filtered = responded.data;

    if (filtered) {
        req.flash("success", "Successfully filtered by color and brand.");
        res.render("index", {
            shoes: filtered.data
        });
    };
});

router.get("/brand/:brandname/color/:color/size/:size", async (req, res) => {
    const { brandname, color, size } = req.params;
    const responded = await axios.get(shoesAPI + `/brand/${brandname}/color/${color}/size/${size}`);
    const filtered = responded.data;

    if (filtered) {
        req.flash("success", "Successfully filtered by color.");
        res.render("index", {
            shoes: filtered.data
        });
    };
});

router.get("/brand/catagory/:men", async (req, res) => {
    const { men } = req.params;
    const responded = (await axios.get(shoesAPI + `/brand/catagory/${men}`)).data.data;

    if (responded) {
        req.flash("success", "Successfully filtered by catagory.");
        res.render("index", {
            shoes: responded
        });
    }
});

router.get("/brand/catagory/:men", async (req, res) => {
    const { women } = req.params;
    const responded = (await axios.get(shoesAPI + `/brand/catagory/${women}`)).data.data;

    if (responded) {
        req.flash("success", "Successfully filtered by catagory.");
        res.render("index", {
            shoes: responded
        });
    }
});

router.get("/brand/catagory/:men", async (req, res) => {
    const { kids } = req.params;
    const responded = (await axios.get(shoesAPI + `/brand/catagory/${kids}`)).data.data;

    if (responded) {
        req.flash("success", "Successfully filtered by catagory.");
        res.render("index", {
            shoes: responded
        });
    }
});

export default router;