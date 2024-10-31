import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuariosGanadores } from '../controladores/adminControlador.js';

const adminRouter = Router();

// Ruta para obtener todos los usuarios registrados
adminRouter.get('/usuarios', obtenerUsuarios);

// Ruta para obtener usuarios que registraron códigos con premio
adminRouter.get('/usuariosGanadores', obtenerUsuariosGanadores);

export default adminRouter;
