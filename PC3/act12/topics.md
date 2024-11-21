# Tópicos Relevantes para Investigación

1. Node.js y su Ecosistema

    - ¿Qué es Node.js? Su arquitectura basada en eventos y modelo no bloqueante.
    - Módulos principales de Node.js (fs, http, path).
    - Uso del gestor de paquetes npm para gestionar dependencias.
    - Comparación entre CommonJS (require) y ES Modules (import/export).

2. Fundamentos de Express

    - Características principales de Express como framework web minimalista.
    - Configuración inicial de una aplicación Express.
    - Diferencias entre rutas estáticas y dinámicas.
    - El uso de middleware en Express:
        - Middleware integrado (e.g., express.json(), express.urlencoded()).
        - Middleware de terceros (e.g., morgan, cors).
        - Middleware personalizado.

3. Métodos HTTP y Rutas

    - Métodos HTTP comunes: GET, POST, PUT, DELETE.
    - Cómo manejar rutas dinámicas (/users/:id).
    - Parámetros de consulta (req.query) y parámetros en la URL (req.params).
    - Diferencias entre app.get, app.post, app.all y app.use.

4. Motores de Plantillas

    - ¿Qué son y cómo funcionan los motores de plantillas?
    - Diferencias entre renderizado en el servidor y aplicaciones SPA.
    - Motores populares compatibles con Express:
        - EJS: Interpolación de datos en HTML.
        - Pug: Sintaxis minimalista para plantillas.
    - Ventajas del uso de plantillas frente a HTML estático.

5. Manejo de Solicitudes y Respuestas HTTP

    - Objeto req (Request): Estructura y propiedades clave.
        - Captura de datos enviados por el cliente (req.body, req.query, req.params).
    - Objeto res (Response): Métodos importantes.
        - Enviar respuestas (res.send(), res.json()).
        - Establecer códigos de estado (res.status()).
        - Redirecciones (res.redirect()).
    - Función next y su papel en la cadena de middleware.

6. Herramientas y Utilidades Avanzadas

    - Uso de express-generator para iniciar proyectos rápidamente.
    - Configuración de rutas y estructura de carpetas en aplicaciones grandes.
    - Depuración con debug:
        - Cómo habilitar depuración detallada con variables de entorno (DEBUG=*).

7. Middleware y Seguridad

    - Qué es middleware y cómo se usa en Express.
    - Protección de rutas con autenticación y autorización.
    - Uso de middleware como helmet y cors para mejorar la seguridad.
    - Validación de datos de entrada con bibliotecas como Joi o express-validator.

8. Envío de Archivos y Contenido Estático

    - Servir contenido estático usando express.static.
    - Métodos para enviar archivos al cliente (res.sendFile, res.download).
    - Encabezados HTTP y su configuración (res.set()).

9. Buenas Prácticas de Desarrollo

    - Separación de responsabilidades:
        - Uso de controladores para manejar lógica de rutas.
        - Organización de archivos en aplicaciones escalables.
    - Gestión de errores con middleware de manejo de errores.
    - Pruebas automatizadas para rutas y middleware.

10. Integración con Frontend

    - Cómo conectar un cliente React o Angular con un servidor Express.
    - Comunicación entre frontend y backend usando APIs REST.
    - Configuración de CORS para solicitudes desde otros dominios.

11. Optimización y Escalabilidad

    - Cómo manejar múltiples rutas y grandes volúmenes de solicitudes.
    - Middleware para compresión (compression) y registro (morgan).
    - Uso de cluster para aprovechar múltiples núcleos del servidor.

12. Autenticación y Manejo de Sesiones

    - Métodos de autenticación en Express:
        - Sesiones y cookies.
        - Tokens JWT (JSON Web Tokens).
    - Integración con bibliotecas como passport para autenticación.

13. Implementación y Despliegue

    - Preparar una aplicación Express para producción:
        - Configuración de variables de entorno con dotenv.
        - Uso de un servidor proxy como Nginx.
    - Despliegue en servicios como Heroku, AWS, o Vercel.
