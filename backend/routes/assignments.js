const express = require("express");
const router  = express.Router();
const { checkJwt } = require("../middleware/auth");
const {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

// Property-scoped routes
router.get("/:propertyId",          checkJwt, getAssignments);
router.post("/:propertyId",         checkJwt, createAssignment);

// Assignment-scoped routes
router.put("/:assignmentId",        checkJwt, updateAssignment);
router.delete("/:assignmentId",     checkJwt, deleteAssignment);

module.exports = router;
