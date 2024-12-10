// const router = require("express").Router();
// const User = require("../models/user");

// const {authentificationToken}=require("./userAuth")
// router.put("/add-book-to-favourite",authentificationToken,async(req,res)=>{
//     try{

//         const  {bookid,id}=req.headers
//         const userData=await User.findById(id);
//         const isBookFavorie=userData.favourites.includes(bookid)
//         if(isBookFavorie)
//         {
//             return res.status(200).json({message:"Book already in your favourites"})
//         }
//         await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
//         return res.status(200).json({message:"Book added successfully to favorites"})
//     }catch(error){
//         res.status(500).json({message:"Internal Server"})
//     }
// })

// router.put("/remove-book-from-favourite",authentificationToken,async(req,res)=>{
//     try{

//         const  {bookid,id}=req.headers
//         const userData=await User.findById(id);
//         const isBookFavorie=userData.favourites.includes(bookid)
//         if(isBookFavorie)
//         {
//             await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
//         }
       
//         return res.status(200).json({message:"Book removed successfully from favorites"})
//     }catch(error){
//         res.status(500).json({message:"Internal Server"})
//     }
// })
// router.get("/get-favourite-books",authentificationToken,async(req,res)=>{
//     try{
//         const  {id}=req.headers
//         const userData=await User.findById(id).populate("favourites")
//         const favouriteBooks=userData.favourites;
//         return res.json({
//             status:"sucess",
//             data:favouriteBooks,
//         })
        
//     }catch(error){
//        return res.status(500).json({message:"err occurred"})
//     }
 
// })

// module.exports=router
// routes/favouriteRoutes.js

const router = require("express").Router();
const { authentificationToken } = require("./userAuth");
const favouriteController = require("../controllers/favouriteController");

router.put("/add-book-to-favourite", authentificationToken, favouriteController.addBookToFavourite);
router.put("/remove-book-from-favourite", authentificationToken, favouriteController.removeBookFromFavourite);
router.get("/get-favourite-books", authentificationToken, favouriteController.getFavouriteBooks);

module.exports = router;
