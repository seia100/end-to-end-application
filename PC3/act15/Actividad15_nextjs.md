### Estructura básica del proyecto Next.js

```
my-next-app/
├── .next/
├── node_modules/
├── public/
│   ├── file (HTML)
│   ├── globe (HTML)
│   ├── next (HTML)
│   ├── vercel (HTML)
│   ├── window (HTML)
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── fonts/
│       │   ├── GeistMonoVF.woff
│       │   └── GeistVF.woff
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.module.css
│       └── page.tsx
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

### Explicación de cada componente

#### 1. **Rutas dinámicas**

Las rutas dinámicas permiten crear páginas cuyo contenido depende de parámetros variables en la URL, como ID de usuarios o slugs de artículos. En Next.js, las rutas dinámicas se implementan con corchetes `[]` en el nombre del archivo en `src/app/`.

**Ejemplo**: 

Para una ruta dinámica en `src/app/`, podrías crear el archivo `src/app/posts/[id].tsx` que respondería a rutas como `/posts/1`, `/posts/2`, etc.

```typescript
// src/app/posts/[id].tsx
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Post ID: {id}</div>;
}
```

#### 2. **Rutas API**

Next.js permite crear endpoints API dentro de `src/app/api/`. Estas rutas son útiles para manejar solicitudes backend sin un servidor separado.

**Ejemplo**:

```typescript
// src/app/api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ message: 'Hola desde la API' });
}
```

Accede a este endpoint en `http://localhost:3000/api/hello`.

#### 3. **Archivos especiales**

Next.js utiliza algunos archivos especiales que tienen funciones específicas en la aplicación:

- **`layout.tsx`**: Configura el diseño general que se aplica a todas las páginas.
- **`_app.tsx`**: Permite añadir configuraciones y componentes globales (como estilos o proveedores de contexto).
- **`_document.tsx`**: Personaliza el HTML que se sirve al cliente, modificando `<html>`, `<head>` y `<body>`.

#### 4. **Archivos de configuración y metadatos**

- **`.eslintrc.json`**: Configuración de ESLint para mantener la calidad y consistencia del código.
- **`.gitignore`**: Lista de archivos y carpetas ignorados por Git.
- **`next-env.d.ts`**: Configuración de tipos para TypeScript.
- **`next.config.ts`**: Configuración avanzada de Next.js (por ejemplo, internacionalización, dominio de imágenes).
- **`package.json`**: Contiene la configuración del proyecto, incluyendo dependencias y scripts.

#### 5. **Directorio `components/`**

Es común crear un directorio `components/` dentro de `src/app/` para almacenar componentes reutilizables. Esto permite que el código sea modular y fácil de mantener.

**Ejemplo**:

```javascript
// src/app/components/NavBar.tsx
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/about">Acerca de</Link>
    </nav>
  );
}
```

#### 6. **Directorio `lib/`**

El directorio `lib/` se utiliza para almacenar funciones auxiliares o utilidades de negocio que pueden ser compartidas en toda la aplicación.

**Ejemplo**:

```typescript
// src/app/lib/apiClient.ts
export async function fetchData(endpoint: string) {
  const res = await fetch(endpoint);
  return res.json();
}
```

#### 7. **Middleware**

Next.js soporta middlewares que se ejecutan antes de resolver la solicitud y pueden ser útiles para tareas como la autenticación. Los middlewares se definen en `middleware.ts` en la raíz del proyecto.

**Ejemplo**:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const authenticated = true; // Lógica de autenticación
  if (!authenticated) {
    return NextResponse.redirect('/login');
  }
  return NextResponse.next();
}
```

#### 8. **Configuración avanzada**

Algunos archivos permiten configuraciones avanzadas en Next.js:

- **`next.config.ts`**: Configuración avanzada de Next.js.
  ```typescript
  // next.config.ts
  module.exports = {
    reactStrictMode: true,
    images: {
      domains: ['example.com'],
    },
    i18n: {
      locales: ['es', 'en'],
      defaultLocale: 'es',
    },
  };
  ```
- **`tsconfig.json` o `jsconfig.json`**: Configuración de TypeScript o JavaScript, incluyendo alias de ruta.

#### 9. **Estructura recomendada para escalabilidad**

Con el crecimiento del proyecto, es útil organizarlo de manera modular en `src/`.

```
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

