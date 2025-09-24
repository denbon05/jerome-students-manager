const express = require("express");
const router = express.Router();
const studentController = require("./students-controller");
const { validateRequest } = require("../../utils");
const { CreateStudentSchema, UpdateStudentSchema, ReviewStudentStatusSchema, GetStudentsQuerySchema } = require("./students-schema");

router.get("", validateRequest(GetStudentsQuerySchema), studentController.handleGetAllStudents);
router.post("", validateRequest(CreateStudentSchema), studentController.handleAddStudent);
router.get("/:id", studentController.handleGetStudentDetail);
router.post("/:id/status", validateRequest(ReviewStudentStatusSchema), studentController.handleStudentStatus);
router.put("/:id", validateRequest(UpdateStudentSchema), studentController.handleUpdateStudent);
router.delete("/:id", studentController.handleDeleteStudent);

module.exports = { studentsRoutes: router };
