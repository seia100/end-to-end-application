// // ./graphql/schema.ts

// // Importamos el literal de plantilla etiquetada gql que usamos para definir el esquema.
// import gql from "graphql-tag";

// export const typeDefs = gql`
//     type LocationWeatherType{
//         zip: String!
//         weather: String!
//         tempC: String!
//         tempF: String!
//         friend: [String]!
//     }

//     input LocationWeatherInput {
//         zip: String!
//         weather: String!
//         tempC: String!
//         tempF: String!
//         friends: [String]!
//     }

//     type Query {
//         weather(zip: String): [LocationWeatherType]!
//     }
    
//     type Mutation {
//     weather (data: LocationWeatherInput): [LocaionWeatherType]!
//     }
// `;


import gql from "graphql-tag";

export const typeDefs = gql`
    type LocationWeatherType {
        zip: String!
        weather: String!
        tempC: String!
        tempF: String!
        friends: [String]!
    }

    input LocationWeatherInput {
        zip: String!
        weather: String!
        tempC: String!
        tempF: String!
        friends: [String]!
    }

    type Query {
        weather(zip: String): [LocationWeatherType]!
    }

    type Mutation {
        weather(data: LocationWeatherInput): [LocationWeatherType]!
    }
`;
