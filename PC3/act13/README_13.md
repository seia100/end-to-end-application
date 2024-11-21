# Actividad 13: agregar un API GraphQL a Nextjs

Optimizar la gestion y obtencion de datos de modo que mejore la eficiencia, flexibilidad y escabilidad 
en el desarrollo web.

- vamos agragar graphql en nuestro proyecto con funcionalidades metereologicas

> GraphQL es un entorno que consta de un servidor y un lenguaje de consulta

Para esta actividad vamos a reutilizar lo que se ha trabajado en la `atividad 11`. para temas de estructura (no eficiente en memoria) vamos a copiar y pegar todo el proyecto en esta actividad.

Una vez hecho esa copia de todo el proyecto. Procedemos con los pasos de la actividad y aplicar conceptos necesario para el proyecto.

## Pasos de la actividad

1. Instalar Apollo

Es un servidor independiente, uno de los servidores de GraphQL. para ello ejecutamos el siguiente comando en la consola

```shell
cd refact-app-graphql
## Instalamos el servidor
npm install @apollo/server @as-integration/next graphql graphql-tag
```

2. Creamos un esquema. Crear una carpeta junto con `pages` en el directorio Nextjs. vamos a llamar `graphql en la que va a tener todos los archivos relacionados al mismo.

```shell
mkdir refat-app-graphql/src/graphql/
cd refat-app-graphql/src/g$
```

- Crear un archivo llamado `schema.ts`

    ```ts
    // ./graphql/schema.ts

    // Importamos el literal de plantilla etiquetada gql que usamos para definir el esquema.
    import gql from "graphql-tag";

    export const typeDefs = gql`
        type LocationWeatherType{
            zipcode: String!
            weather: String!
            tempC: String!
            tempF: String!
            frinds: [String]!
        }

        input LocationWeather Input {
            zipcode: String!
            weather: String!
            tempC: String!
            tempF: String!
            frinds: [String]!
        }

        type Query {
            weather(zipcode: String): [LocationWeatherType]!
        }
        
        type Mutation {
        weather (data: LocationWeatherInput): [LocaionWeatherType]!
        }
    `;

    ```

### Agregando datos

    Necesitamos que nuestra API retorne diferentes datos dependiendo de los parametros y propiedades enviadas.
    
    - creamos un archivo `data.ts` dentro del mismo directorio `graphql` y tipamos

        ```ts
        // data.ts

        export const ds = [
            {
                zipcode: "89030",
                weather: "sunny",
                tempC: "25C",
                tempF: "70F",
                friends: ["89031", "89048"]
            },

            {
                zipcode: "89048",
                weather: "sunny",
                tempC: "30C",
                tempF: "86F",
                friends: ["89031","89031"]
            },

            {
                zipcode: "89014",
                weather: "sunny",
                tempC: "20C",
                tempF: "68F",
                friends: ["89030", "89048"]
            }
        ];

        ```

        Este JSON tiene tres ubicaciones metereologicas y sus propiedades.

### Implementado resolvers

- revisar el archivo 

### NOtas
mmm nos e exactamen lo que esta pasando pero no se levanta el servidor pese a que tiene uns estructura. no se
