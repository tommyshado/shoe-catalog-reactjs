import { Router } from "express";
import axios from "axios";
import "dotenv/config";

// Router instance
const router = Router();

// Api endpoint
const API_END_POINT = process.env.API_END_POINT;

// Router to get the shoes from the database and display the data to the ui
router.get("/", async (req, res) => {
    // GET the shoes from the api
    const shoes = (await axios.get(`${API_END_POINT}`)).data;
    // RENDER the shoes in the index page
    res.render("index", {
        shoe: shoes,
    });
});

router.get("/addShoes", (req, res) => {
    res.render("addShoe");
});

// Router to insert a shoe into the ui and database
router.post("/addShoes", async (req, res) => {
    const { shoeName, image, qty, shoePrice, shoeColor, shoeSize } = req.body;
    const responsed = await axios.post(`${API_END_POINT}`, {
        shoeName,
        image,
        qty,
        shoePrice,
        shoeColor,
        shoeSize,
    });
    res.send(responsed.data);
});

export default router;