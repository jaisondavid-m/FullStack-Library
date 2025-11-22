import { db } from "../config/db.js";

export const AddBooks = (req,res)=>{
    const {book_name,book_price,no_of_books,book_id} = req.body;

    const sql = "INSERT INTO book_details (book_name,book_price,no_of_books,book_id) VALUES (?,?,?,?)"

    db.query(sql,[book_name,book_price,no_of_books,book_id],(err)=>{
        if(err) return res.status(500).json(err);
        res.json({ message: "Book Added Successfully" })
    })
}

export const showBooksAdmin = (req,res)=>{
    db.query("SELECT id,book_name,book_price,no_of_books,book_id FROM book_details",(err,result)=>{
        if(err)
            return res.status(500).json({message:"Server Error"});
        return res.json(result);
    })
}