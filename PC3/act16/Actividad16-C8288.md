### Actividad 16: Agregar casos de pruebas usando Jest

#### **Objetivo**
Aprender a implementar pruebas unitarias, de instantáneas y `end-to-end` en una aplicación del clima utilizando Jest. Además, entender cómo utilizar `spies` y `mocks` para aislar y verificar componentes específicos de la aplicación.

#### **Requisitos previos**
- Conocimiento básico de **TypeScript** y **JavaScript**.
- Familiaridad con **React** y **Mongoose**.
- Comprensión de conceptos básicos de **pruebas unitarias** y **Jest**.
- Proyecto de la **aplicación del clima** ya configurado con una estructura similar a la mencionada en el ejercicio.

#### **Contenido de la actividad**
1. **Configuración del entorno de pruebas para el middleware**
2. **Escribir pruebas unitarias para `dbConnect`**
3. **Crear mocks para los servicios de Mongoose**
4. **Escribir pruebas unitarias para los servicios del clima**
5. **Ejecutar y verificar las pruebas**


#### **1. Configuración del entorno de pruebas para el middleware**

Antes de comenzar a escribir las pruebas, es esencial configurar el entorno de pruebas correctamente.

**Pasos:**

1. **Crear la carpeta de pruebas:**
   - Navega a la carpeta raíz de tu proyecto.
   - Crea una nueva carpeta llamada `__tests__`.
   - Dentro de `__tests__`, crea una subcarpeta llamada `middleware`.

2. **Crear el archivo de pruebas para `dbConnect`:**
   - Dentro de la carpeta `middleware`, crea un archivo llamado `db-connect.test.ts`.

3. **Agregar el código de prueba inicial:**
   - Abre `db-connect.test.ts` y copia el siguiente código:

     ```typescript
     /**
     * @jest-environment node
     */

     import dbConnect from "../../middleware/db-connect";
     import mongoose from "mongoose";
     import { MongoMemoryServer } from "mongodb-memory-server";

     describe("dbConnect", () => {
         let connection: any;

         afterEach(async () => {
             jest.clearAllMocks();
             await connection.stop();
             await mongoose.disconnect();
         });

         afterAll(async () => {
             jest.restoreAllMocks();
         });

         test("calls MongoMemoryServer.create()", async () => {
             const spy = jest.spyOn(MongoMemoryServer, "create");
             connection = await dbConnect();
             expect(spy).toHaveBeenCalled();
         });

         test("calls mongoose.disconnect()", async () => {
             const spy = jest.spyOn(mongoose, "disconnect");
             connection = await dbConnect();
             expect(spy).toHaveBeenCalled();
         });

         test("calls mongoose.connect()", async () => {
             const spy = jest.spyOn(mongoose, "connect");
             connection = await dbConnect();
             const MONGO_URI = connection.getUri();
             expect(spy).toHaveBeenCalledWith(MONGO_URI, { dbName: "Weather" });
         });
     });
     ```

4. **Modificar `dbConnect` para retornar `mongoServer`:**
   - Abre el archivo `db-connect.ts` ubicado en la carpeta `middleware`.
   - Asegúrate de que la función `dbConnect` retorne `mongoServer` justo antes del cierre de la función. Por ejemplo:

     ```typescript
     const dbConnect = async () => {
         const mongoServer = await MongoMemoryServer.create();
         const uri = mongoServer.getUri();
         await mongoose.connect(uri, { dbName: "Weather" });
         return mongoServer; // Agregar esta línea
     };
     ```

#### **2. Escribir pruebas unitarias para `dbConnect`**

Las pruebas unitarias verifican que cada parte de tu aplicación funcione correctamente de forma aislada.

**Descripción de las pruebas:**

- **Prueba 1:** Verifica que `MongoMemoryServer.create()` sea llamado.
- **Prueba 2:** Verifica que `mongoose.disconnect()` sea llamado.
- **Prueba 3:** Verifica que `mongoose.connect()` sea llamado con los argumentos correctos.

**Pasos:**

1. **Revisar el código de prueba:**
   - Asegúrate de que el código en `db-connect.test.ts` siga el patrón de preparar, actuar y afirmar.
   - Cada prueba utiliza `jest.spyOn` para espiar métodos específicos y luego verifica si fueron llamados correctamente.

2. **Ejecutar las pruebas:**
   - En la terminal, ejecuta el comando:

     ```bash
     npm test
     ```

   - Todas las pruebas deberían pasar con una cobertura de prueba del 100%.

#### **3. Crear mocks para los servicios de Mongoose**

Los mocks permiten aislar las partes de tu aplicación que deseas probar, reemplazando las dependencias reales por simulaciones controladas.

**Pasos:**

