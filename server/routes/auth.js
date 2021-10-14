const express = require("express");
// CONTROLLERS
const { register, login, logout, currentUser } = require("../controllers/auth");

// MIDDLEWARES
const { requireSignin } = require("../middlewares/index");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
