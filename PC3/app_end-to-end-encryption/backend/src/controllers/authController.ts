import { Request, Response, NextFunction } from 'express';
import { registerUser, authenticateUser } from '../services/authService';

/**
 * Controlador para registrar un nuevo usuario.
 *
 * @param req El objeto de solicitud (Request).
 * @param res El objeto de respuesta (Response).
 * @param next La función para pasar al siguiente middleware (NextFunction).
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtener el nombre de usuario y la contraseña del cuerpo de la solicitud.
        const { username, password } = req.body;

        // Validación inicial de datos.  Verificar que se proporcionen el nombre de usuario y la contraseña.
        // Estrategia:  Realizar validaciones simples en el controlador antes de llamar al servicio.
        if (!username || !password) {
            return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
        }

        // Llamar al servicio de registro de usuarios.
        // Estrategia:  Delegar la lógica de registro al servicio authService.
        const user = await registerUser(username, password);

        // Enviar una respuesta exitosa al cliente.
        // Estrategia:  Devolver un código de estado 201 (Created) y un objeto JSON con el mensaje de éxito y los datos del usuario.
        res.status(201).json({
            message: 'Usuario registrado con éxito',
            user,
        });
    } catch (error) {
        // Capturar cualquier error que ocurra durante el proceso de registro.
        // Estrategia:  Pasar el error al middleware de manejo de errores usando next(error).
        next(error);
    }
};

/**
 * Controlador para iniciar sesión.
 *
 * @param req El objeto de solicitud (Request).
 * @param res El objeto de respuesta (Response).
 * @param next La función para pasar al siguiente middleware (NextFunction).
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtener el nombre de usuario y la contraseña del cuerpo de la solicitud.
        const { username, password } = req.body;

        // Validación inicial de datos. Verificar que se proporcionen el nombre de usuario y la contraseña.
        // Estrategia: Realizar validaciones simples en el controlador antes de llamar al servicio.
        if (!username || !password) {
            return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
        }

        // Llamar al servicio de autenticación de usuarios.
        // Estrategia: Delegar la lógica de autenticación al servicio authService.
        const user = await authenticateUser(username, password);

        // Enviar una respuesta exitosa al cliente.
        // Estrategia: Devolver un código de estado 200 (OK) y un objeto JSON con el mensaje de éxito y los datos del usuario.
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user,
        });
    } catch (error) {
        // Capturar cualquier error que ocurra durante el proceso de inicio de sesión.
        // Estrategia: Pasar el error al middleware de manejo de errores usando next(error).
        next(error);
    }
};