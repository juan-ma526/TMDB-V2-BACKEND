const express = require("express");
const app = express();
const cors = require(`cors`);
const db = require("./config/db");
const model = require("./models");
const routes = require("./routes");

app.use(express.json());
app.use("/api", routes);

app.use(cors());

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
});
