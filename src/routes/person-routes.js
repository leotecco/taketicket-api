const express = require("express")
const router = express.Router()
const personController = require("./../controller/person-controller")

router.post("/", personController.post)

router.get("/", personController.get)

module.exports = router
