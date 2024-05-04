
const express = require("express");
const router = express.Router()
const {createUser} = require("../controllers/userRegistration")
const {generate_access_token} = require("../middleware/userAuthencation")

router.post("/registration", createUser)

router.get("/accesstoken", generate_access_token)

module.exports = router