1. **Crear el mock de `WeatherModel`:**
   - Navega a `mongoose/weather/` dentro de tu proyecto.
   - Crea una carpeta llamada `__mocks__`.
   - Dentro de `__mocks__`, crea un archivo llamado `model.ts`.
   - Copia y pega el siguiente código en `model.ts`:

     ```typescript
     import { WeatherInterface } from "../interface";

     type param = {
         [key: string]: string;
     };

     const WeatherModel = {
         create: jest.fn((newData: WeatherInterface) => Promise.resolve(true)),
         findOne: jest.fn(({ zip: paramZip }: param) => Promise.resolve(true)),
         updateOne: jest.fn(({ zip: paramZip }: param, newData: WeatherInterface) =>
             Promise.resolve(true)
         ),
         deleteOne: jest.fn(({ zip: paramZip }: param) => Promise.resolve(true))
     };
     export default WeatherModel;
     ```

   - **Descripción del mock:**
     - Implementa `WeatherInterface`.
     - Define un tipo `param` para tipificar los parámetros.
     - Crea un objeto `WeatherModel` con métodos `create`, `findOne`, `updateOne` y `deleteOne` que son funciones simuladas (`jest.fn`) que devuelven una promesa resuelta con `true`.

#### **4. Escribir pruebas unitarias para los servicios del clima**

Ahora, escribiremos pruebas unitarias para los servicios que interactúan con `WeatherModel`.

**Pasos:**

1. **Crear el archivo de pruebas para los servicios:**
   - Dentro de la carpeta `__tests__/mongoose/weather/`, crea un archivo llamado `services.test.ts`.

2. **Agregar el código de prueba para los servicios:**
   - Abre `services.test.ts` y copia el siguiente código:

     ```typescript
     /**
     * @jest-environment node
     */
     import { WeatherInterface } from "../../../mongoose/weather/interface";
     import {
         findByZip,
         storeDocument,
         updateByZip,
         deleteByZip,
     } from "../../../mongoose/weather/services";

     import WeatherModel from "../../../mongoose/weather/model";

     jest.mock("../../../mongoose/weather/model");

     describe("the weather services", () => {
         let doc: WeatherInterface = {
             zip: "test",
             weather: "weather",
             tempC: "00",
             tempF: "01",
             friends: []
         };

         afterEach(async () => {
             jest.clearAllMocks();
         });

         afterAll(async () => {
             jest.restoreAllMocks();
         });

         describe("API storeDocument", () => {
             test("returns true", async () => {
                 const result = await storeDocument(doc);
                 expect(result).toBeTruthy();
             });

             test("passes the document to Model.create()", async () => {
                 const spy = jest.spyOn(WeatherModel, "create");
                 await storeDocument(doc);
                 expect(spy).toHaveBeenCalledWith(doc);
             });
         });

         describe("API findByZip", () => {
             test("returns true", async () => {
                 const result = await findByZip(doc.zip);
                 expect(result).toBeTruthy();
             });

             test("passes the zip code to Model.findOne()", async () => {
                 const spy = jest.spyOn(WeatherModel, "findOne");
                 await findByZip(doc.zip);
                 expect(spy).toHaveBeenCalledWith({ zip: doc.zip });
             });
         });

         describe("API updateByZip", () => {
             test("returns true", async () => {
                 const result = await updateByZip(doc.zip, doc);
                 expect(result).toBeTruthy();
             });

             test("passes the zip code and the new data to Model.updateOne()", async () => {
                 const spy = jest.spyOn(WeatherModel, "updateOne");
                 const result = await updateByZip(doc.zip, doc);
                 expect(spy).toHaveBeenCalledWith({ zip: doc.zip }, doc);
             });
         });

         describe("API deleteByZip", () => {
             test("returns true", async () => {
                 const result = await deleteByZip(doc.zip);
                 expect(result).toBeTruthy();
             });

             test("passes the zip code Model.deleteOne()", async () => {
                 const spy = jest.spyOn(WeatherModel, "deleteOne");
                 const result = await deleteByZip(doc.zip);
                 expect(spy).toHaveBeenCalledWith({ zip: doc.zip });
             });
         });
     });
     ```

3. **Descripción de las pruebas:**
   - **Mocking del modelo:**
     - Utiliza `jest.mock` para reemplazar el modelo real con el mock que creamos anteriormente.
   - **Definición del documento de prueba:**
     - Crea un documento de prueba `doc` que se utilizará en las pruebas.
   - **Estructura de las pruebas:**
     - Para cada servicio (`storeDocument`, `findByZip`, `updateByZip`, `deleteByZip`), se realizan dos pruebas:
       1. Verificar que la función del servicio retorne `true`.
       2. Verificar que el método correspondiente del `WeatherModel` sea llamado con los argumentos correctos.

#### **5. Ejecutar y verificar las pruebas**

Una vez que hayas configurado todas las pruebas, es momento de ejecutarlas y verificar los resultados.

**Pasos:**

1. **Ejecutar las pruebas:**
   - En la terminal, dentro de la carpeta raíz de tu proyecto, ejecuta:

     ```bash
     npm test
     ```

