const router = require("express").Router();
const user = require("./user");
const movies = require("./movies");

router.use("/user", user);
router.use("/movies", movies);

module.exports = router;
