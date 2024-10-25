import { Router } from 'express';
import { crearUsuario, login } from '../controladores/userControlador.js';

const routerUsuarios = Router();

routerUsuarios.post('/login', login);
routerUsuarios.post('/nuevoUsuario', crearUsuario);

export default routerUsuarios;