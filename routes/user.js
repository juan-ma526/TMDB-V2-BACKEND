const router = require("express").Router();
const {
  allUser,
  registerUser,
  loginUser,
  logoutUser,
  addMovieFavorite,
  getMovieFavorite,
  removeFavorite,
} = require("../controllers/user");

router.get("/", allUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/addMovie", addMovieFavorite);
router.get("/getMovie", getMovieFavorite);
router.delete("/delete", removeFavorite);

module.exports = router;
