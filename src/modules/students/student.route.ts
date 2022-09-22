import express from "express";
import eventHandler from "../app/eventHandler";
import studentController from "./student.controller";
import studentEventHandler from "./student.events";

const router = express.Router();
const studentEvent = new studentEventHandler();

//GET
router.get("/", studentController.getStudents);
router.get("/student/:id", studentController.getStudent);

//POST
router.post("/student", studentController.addStudent);
router.post("/student/:id/take-attendance", studentController.takeAttendance);

//DELETE
router.delete("/student/:id", studentController.removeStudent);

//ADMIN-ENDPOINTS-THAT-RECOMPUTE
router.post("/student/:id/re-compute", (req, res) => {
  eventHandler.attendanceHandler({ userId: req.params.id });
  res.json({
    message: "User data recomputed",
  });
});
router.post("/re-compute", async (req, res) => {
  eventHandler.studentHandler({}, false);
  res.json({
    message: "User data recomputed",
  });
});

export default router;
