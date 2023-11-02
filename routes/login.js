import { Router } from "express";
import axios from "axios";

// Jsonwebtoken import
import jwt from "jsonwebtoken";

// dotenv/config import
import "dotenv/config"

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
    const loggedInUser = responded.data.token;

    if (loggedInUser) {
        const verify = jwt.verify(loggedInUser, process.env.TOKEN);
        if (verify) {
            // Stored the token in session
            req.session.token = loggedInUser;

            // Display success message to the UI
            req.flash("success", "Logged in successfully.");
            // Get back to the home route
            res.redirect("/");
        } else {
            res.render("login");
        };

    } else if (!loggedInUser) {
        req.flash("error", "Password or email not valid.");
        // Show the log in page
        res.render("login");

    } else {
        // Get the error
        const { error } = responded.data;
        // Display the error message to the UI
        if (error) req.flash("error", `${error}`);

        // Show the log in page
        res.render("login");
    };
});


export default loginRouter;