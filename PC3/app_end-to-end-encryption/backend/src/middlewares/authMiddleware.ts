import { Request, Response, NextFunction } from 'express'; 
// Importa los tipos Request, Response y NextFunction de Express.  
// Estos tipos son esenciales para definir correctamente los parámetros del middleware.

// Define el middleware de manejo de errores.  
// Este middleware es una función que recibe cuatro parámetros: el error (err), 
// la solicitud (req), la respuesta (res) y la función next.
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Imprime el mensaje de error en la consola.  Esto es útil para la 
    // depuración y para registrar los errores que ocurren en la aplicación.  
    // Se utiliza `err.message` si está disponible, de lo contrario, 
    // se muestra un mensaje genérico "Error desconocido".
    console.error('Error:', err.message || 'Error desconocido');


    // Envía una respuesta de error al cliente.  
    // El código de estado HTTP se establece utilizando `err.status` 
    // si está disponible, de lo contrario, se utiliza el código 500 (Internal Server Error).  
    // La respuesta incluye un mensaje de error en formato JSON.  

    // El uso de `err.status` permite enviar códigos de error específicos, 
    // como 400 (Bad Request), 404 (Not Found), etc., 
    // lo que proporciona información más precisa al cliente sobre 
    // la naturaleza del error.  Si no se proporciona `err.status`, 
    // se utiliza 500, que indica un error genérico del servidor.

    res.status(err.status || 500).json({
        // Se utiliza `err.message` si está disponible, de lo contrario, se muestra 
        // un mensaje genérico "Error interno del servidor" al cliente.  
        // Es importante no revelar detalles sensibles del error al cliente en un 
        // entorno de producción.
        message: err.message || 'Error interno del servidor', 
    });


    // Nota importante sobre NextFunction: Aunque se recibe el parámetro `next`, 
    // no se llama a `next()` en este middleware.  Esto se debe a que este es 
    // el último middleware en la cadena y su propósito es manejar los errores, 
    // no pasarlos a otro middleware.  Si se llamara a `next()`, el ciclo de 
    // solicitud-respuesta continuaría, lo que podría llevar a un comportamiento inesperado.
};