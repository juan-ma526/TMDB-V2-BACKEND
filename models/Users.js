const Sequelize = require("sequelize");
const db = require("../config/db");

class User extends Sequelize.Model {}

User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    repeatedPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    salt: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "User" }
);

module.exports = User;
