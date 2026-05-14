const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

const pool = new Pool({
  host: '172.31.33.44',      // IP privada de tu CruzAzul-BD
  user: 'postgres',
  password: 'cruzazul',      // Asegúrate de que esta sea la clave real
  database: 'cruz_azul_db',
  port: 5432,
});

app.use(express.json());

// Esta línea es la que arregla el "Cannot GET /"
app.use(express.static(path.join(__dirname))); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/productos', async (req, res) => {
  const { nombre, descripcion, cantidad, precio } = req.body;
  try {
    await pool.query('INSERT INTO productos (nombre_producto, descripcion, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)', 
    [nombre, descripcion, cantidad, precio]);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log('Servidor de Farmacia corriendo en puerto 3000');
});
