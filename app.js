const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Conexión forzada a la red interna de Docker
const pool = new Pool({
  host: process.env.DB_HOST || 'database',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'cruzazul',
  database: process.env.DB_NAME || 'cruz_azul_db',
  port: 5432,
});

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error al obtener productos' });
  }
});

app.post('/api/products', async (req, res) => {
  const { nombre_producto, descripcion, cantidad, precio_unitario } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre_producto, descripcion, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre_producto, descripcion, cantidad, precio_unitario]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al insertar en la BD' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de Farmacia Cruz Azul corriendo en puerto ${port}`);
});
