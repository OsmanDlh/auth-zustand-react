# Technical Test — React + TypeScript + Tailwind CSS 4

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4** con tema personalizado (CSS variables)
- **React Router DOM** — rutas públicas y privadas con protección por sesión
- **React Query** — manejo de estado de las peticiones (`QueryClient` centralizado en `lib/query-client.ts`)
- **React Hook Form** + **Zod** — formularios con validación
- **Axios** — cliente HTTP con interceptores
- **Zustand** — estado global de autenticación (`token`, usuario, login/logout)
- **js-cookie** — persistencia del token en cookie `access_token` (7 días)
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

## Autenticación y rutas

- **`stores/auth-store.ts` (Zustand)** — `token`, `user`, `setSession`, `setUser`, `logout`. El token se guarda en cookie y se sincroniza con React Query al cerrar sesión (`queryClient.clear()`).
- **`components/auth/auth-route-guard.tsx`** — envuelve layouts según `variant`:
  - **`protected`**: solo usuarios con sesión (si no hay token → redirección a `/auth` con `state.from` para volver tras el login).
  - **`guest`**: solo sin sesión (si hay token en `/auth` → redirección al destino previo o `/dashboard`).
- **`utils/auth-navigation.ts`** — `getPostAuthRedirectPath` para reconstruir la URL de destino tras login.
- **`lib/api-client.ts`** — interceptor de petición con Bearer; en **401** ejecuta logout del store y redirección a `/auth`.

Las rutas definidas en `private.routes.tsx` van dentro de `AuthRouteGuard` con `variant="protected"`. Las de login bajo `/auth` usan `variant="guest"`.

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/           # Componentes base sin lógica (Button, Card, Input, Label)
│   ├── shared/       # Componentes reutilizables con lógica (Form, FormInput)
│   ├── layouts/      # Layouts de la app (AuthLayout, PrivateLayout)
│   └── auth/         # auth-form, auth-route-guard
├── pages/            # Páginas/vistas — solo composición donde aplica
│   ├── auth/         # login-page, reset-password-page
│   ├── dashboard/    # dashboard-page.tsx
│   └── not-found-page.tsx
├── routes/           # Definición de rutas (app-routes, public.routes, private.routes)
├── services/         # Hooks de React Query + llamadas API por entidad
├── stores/           # Estado global Zustand (auth-store)
├── types/            # Tipos TypeScript por entidad (auth.type.ts)
├── lib/              # query-client (React Query), api-client (axios), utils
├── providers/        # Providers de la app (QueryProvider, AppProvider)
├── utils/            # Utilidades (auth-navigation, formateo)
├── styles/           # Estilos globales (main.css, theme.css)
```

### Sistema de rutas

Las rutas se organizan en 3 archivos:

- `app-routes.tsx` — archivo principal que compone todas las rutas
- `public.routes.tsx` — rutas bajo `/auth` (login, recuperación de contraseña) con guard `guest`
- `private.routes.tsx` — rutas privadas (p. ej. dashboard) con guard `protected`

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

| Qué                              | Dónde                                      |
| -------------------------------- | ------------------------------------------ |
| Botón, Card, Input base          | `components/ui/`                           |
| Form con react-hook-form         | `components/shared/`                       |
| Formulario de login              | `components/auth/auth-form.tsx`            |
| Protección de rutas              | `components/auth/auth-route-guard.tsx`     |
| Página de login (vista)          | `pages/auth/login-page.tsx`                |
| Vista recuperar contraseña (UI)  | `pages/auth/reset-password-page.tsx`       |
| Hook `useLogin` / `useGetMe`     | `services/auth.service.ts`                 |
| Tipo `LoginRequest`              | `types/auth.type.ts`                       |
| Store sesión (Zustand)           | `stores/auth-store.ts`                     |
| Rutas públicas                   | `routes/public.routes.tsx`                 |
| Rutas privadas                   | `routes/private.routes.tsx`                |
| Redirección post-login           | `utils/auth-navigation.ts`                 |
| `cn()`, `formatDate()`           | `lib/utils.ts`, `utils/`                   |
| Instancia React Query compartida | `lib/query-client.ts`                    |
| Axios config                     | `lib/api-client.ts`                        |

### Crear un nuevo módulo (ejemplo: `users`)

1. `types/user.type.ts` — definir tipos
2. `services/user.service.ts` — hooks de React Query
3. `components/user/` — componentes específicos
4. `pages/user/` — páginas (solo composición)
5. Agregar rutas en `routes/public.routes.tsx` o `routes/private.routes.tsx` (si es privada, envolver con `AuthRouteGuard` o añadir hijos bajo una ruta ya protegida)

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

| Ruta                     | Acceso        | Página / descripción        |
| ------------------------ | ------------- | ----------------------------- |
| `/auth`                  | Solo invitado | Login                         |
| `/auth/reset-password`   | Solo invitado | Recuperar contraseña (vista)  |
| `/dashboard`             | Solo sesión   | Dashboard                     |
| `*`                      | —             | 404                           |

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

La API apunta a **[DummyJSON](https://dummyjson.com)**, un servicio gratuito de pruebas REST que no requiere registro.
