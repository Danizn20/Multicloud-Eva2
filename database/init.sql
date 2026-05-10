
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL
);
