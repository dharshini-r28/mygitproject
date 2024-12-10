const jwt=require("jsonwebtoken")
const authentificationToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];
    if(token==null)
    {
        return res.status(401).json({message:"Token not provided"})
    }
    jwt.verify(token,"bookstore",(err,user)=>{
        if(err)
        {
            return res.status(401).json("Token expired sign in again")
        }
        req.user=user;
        next();
    })
}
module.exports={authentificationToken}
// const jwt = require("jsonwebtoken");

// const authenticationToken = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (token == null) {
//         return res.status(401).json({ message: "Token not provided" });
//     }

//     jwt.verify(token, "bookstore", (err, user) => {
//         if (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res.status(401).json({ message: "Token expired. Please sign in again." });
//             }
//             return res.status(401).json({ message: "Invalid token" });
//         }

//         req.user = user;
//         next();
//     });
// }

//module.exports = { authenticationToken };
