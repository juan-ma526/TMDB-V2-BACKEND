const User = require("../models/Users");

const allUser = (req, res) => {
  User.findAll().then((user) => res.send(user));
};

const registerUser = (req, res) => {
  const { name, email, password, repeatedPassword } = req.body;
  User.create({ name, email, password, repeatedPassword })
    .then((userCreated) => res.status(200).send(userCreated))
    .catch((err) => res.send(err));
};

module.exports = { allUser, registerUser };
