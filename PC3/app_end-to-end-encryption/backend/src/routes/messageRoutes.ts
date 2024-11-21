import { Router } from 'express'; // Importa el Router de Express.
// Importa los controladores de mensajes.
import { sendMessage, getMessages } from '../controllers/messageController'; 

// Crea una instancia del Router.
const router = Router();

// Define la ruta POST / para enviar un nuevo mensaje.  Llama al controlador `sendMessage`.
router.post('/', sendMessage);

// Define la ruta GET /:userId1/:userId2 para obtener los mensajes entre dos usuarios.  
// Llama al controlador `getMessages`.
router.get('/:userId1/:userId2', getMessages);

// Exporta el router.
export default router;