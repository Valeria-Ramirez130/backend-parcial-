import User from '../modelos/user.js';
import InformacionUser from '../modelos/informacionUser.js';
import CodigoModel from '../modelos/codigo.js';

// Obtener todos los usuarios registrados
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await InformacionUser.find()
            .populate('user', 'email rol nombre') // Incluye nombre aquí
            .select('nombre ciudad fechaNacimiento cedula user'); // Asegúrate de incluir 'nombre', 'ciudad', 'fechaNacimiento' y 'cedula'
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ mensaje: "Error en el servidor al obtener usuarios" });
    }
};


// Obtener usuarios ganadores (aquellos con códigos premiados)
export const obtenerUsuariosGanadores = async (req, res) => {
    try {
        const codigosGanadores = await CodigoModel.find({ TienePremio: true, Estado: 'usado' })
            .populate('User', 'email nombre') // Asegúrate de incluir 'nombre'
            .select('Codigo Premio User FechaUso');

        const usuariosGanadores = codigosGanadores.map(codigo => ({
            user: codigo.User,
            codigo: codigo.Codigo,
            premio: codigo.Premio,
            fechaUso: codigo.FechaUso,
        }));

        res.status(200).json(usuariosGanadores);
    } catch (error) {
        console.error("Error al obtener usuarios ganadores:", error);
        res.status(500).json({ mensaje: "Error en el servidor al obtener usuarios ganadores" });
    }
};


