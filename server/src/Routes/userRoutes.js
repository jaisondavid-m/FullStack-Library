import express from "express"
import { showBooks } from "../Controllers/userController.js"
// import { verifyToken } from "../Middleware/authMiddleware.js";
// import { authorizeRoles } from "../Middleware/roleMiddleware.js";

const router = express.Router()

router.get("/showbooks",showBooks);

export default router