import { Router } from "express";
import axios from "axios";

// Api endpoint
const cartAPI = "https://api-for-shoes.onrender.com/api/cart";

// Router instance
const cartRouter = Router();

// Router to get the shoes added to the shopping cart
cartRouter.get("/username/:username", async (req, res) => {
    const username = req.params.username;
    const cart = (await axios.get(cartAPI + `/username/${username}`)).data.cart;
    res.render("cart", {
        cart: cart,
        username: username
    });
});

cartRouter.post("/username/:username/shoeId/:shoeId/add", async (req, res) => {
    const { username, shoeId } = req.params;
    const addToCart = (await axios.post(cartAPI + `/username/${username}/${shoeId}/add`)).data;
    if (addToCart.status === "success") req.flash("success", "Added to the cart.");
});

cartRouter.post("/username/:username/shoeId/:shoeId/remove", async (req, res) => {
    const { username, shoeId } = req.params;
    const removeFromCart = (await axios.post(cartAPI + `/username/${username}/${shoeId}/remove`)).data;
    if (removeFromCart.status === "success") req.flash("success", "Removed from the cart.");
});

export default cartRouter;
