

const User = require("../models/user");


exports.addToCart = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.json({
                status: "success",
                message: "Book is already in cart",
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid },
        });
        return res.json({
            status: "success",
            message: "Book added to cart",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occurred" });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid },
        });
        return res.json({
            status: "success",
            message: "Book removed from cart",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred" });
    }
};


exports.getUserCart = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status: "success",
            data: cart,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred" });
    }
};
