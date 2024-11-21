# Conceptos Clave para la Actividad: Integración de GraphQL con MongoDB y Mongoose

Este documento organiza los tópicos más importantes para comprender los aspectos teóricos y prácticos de la actividad.

---

## Índice

- [Conceptos Clave para la Actividad: Integración de GraphQL con MongoDB y Mongoose](#conceptos-clave-para-la-actividad-integración-de-graphql-con-mongodb-y-mongoose)
  - [Índice](#índice)
  - [GraphQL](#graphql)
    - [TypeDefs y Resolvers](#typedefs-y-resolvers)
    - [Mutaciones y Consultas](#mutaciones-y-consultas)
  - [MongoDB](#mongodb)
    - [Conceptos Clave](#conceptos-clave)
    - [Modelado de Datos](#modelado-de-datos)
    - [Esquemas y Modelos](#esquemas-y-modelos)
  - [Apollo Server](#apollo-server)
    - [Configuración en Next.js](#configuración-en-nextjs)
    - [Middlewares](#middlewares)

---

## GraphQL

GraphQL es un lenguaje de consulta para APIs que permite obtener exactamente los datos necesarios.

### TypeDefs y Resolvers

- **TypeDefs:** Definen el esquema GraphQL. Describen los tipos de datos, consultas y mutaciones disponibles.
  - Ejemplo:
    ```graphql
    type Weather {
        zip: String!
        temperature: Float
        description: String
    }

    type Query {
        weather(zip: String!): Weather
    }

    type Mutation {
        updateWeather(zip: String!, data: WeatherInput!): Weather
    }

    input WeatherInput {
        temperature: Float
        description: String
    }
    ```

- **Resolvers:** Implementan la lógica para resolver las consultas y mutaciones. Funcionan como controladores en GraphQL.
  - Ejemplo:
    ```ts
    const resolvers = {
        Query: {
            weather: async (_, { zip }) => await findWeatherByZip(zip),
        },
        Mutation: {
            updateWeather: async (_, { zip, data }) => await updateWeather(zip, data),
        },
    };
    ```

### Mutaciones y Consultas

- **Consultas:** Recuperan datos.
  - Ejemplo:
    ```graphql
    query {
        weather(zip: "12345") {
            temperature
            description
        }
    }
    ```

- **Mutaciones:** Modifican datos en el servidor.
  - Ejemplo:
    ```graphql
    mutation {
        updateWeather(zip: "12345", data: { temperature: 25.5, description: "Cloudy" }) {
            zip
            temperature
            description
        }
    }
    ```

---

## MongoDB

MongoDB es una base de datos NoSQL orientada a documentos que utiliza JSON como formato de almacenamiento.

### Conceptos Clave

- **Documentos:** Son objetos JSON que contienen datos estructurados.
- **Colecciones:** Agrupaciones de documentos.
- **Base de datos:** Contenedor para colecciones.

### Modelado de Datos

- MongoDB permite modelar datos de manera flexible.
- Ejemplo de un documento para datos meteorológicos:
  ```json
  {
      "zip": "12345",
      "temperature": 23.4,
      "description": "Sunny"
  }

## Mongoose

Mongoose es una biblioteca de modelado para MongoDB que proporciona una capa de abstracción para definir esquemas y modelos.

### Conexión a MongoDB

Mongoose maneja conexiones mediante un pool, lo que optimiza el acceso.

```ts
import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGO_URI || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export default connectDB;
```

### Esquemas y Modelos

- **Esquema**: Define la estructura de un documento.

    ```ts
    const WeatherSchema = new mongoose.Schema({
        zip: { type: String, required: true, unique: true },
        temperature: { type: Number },
        description: { type: String },
    });

    ```

- **Modelo:** Interfaz para interactuar con la base de datos.

    ```ts
    const Weather = mongoose.model('Weather', WeatherSchema);
    export default Weather;
    ```

## Apollo Server

Apollo Server es una herramienta para construir APIs GraphQL en Node.js.

### Configuración en Next.js

Configurar Apollo Server en Next.js requiere usar un middleware para conectar con MongoDB.

```ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import dbConnect from './db-connect';

const server = new ApolloServer({ resolvers, typeDefs });
const handler = startServerAndCreateNextHandler(server);

const connectDB = (fn) => async (req, res) => {
    await dbConnect();
    return fn(req, res);
};

export default connectDB(handler);

```

### Middlewares

- CORS: Controla el acceso a la API.

    ```ts

    const allowCors = (fn) => async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', '*');
        return fn(req, res);
    };
    ```
