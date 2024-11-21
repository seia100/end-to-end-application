import { server } from './app'; // Importa el servidor HTTP desde el módulo app.js.  
// Esto incluye la configuración de Express y Socket.IO.
import './config/db'; // Importa y ejecuta la configuración de la base de datos.  
// Este import establece la conexión con la base de datos.  Es importante que se ejecute 
// antes de que el servidor comience a escuchar.

// Define el puerto en el que el servidor escuchará las conexiones.  
// Utiliza la variable de entorno PORT si está definida, de lo contrario, 
// utiliza el puerto 3000.  Esto permite configurar el puerto fácilmente en diferentes entornos.
const PORT = process.env.PORT || 3000;

// Inicia el servidor y comienza a escuchar las conexiones en el puerto especificado.
server.listen(PORT, () => {
    // Imprime un mensaje en la consola indicando que el servidor está corriendo y la URL para 
    // acceder a él.  Esto es útil para la depuración y para informar al usuario de que el servidor 
    // está funcionando.
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});