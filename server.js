const express = require("express");
const cors = require(`cors`);
const app = express();
const db = require("./config/db");
const model = require("./models");
const routes = require("./routes");

app.use(express.json());
app.use(
  cors({
    origin: ["https://tmdb-v2-two.vercel.app", "http://localhost:5173"],
    allowedHeaders: ["Content-Type", "withCredentials"],
    credentials: true,
  })
);
app.use("/api", routes);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
});
