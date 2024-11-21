# Tópicos Clave para la Actividad de Next.js

## **1. Estructura de Proyectos Next.js**
- **Definición:**
    La estructura básica de un proyecto Next.js es fundamental para organizar archivos y facilitar el desarrollo.
- **Puntos Clave:**
    - Directorios esenciales:
        - `src/app/`: Contiene las rutas y componentes principales.
        - `public/`: Almacena recursos estáticos como imágenes y fuentes.
    - Archivos importantes:
        - `layout.tsx`: Define el diseño global de la aplicación.
        - `page.tsx`: Página principal que actúa como punto de entrada.
        - `globals.css`: Estilos globales compartidos.
    - Estructura recomendada para escalabilidad:
        ```plaintext
        src/
        ├── app/
        │   ├── components/
        │   │   ├── ui/
        │   │   └── layout/
        │   ├── pages/
        │   ├── styles/
        │   ├── lib/
        │   ├── hooks/
        │   ├── context/
        │   └── utils/
        ```

---

## **2. Rutas Dinámicas**
- **Definición:**
    Las rutas dinámicas permiten generar páginas cuyo contenido depende de parámetros en la URL.
- **Ejemplo de Implementación:**
    - Archivo: `src/app/posts/[id].tsx`
    - Código:
        ```typescript
        import { useRouter } from 'next/router';

        export default function Post() {
            const router = useRouter();
            const { id } = router.query;

            return <div>Post ID: {id}</div>;
        }
        ```

---

## **3. Rutas API**
- **Definición:**
    Next.js permite crear endpoints API dentro de `src/app/api/` para manejar solicitudes backend.
- **Ejemplo de Implementación:**
    - Archivo: `src/app/api/hello.ts`
    - Código:
        ```typescript
        export default function handler(req, res) {
            res.status(200).json({ message: 'Hola desde la API' });
        }
        ```

---

## **4. Archivos Especiales**
- **Definición y Uso:**
    - `layout.tsx`: Configura un diseño global.
    - `_app.tsx`: Configura estilos y proveedores globales.
    - `_document.tsx`: Modifica el HTML base.

---

## **5. Middleware en Next.js**
- **Definición:**
    Los middlewares se ejecutan antes de resolver la solicitud y se usan para tareas como autenticación.
- **Ejemplo de Implementación:**
    - Archivo: `middleware.ts`
    - Código:
        ```typescript
        import { NextResponse } from 'next/server';

        export function middleware(request) {
            const authenticated = true;
            if (!authenticated) {
                return NextResponse.redirect('/login');
            }
            return NextResponse.next();
        }
        ```

---

## **6. Incremental Static Regeneration (ISR)**
- **Definición:**
    ISR permite actualizar páginas estáticas después de la compilación.
- **Ejemplo de Implementación:**
    - Archivo: `src/app/products/[id]/page.js`
    - Código:
        ```typescript
        export async function getStaticPaths() {
            return {
                paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
                fallback: 'blocking',
            };
        }

        export async function getStaticProps({ params }) {
            return {
                props: { product: { id: params.id, name: `Producto ${params.id}` } },
                revalidate: 10,
            };
        }
        ```

---

## **7. Variables de Entorno**
- **Definición:**
    Gestión de configuraciones sensibles como claves de API y URLs.
- **Ejemplo:**
    - Archivo: `.env.local`
    - Contenido:
        ```env
        API_URL=http://localhost:3000/api
        ```

---

## **8. Optimización de Imágenes**
- **Definición:**
    Next.js optimiza automáticamente las imágenes para mejorar el rendimiento.
- **Ejemplo de Implementación:**
    - Archivo: `src/app/products/page.js`
    - Código:
        ```typescript
        import Image from 'next/image';

        export default function ProductsPage() {
            return (
                <div>
                    <h1>Productos</h1>
                    <Image src="/product.png" alt="Producto" width={200} height={200} />
                </div>
            );
        }
        ```

---

## **9. Internacionalización (i18n)**
- **Definición:**
    Soporte para múltiples idiomas en la aplicación.
- **Ejemplo de Configuración:**
    - Archivo: `next.config.js`
    - Código:
        ```javascript
        module.exports = {
            i18n: {
                locales: ['es', 'en'],
                defaultLocale: 'es',
            },
        };
        ```

---

## **10. Rutas con CRUD en API**
- **Definición:**
    Implementación de operaciones CRUD en rutas API de Next.js.
- **Ejemplo de Implementación:**
    - Archivo: `src/app/api/products/route.js`
    - Código:
        ```javascript
        let products = [{ id: 1, name: 'Producto 1' }];

        export async function GET(request) {
            return new Response(JSON.stringify(products), { headers: { 'Content-Type': 'application/json' } });
        }

        export async function POST(request) {
            const newProduct = await request.json();
            products.push({ id: products.length + 1, ...newProduct });
            return new Response(JSON.stringify({ message: 'Producto creado' }));
        }

        export async function PUT(request) {
            const updatedProduct = await request.json();
            products = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
            return new Response(JSON.stringify({ message: 'Producto actualizado' }));
        }

        export async function DELETE(request) {
            const { id } = await request.json();
            products = products.filter((p) => p.id !== id);
            return new Response(JSON.stringify({ message: 'Producto eliminado' }));
        }
        ```

---

## **11. Uso de Hooks Personalizados**
- **Definición:**
    Los hooks personalizados permiten encapsular lógica reutilizable.
- **Ejemplo de Implementación:**
    - Archivo: `src/hooks/useAuth.js`
    - Código:
        ```javascript
        import { useEffect, useState } from 'react';

        export function useAuth() {
            const [isAuthenticated, setIsAuthenticated] = useState(false);

            useEffect(() => {
                const auth = document.cookie.includes('auth=true');
                setIsAuthenticated(auth);
            }, []);

            return isAuthenticated;
        }
        ```

---

## **Relaciones Clave**
1. **Rutas Dinámicas y ISR:**
    - Ambas permiten manejar contenido dinámico pero con diferentes enfoques. ISR es ideal para SEO.
2. **Middleware y Hooks Personalizados:**
    - Los middleware manejan solicitudes antes de que lleguen a las rutas, mientras que los hooks gestionan lógica en componentes.
3. **Rutas API y Variables de Entorno:**
    - Las variables de entorno facilitan la configuración de las rutas API para entornos distintos (desarrollo, producción).
