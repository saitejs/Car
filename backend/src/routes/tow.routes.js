const express = require("express");

const router = express.Router();

const {
    towVehicle,
} = require("../controllers/tow.controller");

router.post("/create", towVehicle);

module.exports = router;