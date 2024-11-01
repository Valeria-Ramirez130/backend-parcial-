// Importaciones de módulos y archivos
import express, { json } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

// Importaciones de rutas
import routerUsuarios from '../rutas/usuario.js';
import codesRouter from '../rutas/codigo.js';
import adminRouter from '../rutas/admin.js';

// Configuración de variables de entorno
config();

const app = express();

// Configuración de Middleware
app.use(cors());         // Habilitar CORS para permitir solicitudes de otros orígenes
app.use(json());         // Middleware para parsear JSON en las solicitudes

// Rutas de la API
app.use('/api/usuario', routerUsuarios);  // Rutas relacionadas con usuarios
app.use('/api/codigos', codesRouter);     // Rutas relacionadas con códigos
app.use('/api/admin', adminRouter);       // Rutas para administración

// Ruta de prueba para verificar el servidor
app.get('/', (req, res) => {
    res.send('Servidor prendido');
});

// Conexión a MongoDB
const conectarMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
};
conectarMongoDB();

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Configuración del puerto del servidor
const PORT = process.env.PORT || 5000;

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