- **`components/`**: Componentes reutilizables, subdivididos en `ui/` para elementos de interfaz y `layout/` para componentes de disposición.
- **`pages/`**: Mantiene la estructura de páginas del proyecto.
- **`styles/`**: Archivos CSS o SCSS para estilos globales.
- **`lib/`**: Código compartido como API clients o lógica de negocio.
- **`hooks/`**: Hooks personalizados de React.
- **`context/`**: Proveedores de contexto para manejar estados globales.
- **`utils/`**: Funciones utilitarias y helpers.

#### 10. **Archivos de estilo**

Los archivos de estilo global se definen en `globals.css` y en módulos CSS. Los módulos CSS (`page.module.css`) se aplican a componentes específicos para mayor encapsulamiento de estilos.

#### 11. **Configuración del servidor y entorno**

Las variables de entorno se definen en archivos como `.env.local`, `.env.development`, `.env.production` para gestionar configuraciones sensibles.

**Ejemplo**:

```env
# .env.local
API_URL=http://localhost:3000/api
```

Luego, se pueden acceder en el código como:

```typescript
const apiUrl = process.env.API_URL;
```

#### 12. **Creando una aplicación Next.js**

Para iniciar un nuevo proyecto Next.js, usa:

```bash
npx create-next-app my-next-app
```

Esto generará la estructura básica de archivos y carpetas. Navega a la carpeta y ejecuta el servidor de desarrollo:

```bash
cd my-next-app
npm run dev
```

Luego, abre `http://localhost:3000` en el navegador.

#### Pasos adicionales

- **Personalizar la página principal**: Modifica `page.tsx` en `src/app/`.
- **Crear una nueva página**: Agrega un archivo en `src/app` o en un subdirectorio para una ruta nueva.
- **Agregar componentes**: Usa `components/` para organizar elementos de la UI.

#### Ejemplo detallado de una página

Supón que tienes una página dinámica `posts/[id].tsx`. Este archivo podría verse así:

```typescript
// src/app/posts/[id].tsx
import { useRouter } from 'next/router';
import Layout from '@/app/components/layout/Layout';
import { getPostData } from '@/app/lib/posts';

export default function Post({ postData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

Este código usa `getStaticPaths` y `getStaticProps` para pre-renderizar la página de manera estática.

---
Este desglose organiza la  estructura y conceptos clave de Next.js en el contexto de un proyecto con carpetas como `src/app/`, `fonts/`, `components/`, y `public/`.


---
### Proyecto básico con Next.js usando `src/app`

#### 1. **Instalación y configuración inicial**
   Para crear el proyecto con esta estructura, ejecuta el siguiente comando y selecciona las opciones para almacenar el código en la carpeta `src` y usar el `App Router`:

   ```bash
   npx create-next-app my-next-app
   ```

   Responde "Yes" para la pregunta de `src directory` y también para `App Router`.

#### 2. **Estructura del proyecto**

   A continuación, se muestra la estructura esperada del proyecto tras la instalación inicial:

   ```
   my-next-app/
   ├── .next/
   ├── node_modules/
   ├── public/
   │   ├── favicon.ico
   │   ├── file.png
   │   ├── globe.png
   │   ├── next.png
   │   ├── vercel.png
   │   └── window.png
   ├── src/
   │   └── app/
   │       ├── api/
   │       │   └── hello/route.js
   │       ├── fonts/
   │       │   ├── GeistMonoVF.woff
   │       │   └── GeistVF.woff
   │       ├── globals.css
   │       ├── layout.js
   │       ├── page.module.css
   │       └── page.js
   ├── .gitignore
   ├── package.json
   ├── README.md
   └── next.config.js
   ```

#### 3. **Archivos clave**

   - **public/**: Contiene los archivos estáticos como imágenes (`file.png`, `globe.png`, `next.png`, etc.) que se pueden servir directamente.
   - **src/app**: Esta es la nueva ubicación de las rutas y componentes. Incluye:
     - `api/hello/route.js`: Una API básica.
     - `fonts/`: Almacena archivos de fuentes personalizados (`GeistMonoVF.woff`, `GeistVF.woff`).
     - `globals.css`: Archivo CSS global para estilos aplicados en toda la aplicación.
     - `layout.js`: Archivo para definir el diseño global de la aplicación.
     - `page.js`: Página principal del proyecto.
     - `page.module.css`: CSS Module para estilos específicos de `page.js`.

#### 4. **Implementación de archivos**

   - **`src/app/page.js`**: Página principal del proyecto.

     ```jsx
     import styles from './page.module.css';

     export default function Home() {
       return (
         <div className={styles.container}>
           <h1>Bienvenido a mi aplicación Next.js</h1>
           <p>Esta es la estructura básica usando `src/app`.</p>
         </div>
       );
     }
     ```

   - **`src/app/layout.js`**: Diseño global que envuelve todas las páginas.

     ```jsx
     import './globals.css';

     export default function RootLayout({ children }) {
       return (
         <html lang="es">
           <body>
             <main>{children}</main>
           </body>
         </html>
       );
     }
     ```

   - **`src/app/api/hello/route.js`**: Ruta de API simple.

     ```js
     export async function GET(request) {
       return new Response(JSON.stringify({ message: 'Hola desde la API' }), {
         headers: { 'Content-Type': 'application/json' },
       });
     }
     ```

   - **`src/app/globals.css`**: Estilos globales.

     ```css
     body {
       margin: 0;
       font-family: Arial, sans-serif;
     }
     ```

   - **`src/app/page.module.css`**: Estilos específicos para la página principal.

     ```css
     .container {
       padding: 20px;
       text-align: center;
     }

     h1 {
       color: #0070f3;
     }
     ```

#### 5. **Comandos de desarrollo**

   - Para ejecutar el servidor de desarrollo, usa:

     ```bash
     npm run dev
     ```

   - Accede a la aplicación en tu navegador en [http://localhost:3000](http://localhost:3000).

#### 6. **Conceptos importantes**

   - **App Router**: Usamos `src/app` como la base de todas las rutas, siguiendo la recomendación de Next.js para proyectos modernos. `page.js` representa la página principal, y `layout.js` aplica un diseño común.
   - **Rutas API**: La ruta `api/hello/route.js` crea un endpoint accesible en `/api/hello` que responde con un mensaje JSON.
   - **Componentes y Estilos**: Los archivos CSS (`globals.css` y `page.module.css`) están en el mismo directorio `app`, donde `globals.css` se aplica globalmente, mientras que `page.module.css` está vinculado solo a `page.js`.


### Extensiones y conceptos avanzados en Next.js

---

#### 1. **Rutas dinámicas con páginas detalladas**

Supongamos que queremos mostrar páginas de productos con un ID único. Creamos una ruta dinámica en `src/app/products/[id]/page.js` para manejar cada producto.

**Archivo:** `src/app/products/[id]/page.js`

```jsx
import { useRouter } from 'next/router';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Producto ID: {id}</h1>
      <p>Información detallada del producto {id}.</p>
    </div>
  );
}
```

**Explicación:** Con `[id]` en el nombre del archivo, Next.js entiende que esta es una ruta dinámica. Al visitar `/products/1`, Next.js renderiza esta página y accede a `id` en la URL.

---

#### 2. **API con CRUD básico**

Expandiendo la API existente, vamos a añadir más endpoints para manejar operaciones CRUD básicas. Creamos un archivo `src/app/api/products/route.js`:

```js
let products = [
  { id: 1, name: 'Producto 1' },
  { id: 2, name: 'Producto 2' },
];

