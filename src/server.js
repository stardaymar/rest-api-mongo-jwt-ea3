const express = require("express");
const morgan = require("morgan");
const app = express();
const AuthToken = require("./middleware/authToken");
const authRouter = require("./router/auth.router");
const directoresRouter = require("./router/director.router");
const jugadoresRouter = require("./router/jugador.router");
const equiposRouter = require("./router/equipo.router");
app.set("port", process.env.PORT || 2020);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/autenticacion", authRouter);
app.use("/api/directores", AuthToken.autenticationRequired, directoresRouter);
app.use("/api/jugadores", AuthToken.autenticationRequired, jugadoresRouter);
app.use("/api/equipos", AuthToken.autenticationRequired, equiposRouter);
module.exports = app;
