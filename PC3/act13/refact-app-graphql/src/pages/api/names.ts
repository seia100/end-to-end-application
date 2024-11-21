// route api/names
import type { NextApiRequest, NextApiResponse } from "next";

type responseItemType = {
    id: string;
    name: string;

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse

): Promise<NextApiResponse<responseItemType[]> | void>{

    // validar el metodo HTTP permitido
    // nos permite proteger y limitar el alcance de una API.
    if (req.method !== "GET") {
        return res.status(405).json({
            // https://www.geeksforgeeks.org/how-to-fix-the-http-405-method-not-allowed-error/
            message: "Method Not Allowed. Please use GET.", 
        });
    }
    
    const url = "https://www.usemodernfullstack.dev/api/v1/users";
    let data;

    try{
        const response = await fetch(url);
        
        // 2. Verificar el estado HTTP de la respuesta externa
        if (!response.ok) { // tambien puede ser if(!response.status === 204){...}
            return res.status(response.status).json({
                message: `Failed to fetch data from the externa API. Status: ${response.statusText}`,
            }) // el mensaje no tiene muchos detalles al cliente lo cual es lo ideal :D
        }

        // procesar la respuesta como JSON 
        data = (await response.json()) as responseItemType[];
        
    }catch (err) {
        console.error("Internal Server Error:", err);

        // manejar errores red o del fetch
        return res.status(500).json({
            message: "Internal Server Error. Please try again later.",
        })
    }
    
    // 4. Transformar los datos antes de enviarlos
    //      Procesamos y estructuramos los datos para que
    //      el cliente reciba solo lo necesario, sin datos adicionales o irrelevantes.
    const names = data.map((item: responseItemType) => ({
        id: item.id,
        name: item.name,
    }));

    // responder con los datos procesados
    return res.status(200).json(names);
}