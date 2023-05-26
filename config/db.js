const Sequelize = require("sequelize");

const db = new Sequelize(
  "tmdb_v2",
  "tmdb_v2_user",
  "ljEqxLJhMzYiYHWhnu5xvGtkRaGXVYsl",
  {
    host: "dpg-choc5cqk728h7ntq7vvg-a",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = db;
