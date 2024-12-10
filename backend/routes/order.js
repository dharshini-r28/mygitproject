// const router = require("express").Router();
// const User = require("../models/user");
// const Book = require("../models/book");
// const Order = require("../models/order");
// const {authentificationToken}=require("./userAuth")
// router.post("/place-order",authentificationToken,async(req,res)=>{
//     try{
//         const {id}=req.headers;
//         const {order}=req.body;
//         for(const orderData of order){
//             const newOrder=new Order({user:id,book:orderData._id})
//             const orderDataFromDd=await newOrder.save()
//             await User.findByIdAndUpdate(id,{
//                 $push:{orders:orderDataFromDd._id},
//             })
//             await User.findByIdAndUpdate(id,{
//                 $pull:{cart:orderData._id},
//             })
//         }
//         return res.json({
//             status:"success",
//             message:"Order placed successfully"
//         })

//     }catch(error){
//         console.error(error)
//         return res.status(500).json({message:"err occurred"})
//     }
// })
// router.get("/get-order-history",authentificationToken,async(req,res)=>{
//     try{
//         const {id}=req.headers;
//         const userData=await User.findById(id).populate({
//             path:"orders",
//             populate:{
//                 path:"book",
//                 //select:"title price"
//             }
//         })
//         const orderData=userData.orders.reverse()
//         return res.json({
//             status:"success",
//             //message:"Order history fetched successfully",
//             data:orderData
//         })
//     }catch(error){
//         console.error(error)
//         return res.status(500).json({message:"err occurred"})
//     }
// })
// router.get('/get-all-orders',authentificationToken,async(req,res)=>{
//    try{
//     const userData=await Order.find().populate({
//         path:"book",
//     }).populate({
//         path:"user",
//     }).sort({createdAt:-1});
//     return res.json({
//         status:"success",
//         data:userData
//     })
//    }catch(error){
//     console.error(error)
//     return res.status(500).json({message:"err occurred"})
//    }
// })
// router.put("/update-status/:id",authentificationToken,async(req,res)=>{
//     try{
//         const {id}=req.params;
//         await Order.findByIdAndUpdate(id,{status:req.body.status});
//         return res.json({
//             status:"success",
//             message:"Order status updated successfully"
//         })
//     }catch(error){
//         console.error(error)
//         return res.status(500).json({message:"err occurred"})
//     }
// })
// router.delete("/delete-order/:id", authentificationToken, async (req, res) => {
//     try {
//         const { id } = req.params;
       
//         const order = await Order.findById(id);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }
        
        
//         await User.findByIdAndUpdate(order.user, {
//             $pull: { orders: id },
//         });

        
//         const book = order.book;
//         await User.findByIdAndUpdate(order.user, {
//             $push: { cart: book },
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
// });

// module.exports=router
// routes/orderRoutes.js

const router = require("express").Router();
const { authentificationToken } = require("./userAuth");
const orderController = require("../controllers/orderController");

router.post("/place-order", authentificationToken, orderController.placeOrder);
router.get("/get-order-history", authentificationToken, orderController.getOrderHistory);
router.get("/get-all-orders", authentificationToken, orderController.getAllOrders);
router.put("/update-status/:id", authentificationToken, orderController.updateOrderStatus);
//router.delete("/delete-order/:id", authentificationToken, orderController.deleteOrder);

module.exports = router;
