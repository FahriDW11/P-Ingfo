import express from "express";
import { getAllUsers, editUserRole, getPengdingUsers, activateUser, deleteUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/pending", getPengdingUsers);
router.put("/activate/:id", activateUser);
router.put("/edit-user-role/:id", editUserRole);
router.delete("/delete-user/:id", deleteUser);

export default router;
