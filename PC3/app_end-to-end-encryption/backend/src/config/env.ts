import dotenv from 'dotenv'; // Importa la librería dotenv para cargar variables de entorno.

// Carga las variables de entorno desde el archivo .env.  
// Este archivo debe estar ubicado en la raíz del proyecto.
dotenv.config();

// Define un objeto ENV para almacenar las variables de entorno.  
// Esto centraliza el acceso a las variables de entorno y facilita la gestión.
export const ENV = {
    // Puerto del servidor.  Utiliza la variable de entorno PORT si está definida, 
    // de lo contrario, utiliza el puerto 3000.
    PORT: process.env.PORT || 3000, 
    // URI de conexión a MongoDB.  Utiliza la variable de entorno MONGO_URI si está definida, 
    // de lo contrario, utiliza la URI local por defecto.
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/secure-messaging', 
};