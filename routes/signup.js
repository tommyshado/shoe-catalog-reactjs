import { Router } from "express";
import axios from "axios";

// Router instance
const signupRouter = Router();

// Api endpoint
const signupAPI = "https://api-for-shoes.onrender.com/api/user";

// Login Router
signupRouter.get("/signup", (req, res) => {
    res.render("signup");
})

signupRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const responded = await axios.post(signupAPI + "/signup", {
        name,
        email,
        password
    });
    const { error } = responded.data;
    if (error) {
        req.flash("error", `${error}`);
        res.render("signup");
    };

    const signUpUser = responded.data;
    if (signUpUser.status === "success") res.redirect("/login");
});

export default signupRouter;