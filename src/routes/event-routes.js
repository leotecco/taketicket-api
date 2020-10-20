const express = require("express");
const router = express.Router();
const eventController = require("./../controller/event-controller");

router.post("/", eventController.post);

router.get("/", eventController.getAll);

router.get("/:id", eventController.getById);

router.put("/:id", eventController.put);

router.delete("/:id", eventController.delete);

module.exports = router;
