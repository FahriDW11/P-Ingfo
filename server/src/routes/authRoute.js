import express from "express";
import { getUserToken, addUser, changePassword, updateUser, deleteUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", getUserToken);
router.post("/register", addUser);

router.put("/password/:id", verifyToken, changePassword);
router.put("/:id", verifyToken, checkRole("admin"), updateUser);
router.delete("/:id", verifyToken, checkRole("admin"), deleteUser);

export default router;
