// Renderuza el ejemplo Hello World y usa lso componentes personalizados Head, Link e Image de Nextjs

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image  from "next/image";

import styles from "./hello.module.css";

const Hello: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Titulo de pagina Hola Mundo</title>
                <meta property="og:title" content="Hello World" key="title"/>
            </Head>
            <h1 className={styles.heading}>Hello Safe Health!</h1>
            <div> Usa el ancla de HTML para un 
                <a className={styles.link} href="https://nostarch.com"> enlace externo</a> 
                y el cpmponente Link para una
                <Link href="/components/weather">pagina interna </Link>
                <Image src="/vercel.svg"
                    alt="Vercel Logo"
                    width={72}
                    height={16}
                />
            </div>
        </div>
    );
};

export default Hello;