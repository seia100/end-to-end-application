// import { db } from "./data";

// declare interface WeatherInterface {
//     zip: string;
//     weather: string;
//     tempC: string;
//     tempF: string;
//     friends: string[];
// }

// export const resolvers = {
//     Query: {
//         weather: async (_: any, param: { zip: string }) => {
//             return [db.find((item) => item.zip === param.zip)];
//         }
//     },

//     Mutation: {
//         weather: async (_: any, param: { data: WeatherInterface }) => {
//             return [db.find((item) => item.zip === param.data.zip)];
//         }
//     }
// };

import { db } from "./data";

declare interface WeatherInterface {
    zip: string;
    weather: string;
    tempC: string;
    tempF: string;
    friends: string[];
}

export const resolvers = {
    Query: {
        weather: async (_: any, param: { zip: string }) => {
            const result = db.find((item) => item.zip === param.zip);
            return result ? [result] : [];
        },
    },

    Mutation: {
        weather: async (_: any, param: { data: WeatherInterface }) => {
            const result = db.find((item) => item.zip === param.data.zip);
            return result ? [result] : [];
        },
    },
};
