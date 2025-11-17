import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import { db } from './src/config/db.js';
import AdminRoutes from "./src/Routes/AdminRoutes.js"
import authRoutes from "./src/Routes/authRoutes.js"
import userRoutes from "./src/Routes/userRoutes.js"

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());


app.use("/auth",authRoutes)
app.use("/admin",AdminRoutes)
app.use("/user",userRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(` Server running on port ${PORT}`))