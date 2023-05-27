const express = require("express");
const app = express();
const db = require("./config/db");
const model = require("./models");

const routes = require("./routes");

const cors = require(`cors`);
app.use(express.json());
app.use("/api", routes);
app.use(
  cors({
    // Si aún no tenes deployado tu front en origin va la url local.
    // Una vez que se deploye el front acá va esa url que te entrega.
    origin: "http://localhost:3000",
    methods: [`GET`, `POST`, `DELETE`, `OPTIONS`],
    credentials: true,
  })
);
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
});
