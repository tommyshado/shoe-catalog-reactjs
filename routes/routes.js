import { Router } from "express";
import axios from "axios";
import "dotenv/config";

// Router instance
const router = Router();


router.get("/", async (req, res) => {
    // GET the shoes from the api
    const shoes = (await axios.get(`${process.env.API_KEY}`)).data;
    // RENDER the shoes in the index page
    res.render("index", {
        shoe: shoes,
    });
});

export default router;