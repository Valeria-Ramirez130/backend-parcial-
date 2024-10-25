import CodigoModel from '../modelos/codigo.js'; // Asegúrate de que la ruta sea correcta

// Funcion para crear los 1000 códigos
export const createCodes = async (req, res) => {
    try {
        const { total = 1000, totalPremios = 400 } = req.body;

        // Validaciones básicas
        if (totalPremios > total) {
            return res.status(400).json({ error: "El número de premios no puede ser mayor al total de códigos." });
        }

        // Definición de premios y sus cantidades
        const premios = [
            { premio: 1000000, cantidad: 50 },   // 50 códigos con premio de 1.000.000
            { premio: 50000, cantidad: 150 },     // 150 códigos con premio de 50.000
            { premio: 10000, cantidad: 200 },     // 200 códigos con premio de 10.000
        ];

        // Crear un arreglo que contendrá los premios
        const premiosArray = [];
        for (const { premio, cantidad } of premios) {
            for (let i = 0; i < cantidad; i++) {
                premiosArray.push(premio);
            }
        }

        // Barajar el arreglo de premios
        for (let i = premiosArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [premiosArray[i], premiosArray[j]] = [premiosArray[j], premiosArray[i]]; // Intercambiar
        }

        // Crear un arreglo para los códigos
        const codigos = [];

        // Generar los códigos
        for (let i = 1; i <= total; i++) {
            codigos.push({
                Codigo: i.toString().padStart(4, "0"), // Formato: '0001', '0002', ...
                TienePremio: false, // Inicialmente, no tiene premio
                Premio: null, // Inicialmente, no tiene premio
            });
        }

        // Asignar premios aleatoriamente
        for (let i = 0; i < totalPremios; i++) {
            let codigoAleatorio = Math.floor(Math.random() * total); // Obtener un índice aleatorio
            while (codigos[codigoAleatorio].TienePremio) { // Si ya tiene premio, busca otro
                codigoAleatorio = Math.floor(Math.random() * total);
            }

            // Asignar premio
            codigos[codigoAleatorio].TienePremio = true;
            codigos[codigoAleatorio].Premio = `Premio de ${premiosArray[i]}`; // Asignar el premio
        }

        // Insertar los códigos en la base de datos
        await CodigoModel.insertMany(codigos);

        res.status(201).json({ message: "Códigos generados exitosamente", totalCodigos: total });
    } catch (error) {
        console.error("Error al crear los códigos:", error);
        res.status(500).json({ error: "Error del servidor al crear los códigos" });
    }
};
// Función para verificar el código ingresado por el usuario
export const verificarCodigo = async (req, res) => {
    try {
        const { codigo } = req.body;

        // Buscar el código en la base de datos
        const codigoEncontrado = await CodigoModel.findOne({ Codigo: codigo });

        // Si el código no existe
        if (!codigoEncontrado) {
            return res.status(404).json({ error: "Código no existe" });
        }

        // Si el código ya fue registrado (usado)
        if (codigoEncontrado.Estado === 'usado') {
            return res.status(400).json({ error: "Código ya registrado" });
        }

        // Si el código tiene premio
        if (codigoEncontrado.TienePremio) {
            // Actualizar el estado del código a 'usado'
            codigoEncontrado.Estado = 'usado';
            codigoEncontrado.FechaUso = new Date();
            await codigoEncontrado.save();

            return res.status(200).json({ message: `¡Te ganaste un ${codigoEncontrado.Premio}!` });
        }

        // Si el código no tiene premio
        codigoEncontrado.Estado = 'usado';
        codigoEncontrado.FechaUso = new Date();
        await codigoEncontrado.save();

        return res.status(200).json({ message: "No ganaste" });
    } catch (error) {
        console.error("Error al verificar el código:", error);
        res.status(500).json({ error: "Error del servidor al verificar el código" });
    }
};
