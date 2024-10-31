import { Router } from "express";
import { createCodes, verificarCodigo, obtenerCodigosUsuario } from "../controladores/codigoControlador.js";

const codesRouter = Router();

// Rutas existentes
codesRouter.post('/createCodes', createCodes);

// Nueva ruta para verificar el código
codesRouter.post('/verificarCodigo', verificarCodigo);

// Nueva ruta para obtener códigos del usuario
codesRouter.get('/obtenerCodigosUsuario/:userId', obtenerCodigosUsuario);

export default codesRouter;
