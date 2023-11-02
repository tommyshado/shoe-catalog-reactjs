import { Router } from "express";
import axios from "axios";

// Api endpoint
const cartAPI = "https://api-for-shoes.onrender.com/api/cart";

// Router instance
const cartRouter = Router();


// Router to get the shoes added to the shopping cart
cartRouter.get("/", async (req, res) => {
    const headers = {
        "Content-Type": "application/json",
        "auth-token": req.session.token
    };
    const data = (await axios.get(cartAPI),
    {
        headers: headers,
    }).data;

    const { error } = data;
    if (error) {
        req.flash("error", `${error}`);
        res.redirect("/signup");
    };

    // GET cart and total
    const cart = data.cart;
    const total = data.total;

    res.render("cart", {
        cart: cart,
        cartTotal: total
    });
});

cartRouter.post("/shoeId/:shoeId/add", async (req, res) => {
    const headers = {
        "Content-Type": "application/json",
        "auth-token": req.session.token
    };
    
    if (!headers["auth-token"]) {
        req.flash("error", "Log in please.");
        res.redirect("/login");
    };

    const { shoeId } = req.params;
    const addToCart = (
        await axios.post(
            cartAPI + `/shoeId/${shoeId}/add`,
            {},
            {
                headers: headers,
            }
        )
    ).data;

    if (addToCart.status === "success") {
        req.flash("success", "Added to the cart.");
        res.redirect("/");
    };
});

cartRouter.post("/shoeId/:shoeId/remove", async (req, res) => {
    const headers = {
        "Content-Type": "application/json",
        "auth-token": req.session.token
    };

    if (!headers["auth-token"]) {
        req.flash("error", "Log in please.");
        res.redirect("/login");
    };
    
    const { shoeId } = req.params;
    const removeFromCart = (
        await axios.post(
            cartAPI + `/shoeId/${shoeId}/remove`,
            {},
            {
                headers: headers,
            }
        )
    ).data;

    if (removeFromCart.status === "success") {
        req.flash("success", "Decreased the quantity.");
        res.redirect("/");
    };
});

cartRouter.post("/removeAShoe", async (req, res) => {
    const headers = {
        "Content-Type": "application/json",
        "auth-token": req.session.token
    };

    if (!headers["auth-token"]) {
        req.flash("error", "Log in please.");
        res.redirect("/login");
    };

    const clearCart = (
        await axios.post(
            cartAPI + `/removeAShoe`,
            {},
            {
                headers: headers,
            }
        )
    ).data;

    if (clearCart.status === "success") {
        req.flash("success", "Removed shoes in the cart.");
        res.redirect("/");
    };
});

cartRouter.post("/payment", async (req, res) => {
    const headers = {
        "Content-Type": "application/json",
        "auth-token": req.session.token
    };

    if (!headers["auth-token"]) {
        req.flash("error", "Log in please.");
        res.redirect("/login");
    };

    const { payment } = req.body;
    const checkOut = (
        await axios.post(
            cartAPI + `/payment`,
            {
                payment,
            },
            {
                headers: headers,
            }
        )
    ).data;

    const { error } = checkOut;
    if (error) {
        req.flash("error", `${error}`);
        res.redirect("/");
    };

    if (checkOut.status === "success") {
        req.flash("success", "Successfully made a payment.");
        res.redirect("/");
    };
});

export default cartRouter;
