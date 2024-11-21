// messageService.ts

import Message from '../models/Message';

// Función para crear un nuevo mensaje.
export const createMessage = async (sender: string, receiver: string, content: string) => {
    // Validación de datos de entrada.  Si falta algún dato, se lanza un error.
    // Estrategia: Validación temprana para evitar procesamiento innecesario.
    if (!sender || !receiver || !content) {
        throw { status: 400, message: 'Faltan datos para enviar el mensaje' };
    }

    // Crea un nuevo documento de mensaje en la base de datos usando el modelo Message.
    // Estrategia:  Utilizamos el método create de Mongoose para la creación del mensaje.
    const message = await Message.create({ sender, receiver, content });

    // Retorna el mensaje recién creado.
    return message;
};


// Función para obtener los mensajes entre dos usuarios.
export const getMessagesBetweenUsers = async (userId1: string, userId2: string) => {
    // Busca mensajes en la base de datos que coincidan con las condiciones especificadas.
    // Estrategia: Usamos el operador $or de MongoDB para buscar mensajes donde userId1 y 
    // userId2 sean emisor o receptor, indistintamente.
    const messages = await Message.find({
        $or: [
            // Condición 1: userId1 es el emisor y userId2 el receptor.
            { sender: userId1, receiver: userId2 },
            // Condición 2: userId2 es el emisor y userId1 el receptor.
            { sender: userId2, receiver: userId1 },
        ],
    })
    // Ordena los mensajes por fecha de creación en orden ascendente (más antiguos primero).
    // Estrategia:  Asegura que los mensajes se muestren en el orden cronológico correcto.
    .sort({ createdAt: 1 });

    // Retorna los mensajes encontrados.
    return messages;
};