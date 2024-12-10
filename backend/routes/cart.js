// const router = require("express").Router();
// const User = require("../models/user");

// const {authentificationToken}=require("./userAuth")
// router.put("/add-to-cart",authentificationToken,async(req,res)=>{
//     try{
//         const {bookid,id}=req.headers;
//         const userData=await User.findById(id);
//         const isBookInCart=userData.cart.includes(bookid);
//         if(isBookInCart){
//             return res.json({
//                 status:"sucess",message:"Book is already in cart",
//             })
//         }
//         await User.findByIdAndUpdate(id,{
//             $push:{cart:bookid},
//         })
//         return res.json({
//             status:"success",message:"Book added to cart",
//         })
//     }catch(err){
//          console.error(err)
//          return res.status(500).json({message:"err occurred"})
//     }
// })
// router.put("/remove-from-cart/:bookid",authentificationToken,async(req,res)=>{
//     try{
//         const {bookid}=req.params;
//         const {id}=req.headers;
//         await User.findByIdAndUpdate(id,{
//             $pull:{cart:bookid},
//         })
//         return res.json({
//             status:"success",message:"Book removed from cart",
//         })
//     }catch(error){
//         console.error(error)
//         return res.status(500).json({message:"err occurred"})
//     }
// })
// router.get("/get-user-cart",authentificationToken,async(req,res)=>{
//     try{
//         const {id}=req.headers;
//         const userData=await User.findById(id).populate("cart");
//         const cart=userData.cart.reverse();
//         return res.json({status:"success",data:cart,})
        
//     }catch(error){
//         console.error(error)
//         return res.status(500).json({message:"err occurred"})
//     }
// })
// module.exports=router

// routes/cartRoutes.js

const router = require("express").Router();
const { authentificationToken } = require("./userAuth");
const cartController = require("../controllers/cartController");

router.put("/add-to-cart", authentificationToken, cartController.addToCart);
router.put("/remove-from-cart/:bookid", authentificationToken, cartController.removeFromCart);
router.get("/get-user-cart", authentificationToken, cartController.getUserCart);

module.exports = router;
