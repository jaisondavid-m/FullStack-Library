import { db } from "../config/db.js";

export const showBooks = (req,res)=>{
    db.query("SELECT id,book_name,book_price,book_id from book_details",(err,result)=>{
        if(err)
            return res.status(500).json({message:"Server Error"});
        return res.json(result);
    })
}