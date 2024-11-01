import express, { json } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import routerUsuarios from './rutas/usuario.js';
import codesRouter from './rutas/codigo.js';
import adminRouter from './rutas/admin.js';

// Cargar las variables de entorno desde el archivo .env
config();

const app = express();

// Middleware
app.use(cors()); // Habilitar CORS
app.use(json()); // Parsear JSON antes de las rutas

// Rutas de la API
app.use('/api/usuario', routerUsuarios); // Rutas para usuarios
app.use('/api/codigos', codesRouter); // Rutas para códigos
app.use('/api/admin', adminRouter);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Servidor prendido');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(err => {
        console.error('No se pudo conectar a MongoDB', err);
    });

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Exportar `app` para Vercel
export default app;
