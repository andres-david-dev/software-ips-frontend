// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuariosRouter = require('./routes/usuarios');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
