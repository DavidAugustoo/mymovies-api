const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(express.json());

// Conectando ao banco
mongoose.connect(process.env.MONGO_URL);

// Carregando models
const User = require('./model/user');

// Carregando rotas
const userRoute = require('./routes/user.routes');
const movieRoute = require('./routes/movie.routes');

app.use('/account', userRoute);
app.use('/movie', movieRoute);

app.listen(process.env.PORT);
console.log("Servidor rodando na porta " + process.env.PORT);