# Backend para software-ips

## Instalación

1. Copia tu archivo `.env` con la variable `DATABASE_URL` en esta carpeta.
2. Instala las dependencias:

```
npm install express pg cors dotenv
```

## Uso

```
node server.js
```

El backend escuchará en el puerto 4000 por defecto.

## Endpoints

- POST `/api/usuarios/registrar` — Registra un usuario nuevo.

