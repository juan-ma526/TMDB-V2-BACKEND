const router = require("express").Router();
const {
  allUser,
  registerUser,
  loginUser,
  logoutUser,
  addMovieFavorite,
} = require("../controllers/user");

router.get("/", allUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/addMovie", addMovieFavorite);

module.exports = router;
