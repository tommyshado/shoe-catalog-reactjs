import { Router } from "express";

// Router instance
const router = Router();


router.get("/", (req, res) => {
    res.render("index");
});

export default router;