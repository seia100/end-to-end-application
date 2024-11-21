import type { NextPage } from "next";
import React,{useState,useEffect} from "react";
import styles from "./Weather.module.css";

const PageComponentWeather: NextPage = () => {
    interface WeatherProps {
        weather: string;
    }
    const WeatherComponent = (props: WeatherProps) => {
        
        // Ejercicio 3
        // modificamos el hook de modo a que cada vez que el usuario hace un cambio en el contador
        // y refresque la pagina se mantenga
        const [count, setCount] = useState<number>(0);
        // const [count, setCount] = useState(0);

        // cargar el valor inicial del contador desde el localStorage
        useEffect(() => {
            // setCount(0);
            const storedCount = localStorage.getItem("weather-counter");

            if (storedCount){
                setCount(Number(storedCount)); // convierte el valor almacenado en un entero
            }
        },[]);
        
        // Guardar el valor del contador en el localStorage cada vez que cambio
        useEffect(() => {
            localStorage.setItem("weather-counter", count.toString());
        }, [count]);

        return (
            // <h1 onClick={() => setCount(count + 1)}>
            //     El clima es {props.weather} y se ha actualizado {count} veces
            // </h1>
            <div className={styles.container}>
            <h1 className={styles.heading}>
                El clima es {props.weather}
            </h1>
            <p
                className={styles.counter}
                onClick={() => setCount(count + 1)}
            >
                Contador: {count}
            </p>
        </div>
        );
    };
    return (
        <WeatherComponent weather="sunny" />
    );
};

export default PageComponentWeather;