export async function GET(request) {
  return new Response(JSON.stringify(products), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const newProduct = await request.json();
  products.push({ id: products.length + 1, ...newProduct });
  return new Response(JSON.stringify({ message: 'Producto creado' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

**Explicación:** Aquí tenemos dos métodos HTTP:
- **GET**: Devuelve la lista de productos.
- **POST**: Añade un nuevo producto a la lista.

---

#### 3. **Middleware para autenticación**

Next.js permite agregar `middleware.js` en la raíz del proyecto para proteger rutas o verificar autenticación.

**Archivo:** `src/middleware.js`

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proteger la ruta de productos si el usuario no está autenticado
  if (pathname.startsWith('/products') && !request.cookies.get('auth')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

**Explicación:** El middleware verifica si el usuario está autenticado (aquí usando una cookie `auth`). Si no, redirige a `/login` cuando intenta acceder a `/products`.

---

#### 4. **Incremental Static Regeneration (ISR)**

ISR permite actualizar páginas estáticas después de la compilación. Vamos a implementar ISR para la página de productos.

**Archivo:** `src/app/products/[id]/page.js`

```jsx
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  // Solo generaremos estos dos productos de manera estática
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: 'blocking', // ISR activado
  };
}

export async function getStaticProps({ params }) {
  // Llamada a la API o base de datos para obtener el producto
  const product = { id: params.id, name: `Producto ${params.id}` };

  return {
    props: { product },
    revalidate: 10, // Revalida cada 10 segundos
  };
}

export default function ProductPage({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Información detallada del producto {product.id}.</p>
    </div>
  );
}
```

**Explicación:** Esta configuración generará la página de cada producto de manera estática y la revalidará cada 10 segundos, manteniendo la página actualizada sin necesidad de un build completo.

---

#### 5. **Optimización de imágenes con `next/image`**

Vamos a optimizar imágenes añadiendo el componente `Image` de Next.js. En nuestra página principal, cargaremos una imagen de ejemplo.

**Archivo:** `src/app/page.js`

```jsx
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación Next.js</h1>
      <Image src="/next.png" alt="Logo de Next.js" width={200} height={200} />
    </div>
  );
}
```

**Explicación:** `next/image` optimiza automáticamente el tamaño y la carga de las imágenes. Esto es útil para mejorar el rendimiento y el SEO.

---

#### 6. **Internacionalización (i18n)**

Next.js facilita la creación de aplicaciones multilingües. Configuramos `next.config.js` para soportar varios idiomas.

**Archivo:** `next.config.js`

```js
module.exports = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
};
```

**Uso en el componente `layout.js`**

```jsx
import { useRouter } from 'next/router';

export default function RootLayout({ children }) {
  const { locale, locales, defaultLocale } = useRouter();

  return (
    <html lang={locale}>
      <body>
        <header>
          <h1>{locale === 'es' ? 'Bienvenido' : 'Welcome'}</h1>
          <nav>
            {locales.map((loc) => (
              <a key={loc} href={`/${loc}`}>
                {loc}
              </a>
            ))}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

**Explicación:** Esta configuración permite cambiar entre los idiomas `es` y `en`, con `es` como predeterminado. Puedes acceder a la aplicación en `http://localhost:3000/en` o `http://localhost:3000/es`.

---

#### 7. **Variables de entorno**

Las variables de entorno son útiles para manejar claves de API, URLs de base de datos, y otros valores sensibles. Crearemos un archivo `.env.local` en la raíz del proyecto.

**Archivo:** `.env.local`

```env
NEXT_PUBLIC_API_URL=https://miapi.com
API_KEY_SECRETA=miapikeysecreta
```

**Uso en código**

```js
export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div>
      <h1>API URL: {apiUrl}</h1>
    </div>
  );
}
```

**Explicación:** `NEXT_PUBLIC_` hace que las variables de entorno estén disponibles en el lado del cliente. Las variables sin `NEXT_PUBLIC_` sólo están disponibles en el servidor, proporcionando una capa de seguridad.

---

#### 8. **Uso de Hooks Personalizados (Custom Hooks)**

Podemos crear hooks personalizados para organizar mejor la lógica de nuestra aplicación. Por ejemplo, un hook para manejar la lógica de autenticación.

**Archivo:** `src/hooks/useAuth.js`

```js
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

**Uso en componentes**

```jsx
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedPage() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <p>Necesitas estar autenticado para ver esta página.</p>;
  }

  return <p>Contenido Protegido</p>;
}
```

---

#### 9. **Implementación de ISR con datos externos**

Podemos combinar ISR con datos externos como una API para que Next.js regenere las páginas automáticamente cuando cambien los datos.

**Archivo:** `src/app/blog/[id]/page.js`

```jsx
export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 60, // Revalida cada 60 segundos
  };
}

export default function PostPage({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

Claro, aquí tienes algunos ejercicios prácticos que puedes implementar en un proyecto Next.js basado en los conceptos avanzados que hemos cubierto. Estos ejercicios ayudarán a solidificar la comprensión de temas como rutas dinámicas, middleware, ISR, optimización de imágenes, internacionalización, y manejo de API.

---
### Ejercicios

#### Ejercicio 1: Crear páginas de usuarios con rutas dinámicas

**Objetivo:** Practicar la creación de rutas dinámicas y la recuperación de datos en el servidor.

1. Crea una nueva página dinámica en `src/app/users/[id]/page.js`.
2. Usa `getStaticPaths` y `getStaticProps` para pre-renderizar las páginas de usuario basándote en una lista de usuarios.
3. Muestra información básica del usuario (nombre, email, etc.).

**Pista:**
- Simula una lista de usuarios usando un arreglo en el archivo `getStaticPaths`.
- Cada página de usuario debería ser accesible en `/users/[id]`.

**Código inicial:**

```jsx
// src/app/users/[id]/page.js
export async function getStaticPaths() {
  const users = [{ id: 1 }, { id: 2 }, { id: 3 }]; // Simulación de usuarios
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const user = { id: params.id, name: `Usuario ${params.id}`, email: `user${params.id}@mail.com` };
  return { props: { user }, revalidate: 30 };
}

export default function UserPage({ user }) {
  return (
    <div>
      <h1>Perfil de {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

---

#### Ejercicio 2: Implementar middleware de autenticación

**Objetivo:** Configurar un middleware para restringir el acceso a ciertas páginas.

1. Crea un `src/middleware.js` que verifique la presencia de una cookie `auth`.
2. Si la cookie `auth` no existe, redirige a `/login`.
3. Protege la ruta `/dashboard` para que solo usuarios autenticados puedan acceder.

**Pista:**
- Usa `NextResponse.redirect(new URL('/login', request.url))` para redireccionar en el middleware.

**Código inicial:**

```js
// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/dashboard') && !request.cookies.get('auth')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
```

---

#### Ejercicio 3: Optimización de imágenes para productos

**Objetivo:** Practicar la optimización de imágenes en Next.js.

1. En la carpeta `public/`, añade una imagen de ejemplo llamada `product.png`.
2. Crea una página `/products` en `src/app/products/page.js` que muestre esta imagen de manera optimizada utilizando el componente `next/image`.
3. Ajusta el tamaño de la imagen para que sea 200x200.

**Código inicial:**

```jsx
// src/app/products/page.js
import Image from 'next/image';

export default function ProductsPage() {
  return (
    <div>
      <h1>Nuestros Productos</h1>
      <Image src="/product.png" alt="Producto" width={200} height={200} />
    </div>
  );
}
```

---

#### Ejercicio 4: Configurar internacionalización (i18n)

**Objetivo:** Configurar el proyecto para manejar múltiples idiomas.

1. Configura `next.config.js` para soportar `es` y `en` como idiomas.
2. En el archivo `src/app/layout.js`, detecta el idioma actual usando `useRouter()` y muestra un encabezado `Bienvenido` en español y `Welcome` en inglés.
3. Crea enlaces para cambiar entre idiomas en el encabezado.

**Código inicial:**

```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
};
```

```jsx
// src/app/layout.js
import { useRouter } from 'next/router';

export default function RootLayout({ children }) {
  const { locale, locales, defaultLocale } = useRouter();

  return (
    <html lang={locale}>
      <body>
        <header>
          <h1>{locale === 'es' ? 'Bienvenido' : 'Welcome'}</h1>
          <nav>
            {locales.map((loc) => (
              <a key={loc} href={`/${loc}`}>
                {loc}
              </a>
            ))}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

---

#### Ejercicio 5: Crear una API con CRUD completo

**Objetivo:** Crear una API REST básica usando rutas API de Next.js.

1. Crea un archivo `src/app/api/products/route.js`.
2. Implementa los métodos **GET**, **POST**, **PUT**, y **DELETE**.
   - **GET**: Devuelve una lista de productos.
   - **POST**: Añade un nuevo producto.
   - **PUT**: Actualiza un producto existente.
   - **DELETE**: Elimina un producto.

**Pista:**
- Usa un arreglo en memoria para almacenar los productos temporalmente.

**Código inicial:**

```js
// src/app/api/products/route.js
let products = [{ id: 1, name: 'Producto 1' }];

export async function GET(request) {
  return new Response(JSON.stringify(products), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request) {
  const newProduct = await request.json();
  products.push({ id: products.length + 1, ...newProduct });
  return new Response(JSON.stringify({ message: 'Producto creado' }), { headers: { 'Content-Type': 'application/json' } });
}

export async function PUT(request) {
  const updatedProduct = await request.json();
  products = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
  return new Response(JSON.stringify({ message: 'Producto actualizado' }), { headers: { 'Content-Type': 'application/json' } });
}

export async function DELETE(request) {
  const { id } = await request.json();
  products = products.filter((p) => p.id !== id);
  return new Response(JSON.stringify({ message: 'Producto eliminado' }), { headers: { 'Content-Type': 'application/json' } });
}
```

---

#### Ejercicio 6: Uso de ISR con datos externos

**Objetivo:** Configurar ISR para regenerar datos de productos cada 60 segundos.

1. Crea una página de detalles de producto en `src/app/products/[id]/page.js`.
2. Usa `getStaticPaths` para pre-generar las rutas de los productos.
3. Usa `getStaticProps` para obtener datos de un producto específico.
4. Configura `revalidate: 60` para regenerar la página cada 60 segundos.

**Código inicial:**

```jsx
// src/app/products/[id]/page.js
export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products = await res.json();
  const paths = products.map((product) => ({ params: { id: product.id.toString() } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);
  const product = await res.json();
  return {
    props: { product },
    revalidate: 60,
  };
}

export default function ProductDetail({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Detalle del producto {product.id}</p>
    </div>
  );
}
```


