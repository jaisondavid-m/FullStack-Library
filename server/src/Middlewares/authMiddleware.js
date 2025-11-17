    import dotenv from "dotenv"
    dotenv.config()
    import jwt from "jsonwebtoken";


    export const verifyToken = (req,res,next)=>{
        const token = req.headers["authorization"]

        if(!token){
            return res.status(403).json({message:"Token Reqiured"})
        }
        try{
            const decoded = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET)
            req.user=decoded; //used to store the data 
            next();
        }
        catch(err){
            return res.status(401).json({ message: "Invalid or Expired Token" });
        }
    }
    export const authorizeRoles = (...roles)=>{
        
        return (req, res, next) => {

            if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Unauthorized Role" });
            }

            next();
        };
    }