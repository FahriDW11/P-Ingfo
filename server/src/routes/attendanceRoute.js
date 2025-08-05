import express from "express";
import { getAllAttendances, createNewAttendance, updateAttendance, deleteAttendance, getAllAttendanceLogs } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAllAttendances);
router.post("/", createNewAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

router.get("/log", getAllAttendanceLogs);

export default router;
