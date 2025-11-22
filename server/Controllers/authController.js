import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config()


export const Login = async (req,res)=>{
    const {userid,password}=req.body;
    db.query("SELECT * FROM users_details WHERE userid = ?",[userid],async (err,result)=>{
        if(err)
            return res.status(500).json({message:"Server Error"})
        if(result.length===0){
            return res.status(401).json({message:"User ID not Found"})
        }
        const user=result[0];
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Password Incorrect"});
        }
        const token = jwt.sign({userid: user.userid, role: user.role,name: user.name},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRE })
        
        // return res.status(200).json({message:"Successfully Logged In",username: user.name,userid: user.userid,role: user.role}) withouttoken
        return res.status(200).json({message:"Login Successfully",token,userid: user.userid,role: user.role,name: user.name})
    })
}

export const Register = async (req,res)=>{
    const {name,userid,password}=req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    db.query("SELECT * FROM users_details WHERE userid = ?",[userid],(err,result)=>{
        if(err)
            return res.status(500).json({message:"Server Error"})
        if(result.length>0){
            return res.status(400).json({message:"User already exists"})
        }
        const role = 'user'
        db.query("INSERT INTO users_details (name,userid,password,role) VALUES ( ? , ? , ? ,? )",[name,userid,hashedpassword,role],(err,result)=>{
            if(err)
                return res.status(500).json({message:"Server Error"})
        return res.status(200).json({message:"User Registered Successfully"})
        })
    })
}