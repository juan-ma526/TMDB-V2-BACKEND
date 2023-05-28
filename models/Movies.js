const Sequelize = require("sequelize");
const db = require("../config/db");

class Movies extends Sequelize.Model {}

Movies.init(
  {
    nameMovie: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    overview: {
      type: Sequelize.TEXT,
    },
    frontImage: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "Movies" }
);

module.exports = Movies;
