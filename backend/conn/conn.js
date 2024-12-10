const mongoose=require('mongoose')
const conn=async()=>{
   try{
    await mongoose.connect('mongodb+srv://2dharshini82004:2dharshini82004@cluster0.grwbibo.mongodb.net/bookstore')
    console.log("connected to db")
   }catch(err){
    console.error('failed to connect',err);
   }
}
conn()