2. **Interpretar el resultado de las pruebas:**
   - Deberías ver una salida similar a la siguiente:

     ```
     PASS  __tests__/mongoose/weather/services.test.ts
     PASS  __tests__/middleware/db-connect.test.ts

     --------------------|---------|----------|---------|---------|-------------------
     File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
     --------------------|---------|----------|---------|---------|-------------------
     All files           |   83.63 |      100 |   88.23 |   82.35 |
     middleware         |     100 |      100 |     100 |     100 |
       db-connect.test.ts|     100 |      100 |     100 |     100 |
     mongoose/weather.  |   77.41 |      100 |     100 |   75.86 |
       services.test.ts  |   70.83 |      100 |     100 |   70.83 |8,20-22,33-35,43-45
     --------------------|---------|----------|---------|---------|-------------------
     ```

   - **Interpretación:**
     - Todas las pruebas deberían pasar (`PASS`).
     - La cobertura de código debería ser alta, con algunas líneas no cubiertas relacionadas con `console.log(err);`.

3. **Análisis de la cobertura de código:**
   - Observa el reporte de cobertura para identificar las partes del código que no están cubiertas por las pruebas.
   - En este caso, las líneas no cubiertas contienen la salida `console.log(err);`.
   - Para cubrir estas líneas, podrías agregar pruebas adicionales que simulen errores en las llamadas asíncronas.

---

### Continuación - Pruebas end-to-end y de instantáneas en la aplicación del clima

#### **Objetivo**
Expandir la cobertura de pruebas de la aplicación del clima mediante la implementación de una prueba `end-to-end` para la API REST y pruebas de instantáneas para los componentes de la interfaz de usuario utilizando Jest y React Testing Library.

#### **Requisitos previos**
- Haber completado la **actividad: agregar casos de prueba a la aplicación del clima**.
- Tener configurado y ejecutándose el proyecto de la aplicación del clima.
- Familiaridad con **Jest**, **React Testing Library**, y **React Test Renderer**.

#### **Contenido de la actividad**
1. **Realizar una prueba end-to-end de la API REST**
2. **Configurar el entorno para pruebas de instantáneas**
3. **Crear la primera versión de la prueba de instantáneas**
4. **Actualizar la prueba de instantáneas para Cobertura Completa**
5. **Ejecutar y Verificar las Pruebas Adicionales**


#### **1. Realizar una prueba end-to-end de la API REST**

Las pruebas end-to-end verifican que todos los componentes de la aplicación funcionen juntos como se espera. En este caso, probaremos el punto final de la API REST `/v1/weather/[zipcode]` para asegurarnos de que devuelve los datos correctos.

**Pasos:**

#### **1.1. Instalar dependencias necesarias**

Aunque en este ejemplo usaremos `fetch` nativo, es recomendable tener herramientas como `SuperTest` para pruebas más sofisticadas en el futuro. Por ahora, asegúrate de que tu entorno de Node.js soporte `fetch` (a partir de Node.js v17.5).

#### **1.2. Crear el archivo de prueba `End-to-End`**

1. **Crear la carpeta y el archivo de prueba:**
   - Navega a la carpeta `__tests__/pages/api/v1/weather/`.
   - Crea un archivo llamado `zipcode.e2e.test.ts`.

