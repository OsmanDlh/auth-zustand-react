# Technical Test — React + TypeScript + Tailwind CSS 4

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4** con tema personalizado (CSS variables)
- **React Router DOM** — rutas públicas y privadas
- **React Query** — manejo de estado de las peticiones
- **React Hook Form** + **Zod** — formularios con validación
- **Axios** — cliente HTTP con interceptores
- **Zustand** — estado global (disponible, no implementado)
- **React Hot Toast** — notificaciones
- **React Icons** — iconografía

## Inicio rápido

```bash
npm install
cp .env.example .env
npm run dev
```

### API

El proyecto usa **[DummyJSON](https://dummyjson.com)** como API de pruebas gratuita (no requiere registro ni API key).

Credenciales de login: `emilys` / `emilyspass`

#### Endpoints utilizados

| Método | Endpoint      | Descripción                                                              |
| ------ | ------------- | ------------------------------------------------------------------------ |
| POST   | `/auth/login` | Login — recibe `username`, `password`, devuelve `accessToken`            |
| GET    | `/auth/me`    | Datos del usuario autenticado (requiere `Authorization: Bearer <token>`) |

Documentación completa: [dummyjson.com/docs](https://dummyjson.com/docs)

## Scripts

| Comando            | Descripción                 |
| ------------------ | --------------------------- |
| `npm run dev`      | Servidor de desarrollo      |
| `npm run build`    | Build de producción         |
| `npm run lint`     | Ejecutar ESLint             |
| `npm run lint:fix` | Ejecutar ESLint con autofix |
| `npm run format`   | Formatear con Prettier      |

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/           # Componentes base sin lógica (Button, Card, Input, Label)
│   ├── shared/       # Componentes reutilizables con lógica (Form, FormInput)
│   ├── layouts/      # Layouts de la app (AuthLayout, PrivateLayout)
│   └── {entidad}/    # Componentes específicos de una vista (auth/)
├── pages/            # Páginas/vistas — solo composición, sin lógica propia
│   ├── auth/         # login-page.tsx
│   ├── dashboard/    # dashboard-page.tsx
│   └── not-found-page.tsx
├── routes/           # Definición de rutas (app-routes, public.routes, private.routes)
├── services/         # Hooks de React Query + llamadas API por entidad
├── types/            # Tipos TypeScript por entidad (auth.type.ts)
├── lib/              # Configuración de librerías (axios, utils)
├── providers/        # Providers de la app (QueryProvider, AppProvider)
├── utils/            # Utilidades puras (formateo de fechas)
├── styles/           # Estilos globales (main.css, theme.css)
```

### Sistema de rutas

Las rutas se organizan en 3 archivos:

- `app-routes.tsx` — archivo principal que compone todas las rutas
- `public.routes.tsx` — rutas públicas (auth, login, reset-password)
- `private.routes.tsx` — rutas privadas (dashboard)

## Convenciones de código

### Componentes

- **Siempre usar `const` + arrow function**, nunca `function`:

  ```tsx
  // ✅ Correcto
  const MyComponent = () => { ... }

  // ❌ Incorrecto
  function MyComponent() { ... }
  ```

- **Exports al final del archivo**, nunca inline:

  ```tsx
  // ✅ Correcto
  const MyComponent = () => { ... }
  export default MyComponent

  // ❌ Incorrecto
  export const MyComponent = () => { ... }
  ```

- **Tipos con `export type {}`** separado:

  ```tsx
  type ButtonProps = { ... }
  const Button = (props: ButtonProps) => { ... }

  export type { ButtonProps }
  export { Button }
  ```

- **Máximo 350 líneas** por archivo (sin contar blancos ni comentarios).

### Imports

- **Siempre usar alias `@/`**, nunca rutas relativas (`../`):

  ```tsx
  // ✅ Correcto
  import { Button } from '@/components/ui/button'

  // ❌ Incorrecto
  import { Button } from '../../components/ui/button'
  ```

- **Imports ordenados automáticamente** por ESLint al guardar.

### Prohibido

- `console.log` — usar `toast` para feedback al usuario.
- Imports relativos (`./`, `../`).
- `function` declarations para componentes.
- Exports inline.
- Más de 350 líneas por archivo.

### Dónde va cada cosa

| Qué                      | Dónde                       |
| ------------------------ | --------------------------- |
| Botón, Card, Input base  | `components/ui/`            |
| Form con react-hook-form | `components/shared/`        |
| Formulario de login      | `components/auth/`          |
| Página de login (vista)  | `pages/auth/login-page.tsx` |
| Hook `useLogin`          | `services/auth.service.ts`  |
| Tipo `LoginRequest`      | `types/auth.type.ts`        |
| Rutas públicas           | `routes/public.routes.tsx`  |
| Rutas privadas           | `routes/private.routes.tsx` |
| `cn()`, `formatDate()`   | `lib/utils.ts`, `utils/`    |
| Axios config             | `lib/api-client.ts`         |

### Crear un nuevo módulo (ejemplo: `users`)

1. `types/user.type.ts` — definir tipos
2. `services/user.service.ts` — hooks de React Query
3. `components/user/` — componentes específicos
4. `pages/user/` — páginas (solo composición)
5. Agregar rutas en `routes/public.routes.tsx` o `routes/private.routes.tsx`

### Servicios (React Query)

Seguir este patrón:

```tsx
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/api-client'

import type { User } from '@/types/user.type'

const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  detail: (id: number) => [...userKeys.all, 'detail', id] as const,
}

const useGetUsers = (): UseQueryResult<User[]> => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async (): Promise<User[]> => {
      const response = await apiClient.get<User[]>('/users')
      return response.data
    },
  })
}

export { userKeys, useGetUsers }
```

## Rutas

| Ruta                   | Tipo    | Página    |
| ---------------------- | ------- | --------- |
| `/auth`                | Pública | Login     |
| `/auth/reset-password` | Pública | 404       |
| `/dashboard`           | Pública | Dashboard |
| `*`                    | —       | 404       |

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

La API apunta a **[DummyJSON](https://dummyjson.com)**, un servicio gratuito de pruebas REST que no requiere registro.
# auth-flow-zustand
