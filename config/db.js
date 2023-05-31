const Sequelize = require("sequelize");

const db = new Sequelize(
  "tmdb_v2", // nombre de la database
  "tmdb_v2_user", // user en render
  "ljEqxLJhMzYiYHWhnu5xvGtkRaGXVYsl", // password que me da render
  {
    host: "dpg-choc5cqk728h7ntq7vvg-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Requerir SSL
        /* rejectUnauthorized: false, */ // No verificar el certificado SSL
      },
    },
    logging: false,
  }
);

module.exports = db;