2. **Agregar el código de prueba:**
   - Abre `zipcode.e2e.test.ts` y copia el siguiente código:

     ```typescript
     /**
      * @jest-environment node
      */

     describe("The API /v1/weather/[zipcode]", () => {
         test("returns the correct data for the zipcode 96815", async () => {
             const zip = "96815";
             let response = await fetch(`http://localhost:3000/api/v1/weather/${zip}`);
             let body = await response.json();
             expect(body.zip).toEqual(zip);
         });
     });

     export {};
     ```

   - **Descripción del código:**
     - **Entorno de pruebas:** Se establece el entorno en `node` para simular un entorno de ejecución de Node.js.
     - **Descripción del conjunto de pruebas:** Define un conjunto de pruebas para el punto final `/v1/weather/[zipcode]`.
     - **Caso de prueba:** Verifica que al proporcionar el código postal `96815`, la API devuelve un objeto cuyo campo `zip` coincide con el código proporcionado.
     - **Exportación vacía:** Define el archivo como un módulo ES6.

#### **1.3. Configurar el tiempo de espera de Jest (Opcional)**

Si encuentras errores relacionados con la conexión o el tiempo de espera, ajusta el tiempo de espera de Jest:

- **Agregar la línea de configuración:**
  - En la parte superior de `zipcode.e2e.test.ts`, antes del `describe`, agrega:

    ```typescript
    jest.setTimeout(20000);
    ```

  - Esto aumenta el tiempo de espera de las pruebas a 20,000 ms (20 segundos).

#### **1.4. Ejecutar la prueba `end-to-end`**

1. **Iniciar la aplicación:**
   - Asegúrate de que tu aplicación esté ejecutándose. En la terminal, ejecuta:

     ```bash
     npm run dev
     ```

2. **Ejecutar las pruebas:**
   - En otra terminal, dentro de la carpeta raíz de tu proyecto, ejecuta:

     ```bash
     npm test
     ```

3. **Verificar los resultados:**
   - Deberías ver una salida similar a:

     ```
     PASS  __tests__/pages/api/v1/weather/zipcode.e2e.test.ts

     ---------------------|---------|----------|---------|---------|-------------------
     File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
     ---------------------|---------|----------|---------|---------|-------------------
     All files            |   83.63 |      100 |   88.23 |   82.35 |
     middleware          |     100 |      100 |     100 |     100 |
       db-connect.test.ts |     100 |      100 |     100 |     100 |
     mongoose/weather    |   77.41 |      100 |     100 |   75.86 |
       services.test.ts   |   70.83 |      100 |     100 |   70.83 |8,20-22,33-35,43-45
     pages/api/v1/       |         |          |         |         |
       weather            |     100 |      100 |     100 |     100 |
         [zipcode].ts     |     100 |      100 |     100 |     100 |
     ---------------------|---------|----------|---------|---------|-------------------
     ```

   - **Interpretación:**
     - La prueba debería pasar exitosamente.
     - La cobertura de código para el archivo `[zipcode].ts` debería ser del 100%.


#### **2. Configurar el entorno para pruebas de instantáneas**

Las pruebas de instantáneas verifican que el HTML renderizado de un componente no cambie inesperadamente entre ejecuciones de prueba.

**Pasos:**

#### **2.1. Instalar dependencias para pruebas de instantáneas**

Ejecuta los siguientes comandos para instalar las dependencias necesarias:

```bash
npm install --save-dev jest-environment-jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @types/react-test-renderer react-test-renderer
```

- **Descripción de las dependencias:**
  - `jest-environment-jsdom`: Simula un entorno de navegador para Jest.
  - `@testing-library/react` y `@testing-library/jest-dom`: Proporcionan utilidades para probar componentes de React.
  - `@types/react-test-renderer` y `react-test-renderer`: Permiten renderizar componentes de React para pruebas de instantáneas.

#### **2.2. Actualizar la configuración de Jest**

1. **Abrir `jest.config.js`:**
   - En el directorio raíz de tu proyecto, abre el archivo `jest.config.js`.

2. **Reemplazar el contenido con el código:**

   ```typescript
   const nextJest = require("next/jest");

   const createJestConfig = nextJest({});

   module.exports = createJestConfig(nextJest({}));
   ```

   - **Descripción del código:**
     - **Importación de `next/jest`:** Utiliza la configuración predeterminada de Jest para proyectos Next.js.
     - **Creación de la configuración de Jest:** Crea una configuración personalizada de Jest basada en las propiedades predeterminadas de Next.js.
     - **Exportación de la configuración:** Exporta la configuración para que Jest la utilice.


#### **3. Crear la primera versión de la prueba de instantáneas**

Implementaremos una prueba de instantáneas para el componente de la interfaz de usuario `PageComponentWeather`.

**Pasos:**

#### **3.1. Crear el archivo de prueba de instantáneas**

1. **Crear la carpeta y el archivo de prueba:**
   - Dentro de la carpeta `__tests__/pages/components/`, crea un archivo llamado `weather.snapshot.test.tsx`.

2. **Agregar el código de prueba:**
   - Abre `weather.snapshot.test.tsx` y copia el siguiente código:

     ```typescript
     /**
      * @jest-environment node
      */

     import { act, create } from "react-test-renderer";
     import PageComponentWeather from "../../../pages/components/weather";

     describe("PageComponentWeather", () => {
         test("renders correctly", async () => {
             let component: any;

             await act(async () => {
                 component = await create(<PageComponentWeather></PageComponentWeather>);
             });

             expect(component.toJSON()).toMatchSnapshot();
         });
     });
     ```

   - **Descripción del código:**
     - **Entorno de pruebas:** Se establece en `node`.
     - **Importaciones:**
       - `act` y `create` de `react-test-renderer` para simular interacciones y renderizar el componente.
       - `PageComponentWeather` es el componente que se va a probar.
     - **Conjunto de pruebas:** Define una prueba para verificar que el componente se renderiza correctamente.
     - **Caso de prueba:**
       - Renderiza el componente dentro de `act` para asegurarse de que todas las actualizaciones del DOM se completen.
       - Compara la salida JSON del componente renderizado con la instantánea almacenada utilizando `toMatchSnapshot()`.

#### **3.2. Ejecutar la prueba de instantáneas**

1. **Ejecutar las pruebas:**
   - En la terminal, ejecuta:

     ```bash
     npm test
     ```

2. **Verificar los resultados:**
   - Deberías ver una salida similar a:

     ```
     PASS  __tests__/pages/components/weather.snapshot.test.tsx

     Snapshot Summary

     › 1 snapshot written from 1 test suite.
     ```

   - **Interpretación:**
     - La prueba ha pasado y se ha creado una instantánea inicial.
     - La cobertura de código para `weather.tsx` debería ser del 81%.

3. **Revisar la instantánea creada:**
   - Navega a la carpeta `__tests__/pages/components/__snapshots__/`.
   - Abre el archivo `weather.snapshot.test.tsx.snap` y observa el HTML serializado del componente renderizado, similar a:

     ```typescript
     // Jest Snapshot v1, https://goo.gl/fbAQLP

     exports[`PageComponentWeather renders correctly 1`] = `
     <h1
         data-testid="h1"
         onClick={[Function]}
     >
         The weather is
         sunny
         , and the counter shows
         0
     </h1>
     `;
     ```

   - **Nota:** El contenido exacto puede variar dependiendo de cómo esté implementado tu componente `PageComponentWeather`.


#### **4. Actualizar la Prueba de Instantáneas para Cobertura Completa**

Para cubrir todas las funcionalidades del componente, agregaremos una segunda versión de la prueba que simula un clic en el elemento `h1` y verifica que el estado `counter` se actualice.

**Pasos:**

#### **4.1. Modificar el archivo de prueba de instantáneas**

1. **Abrir `weather.snapshot.test.tsx`:**
   - Navega a `__tests__/pages/components/weather.snapshot.test.tsx` y reemplaza su contenido con el código:

     ```typescript
     /**
      * @jest-environment node
      */

     import { act, create } from "react-test-renderer";
     import PageComponentWeather from "../../../pages/components/weather";

     describe("PageComponentWeather", () => {
         test("renders correctly", async () => {
             let component: any;

             await act(async () => {
                 component = await create(<PageComponentWeather></PageComponentWeather>);
             });

             expect(component.toJSON()).toMatchSnapshot();
         });

         test("clicks the h1 element and updates the state", async () => {
             let component: any;

             await act(async () => {
                 component = await create(<PageComponentWeather></PageComponentWeather>);
                 component.root.findByType("h1").props.onClick();
             });

             expect(component.toJSON()).toMatchSnapshot();
         });
     });
     ```

   - **Descripción del código actualizado:**
     - **Nuevo caso de prueba:** `clicks the h1 element and updates the state`.
       - **Simulación de clic:** Encuentra el elemento `h1` y simula un clic llamando a su propiedad `onClick`.
       - **Verificación de la instantánea:** Compara el estado actualizado del componente con una nueva instantánea.

#### **4.2. Ejecutar las pruebas actualizadas**

1. **Ejecutar las pruebas:**
   - En la terminal, ejecuta nuevamente:

     ```bash
     npm test
     ```

2. **Verificar los resultados:**
   - Es probable que veas un fallo en la prueba debido a la discrepancia en las instantáneas:

     ```
     FAIL  __tests__/pages/components/weather.snapshot.test.tsx

       • PageComponentWeather › renders correctly

     › 1 snapshot failed.

     Snapshot Summary

     › 1 snapshot failed from 1 test suite.

     › Inspect your code changes or run `npm test -- -u` to update them.
     ```

   - **Interpretación:**
     - La instantánea existente ya no coincide con la salida actual del componente después de la interacción simulada (clic en `h1`).
     - Esto es esperado ya que el estado `counter` ha cambiado de `0` a `1`, afectando el HTML renderizado.

#### **4.3. Actualizar la instantánea**

1. **Actualizar las instantáneas:**
   - Ejecuta el siguiente comando para actualizar las instantáneas:

     ```bash
     npm test -- -u
     ```

   - **Descripción:**
     - El flag `-u` le indica a Jest que actualice las instantáneas existentes en lugar de compararlas con las nuevas salidas.

2. **Verificar los resultados:**
   - Deberías ver una salida similar a:

     ```
     PASS  __tests__/pages/components/weather.snapshot.test.tsx

     Snapshot Summary

     › 1 snapshot written from 2 test suites.
     ```

   - **Interpretación:**
     - Las instantáneas han sido actualizadas para reflejar el nuevo estado del componente después del clic.
     - La cobertura de código para `weather.tsx` ahora debería ser del 100%.

3. **Revisar la nueva instantánea:**
   - Abre nuevamente el archivo `weather.snapshot.test.tsx.snap` en la carpeta `__snapshots__/` y observa el nuevo contenido, similar pero con el estado actualizado:

     ```typescript
     // Jest Snapshot v1, https://goo.gl/fbAQLP

     exports[`PageComponentWeather renders correctly 1`] = `
     <h1
         data-testid="h1"
         onClick={[Function]}
     >
         The weather is
         sunny
         , and the counter shows
         0
     </h1>
     `;

     exports[`PageComponentWeather clicks the h1 element and updates the state 1`] = `
     <h1
         data-testid="h1"
         onClick={[Function]}
     >
         The weather is
         sunny
         , and the counter shows
         1
     </h1>
     `;
     ```

   - **Nota:** La segunda instantánea refleja que el contador ha incrementado a `1` después del clic.

#### **5. Ejecutar y verificar las pruebas adicionales**

Después de actualizar las pruebas, es crucial ejecutar todas las pruebas nuevamente para asegurar que todo funcione correctamente.

**Pasos:**

1. **Ejecutar todas las pruebas:**
   - En la terminal, ejecuta:

     ```bash
     npm test
     ```

2. **Verificar los resultados completos:**
   - Deberías ver una salida similar a:

     ```
     PASS  __tests__/mongoose/weather/services.test.ts
     PASS  __tests__/pages/api/v1/weather/zipcode.e2e.test.ts
     PASS  __tests__/middleware/db-connect.test.ts
     PASS  __tests__/pages/components/weather.snapshot.test.tsx

     ---------------------|---------|----------|---------|---------|-------------------
     File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
     ---------------------|---------|----------|---------|---------|-------------------
     All files            |   83.63 |      100 |   88.23 |   82.35 |
     middleware          |     100 |      100 |     100 |     100 |
       db-connect.test.ts |     100 |      100 |     100 |     100 |
     mongoose/weather    |   77.41 |      100 |     100 |   75.86 |
       services.test.ts   |   70.83 |      100 |     100 |   70.83 |8,20-22,33-35,43-45
     pages/api/v1/       |         |          |         |         |
       weather            |     100 |      100 |     100 |     100 |
         [zipcode].ts     |     100 |      100 |     100 |     100 |
     pages/components    |   81.81 |      100 |      60 |      80 |
       weather.tsx        |   100   |      100 |      60 |      100 |8,12
     ---------------------|---------|----------|---------|---------|-------------------
     Snapshot Summary

     › 2 snapshots written from 1 test suite.
     ```

   - **Interpretación:**
     - Todas las pruebas deberían pasar exitosamente.
     - La cobertura de código para `weather.tsx` ahora es del 100%, incluyendo las funcionalidades del manejador de clics y el hook `useEffect`.

3. **Análisis de la cobertura de código:**
   - Observa que todas las líneas están cubiertas, especialmente las relacionadas con el manejador de clics y el hook `useEffect` que antes no estaban cubiertas.

Claro, a continuación se presentan una serie de ejercicios basados en la **Actividad 16: Agregar casos de prueba a la aplicación del clima**. Estos ejercicios están diseñados para reforzar los conceptos y prácticas relacionados con la implementación de pruebas unitarias, de instantáneas y end-to-end utilizando Jest, así como el uso de `spies` y `mocks` para aislar y verificar componentes específicos de la aplicación. No se incluyen fragmentos de código, pero se proporcionan descripciones detalladas de cada tarea.

---
### Ejercicios

#### **Ejercicio 1: Configuración del entorno de pruebas para el Middleware**

#### **Objetivo**
Configurar adecuadamente el entorno de pruebas para asegurar que las pruebas se ejecuten en un entorno controlado y aislado.

#### **Tareas**
1. **Crear la estructura de carpetas de pruebas:**
   - Navega a la carpeta raíz del proyecto.
   - Crea una carpeta denominada `__tests__`.
   - Dentro de `__tests__`, crea una subcarpeta llamada `middleware`.

2. **Preparar el archivo de pruebas para `dbConnect`:**
   - Dentro de la carpeta `middleware`, crea un archivo llamado `db-connect.test.ts`.
   - Configura el archivo para utilizar el entorno de pruebas adecuado (por ejemplo, entorno `node` para pruebas de backend).

3. **Asegurar la retención de conexiones:**
   - Modifica la función `dbConnect` en el middleware para que retorne una referencia al servidor MongoDB en memoria, facilitando así la limpieza y desconexión durante las pruebas.

#### **Preguntas:**
- ¿Por qué es importante aislar el entorno de pruebas del entorno de desarrollo o producción?
- ¿Qué beneficios aporta el uso de servidores en memoria para las pruebas de bases de datos?


#### **Ejercicio 2: Escribir pruebas unitarias para `dbConnect`**

#### **Objetivo**
Verificar que la función `dbConnect` interactúe correctamente con MongoDB y Mongoose, asegurando que se establecen y cierran las conexiones adecuadamente.

#### **Tareas**
1. **Identificar las funcionalidades clave de `dbConnect`:**
   - Analiza qué métodos de Mongoose y MongoMemoryServer se deben espiar para asegurar que se llaman correctamente.

2. **Implementar pruebas unitarias:**
   - Crea pruebas que verifiquen que:
     - `MongoMemoryServer.create()` es llamado al establecer una conexión.
     - `mongoose.connect()` es invocado con los parámetros correctos.
     - `mongoose.disconnect()` se llama al cerrar la conexión.

3. **Ejecutar y validar las pruebas:**
   - Utiliza el comando de pruebas para ejecutar las pruebas unitarias.
   - Asegúrate de que todas las pruebas pasen y que la cobertura sea completa.

#### **Preguntas:**
- ¿Cómo asegura una prueba unitaria que una función específica se comporta correctamente?
- ¿Qué sucede si una de las expectativas en una prueba unitaria no se cumple?


#### **Ejercicio 3: Crear mocks para los servicios de Mongoose**

#### **Objetivo**
Aislar los servicios de Mongoose mediante la creación de mocks, permitiendo pruebas más controladas y predecibles.

#### **Tareas**
1. **Crear un mock para `WeatherModel`:**
   - Dentro de la carpeta correspondiente a los modelos de Mongoose, crea una carpeta `__mocks__`.
   - Dentro de `__mocks__`, crea un archivo llamado `model.ts` que simule las funciones principales (`create`, `findOne`, `updateOne`, `deleteOne`) de `WeatherModel`.

2. **Configurar las respuestas de los mocks:**
   - Define cómo deben comportarse los métodos simulados, por ejemplo, retornando promesas resueltas con valores predefinidos.

3. **Integrar los mocks en las pruebas:**
   - Asegúrate de que las pruebas unitarias utilicen los mocks en lugar de las implementaciones reales de Mongoose.

#### **Preguntas:**
- ¿Cuál es la ventaja de utilizar mocks en las pruebas unitarias?
- ¿Cómo afectan los mocks la fiabilidad y mantenimiento de las pruebas?


#### **Ejercicio 4: Escribir pruebas unitarias para los servicios del clima**

#### **Objetivo**
Validar que los servicios que interactúan con `WeatherModel` funcionan correctamente, asegurando que se llaman los métodos adecuados con los parámetros correctos.

#### **Tareas**
1. **Crear el archivo de pruebas para los servicios:**
   - Dentro de la carpeta de pruebas correspondiente, crea un archivo llamado `services.test.ts`.

2. **Definir casos de prueba para cada servicio:**
   - Para cada función del servicio (`storeDocument`, `findByZip`, `updateByZip`, `deleteByZip`), implementa pruebas que:
     - Verifiquen que la función retorna el valor esperado.
     - Comprueben que el método correspondiente de `WeatherModel` es llamado con los argumentos correctos.

3. **Utilizar `jest.spyOn` para espiar métodos:**
   - Implementa espías para monitorizar las llamadas a los métodos de `WeatherModel` y verificar que se comportan según lo esperado.

4. **Ejecutar y validar las pruebas:**
   - Ejecuta las pruebas y revisa que todas pasen y que la cobertura sea adecuada.

#### **Preguntas:**
- ¿Cómo asegura una prueba que un servicio interactúa correctamente con un modelo de base de datos?
- ¿Qué importancia tiene la cobertura de código en las pruebas unitarias?


#### **Ejercicio 5: Ejecutar y verificar las pruebas**

#### **Objetivo**
Asegurarse de que todas las pruebas configuradas funcionan correctamente y que la cobertura es satisfactoria.

#### **Tareas**
1. **Ejecutar todas las pruebas:**
   - Utiliza el comando de pruebas (`npm test`) para ejecutar todas las pruebas configuradas hasta ahora.

2. **Interpretar los resultados de las pruebas:**
   - Revisa la salida de las pruebas para confirmar que todas han pasado.
   - Analiza el reporte de cobertura para identificar posibles áreas no cubiertas.

3. **Identificar y corregir problemas de cobertura:**
   - Si hay líneas de código no cubiertas, considera agregar pruebas adicionales que las abarquen, como simular errores en llamadas asíncronas.

#### **Preguntas:**
- ¿Qué acciones tomarías si una prueba falla inesperadamente?
- ¿Cómo puedes mejorar la cobertura de pruebas sin comprometer la calidad?


#### **Ejercicio 6: Realizar una prueba end-to-end de la API REST**

#### **Objetivo**
Verificar que el flujo completo de la API REST funciona correctamente, desde la solicitud hasta la respuesta, asegurando la integración de todos los componentes involucrados.

#### **Tareas**
1. **Configurar dependencias necesarias:**
   - Asegúrate de que tu entorno de Node.js soporte las herramientas necesarias para las pruebas end-to-end, como `fetch` o `SuperTest` para futuras mejoras.

2. **Crear el archivo de prueba end-to-end:**
   - Dentro de la estructura de pruebas, crea un archivo llamado `zipcode.e2e.test.ts` que se encargue de probar el endpoint `/v1/weather/[zipcode]`.

3. **Definir casos de prueba para el endpoint:**
   - Implementa pruebas que:
     - Envíen solicitudes al endpoint con un código postal específico.
     - Verifiquen que la respuesta contiene los datos esperados para ese código postal.

4. **Ejecutar la aplicación y las pruebas:**
   - Inicia la aplicación en modo de desarrollo.
   - Ejecuta las pruebas end-to-end y verifica que todas pasen correctamente.

#### **Preguntas:**
- ¿Cuál es la diferencia entre una prueba unitária y una prueba end-to-end?
- ¿Qué aspectos de la aplicación se validan con una prueba end-to-end que no se cubren con pruebas unitarias?

#### **Ejercicio 7: Configurar el entorno para pruebas de instantáneas**

#### **Objetivo**
Preparar el entorno de pruebas para permitir la creación y validación de instantáneas de los componentes de la interfaz de usuario, garantizando que la UI se renderiza correctamente.

#### **Tareas**
1. **Instalar dependencias necesarias:**
   - Añade al proyecto las dependencias requeridas para las pruebas de instantáneas, como `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, y `react-test-renderer`.

