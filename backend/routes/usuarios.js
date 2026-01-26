// backend/routes/usuarios.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/registrar', async (req, res) => {
  try {
    const { nombre, sexo, fechaNacimiento, lugarResidencia, direccion, telefono, email } = req.body;
    if (!nombre || !sexo || !fechaNacimiento || !lugarResidencia || !email) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, sexo, fecha_nacimiento, lugar_residencia, direccion, telefono, email)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [nombre, sexo, fechaNacimiento, lugarResidencia, direccion, telefono, email]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Error en el registro' });
  }
});

module.exports = router;
