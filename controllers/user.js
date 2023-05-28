const User = require("../models/Users");
const bcryp = require("bcrypt");
const { generateToken } = require("../config/token");
const Movies = require("../models/Movies");

const allUser = (req, res) => {
  User.findAll().then((user) => res.send(user));
};

const registerUser = async (req, res) => {
  const saltRound = 10;
  const { name, email, password } = req.body;
  const hashPassword = await bcryp.hash(password, saltRound);
  console.log(hashPassword);

  User.create({ name, email, password: hashPassword })
    .then((userCreated) => res.status(200).send(userCreated))
    .catch((err) => res.send(err));
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).send("El usuario no existe");

    const isMatch = await bcryp.compare(password, user.password);

    if (!isMatch)
      return res.status(401).send("El email o contraseña son incorrectos");

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = generateToken(payload);
    res.cookie("token", token);
    return res.send({ token, user: payload });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const addMovieFavorite = (req, res) => {
  try {
    const { userId, movie } = req.body;

    Movies.create({
      nameMovie: movie.nameMovie,
      overview: movie.overview,
      frontImage: movie.frontImage,
    })
      .then((movie) => {
        User.findByPk(userId)
          .then((user) => {
            user.addMovie(movie);
            res.sendStatus(200);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allUser,
  registerUser,
  loginUser,
  logoutUser,
  addMovieFavorite,
};
