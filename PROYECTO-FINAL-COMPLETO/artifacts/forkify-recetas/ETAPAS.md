# Forkify Recetas — recetario mexicano en 4 etapas

## Etapa 1 — Base y detalle de una receta

- Se creó la capa de servicio para consumir la API pública de Forkify.
- Las búsquedas se acotan al término `mexican` para mantener el recetario enfocado
  en comida mexicana.
- Se modelaron `Recipe`, `SearchResult`, `Ingredient` y el estado de búsqueda.
- Se agregó el detalle de cada platillo por hash, con imagen, publisher, tiempo,
  porciones, ingredientes y enlace a la preparación original.
- Se añadió timeout de red y normalización de imágenes para que las URLs `http` no
  fallen al cargar la app con `https`.

## Etapa 2 — Búsqueda y modularización

- El buscador acepta clic y Enter.
- La consulta se mantiene separada del detalle seleccionado.
- La lógica asíncrona está encapsulada en hooks y el acceso remoto en un servicio.
- La interfaz está separada en página, barra de búsqueda, tarjetas, detalle y paginación.

## Etapa 3 — Vistas y manejo de estados

- Se implementaron estados de carga con skeletons.
- Se implementaron estados vacíos cuando no hay resultados.
- Se implementaron estados de error para búsquedas y detalles, con reintento.
- Se agregó selección por hash y navegación para volver a resultados.

## Etapa 4 — Paginación y entrega

- Los resultados se muestran en grupos de 10.
- Se agregaron botones de anterior y siguiente con estado deshabilitado.
- La interfaz es responsive para móvil y escritorio.
- La app queda lista para ejecutar, compilar y publicar.

## Comandos principales

```bash
pnpm --filter @workspace/forkify-recetas run typecheck
pnpm --filter @workspace/forkify-recetas run build
```