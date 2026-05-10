# Usamos la imagen oficial de PostgreSQL
FROM postgres:15

# Definimos variables de entorno por defecto
ENV POSTGRES_DB=cruz_azul_db
ENV POSTGRES_PASSWORD=password

# Todo lo que esté en esta carpeta se ejecuta al iniciar la BD
COPY init.sql /docker-entrypoint-initdb.d/