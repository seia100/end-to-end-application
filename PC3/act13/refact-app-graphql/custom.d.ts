// tipos e interfaces personalizados

// WeatherProps: para componentes relacionados con el clima
// para el argumento props de la página que muestra los componentes meteorológicos, 
// components/weather. 

interface WeatherProps {
    weather: string;
}

// WeatherDetailType: Utilizado para rutas dinamicas
// El tipo WeatherDetailType es para la ruta de API api/weather/:zipcode, que utiliza un código postal obtenido dinámicamente.

type WeatherDetailType = {
    zipcode: string;
    weather: string;
    temp?: number;
};

// responseItemType: para estructurar respuestas API
// usamos responseItemType en la ruta de API api/names para tipar la respuesta de la obtención. 

type responseItemType = {
    id: string;
    name: string;

};