2. **Actualizar la configuración de Jest:**
   - Modifica el archivo de configuración de Jest (`jest.config.js`) para integrar las herramientas necesarias para las pruebas de instantáneas, especialmente para proyectos basados en Next.js.

#### **Preguntas:**
- ¿Qué es una prueba de instantánea y qué ventajas ofrece en el desarrollo de interfaces de usuario?
- ¿Cómo puede una prueba de instantánea ayudar a detectar cambios no intencionados en la UI?

#### **Ejercicio 8: Crear y actualizar pruebas de instantáneas para componentes de UI**

#### **Objetivo**
Implementar pruebas de instantáneas para los componentes de la interfaz de usuario, asegurando que su renderizado permanece consistente a lo largo del tiempo.

#### **Tareas**
1. **Crear el archivo de prueba de instantáneas:**
   - Dentro de la estructura de pruebas, crea un archivo llamado `weather.snapshot.test.tsx` para el componente `PageComponentWeather`.

2. **Definir la prueba inicial de instantánea:**
   - Implementa una prueba que renderice el componente y compare su salida con una instantánea almacenada, creando una nueva si no existe.

3. **Agregar casos de prueba adicionales:**
   - Extiende la prueba para incluir interacciones con el componente, como simular clics y verificar que el estado y el renderizado se actualizan correctamente.

