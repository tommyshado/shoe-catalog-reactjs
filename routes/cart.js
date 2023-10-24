import { Router } from "express";
import axios from "axios";

// Api endpoint
const cartAPI = "https://api-for-shoes.onrender.com/api/cart";

// Router instance
const cartRouter = Router();

// Header
const headers = {
    'Content-Type': 'application/json',
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlbmRhbmlAZ21haWwuY29tIiwiaWF0IjoxNjk4MTY3NTMxfQ.EuI53PxGOBOhonRzkQ7aA4qys7X0yLT9zRzHXgg39g8'
};

// Router to get the shoes added to the shopping cart
cartRouter.get("/username/:username", async (req, res) => {
    const username = req.params.username;
    const data = (await axios.get(cartAPI + `/username/${username}`, {
        headers: headers
    })).data;

    // GET cart and total
    const cart = data.cart;
    const total = data.total;

    // Loop over the length of the cart variable then...
    for (const basket in cart) {
        // CREATE a username key and... 
        // SET the username key with the username value from the params
        cart[basket].username = username;
    };

    res.render("cart", {
        cart: cart,
        cartTotal: total,
        username: username
    });
});

cartRouter.post("/username/:username/shoeId/:shoeId/add", async (req, res) => {
    const { username, shoeId } = req.params;
    const addToCart = (await axios.post(cartAPI + `/username/${username}/${shoeId}/add`, {
        headers: headers
    })).data;
    if (addToCart.status === "success") req.flash("success", "Added to the cart.");
});

cartRouter.post("/username/:username/shoeId/:shoeId/remove", async (req, res) => {
    const { username, shoeId } = req.params;
    const removeFromCart = (await axios.post(cartAPI + `/username/${username}/${shoeId}/remove`, {
        headers: headers
    })).data;
    if (removeFromCart.status === "success") req.flash("success", "Removed from the cart.");
});

export default cartRouter;
