import { Router } from "express";
import axios from "axios";

// Api endpoint
const cartAPI = "https://api-for-shoes.onrender.com/api/cart";

// Router instance
const cartRouter = Router();

// Router to get the shoes added to the shopping cart
cartRouter.get("/username/:username", async (req, res) => {
    const username = req.params.username;
    const data = (await axios.get(cartAPI + `/username/${username}`)).data;

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
    const addToCart = (await axios.post(cartAPI + `/username/${username}/shoeId/${shoeId}/add`)).data;

    if (addToCart.status === "success") {
        req.flash("success", "Increased the quantity.");
        res.redirect(`/username/${username}`);
    };
});

cartRouter.post("/username/:username/shoeId/:shoeId/remove", async (req, res) => {
    const { username, shoeId } = req.params;
    const removeFromCart = (await axios.post(cartAPI + `/username/${username}/shoeId/${shoeId}/remove`)).data;

    if (removeFromCart.status === "success") {
        req.flash("success", "Decreased the quantity.");
        res.redirect(`/username/${username}`);
    };
});

cartRouter.post("/username/:username/clear", async (req, res) => {
    const { username } = req.params;
    const clearCart = (await axios.post(cartAPI + `/username/${username}/clear`)).data;

    if (clearCart.status === "success") {
        req.flash("success", "Removed shoes in the cart.");
        res.redirect(`/username/${username}`);
    };
});

cartRouter.post("/username/:username/payment", async (req, res) => {
    const { username } = req.params;
    const { payment } = req.body;
    const checkOut = (await axios.post(cartAPI + `/username/${username}/payment`, {
        payment
    })).data;

    const { error } = checkOut;
    if (error) {
        req.flash("error", `${error}`);
        res.redirect(`/username/${username}`);
    };

    if (checkOut.status === "success") {
        req.flash("success", "Successfully made a payment.");
        res.redirect(`/username/${username}`);
    };
});

export default cartRouter;
