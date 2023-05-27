const router = require("express").Router();
const { allUser, registerUser } = require("../controllers/user");

router.get("/", allUser);
router.post("/register", registerUser);

module.exports = router;
