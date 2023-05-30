const express = require("express");
const cors = require(`cors`);
const app = express();
const db = require("./config/db");
const model = require("./models");
const routes = require("./routes");

app.use(express.json());
app.use("/api", routes);

app.use(
  cors({
    origin: ["https://transcendent-tulumba-dd6ef9.netlify.app/"],
    allowedHeaders: ["Content-Type", "SameSite", "whitCredentials"],
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
});