4. **Ejecutar y validar las pruebas de instantáneas:**
   - Ejecuta las pruebas y revisa que las instantáneas se crean y validan correctamente.
   - Si se detectan cambios en el renderizado esperado, actualiza las instantáneas de manera controlada.

#### **Preguntas:**
- ¿Qué pasos seguirías si una prueba de instantánea falla debido a un cambio intencionado en el diseño del componente?
- ¿Cómo puedes mantener las pruebas de instantáneas eficientes y relevantes a medida que la aplicación evoluciona?


#### **Ejercicio 9: Ejecutar y verificar todas las pruebas adicionales**

#### **Objetivo**
Asegurarse de que todas las pruebas adicionales, incluyendo las de end-to-end y de instantáneas, funcionan correctamente y mantienen una alta cobertura de código.

#### **Tareas**
1. **Ejecutar todas las pruebas del proyecto:**
   - Utiliza el comando de pruebas para ejecutar todas las pruebas unitarias, end-to-end y de instantáneas.

2. **Revisar los resultados completos:**
   - Asegúrate de que todas las pruebas pasan exitosamente.
   - Analiza el reporte de cobertura para identificar cualquier área que aún no esté completamente cubierta.

3. **Corregir y mejorar las pruebas según aea necesario:**
   - Si hay pruebas que fallan o áreas con baja cobertura, ajusta las pruebas existentes o agrega nuevas pruebas para abordar estos aspectos.

