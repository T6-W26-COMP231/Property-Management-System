const express = require("express");
const router  = express.Router();
const { checkJwt } = require("../middleware/auth");
const c = require("../controllers/maintenanceController");

router.post("/",                      checkJwt, c.createRequest);
router.get("/my",                     checkJwt, c.getMyRequests);
router.get("/property/:propertyId",   checkJwt, c.getPropertyRequests);
router.patch("/:id/status",           checkJwt, c.updateStatus);
router.delete("/:id",                 checkJwt, c.deleteRequest);

module.exports = router;
