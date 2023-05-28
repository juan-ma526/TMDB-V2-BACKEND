const Users = require("./Users");
const Movies = require("./Movies");

// Aca va  la relacion

Users.belongsToMany(Movies, { through: "favoritesMovies" });
Movies.belongsToMany(Users, { through: "favoritesMovies" });

module.exports = { Users };
