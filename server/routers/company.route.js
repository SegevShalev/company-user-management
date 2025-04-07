const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

router.post("/loging", async (req, res, next) => {
  try {
    const { companyName, companyId, serialId } = req.body;
    await companyController.loginCompany(companyName, companyId, serialId);
    return res.status(200).json(true);
  } catch (err) {
    if (err?.code == 11000) {
      console.log("duplicate company");
      return res.status(409).json({ success: false, msg: "duplicate company" });
    }
    if (err?._message?.includes("company validation failed")) {
      return res.status(400).json({ success: false, msg: "input error" });
    }
    if (err?.message?.includes("wrong credentials")) {
      return res.status(401).json({ success: false, msg: "auth error" });
    }
    console.log(err);
    return res.status(500).json({ res: false });
  }
});

module.exports = router;
