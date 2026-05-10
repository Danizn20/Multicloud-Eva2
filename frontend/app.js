const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a PostgreSQL
// se utiliza variables de entorno para que sea seguro en AWS
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'cruz_azul_db',
  port: 5432,
});

app.use(express.json());
app.use(express.static('public'));

// Ruta principal para ver el ERP
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para obtener productos 
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de Farmacia Cruz Azul corriendo en puerto ${port}`);
});