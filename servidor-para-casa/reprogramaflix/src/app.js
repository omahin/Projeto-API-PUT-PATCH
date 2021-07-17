const express = require("express"); // importando express
// const cors = require("cors");

// chama as rotas
const moviesRoutes = require("./routes/moviesRoutes")

const app = express(); // instanciando o express para acessar as funcionalidades contidas nele

// definir rota padrão
// app.use(cors());
app.use(express.json());

app.use("/movies", moviesRoutes);

module.exports = app;