import { Request, Response, NextFunction } from 'express'; // Importa los tipos de Express.
// Importa las funciones del servicio de mensajes.
import { createMessage, getMessagesBetweenUsers } from '../services/messageService'; 

// Controlador para enviar un nuevo mensaje.
export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extrae el ID del remitente, el ID del destinatario y el 
        // contenido del mensaje del cuerpo de la solicitud.
        const { sender, receiver, content } = req.body;

        // Llama a la función createMessage del servicio para crear el 
        // nuevo mensaje en la base de datos.
        const message = await createMessage(sender, receiver, content);

        // Envía una respuesta 201 (Created) con el mensaje creado.
        res.status(201).json({ message });
    } catch (error) {
        // Si ocurre un error, lo pasa al manejador de errores global.
        next(error);
    }
};

// Controlador para obtener los mensajes entre dos usuarios.
export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extrae los IDs de los dos usuarios de los parámetros de la solicitud.
        const { userId1, userId2 } = req.params;

        // Llama a la función getMessagesBetweenUsers del servicio para obtener los 
        // mensajes entre los dos usuarios.
        const messages = await getMessagesBetweenUsers(userId1, userId2);

        // Envía una respuesta 200 (OK) con los mensajes.
        res.status(200).json({ messages });
    } catch (error) {
        // Si ocurre un error, lo pasa al manejador de errores global.
        next(error);
    }
};