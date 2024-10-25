import { Router } from "express";

const codesRouter = Router();

import { createCodes, verificarCodigo } from "../controladores/codigoControlador.js";

// Rutas existentes
codesRouter.post('/createCodes', createCodes);

// Nueva ruta para verificar el código
codesRouter.post('/verificarCodigo', verificarCodigo);

export default codesRouter;
