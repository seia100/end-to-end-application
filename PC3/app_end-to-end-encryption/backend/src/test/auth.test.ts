import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

// Conectar a la base de datos de prueba antes de ejecutar las pruebas.
// Estrategia:  Usar una base de datos de prueba separada para evitar afectar los datos de la base de datos de desarrollo o producción.
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-db');
});

// Desconectar de la base de datos después de ejecutar todas las pruebas.
// Estrategia:  Limpiar después de las pruebas para evitar conexiones abiertas innecesarias.
afterAll(async () => {
    await mongoose.disconnect();
});

// Describir el conjunto de pruebas para la API de autenticación.
describe('Auth API', () => {
    // Prueba para el registro de usuarios.
    it('Debería registrar un usuario correctamente', async () => {
        // Enviar una solicitud POST a /api/auth/register con los datos del usuario.
        // Estrategia:  Usar supertest para simular una solicitud HTTP.
        const res = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            password: 'password123',
        });

        // Verificar que la respuesta tenga un código de estado 201 (Created).
        expect(res.status).toBe(201);
        // Verificar que la respuesta contenga un objeto de usuario con el nombre de usuario correcto.
        expect(res.body.user).toHaveProperty('username', 'testuser');
    });

    // Prueba para manejar el caso de un usuario duplicado.
    it('Debería rechazar el registro si el usuario ya existe', async () => {
        // Enviar una solicitud POST a /api/auth/register con los mismos datos del usuario que en la prueba anterior.
        // Estrategia:  Intentar registrar un usuario duplicado para verificar el manejo de errores.
        const res = await request(app).post('/api/auth/register').send({
            username: 'testuser', // Mismo nombre de usuario.
            password: 'password123',
        });

        // Verificar que la respuesta tenga un código de estado 409 (Conflict).
        expect(res.status).toBe(409);
    });
});