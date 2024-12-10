

const User = require("../models/user");


exports.addBookToFavourite = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book already in your favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added successfully to favorites" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.removeBookFromFavourite = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }
        return res.status(200).json({ message: "Book removed successfully from favorites" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getFavouriteBooks = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "success",
            data: favouriteBooks,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred" });
    }
};
