/**
 * Función de registro (logger) para registrar mensajes con diferentes niveles de severidad.
 *
 * @param message El mensaje a registrar.
 * @param level El nivel de severidad del mensaje ('info', 'warn', o 'error'). Por defecto es 'info'.
 */
export const logger = (message: string, level: 'info' | 'warn' | 'error' = 'info') => {
    // Obtiene la fecha y hora actual en formato ISO 8601.
    // Estrategia:  Usamos toISOString() para un formato de timestamp estándar.
    const timestamp = new Date().toISOString();

    // Imprime el mensaje en la consola con el timestamp y el nivel de severidad.
    // Estrategia:  Formateamos la salida para que sea legible y contenga información útil.
    // El nivel se convierte a mayúsculas para mayor consistencia.
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
};