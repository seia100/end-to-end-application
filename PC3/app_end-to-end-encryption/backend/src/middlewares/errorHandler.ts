import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para el manejo centralizado de errores.
 * Captura y procesa cualquier error que ocurra durante el manejo de una solicitud.
 *
 * @param err El objeto de error.
 * @param req El objeto de solicitud (Request).
 * @param res El objeto de respuesta (Response).
 * @param next La función para pasar al siguiente middleware (NextFunction). 
 * No se usa aquí, ya que este es el manejador de errores final.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Extraer el código de estado del error o establecerlo en 500 (Internal Server Error) 
    // si no está definido.
    // Estrategia: Proporcionar un código de estado HTTP significativo al cliente.
    const status = err.status || 500;

    // Extraer el mensaje de error o establecerlo en 'Error interno del servidor' 
    // si no está definido.
    // Estrategia:  Proporcionar un mensaje de error informativo 
    // (pero no demasiado revelador) al cliente.
    const message = err.message || 'Error interno del servidor';

    // Registrar el error en la consola para fines de depuración.
    // Estrategia:  Usar console.error para registrar detalles del error en el servidor.  
    // En producción, se recomienda un logger más robusto.
    console.error(`[Error] ${message} (Status: ${status})`);

    // Enviar una respuesta JSON al cliente con el código de estado y el mensaje de error.
    // Estrategia:  Informar al cliente sobre el error de una manera consistente.
    res.status(status).json({
        message,
    });
};