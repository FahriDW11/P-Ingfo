import express from "express";
import { getAllTasks, addTask, updateTask, deleteTask } from "../controllers/tasksController.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getAllTasks);
router.post("/", verifyToken, checkRole("admin"), addTask);
router.put("/:id", verifyToken, checkRole("admin"), updateTask);
router.delete("/:id", verifyToken, checkRole("admin"), deleteTask);

export default router;
