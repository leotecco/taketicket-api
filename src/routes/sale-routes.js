const express = require("express");
const router = express.Router();
const saleController = require("./../controller/sale-controller");

router.post("/", saleController.post);

router.post("/check", saleController.check);

module.exports = router;
