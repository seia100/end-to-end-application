# Aplicacion de mensajeria con cifrado de extremo a extremo basico

## Descripcion

Crea una aplicacion de mensajeria en tiempo real donde dos usuarios predefinidos puedan enviar y recibir mensajes cifrados de extremo a exptremo usanado OpenPGP. utiliza Socket.IO para la comunicacion en tiempo real, node.js en el backend y reac con ts en el fronted. Implementa autenticacion basica para los usuarios. almacena las claves y los mensajes cifrados en mongodb con mongoose. conteneriza la app con dockerfile separados para bacend y frontend

### Desafio

Gestionar el cifrado en tiempo real de manera eficiente, asegurar la sincronizacion de claves entre dos usuarios, evitar condiciones de carrera.

## Indice
- [Aplicacion de mensajeria con cifrado de extremo a extremo basico](#aplicacion-de-mensajeria-con-cifrado-de-extremo-a-extremo-basico)
  - [Descripcion](#descripcion)
    - [Desafio](#desafio)
  - [Indice](#indice)
  - [**Instalación de Dependencias para el Backend**](#instalación-de-dependencias-para-el-backend)
    - [**1. Dependencias del Proyecto**](#1-dependencias-del-proyecto)
    - [**2. Dependencias de Desarrollo**](#2-dependencias-de-desarrollo)
      - [**3. Dependencias para Pruebas**](#3-dependencias-para-pruebas)
      - [**Instalación Completa**](#instalación-completa)
        - [Resumen de las dependencias](#resumen-de-las-dependencias)
  - [Estructura](#estructura)
    - [Backend](#backend)
      - [Estructura del backend](#estructura-del-backend)
      - [Explicacion de codigos](#explicacion-de-codigos)
        - [sockets.ts](#socketsts)
        - [Message.ts](#messagets)
        - [messageService.ts](#messageservicets)
        - [logger.ts](#loggerts)
        - [errorHandler.ts](#errorhandlerts)
        - [authController.ts](#authcontrollerts)
      - [Pruebas](#pruebas)
        - [Archivo: `src/tests/auth.test.ts`](#archivo-srctestsauthtestts)

## **Instalación de Dependencias para el Backend**

### **1. Dependencias del Proyecto**
Estas son las librerías necesarias para que tu backend funcione correctamente en producción.

    ```bash
    npm install express cors mongoose bcrypt openpgp socket.io
    ```

### **2. Dependencias de Desarrollo**
    Estas son útiles para la etapa de desarrollo y no serán necesarias en producción.

    ```bash
    npm install --save-dev typescript @types/node @types/express nodemon ts-node
    ```

#### **3. Dependencias para Pruebas**
    Estas son necesarias para escribir y ejecutar pruebas unitarias y de integración.

    ```bash
    npm install --save-dev jest @types/jest mongodb-memory-server supertest @types/supertest
    ```

---

#### **Instalación Completa**

Si deseas instalar todas las dependencias (producción y desarrollo) de una vez, ejecuta los comandos combinados:

```bash
npm install express cors mongoose bcrypt openpgp socket.io
npm install --save-dev typescript @types/node @types/express nodemon ts-node jest @types/jest mongodb-memory-server supertest @types/supertest
```

##### Resumen de las dependencias


## Estructura

La aplicacion esta dividida en dos: tanto backend como frontend. Es por ello que nos centraremos primero en el backend

Ademas va a tener una onfiguracion global

### Backend

Primero vamos a preparar el entorno y poder tener nuestros files y dependencias anecesarias.

1. Inicializa un proyecto de Node.js

    ```shell
    mkdir backend
    cd backend

    npm init -y
    ## Esto generará un archivo package.json básico.

    ```

2. Instala las dependencias necesarias

    ```shell
    npm install express mongoose socket.io cors bcrypt dotenv openpgp
    npm install --save-dev typescript @types/node @types/express @types/socket.io ts-node nodemon

    ```

    - **Dependencias principales:**

        - `express:` framework para manejar peticiones HTTP.
        - `mongoose`: conexión y manejo de MongoDB.
        - `socket.io:` para comunicación en tiempo real.
        - `cors`: para habilitar CORS.
        - `bcrypt`: para hash de contraseñas.
        - `dotenv`: para manejar variables de entorno.
        - `openpgp`: para cifrado y descifrado.

    - **Dependencias de desarrollo:**

        `typescript`: lenguaje tipado.
        `@types/...:` definiciones de tipo para TypeScript.
        `ts-node`: para ejecutar TypeScript directamente.
        `nodemon`: para reiniciar el servidor en desarrollo.

3. Crea un archivo tsconfig.json

    ```shell
    npx tsc --init
    ```

    Lo que se deberia ver en la siguiente estructura

    ```shell

    {
    "compilerOptions": {
        "target": "ES6",
        "module": "CommonJS",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist"
    },
    "include": ["src"],
    "exclude": ["node_modules"]
    }
    ```

4. Configura el script de desarrollo en package.json

    En el archivo package.json, añade el siguiente script

    ```json
    "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts"
    }
    ```

#### Estructura del backend

```shell
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                // Configuración de la base de datos
│   │   │   ├── keys.ts              // Generación y manejo de claves OpenPGP
│   │   ├── controllers/
│   │   │   ├── authController.ts    // Controlador de autenticación
│   │   │   ├── messageController.ts // Controlador de mensajes
│   │   ├── models/
│   │   │   ├── User.ts              // Modelo de usuario
│   │   │   ├── Message.ts           // Modelo de mensaje
│   │   ├── routes/
│   │   │   ├── authRoutes.ts        // Rutas de autenticación
│   │   │   ├── messageRoutes.ts     // Rutas de mensajes
│   │   ├── utils/
│   │   │   ├── cryptoUtils.ts       // Utilidades para cifrado/descifrado
│   │   ├── app.ts                   // Configuración del servidor Express
│   │   ├── server.ts                // Inicialización del servidor y Socket.IO
│   ├── Dockerfile                   // Dockerfile para el backend
│   ├── package.json
│   ├── tsconfig.json
| ...
```
Para crear de manera mas rapida todos estos archivos y directorios ejecutamos lo siguienten en la linea de comandos.

```shell
mkdir -p src/{config,controllers,middlewares,models,routes,services,utils} && \
touch src/config/{db.ts,env.ts,socket.ts} \
src/controllers/{authController.ts,messageController.ts} \
src/middlewares/{authMiddleware.ts,errorHandler.ts} \
src/models/{User.ts,Message.ts} \
src/routes/{authRoutes.ts,messageRoutes.ts} \
src/services/{authService.ts,messageService.ts} \
src/utils/{cryptoUtils.ts,logger.ts} \
src/{app.ts,server.ts} \
.env Dockerfile

```

#### Explicacion de codigos

##### sockets.ts

Esta función configura Socket.IO para la comunicación en tiempo real. Crea una nueva instancia de Socket.IO, escucha el evento connection para nuevos clientes, y maneja los eventos send_message y disconnect. Cuando un cliente envía un mensaje, el servidor lo reenvía al destinatario especificado en data.receiver.

Puntos clave:

    Configuración de CORS: Configura CORS para permitir conexiones desde cualquier origen. En producción, es importante restringir el origen a los dominios permitidos.

    Manejo de conexión: Maneja la conexión de nuevos clientes.

    Envío de mensajes: Maneja el evento send_message y reenvía el mensaje al destinatario.

    Desconexión: Maneja la desconexión de clientes.

Consideraciones de seguridad:

    Origen CORS: En producción, no se debe usar origin: '*'. Se debe especificar una lista de orígenes permitidos para evitar conexiones no autorizadas.

    Autenticación: Implementar autenticación para verificar la identidad de los clientes.

    Autorización: Implementar autorización para controlar qué clientes pueden enviar mensajes a quién.

    Validación de datos: Validar los datos recibidos de los clientes para prevenir ataques de inyección y otros problemas de seguridad.

Ejemplo con orígenes restringidos:

```ts
// ...

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://mi-aplicacion.com'], // Lista de orígenes permitidos
    },
});

// ...
```

**Mejora potencial:**
Utilizar salas o namespaces para organizar la comunicación entre clientes. Esto permite una gestión más eficiente de la comunicación en aplicaciones con múltiples usuarios y grupos.

Ejemplo con salas:

```ts
// ... dentro del evento 'connection'

socket.join(user.id); // El usuario se une a una sala con su ID

socket.on('send_message', (data) => {
    // Envía el mensaje a la sala del destinatario
    io.to(data.receiver).emit('receive_message', data); 
});

// ...
```

##### Message.ts
Explicación de la estrategia:

Este código define el esquema y el modelo para los mensajes. Utiliza mongoose.Schema.Types.ObjectId y ref: 'User' para crear referencias a los usuarios remitente y destinatario. El campo content almacena el contenido del mensaje, que se asume que está cifrado.

Puntos clave:

    Referencias a usuarios: Utiliza ObjectId y ref para referenciar a los usuarios.

    Contenido cifrado: El campo content almacena el contenido cifrado del mensaje.

    Timestamps: Agrega automáticamente campos createdAt y updatedAt.

Consideraciones:

    Índices: Agregar índices a los campos sender y receiver puede mejorar el rendimiento de las consultas que buscan mensajes por remitente o destinatario.

    ```ts
    // ... dentro del esquema

    messageSchema.index({ sender: 1 });
    messageSchema.index({ receiver: 1 });

    // ...
    ```

    Tamaño del contenido: Si se espera que los mensajes sean muy largos, se podría considerar utilizar un tipo de datos diferente para el campo content, como mongoose.Schema.Types.LongString.

    Metadatos adicionales: Se podrían agregar campos adicionales al esquema para almacenar metadatos del mensaje, como el estado de lectura, la fecha de entrega, etc.

    Ejemplo de metadatos adicionales

    ```ts
    // ...

    const messageSchema = new mongoose.Schema({
        // ... (campos existentes)

        readAt: { type: Date }, // Fecha de lectura del mensaje
        deliveredAt: { type: Date }, // Fecha de entrega del mensaje

    }, {
        timestamps: true,
    });

    // ...    
    ```

##### messageService.ts

Función `createMessage`:

 *   **Objetivo:** Crear un nuevo mensaje en la base de datos.
 *   **Parámetros:**
     *   `sender`: Identificador del usuario que envía el mensaje.
     *   `receiver`: Identificador del usuario que recibe el mensaje.
     *   `content`:  Contenido del mensaje.
 *   **Estrategia:**
     *   Validación de parámetros de entrada para asegurar que no falte información esencial.
     *   Uso del modelo `Message` y su método `create` para persistir el mensaje en la base de datos.
 *   **Retorno:**  El objeto `message` recién creado.

Función `getMessagesBetweenUsers`:

*   **Objetivo:** Recuperar los mensajes intercambiados entre dos usuarios.
*   **Parámetros:**
    *   `userId1`: Identificador del primer usuario.
    *   `userId2`: Identificador del segundo usuario.
*   **Estrategia:**
    *   Utilización del operador `$or` de MongoDB para buscar mensajes donde `userId1` y `userId2` sean emisor o receptor en cualquier combinación.
    *   Ordenamiento de los mensajes por la fecha de creación (`createdAt`) en orden ascendente para mostrar la conversación cronológicamente.
*   **Retorno:** Un array de objetos `message` que representan los mensajes intercambiados entre los dos usuarios.

##### logger.ts

Función `logger`:

*   **Objetivo:** Registrar mensajes en la consola con un timestamp y un nivel de severidad.
*   **Parámetros:**
    *   `message`: El mensaje a registrar (string).
    *   `level`:  El nivel de severidad del mensaje.  Puede ser 'info', 'warn' o 'error'.  Por defecto es 'info'.
*   **Estrategia:**
    *   Se obtiene un timestamp usando `new Date().toISOString()` para registrar la fecha y hora del mensaje.
    *   Se formatea la salida del log para incluir el timestamp, el nivel de severidad (en mayúsculas) y el mensaje.
    *   Se utiliza `console.log` para imprimir el mensaje formateado en la consola.
*   **Retorno:**  No retorna ningún valor (void).

##### errorHandler.ts

Función `errorHandler`:

*   **Objetivo:** Manejar errores de manera centralizada en una aplicación Express.
*   **Parámetros:**
    *   `err`: El objeto de error.
    *   `req`: El objeto de solicitud (Request).
    *   `res`: El objeto de respuesta (Response).
    *   `next`: La función para pasar al siguiente middleware (NextFunction).  No se usa en este caso, ya que es un manejador de errores final.
*   **Estrategia:**
    *   Se extrae el código de estado HTTP del objeto `err`. Si no existe, se utiliza 500 (Internal Server Error) por defecto.
    *   Se extrae el mensaje de error del objeto `err`. Si no existe, se utiliza "Error interno del servidor" por defecto.
    *   Se registra el error en la consola utilizando `console.error`. En un entorno de producción, se recomienda usar un logger más robusto.
    *   Se envía una respuesta JSON al cliente con el código de estado y el mensaje de error.
*   **Retorno:** No retorna ningún valor (void).  Envía una respuesta al cliente.

##### authController.ts

Función `register`:

*   **Objetivo:** Registrar un nuevo usuario.
*   **Parámetros:** `req`, `res`, `next` (objetos de Express).
*   **Estrategia:**
    *   Extraer `username` y `password` del cuerpo de la solicitud (`req.body`).
    *   Validar que `username` y `password` no estén vacíos.  Si lo están, retornar una respuesta 400 (Bad Request).
    *   Llamar a la función `registerUser` del servicio `authService` para realizar el registro.
    *   Si el registro es exitoso, retornar una respuesta 201 (Created) con un mensaje de éxito y los datos del usuario.
    *   Si ocurre un error, pasarlo al middleware de manejo de errores usando `next(error)`.

Función `login`:

*   **Objetivo:** Iniciar sesión un usuario.
*   **Parámetros:** `req`, `res`, `next` (objetos de Express).
*   **Estrategia:**
    *   Extraer `username` y `password` del cuerpo de la solicitud (`req.body`).
    *   Validar que `username` y `password` no estén vacíos. Si lo están, retornar una respuesta 400 (Bad Request).
    *   Llamar a la función `authenticateUser` del servicio `authService` para realizar la autenticación.
    *   Si la autenticación es exitosa, retornar una respuesta 200 (OK) con un mensaje de éxito y los datos del usuario.
    *   Si ocurre un error, pasarlo al middleware de manejo de errores usando `next(error)`.


#### Pruebas

Es importante instalar algunas dependencias para probar

```shell
npm install --save-dev jest supertest @types/jest @types/supertest mongodb-memory-server
```

Configura Jest Crea un archivo llamado jest.config.js:

```js 
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
};
```

Ademas ejecutamos pruebas cons jest

```sheel 
npx jest
```
Crea pruebas unitarias y de integración
##### Archivo: `src/tests/auth.test.ts`

Conjunto de pruebas: Auth API

*   **Objetivo:** Verificar el correcto funcionamiento de las rutas de autenticación.
*   **Configuración:**
    *   `beforeAll`: Se conecta a una base de datos de prueba (`test-db`) antes de ejecutar las pruebas.  Esto asegura un entorno limpio para cada prueba.
    *   `afterAll`: Se desconecta de la base de datos después de ejecutar todas las pruebas.  Esto libera recursos y evita problemas con conexiones abiertas.

Prueba: Debería registrar un usuario correctamente

    *   **Objetivo:** Verificar que la ruta `/api/auth/register` registre un nuevo usuario correctamente.
    *   **Estrategia:**
        *   Se envía una solicitud POST a `/api/auth/register` con un nombre de usuario y contraseña válidos.
        *   Se verifica que la respuesta tenga un código de estado 201 (Created).
        *   Se verifica que la respuesta contenga la propiedad `user` con el nombre de usuario esperado.

Prueba: Debería rechazar el registro si el usuario ya existe

    *   **Objetivo:** Verificar que la ruta `/api/auth/register` maneje correctamente el caso de un usuario duplicado.
    *   **Estrategia:**
        *   Se envía una solicitud POST a `/api/auth/register` con un nombre de usuario que ya existe en la base de datos (el mismo que se usó en la prueba anterior).
        *   Se verifica que la respuesta tenga un código de estado 409 (Conflict), indicando que el recurso ya existe.

