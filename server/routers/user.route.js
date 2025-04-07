const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register/company/:companyId", async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const { firstName, lastName, password, email } = req.body;
    await userController.addNewUser(
      firstName,
      lastName,
      password,
      email,
      companyId
    );
    return res.status(200).json(true);
  } catch (err) {
    if (err?.code == 11000) {
      console.log("duplicate email");
      return res.status(409).json({ success: false, msg: "duplicate email" });
    }
    if (err?._message?.includes("clientUser validation failed")) {
      return res.status(400).json({ success: false, msg: "input error" });
    }
    console.log(err);
    return res.status(500).json({ res: false });
  }
});

router.delete("/email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    await userController.deleteUserByEmail(email);
    return res.status(200);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, msg: "Could not delete user" });
  }
});

router.delete("/id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await userController.deleteUserById(id);
    return res.status(200);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, msg: "Could not delete user" });
  }
});
router.get("/page/:page/company/:companyId", async (req, res, next) => {
  try {
    const { page, companyId } = req.params;
    const users = await userController.getAllUsers(page, companyId);
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ success: false, msg: "Could not get users" });
  }
});

module.exports = router;
