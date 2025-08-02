import express from "express";
import { getUserToken, addUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", getUserToken);
router.post("/register", addUser);

export default router;
