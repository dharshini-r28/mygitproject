

const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");


exports.placeOrder = async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }

        return res.json({
            status: "success",
            message: "Order placed successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred" });
    }
};


exports.getOrderHistory = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {
                path: "book",
            },
        });

        const orderData = userData.orders.reverse();

        return res.json({
            status: "success",
            data: orderData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred" });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("book")
            .populate("user")
            .sort({ createdAt: -1 });

        return res.json({
            status: "success",
            data: orders,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred" });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({
            status: "success",
            message: "Order status updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred" });
    }
};


// exports.deleteOrder = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const order = await Order.findById(id);

//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         await User.findByIdAndUpdate(order.user, {
//             $pull: { orders: id },
//         });

//         await User.findByIdAndUpdate(order.user, {
//             $push: { cart: order.book },
//         });

//         await Order.findByIdAndDelete(id);

//         return res.json({
//             status: "success",
//             message: "Order deleted successfully",
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Error occurred" });
//     }
// };
