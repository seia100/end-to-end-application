import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateKeyPair } from '../utils/cryptoUtils';

/**
 * Servicio para registrar un nuevo usuario.
 *
 * @param username El nombre de usuario.
 * @param password La contraseña del usuario.
 * @returns Un objeto que contiene el ID y el nombre de usuario del nuevo usuario.
 * @throws Error si el usuario ya existe o si ocurre un error durante el proceso de registro.
 */
export const registerUser = async (username: string, password: string) => {
    // Verificar si el usuario ya existe.
    // Estrategia:  
    // Usar User.findOne para buscar un usuario con el mismo nombre de usuario.
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        // Lanzar un error 409 (Conflict) si el usuario ya existe.
        throw { status: 409, message: 'El usuario ya existe' }; 
    }

    // Hashear la contraseña usando bcrypt.
    // Estrategia:  bcrypt.hash cifra la contraseña de forma segura. 
    // El segundo argumento (10) es el factor de costo (salt rounds).
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar un par de claves PGP para el usuario.
    // Estrategia:  Usar la función generateKeyPair del módulo cryptoUtils.
    const { publicKey, privateKey } = await generateKeyPair();

    // Crear el nuevo usuario en la base de datos.
    // Estrategia:  Usar User.create para guardar el nuevo usuario en la 
    // base de datos, incluyendo la contraseña hasheada y las claves PGP.
    const newUser = await User.create({
        username,
        password: hashedPassword,
        publicKey,
        privateKey,
    });

    // Devolver el ID y el nombre de usuario del nuevo usuario.
    return { id: newUser.id, username: newUser.username };
};

/**
 * Servicio para autenticar a un usuario.
 *
 * @param username El nombre de usuario.
 * @param password La contraseña del usuario.
 * @returns Un objeto que contiene el ID, el nombre de usuario y la clave pública del usuario autenticado.
 * @throws Error si el usuario no existe o si la contraseña es incorrecta.
 */
export const authenticateUser = async (username: string, password: string) => {
    // Buscar al usuario en la base de datos.
    // Estrategia:  Usar User.findOne para buscar un usuario con el 
    // nombre de usuario proporcionado.
    const user = await User.findOne({ username });
    if (!user) {
        // Lanzar un error 404 (Not Found) si el usuario no existe.
        throw { status: 404, message: 'Usuario no encontrado' }; 
    }

    // Verificar si la contraseña es correcta.
    // Estrategia:  Usar bcrypt.compare para comparar la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        // Lanzar un error 401 (Unauthorized) si la contraseña es incorrecta.
        throw { status: 401, message: 'Contraseña incorrecta' }; 
    }

    // Devolver el ID, el nombre de usuario y la clave pública del usuario autenticado.
    return { id: user.id, username: user.username, publicKey: user.publicKey };
};