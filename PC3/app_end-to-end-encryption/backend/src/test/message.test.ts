import request from 'supertest';
import { app } from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Messages API', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('Debe enviar un mensaje correctamente', async () => {
        const res = await request(app).post('/api/messages').send({
            sender: 'user1',
            receiver: 'user2',
            content: 'Hola, este es un mensaje de prueba.',
        });

        expect(res.status).toBe(201);
        expect(res.body.message).toHaveProperty('content', 'Hola, este es un mensaje de prueba.');
    });
});
