# Actividad 14: Conectando la API GraphQL a la base de datos MongoDB

- Integración de Apollo Server con Next.js
- Uso de Mongoose para gestionar la base de datos
- Refactorización de resolvers para implementar servicios
- Configuración de middleware para conexión a MongoDB
- Optimización de la API y pruebas en GraphQL Sandbox

> **Nota:**
> Este documento organiza los pasos prácticos y los conceptos teóricos necesarios para completar la actividad. Usa los ejercicios para reforzar el aprendizaje.

## Índice

- [Actividad 14: Conectando la API GraphQL a la base de datos MongoDB](#actividad-14-conectando-la-api-graphql-a-la-base-de-datos-mongodb)
  - [Índice](#índice)
  - [Pasos para ejecutar la actividad](#pasos-para-ejecutar-la-actividad)
  - [Ejercicios con respuestas](#ejercicios-con-respuestas)
    - [Ejercicio 1: Configurar la conexión a MongoDB](#ejercicio-1-configurar-la-conexión-a-mongodb)
      - [Pregunta teórica: ¿Cómo ayuda Mongoose a gestionar conexiones concurrentes?](#pregunta-teórica-cómo-ayuda-mongoose-a-gestionar-conexiones-concurrentes)

## Pasos para ejecutar la actividad

1. **Configura el entorno de trabajo:**
   - Asegúrate de tener instalado Node.js, Next.js y MongoDB.
   - Instala las dependencias necesarias:
     ```bash
     npm install mongoose @apollo/server @as-integrations/next
     ```

2. **Crea un middleware para la conexión a MongoDB:**
   - En la carpeta `middleware`, crea un archivo `db-connect.ts` para manejar la conexión:
     ```ts
     import mongoose from 'mongoose';

     const dbConnect = async () => {
         if (mongoose.connection.readyState >= 1) return;

         mongoose.connect(process.env.MONGO_URI || '', {
             useNewUrlParser: true,
             useUnifiedTopology: true,
         });
     };

     export default dbConnect;
     ```

3. **Configura Apollo Server:**
   - Edita `api/graphql.ts` para incluir el middleware de conexión y configurar el servidor:
     ```ts
     import { ApolloServer } from '@apollo/server';
     import { startServerAndCreateNextHandler } from '@as-integrations/next';
     import { resolvers } from '../../graphql/resolvers';
     import { typeDefs } from '../../graphql/schema';
     import dbConnect from '../../middleware/db-connect';

     const server = new ApolloServer({ resolvers, typeDefs });
     const handler = startServerAndCreateNextHandler(server);

     const connectDB = (fn) => async (req, res) => {
         await dbConnect();
         return fn(req, res);
     };

     export default connectDB(handler);
     ```

4. **Refactoriza los resolvers para usar servicios:**
   - Implementa servicios para operaciones de lectura y escritura en `mongoose/weather/services.ts`.
   - Modifica los resolvers en `graphql/resolvers.ts` para usarlos:
     ```ts
     import { findByZip, updateByZip } from '../mongoose/weather/services';

     export const resolvers = {
         Query: {
             weather: async (_, { zip }) => findByZip(zip),
         },
         Mutation: {
             weather: async (_, { data }) => updateByZip(data.zip, data),
         },
     };
     ```

5. **Prueba la API en GraphQL Sandbox:**
   - Inicia el servidor y accede a `http://localhost:3000/api/graphql`.
   - Realiza consultas y mutaciones para verificar la funcionalidad.

---

## Ejercicios con respuestas

### Ejercicio 1: Configurar la conexión a MongoDB
- **Tarea:** Completa el archivo `db-connect.ts` para manejar errores y evitar múltiples conexiones simultáneas.
- **Respuesta práctica:**
  El archivo `db-connect.ts` debe manejar correctamente las conexiones existentes:
  ```ts
  import mongoose from 'mongoose';

  const dbConnect = async () => {
      if (mongoose.connection.readyState >= 1) {
          console.log('Ya conectado a la base de datos.');
          return;
      }

      try {
          await mongoose.connect(process.env.MONGO_URI || '', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
          });
          console.log('Conexión exitosa a MongoDB');
      } catch (error) {
          console.error('Error al conectar con MongoDB:', error);
      }
  };

  export default dbConnect;
  ```

#### Pregunta teórica: ¿Cómo ayuda Mongoose a gestionar conexiones concurrentes?

**Respuesta:**

Mongoose implementa un pool de conexiones que reutiliza conexiones existentes, lo que mejora el rendimiento y evita abrir múltiples conexiones innecesarias.
