const express = require("express");
const router = express.Router();
const publicEventController = require("./../controller/public-event-controller");

router.get("/", publicEventController.getAll);

module.exports = router;
