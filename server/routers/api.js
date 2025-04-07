const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const companyRoute = require("./company.route");

router.use("/user", userRoute);
router.use("/company", companyRoute);

module.exports = router;
