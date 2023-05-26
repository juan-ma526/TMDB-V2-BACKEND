const Sequelize = require("sequelize");
const db = require("../config/db");

class User extends Sequelize.Model {}

User.init(
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.nombre} ${this.apellido}`;
      },
    },
    password: {
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
