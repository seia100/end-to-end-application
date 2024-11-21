# Temas Teóricos para Revisar
- [Temas Teóricos para Revisar](#temas-teóricos-para-revisar)
  - [1. Fundamentos de Next.js](#1-fundamentos-de-nextjs)
  - [2. TypeScript y Tipado Avanzado](#2-typescript-y-tipado-avanzado)
  - [3. Fundamentos de APIs REST](#3-fundamentos-de-apis-rest)
  - [4. Manejo de Almacenamiento Local](#4-manejo-de-almacenamiento-local)
  - [5. Gestión de Estados y Efectos en React](#5-gestión-de-estados-y-efectos-en-react)
  - [6. Estilos en Aplicaciones Web](#6-estilos-en-aplicaciones-web)
  - [7. Optimización para Producción](#7-optimización-para-producción)
  - [8. Fundamentos del Desarrollo Full-Stack](#8-fundamentos-del-desarrollo-full-stack)
  - [Temas Avanzados (Opcionales)](#temas-avanzados-opcionales)

## 1. Fundamentos de Next.js
- **Estructura de carpetas en Next.js**:
  - Diferencia entre `pages/` y `app/` (App Router en Next.js 13+).
  - Configuración de rutas estáticas, dinámicas y anidadas.
- **SSR, SSG, y CSR**:
  - Diferencias entre Server-Side Rendering (SSR), Static Site Generation (SSG) y Client-Side Rendering (CSR).
  - Cuándo y cómo usar `getStaticProps`, `getServerSideProps` y `useEffect`.
- **API Routes**:
  - Cómo crear rutas de API (`pages/api` o `app/api`).
  - Uso de parámetros dinámicos en rutas (`[param].ts` o `[param]/route.ts`).
- **Pre-renderización incremental (ISR)**:
  - Concepto de ISR (Incremental Static Regeneration) y cómo beneficia el rendimiento.
  - Ejemplo práctico de configuración en Next.js.

## 2. TypeScript y Tipado Avanzado
- **Uso de TypeScript en proyectos web**:
  - Configuración de `tsconfig.json` en Next.js.
  - Ventajas de usar TypeScript frente a JavaScript.
- **Interfaces y Tipos**:
  - Diferencias entre `interface` y `type`.
  - Cómo tipar datos en rutas API (`NextApiRequest`, `NextApiResponse`).
- **Tipado en React**:
  - Tipos para props, estados y hooks (`useState`, `useEffect`).
  - Tipado para componentes funcionales (`React.FC` o `NextPage`).

## 3. Fundamentos de APIs REST
- **Códigos de estado HTTP**:
  - Clasificación y significado de códigos 2xx, 4xx, y 5xx.
  - Por qué devolver códigos adecuados mejora la experiencia del cliente.
- **Manejo de errores en APIs**:
  - Técnicas para devolver errores claros y útiles al cliente.
  - Cómo propagar errores de servicios externos (por ejemplo, APIs de terceros).
- **Parámetros dinámicos y opcionales en APIs**:
  - Implementación de parámetros dinámicos (`/api/weather/:zipcode`).
  - Uso de query strings opcionales (`?unit=metric`).

## 4. Manejo de Almacenamiento Local
- **localStorage**:
  - Qué es y cuándo usarlo en aplicaciones web.
  - Limitaciones de `localStorage` (seguridad, tamaño, sincronización).
- **Alternativas a localStorage**:
  - `sessionStorage` para datos temporales en una sesión.
  - Cookies seguras para datos sensibles (autenticación, sesiones).
  - `IndexedDB` para almacenamiento más complejo.
- **Persistencia de datos en React**:
  - Uso de hooks como `useEffect` para sincronizar `localStorage`.
  - Creación de hooks personalizados (`useSessionStorage` o `useLocalStorage`).

## 5. Gestión de Estados y Efectos en React
- **React Hooks**:
  - `useState` para manejar estados.
  - `useEffect` para sincronizar comportamientos basados en efectos secundarios.
  - Manejo de dependencias en `useEffect`.
- **Componentización**:
  - Cómo dividir la lógica en componentes reutilizables.
  - Ventajas de la modularidad en aplicaciones grandes.
- **Eventos del navegador**:
  - Uso del evento `storage` para sincronizar datos entre pestañas.

## 6. Estilos en Aplicaciones Web
- **CSS Modular**:
  - Ventajas frente a CSS global (aislamiento, mantenimiento, rendimiento).
  - Cómo usar archivos `.module.css` en Next.js.
- **Buenas prácticas en diseño CSS**:
  - Separación de estilos específicos y globales.
  - Uso de variables CSS y convenciones de nombres.
- **CSS dinámico**:
  - Aplicar clases condicionales en React.
  - Uso de librerías como `classnames` para gestionar clases dinámicas.

## 7. Optimización para Producción
- **SEO (Search Engine Optimization)**:
  - Uso del componente `Head` en Next.js para meta tags dinámicos.
  - Importancia de las etiquetas `<title>`, `<meta>`, y `<og:*>`.
- **Optimización del rendimiento**:
  - Reducción del tamaño de los estilos cargados con CSS modular.
  - Evitar renderizados innecesarios en componentes React.
- **Manejo de errores en producción**:
  - Técnicas para registrar y diagnosticar errores (por ejemplo, logs).

## 8. Fundamentos del Desarrollo Full-Stack
- **Arquitectura cliente-servidor**:
  - Flujo de datos entre cliente y servidor en aplicaciones web.
  - Cómo manejar solicitudes asíncronas en React (fetch, axios).
- **Integración con APIs externas**:
  - Validación de respuestas de APIs externas.
  - Manejo de errores en llamadas a servicios externos.

## Temas Avanzados (Opcionales)
1. **Autenticación y Sesiones**:
   - Implementación de autenticación JWT o con cookies seguras.
   - Uso de librerías como `next-auth`.
2. **Uso de ISR en Next.js**:
   - Cómo implementar ISR para datos que cambian periódicamente.
   - Casos de uso frente a SSR y SSG.
3. **Context API o Librerías de Estado Global**:
   - Uso del Context API para manejar datos compartidos entre componentes.
   - Introducción a librerías como Redux o Zustand.
