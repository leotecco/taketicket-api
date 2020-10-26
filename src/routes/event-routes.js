const express = require("express");
const multer  = require('multer')
const router = express.Router();
const eventController = require("./../controller/event-controller");
const ticketRoutes = require("./ticket-routes");
const upload = multer()

router.post("/", upload.single('image'), eventController.post);

router.get("/", eventController.getAll);

router.get("/:id", eventController.getById);

router.put("/:id", eventController.put);

router.delete("/:id", eventController.delete);

router.use("/:idEvent/tickets", ticketRoutes);

module.exports = router;
