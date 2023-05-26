const Sequelize = require("sequelize");

const db = new Sequelize(
  "tmdb_v2",
  "tmdb_v2_user",
  "ljEqxLJhMzYiYHWhnu5xvGtkRaGXVYsl",
  {
    host: "dpg-choc5cqk728h7ntq7vvg-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Requerir SSL
        rejectUnauthorized: false, // No verificar el certificado SSL
      },
    },
    logging: false,
  }
);

module.exports = db;

/* postgres://tmdb_v2_user:ljEqxLJhMzYiYHWhnu5xvGtkRaGXVYsl@dpg-choc5cqk728h7ntq7vvg-a.oregon-postgres.render.com/tmdb_v2 */
