import type {NextApiRequest, NextApiResponse} from 'next';

type WeatherDetailType = {
    zipcode: string;
    weather: string;
    temp?: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse

): Promise<NextApiResponse<WeatherDetailType> | void> {

    // permite solo solicitudes get
    if (req.method !== "GET") {
        return res.status(405).json({
            // https://www.geeksforgeeks.org/how-to-fix-the-http-405-method-not-allowed-error/
            message: "Method Not Allowed. Please use GET.", 
        });
    }

    const {zipcode} = req.query;

    // Verificar si el parámetro existe y que sea un string
    if (!zipcode || typeof zipcode !== "string" ) {
        return res.status(400).json({
            message: 'Invalid or missing zipcode. Please provide a valid zipcode'
        })
    }
    // Longitud del zipcode de 5 
    if (zipcode.length !== 5) {
        return res.status(400).json({
            message: 'Invalid zipcode length. Zipcode must be exactly 5 characters.'
        });
    }

    // si el codigo postal cumple con las condiciones, mostramos los datos simulados
    return res.status(200).json({
        zipcode: req.query.zipcode,
        weather: 'sunny',
        temp: 35
    });
}