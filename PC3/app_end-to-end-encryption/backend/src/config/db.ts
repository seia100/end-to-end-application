import mongoose from 'mongoose'; // Importa la librería Mongoose para interactuar con MongoDB.

// Define la URI de conexión a MongoDB.  Utiliza la variable de entorno MONGO_URI si está definida, de lo contrario, utiliza la URI local por defecto.  Esto permite configurar la conexión fácilmente en diferentes entornos.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secure-messaging';

// Intenta establecer la conexión a MongoDB.  Utiliza las opciones `useNewUrlParser` y `useUnifiedTopology` para la compatibilidad con las nuevas versiones del driver de MongoDB.
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, // Usa el nuevo parser de URL.  Es necesario para evitar warnings de deprecación.
    useUnifiedTopology: true, // Usa el nuevo motor de descubrimiento y monitoreo de servidores. Mejora la topología del servidor y la gestión de la conexión.
})
    .then(() => {
        // Si la conexión es exitosa, imprime un mensaje en la consola.
        console.log('Conexión a MongoDB exitosa');
    })
    .catch((err) => {
        // Si ocurre un error durante la conexión, imprime el error en la consola y termina el proceso.  Esto evita que la aplicación se ejecute sin una conexión a la base de datos.
        console.error('Error conectando a MongoDB:', err);
        process.exit(1); // Salir con código de error 1 indica una falla.
    });

    