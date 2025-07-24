import express from "express";
import { getUserToken, addUser, getAllUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", getUserToken);
router.post("/register", addUser);
router.get("/users", getAllUsers);

export default router;
