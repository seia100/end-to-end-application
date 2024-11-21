import openpgp from 'openpgp';

/**
 * Genera un par de claves PGP (pública y privada).
 *
 * @returns Un objeto que contiene la clave pública y la clave privada.
 * @throws Error si ocurre un error durante la generación de claves.
 */
export const generateKeyPair = async () => {
    try {
        // Genera el par de claves usando la librería openpgp.
        // Estrategia: Se utiliza la curva elíptica ed25519 para la generación de claves.
        const { publicKey, privateKey } = await openpgp.generateKey({
            userIDs: [{ name: 'User', email: 'user@example.com' }], // Datos del usuario para la clave.
            curve: 'ed25519', // Curva elíptica utilizada.
        });

        return { publicKey, privateKey };
    } catch (error) {
        // Manejo de errores durante la generación de claves.
        // Estrategia: Se registra el error en la consola y se lanza una nueva excepción.
        console.error('Error generando claves:', error);
        throw new Error('Error al generar claves de cifrado');
    }
};

/**
 * Encripta un mensaje usando una clave pública PGP.
 *
 * @param message El mensaje a encriptar.
 * @param publicKey La clave pública del destinatario.
 * @returns El mensaje encriptado.
 * @throws Error si ocurre un error durante el proceso de encriptación.
 */
export const encryptMessage = async (message: string, publicKey: string) => {
    // Lee la clave pública desde su representación en formato armored.
    // Estrategia: openpgp.readKey convierte la clave armored a un objeto utilizable.
    const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });

    // Encripta el mensaje usando la clave pública.
    // Estrategia: openpgp.encrypt cifra el mensaje utilizando la clave pública proporcionada.
    const encryptedMessage = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: message }), // Crea un objeto mensaje a partir del texto.
        encryptionKeys: publicKeyObj, // Clave pública para encriptar.
    });

    return encryptedMessage;
};

/**
 * Desencripta un mensaje usando una clave privada PGP.
 *
 * @param encryptedMessage El mensaje encriptado.
 * @param privateKey La clave privada del destinatario.
 * @returns El mensaje desencriptado.
 * @throws Error si ocurre un error durante el proceso de desencriptación.
 */
export const decryptMessage = async (encryptedMessage: string, privateKey: string) => {
    // Lee la clave privada desde su representación en formato armored.
    // Estrategia: openpgp.readPrivateKey convierte la clave armored a un objeto utilizable.
    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });

    // Lee el mensaje encriptado desde su representación en formato armored.
    // Estrategia: openpgp.readMessage convierte el mensaje armored a un objeto utilizable.
    const message = await openpgp.readMessage({ armoredMessage: encryptedMessage });

    // Desencripta el mensaje usando la clave privada.
    // Estrategia: openpgp.decrypt descifra el mensaje utilizando la clave privada proporcionada.
    const { data: decrypted } = await openpgp.decrypt({
        message, // Mensaje encriptado.
        decryptionKeys: privateKeyObj, // Clave privada para desencriptar.
    });

    return decrypted;
};