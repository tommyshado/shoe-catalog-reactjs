import { Router } from "express";
import axios from "axios";

// Router instance
const router = Router();


router.get("/", async (req, res) => {
    // GET the shoes from the api
    const shoes = (await axios.get("https://api-for-shoes.onrender.com/api/shoes")).data;
    // RENDER the shoes in the index page
    res.render("index", {
        shoe: shoes,
    });
});

export default router;