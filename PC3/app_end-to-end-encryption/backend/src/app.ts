import express, { Application } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { configureSocket } from './config/socket'; // Importa la configuración de Socket.IO
import authRoutes from './routes/authRoutes'; // Importa las rutas de autenticación
import messageRoutes from './routes/messageRoutes'; // Importa las rutas de mensajes
import { errorHandler } from './middlewares/errorHandler'; // Importa el middleware de manejo de errores

// Crea una instancia de la aplicación Express
const app: Application = express();
// Crea el servidor HTTP usando la app de Express. Esto es necesario para Socket.IO
const server = createServer(app);

// Middleware CORS: Permite solicitudes de diferentes orígenes.  Es crucial para desarrollo frontend y para permitir que clientes de diferentes dominios accedan a la API.
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes como JSON.  Esto permite recibir datos en formato JSON desde el cliente.
app.use(express.json());

// Define las rutas para la API

// Rutas de autenticación:  Maneja el registro, inicio de sesión y otras funcionalidades relacionadas con la autenticación.
app.use('/api/auth', authRoutes);

// Rutas de mensajes:  Maneja el envío, recepción y gestión de mensajes.
app.use('/api/messages', messageRoutes);

// Middleware para el manejo centralizado de errores.  Captura cualquier error que ocurra en las rutas y lo procesa de manera uniforme.  Esto facilita la depuración y proporciona respuestas de error consistentes al cliente.
app.use(errorHandler);

// Configura Socket.IO usando el servidor HTTP.  Esto establece la conexión de Socket.IO y permite la comunicación en tiempo real.
configureSocket(server);


// Exporta la aplicación Express y el servidor HTTP.  Exportar ambos es importante porque el servidor es necesario para iniciar Socket.IO, mientras que la app es necesaria para las pruebas y otras configuraciones.
export default { app, server };