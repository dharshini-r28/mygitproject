// const router = require("express").Router();
// const User = require("../models/user");
// const Book = require("../models/book");
// const jwt=require("jsonwebtoken")
// const {authentificationToken}=require("./userAuth")
// router.post("/add-book",authentificationToken,async(req,res)=>{

//     try{
//         const {id}=req.headers;
//       const user= await User.findById(id)
//       if(user.role!=="admin"){
//         return res.status(400).json("Access denied this is can only be accessed by admin")
//       }
//         const book=new Book({
//             url:req.body.url,
//             title:req.body.title,
//             author:req.body.author,
//             price:req.body.price,
//            desc:req.body.desc,
//             language:req.body.language
            

//         })
//  await book.save();
//  res.status(200).json({ message: "Book added successfully" });
//     }catch(err){
//         res.status(500).json({ message: "Internal error" });
//     }
// })
// router.put('/update-book',authentificationToken,async(req, res)=>{
//     try{

//         const {bookid}=req.headers;
//         await Book.findByIdAndUpdate(bookid,{
//             url:req.body.url,
//             title:req.body.title,
//             author:req.body.author,
//             price:req.body.price,
//            desc:req.body.desc,
//             language:req.body.language
//         })
//         res.status(200).json({ message: "Book updated successfully" });
//     }catch(error){
//         res.status(500).json({ message: "err occurred" });
//         console.error(error)
//     }
// })

// router.delete('/delete-book',authentificationToken,async(req,res)=>{
//     try{
//         const {bookid}=req.headers;
//         await Book.findByIdAndDelete(bookid)
//         return res.status(200).json({ message: "Book deleted successfully" });
//     }catch(error){
//         res.status(500).json({ message: "err occurred" });
//         console.error(error)
//     }
// })
// router.get('/get-all-books',async(req,res)=>{
//     try{
//         const books=await Book.find().sort({createdAt:-1});
//         return res.json({
//             status:"Success",
//             data:books,
//         });
//     }catch(error){
//         return res.status(500).json({ message: "err occurred" });
//         console.error(error)
//     }
// })
// router.get('/get-recent-books',async(req,res)=>{
//     try{
//         const books=await Book.find().sort({createdAt:-1}).limit(4);
//         return res.json({
//             status:"Success four books",
//             data:books,
//         });
//     }catch(error){
//         return res.status(500).json({ message: "err occurred" });
//         console.error(error)
//     }
// })

// router.get('/get-book-by-id/:id',async(req,res)=>{
//     try{
//         const { id } = req.params;
//         const book=await Book.findById(id);
//         return res.json({
//             status:"Success",
//             data:book,})
//     }catch(error){
//         return res.status(500).json({ message: "err occurred" });
//         console.error(error)
//     }
// })
// module.exports=router;
// routes/bookRoutes.js

const router = require("express").Router();
const { authentificationToken } = require("./userAuth");
const bookController = require("../controllers/bookController");

router.post("/add-book", authentificationToken, bookController.addBook);
router.put("/update-book", authentificationToken, bookController.updateBook);
router.delete("/delete-book", authentificationToken, bookController.deleteBook);
router.get("/get-all-books", bookController.getAllBooks);
router.get("/get-recent-books", bookController.getRecentBooks);
router.get("/get-book-by-id/:id", bookController.getBookById);

module.exports = router;
