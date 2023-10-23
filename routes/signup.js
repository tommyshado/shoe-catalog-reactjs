import { Router } from "express";

const signupRouter = Router();

// Login Router
signupRouter.get("/signup", (req, res) => {
    res.render("signup");
});

export default signupRouter;