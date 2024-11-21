# Tópicos Teóricos Relevantes para la Actividad

## **1. GraphQL: Conceptos Básicos**
- ¿Qué es GraphQL y cómo se diferencia de REST?
- Ventajas de usar GraphQL para gestionar datos.
- Componentes principales de GraphQL:
  - **Esquema (`typeDefs`)**.
  - **Resolvers**.
  - **Consultas (`Query`) y Mutaciones (`Mutation`)**.
- Operaciones soportadas: consultas, mutaciones y suscripciones.

---

## **2. Next.js y GraphQL**
- Introducción a Next.js y su enfoque de renderizado híbrido (SSR/SSG).
- Cómo integrar un servidor GraphQL en Next.js.
- Uso de `@apollo/server` y `@as-integrations/next` para conectar Apollo Server con Next.js.

---

## **3. Esquemas en GraphQL**
- Definición y uso de `typeDefs` en GraphQL.
- Tipos de datos en GraphQL:
  - Tipos escalares: `String`, `Int`, `Float`, `Boolean`, `ID`.
  - Tipos personalizados.
- Definición de consultas (`Query`) y mutaciones (`Mutation`).
- Validación de entradas con `input`.

---

## **4. Resolvers en GraphQL**
- ¿Qué son los resolvers y cómo funcionan?
- Resolver funciones para consultas y mutaciones.
- Uso de datos estáticos (e.g., JSON) versus bases de datos reales.
- Manejo de datos anidados en resolvers.

---

## **5. Apollo Server**
- Configuración básica de Apollo Server.
- Explorador Sandbox de Apollo para probar consultas.
- Manejo de encabezados CORS en Apollo Server.
- Configuración de middleware para autenticación y autorización.

---

## **6. Datos y Persistencia**
- Uso de datos JSON como fuente de datos.
- Comparación entre datos estáticos y bases de datos dinámicas.
- Cómo extender los datos para nuevos casos de uso:
  - Agregar tipos de datos adicionales.
  - Paginación y filtrado en consultas.

---

## **7. Consultas Avanzadas en GraphQL**
- Consultas con selección de campos.
- Uso de variables en consultas.
- Consultas anidadas para relaciones entre datos.
- Fragmentos para reutilización de campos.
- Alias y directivas (e.g., `@include`, `@skip`) en consultas.

---

## **8. Mutaciones en GraphQL**
- Diferencias entre consultas y mutaciones.
- Cómo realizar mutaciones para modificar datos.
- Implementar validaciones en mutaciones (e.g., evitar duplicados).
- Actualización de datos y manejo de errores en mutaciones.

---

## **9. CORS y Seguridad en APIs**
- Concepto de CORS (Cross-Origin Resource Sharing).
- Configuración de encabezados CORS en un servidor GraphQL.
- Problemas comunes con CORS y cómo solucionarlos.
- Autenticación básica con tokens en GraphQL.

---

## **10. Middleware en Next.js**
- Uso de middleware para procesar solicitudes antes de llegar a los resolvers.
- Middleware para autenticación y autorización.
- Configuración de encabezados HTTP con middleware.

---

## **11. Optimización de Consultas**
- Implementación de paginación en consultas GraphQL.
- Filtrado y ordenamiento de datos en resolvers.
- Uso eficiente de recursos con resolvers dinámicos.

---

## **12. Herramientas y Depuración**
- Uso del explorador Apollo para probar y depurar consultas.
- Comparación entre herramientas como Postman y Apollo Sandbox.
- Errores comunes en GraphQL y cómo solucionarlos.

---

## **13. Extensiones del Esquema**
- Agregar nuevos tipos y campos en el esquema.
- Consultas combinadas que devuelven múltiples tipos de datos.
- Uso de referencias cruzadas en tipos de datos (e.g., `User` y `LocationWeatherType`).

---

## **14. Consultas y Pruebas**
- Escritura de consultas complejas y casos de prueba para GraphQL.
- Pruebas de API con herramientas como Jest o Mocha.
- Validación de resultados esperados en el explorador Apollo.

---

## **Relación con la Actividad**
Cada uno de estos tópicos corresponde a un paso importante de la actividad:
- **GraphQL resolvers:** Se exploran al definir cómo se gestionan las consultas y mutaciones.
- **Esquemas:** Son fundamentales para estructurar los datos disponibles en la API.
- **Middleware y CORS:** Son clave para garantizar que la API sea segura y accesible.
- **Consultas anidadas y fragmentos:** Son relevantes para manejar relaciones entre datos.

