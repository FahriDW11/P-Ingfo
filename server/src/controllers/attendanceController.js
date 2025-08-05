import Attendance from "../models/Attendance.js";
import AttendanceLog from "../models/AttendanceLog.js";

export async function getAllAttendances(_, res) {
  try {
    const attendances = await Attendance.find();
    res.status(200).json({ attendances });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Attendances: ", error });
  }
}

export async function createNewAttendance(req, res) {
  try {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.status(201).json({ message: "New attendance created", newAttendance });
  } catch (error) {
    res.status(400).json({ message: "Error posting new Attendance: ", error });
  }
}

export async function updateAttendance(req, res) {
  try {
    const { id } = req.params;
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(400).json({ message: "Error updating Attendance", error });
  }
}

export async function getAllAttendanceLogs(_, res) {
  try {
    const attendanceLogs = await AttendanceLog.find();
    res.status(200).json({ attendanceLogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Attendances: ", error });
  }
}
