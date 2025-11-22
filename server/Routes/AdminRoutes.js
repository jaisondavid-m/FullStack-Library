import express from "express"
import { AddBooks,showBooksAdmin } from "../Controllers/AdminController.js"
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { authorizeRoles } from "../Middlewares/authMiddleware.js";

const router = express.Router()

router.get("/showbooks",verifyToken,authorizeRoles("admin"),showBooksAdmin)
router.post("/addbooks",verifyToken,authorizeRoles("admin"),AddBooks)

export default router