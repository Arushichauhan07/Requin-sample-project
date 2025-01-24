const {register, login, logout, getUserDetails, getAllUsers} = require("../controllers/userController")

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-allUsers", getAllUsers);
// router.get("/getUserDetails/:id", getUserDetails );

module.exports = router