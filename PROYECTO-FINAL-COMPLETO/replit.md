# Forkify Recetas

Aplicación web frontend para buscar platillos mexicanos en Forkify, consultar sus ingredientes y navegar resultados paginados.

## Run & Operate

- `pnpm --filter @workspace/forkify-recetas run dev` — run the recipe app
- `pnpm --filter @workspace/forkify-recetas run typecheck` — check the recipe app
- `pnpm --filter @workspace/forkify-recetas run build` — build the recipe app for production
- `PORT=4173 BASE_PATH=/ pnpm --filter @workspace/forkify-recetas run build` — build output for Netlify
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/forkify-recetas/src/services/forkify-api.ts` — API pública y modelos de recetas
- `artifacts/forkify-recetas/src/hooks/use-forkify.ts` — estado asíncrono de búsqueda y detalle
- `artifacts/forkify-recetas/src/pages/home.tsx` — composición principal, hash y paginación
- `artifacts/forkify-recetas/src/components/` — vistas de búsqueda, tarjetas, detalle y estados
- `artifacts/forkify-recetas/ETAPAS.md` — desglose académico de las cuatro etapas

## Architecture decisions

- La app es frontend-only y consume directamente la API pública de Forkify; no necesita base de datos ni autenticación.
- El hash de la URL identifica la receta seleccionada, de modo que el detalle se puede recargar y compartir.
- El servicio remoto centraliza timeout, errores HTTP y normalización de imágenes antes de exponer datos a React.
- La capa de búsqueda antepone `mexican` a las consultas para conservar el enfoque gastronómico del producto.

## Product

Forkify Recetas permite buscar tacos, enchiladas, guacamole y otros platillos mexicanos, revisar resultados en páginas de 10 recetas y abrir el detalle completo de una receta con ingredientes, tiempos, porciones y enlace a la preparación original.

## User preferences

La implementación solicitada debe estar organizada en cuatro etapas funcionales.

## Gotchas

- La API de Forkify puede devolver imágenes con URLs `http`; el servicio las convierte a `https` para evitar bloqueos de contenido mixto.
- Netlify debe publicar `artifacts/forkify-recetas/dist/public` y usar la redirección SPA definida en `netlify.toml`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
