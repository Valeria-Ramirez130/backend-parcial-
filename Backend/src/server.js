import express, { json } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import routerUsuarios from './rutas/usuario.js'; // Asegúrate de que la ruta sea correcta
import codesRouter from './rutas/codigo.js'; // Asegúrate de que la ruta sea correcta

// Cargar las variables de entorno desde el archivo .env
config();

const app = express();

// Middleware
app.use(cors()); // Habilitar CORS
app.use(json()); // Parsear JSON antes de las rutas

// Rutas de la API
app.use('/api/usuario', routerUsuarios); // Rutas para usuarios
app.use('/api/codigos', codesRouter); // Rutas para códigos

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Servidor prendido');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
