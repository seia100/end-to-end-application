# Conceptos y Palabras Clave para la Actividad de Pruebas

## **1. Pruebas Unitarias**
- **Definición:**  
    Verificación de partes específicas del código (funciones, módulos) de forma aislada.
- **Herramienta:**  
    Uso de Jest para validar que las funciones devuelvan los resultados esperados.
- **Palabras clave:**  
    - `test()`: Función principal para definir pruebas en Jest.
    - `expect()`: Método de Jest para realizar afirmaciones.
    - `jest.fn()`: Para simular funciones específicas durante las pruebas.

---

## **2. Spies y Mocks**
- **Spies:**  
    - Permiten observar el comportamiento de funciones reales, verificando cuántas veces se llaman, con qué argumentos, etc.
    - **Ejemplo:** `jest.spyOn(mongoose, "connect")`.
- **Mocks:**  
    - Sustituyen partes del sistema con implementaciones simuladas controladas.
    - **Ejemplo:** Mockear un modelo de Mongoose con `jest.mock`.

- **Palabras clave:**  
    - `jest.spyOn`: Crear un "espía" para monitorizar llamadas a funciones.
    - `jest.mock`: Reemplazar módulos o funciones con versiones simuladas.

---

## **3. Configuración de Entornos de Prueba**
- **Definición:**  
    Preparar un entorno controlado para ejecutar pruebas, aislando el código del entorno de producción.
- **Herramienta:**  
    MongoMemoryServer para simular una base de datos MongoDB en memoria.
- **Palabras clave:**  
    - `@jest-environment node`: Configuración de entorno para pruebas de backend.
    - `MongoMemoryServer.create()`: Inicia un servidor MongoDB en memoria.

---

## **4. Estructura de Carpetas de Pruebas**
- **Definición:**  
    Organización de pruebas dentro de un proyecto para facilitar el mantenimiento.
- **Ejemplo de estructura:**
    ```plaintext
    __tests__/
    ├── middleware/
    │   └── db-connect.test.ts
    ├── mongoose/
    │   └── services.test.ts
    └── pages/
        └── api/
            └── weather/
                └── zipcode.e2e.test.ts
    ```

---

## **5. Pruebas End-to-End (E2E)**
- **Definición:**  
    Validan que todos los componentes de una aplicación funcionen juntos desde el inicio hasta el final.
- **Palabras clave:**  
    - `fetch`: Realizar solicitudes HTTP dentro de las pruebas.
    - **Endpoint:** `/api/v1/weather/[zipcode]`.

---

## **6. Cobertura de Código**
- **Definición:**  
    Proporción del código fuente que está cubierta por las pruebas.
- **Palabras clave:**  
    - **% Stmts:** Porcentaje de declaraciones ejecutadas.
    - **% Branch:** Cobertura de ramas de control (if/else).
    - **% Funcs:** Funciones probadas.
    - **% Lines:** Líneas ejecutadas.

---

## **7. Pruebas de Instantáneas**
- **Definición:**  
    Validan que el resultado renderizado de un componente no cambie inesperadamente.
- **Herramientas:**  
    - `react-test-renderer`: Para renderizar componentes de React en pruebas.
    - `toMatchSnapshot()`: Compara el resultado actual con una instantánea guardada.
- **Palabras clave:**  
    - `act`: Simula interacciones con el componente.
    - `create`: Renderiza un componente en las pruebas.

---

## **8. Servicios y Modelos**
- **Definición:**  
    Funciones que interactúan con modelos de base de datos.
- **Palabras clave:**  
    - `findOne`: Busca un documento en la base de datos.
    - `create`: Crea un nuevo documento.
    - `updateOne`: Actualiza un documento.
    - `deleteOne`: Elimina un documento.

---

## **9. Reportes de Pruebas**
- **Definición:**  
    Salida generada por Jest que muestra los resultados de las pruebas.
- **Palabras clave:**  
    - `PASS`: Indica que una prueba fue exitosa.
    - `FAIL`: Indica que una prueba falló.
    - **Cobertura:** Resumen de líneas, funciones y ramas probadas.

---

# **Relaciones Entre Temas**
1. **Pruebas Unitarias, Spies y Mocks:**  
    - Las pruebas unitarias a menudo usan mocks para reemplazar dependencias y spies para verificar interacciones.

2. **Pruebas End-to-End y Servicios:**  
    - Las pruebas E2E dependen de que los servicios y modelos estén correctamente implementados y probados.

3. **Pruebas de Instantáneas y Cobertura:**  
    - Las pruebas de instantáneas aumentan la cobertura al validar la interfaz de usuario y las interacciones.

4. **Configuración de Entornos y Mocks:**  
    - Un entorno aislado y el uso de mocks son esenciales para evitar efectos secundarios en las pruebas.

---

# **Conceptos Fundamentales**
1. **Aislamiento:**  
    - Garantizar que las pruebas no dependan de servicios externos como bases de datos reales.

2. **Reutilización:**  
    - Modularizar las pruebas y los mocks para evitar duplicación de código.

3. **Mantenimiento:**  
    - Estructurar las pruebas y mantener la consistencia con el proyecto principal.