#### **Preguntas:**
- ¿Qué indicadores consideras más importantes al evaluar la calidad de las pruebas en un proyecto?
- ¿Cómo balanceas la necesidad de alta cobertura con la eficiencia en la ejecución de pruebas?

#### **Ejercicio 10: Análisis y mejora continua de las pruebas**

#### **Objetivo**
Reflexionar sobre el proceso de pruebas implementado y buscar oportunidades de mejora para asegurar la calidad continua de la aplicación.

#### **Tareas**
1. **Revisar la cobertura de código:**
   - Analiza el reporte de cobertura de las pruebas y identifica áreas críticas que podrían beneficiarse de pruebas adicionales.

2. **Evaluar la eficiencia de las pruebas:**
   - Considera el tiempo que toman las pruebas en ejecutarse y cómo esto afecta el flujo de trabajo de desarrollo.
   - Identifica pruebas que podrían optimizarse para reducir tiempos sin comprometer la cobertura.

3. **Implementar mejores prácticas:**
   - Adopta patrones de diseño para pruebas que faciliten su mantenimiento y escalabilidad.
   - Documenta los procedimientos de pruebas para facilitar la incorporación de nuevos desarrolladores al proyecto.

4. **Planificar la adición de nuevas pruebas:**
   - A medida que se agregan nuevas funcionalidades al proyecto, planifica la creación de pruebas correspondientes para asegurar que cada nueva característica esté cubierta.

#### **Preguntas:**
- ¿Qué desafíos has encontrado al implementar pruebas en este proyecto y cómo los has superado?
- ¿Cómo asegurarías que las pruebas sigan siendo relevantes y útiles a medida que el proyecto crece?
