import { Router } from "express";
import axios from "axios";


// Login Router instance
const loginRouter = Router();

// Api endpoint
const loginAPI = "https://api-for-shoes.onrender.com/api/user";

// Login Router
loginRouter.get("/login", async (req, res) => {
    // Render the login page
    res.render("login");
});

// Login Router
loginRouter.post("/login", async (req, res) => {
    // Get the user data
    const { name, email, password } = req.body;
    
    // Send the data into the API
    const responded = await axios.post(loginAPI + "/login", {
        name,
        email,
        password
    });

    res.redirect("/");
});


export default loginRouter;