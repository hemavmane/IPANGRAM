const express = require("express");
const registerController = require("../Controller/auth");

const router = express.Router();

router.post("/adduser", registerController.signupController);
router.get("/alluser", registerController.getAlluser);
router.get("/deleteuser/:id", registerController.deleteUser);
router.put("/updateuser/:useridd", registerController.UpdateUsr);
router.post("/updatelogin", registerController.Login);
// deleteUser
module.exports = router;
