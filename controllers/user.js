const User = require("../models/Users");
const bcryp = require("bcrypt");
const { generateToken } = require("../config/token");
const Movies = require("../models/Movies");

const allUser = (req, res) => {
  User.findAll()
    .then((user) => res.send(user))
    .catch((error) => res.send(error));
};

const registerUser = async (req, res) => {
  const saltRound = 10;
  const { name, email, password } = req.body;
  const hashPassword = await bcryp.hash(password, saltRound);

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
      movieId: movie.movieId,
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

const getMovieFavorite = async (req, res) => {
  let foundUser;
  const userId = req.params.id;
  try {
    foundUser = await User.findOne({ where: { id: userId } });
  } catch (error) {
    console.log(error);
  }
  let foundMovie;

  try {
    foundMovie = await foundUser.getMovies();
    if (!foundMovie)
      return res.status(401).send("El usuario no tiene peliculas favoritas");
  } catch (error) {
    console.log(error);
  }
  res.status(200).send(foundMovie);
};

const removeFavorite = async (req, res) => {
  const { idUser, movieId } = req.body;

  let foundMovie;
  let deleteMovie;
  try {
    foundMovie = await Movies.findOne({ where: { movieId } });
    deleteMovie = await foundMovie.removeUser(idUser);
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(200);
};

module.exports = {
  allUser,
  registerUser,
  loginUser,
  logoutUser,
  addMovieFavorite,
  getMovieFavorite,
  removeFavorite,
};
