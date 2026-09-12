# Publicar Forkify Recetas en Netlify

Esta guía explica cómo subir el recetario mexicano a **Netlify** en cuatro etapas.
La forma recomendada es conectar el repositorio para que Netlify vuelva a publicar
la aplicación cada vez que se haga un cambio.

> Importante: el proyecto es un monorepo. Cuando Netlify pregunte por el directorio
> raíz, deja la raíz del repositorio, no `artifacts/forkify-recetas`.

## Etapa 1 — Preparar y comprobar el proyecto

1. Abre el proyecto desde Replit o descarga/clona el repositorio en tu computadora.
2. Abre una terminal en la **raíz del repositorio**, donde están `package.json`,
   `pnpm-lock.yaml` y `netlify.toml`.
3. Instala las dependencias si todavía no están instaladas:

   ```bash
   pnpm install
   ```

4. Comprueba que el código no tenga errores de TypeScript:

   ```bash
   pnpm --filter @workspace/forkify-recetas run typecheck
   ```

5. Genera la versión de producción:

   ```bash
   PORT=4173 BASE_PATH=/ pnpm --filter @workspace/forkify-recetas run build
   ```

6. Confirma que se creó esta carpeta:

   ```text
   artifacts/forkify-recetas/dist/public
   ```

Esa carpeta contiene los archivos que Netlify publicará. No subas `src` como
carpeta de publicación.

## Etapa 2 — Subir el proyecto a un repositorio

Esta etapa solo es necesaria si usarás la opción recomendada de despliegue
automático.

1. Crea un repositorio nuevo en GitHub, por ejemplo `forkify-recetas`.
2. Desde la raíz del proyecto, guarda los cambios:

   ```bash
   git add .
   git commit -m "Preparar Forkify Recetas para Netlify"
   ```

3. Conecta el repositorio local con GitHub y súbelo:

   ```bash
   git remote add origin https://github.com/TU_USUARIO/forkify-recetas.git
   git branch -M main
   git push -u origin main
   ```

4. Sustituye `TU_USUARIO` por tu usuario real de GitHub.

Si el proyecto ya está en GitHub, puedes pasar directamente a la etapa 3.

## Etapa 3 — Crear el sitio en Netlify

1. Entra a [netlify.com](https://www.netlify.com/) e inicia sesión.
2. Selecciona **Add new project** o **Add new site**.
3. Elige **Import an existing project**.
4. Selecciona **GitHub** y autoriza a Netlify para leer el repositorio.
5. Elige el repositorio de Forkify Recetas.
6. Revisa esta configuración:

   ```text
   Base directory: dejar vacío
   Build command: PORT=4173 BASE_PATH=/ pnpm --filter @workspace/forkify-recetas run build
   Publish directory: artifacts/forkify-recetas/dist/public
   ```

7. Deja vacío el campo **Functions directory**, porque esta aplicación no necesita
   funciones de servidor.
8. Presiona **Deploy site**.

El repositorio ya incluye `netlify.toml`, por lo que Netlify debería detectar
automáticamente el comando de compilación, la carpeta publicada, Node.js 22 y la
redirección de la SPA. Si los campos aparecen vacíos, escribe manualmente los
valores anteriores.

## Etapa 4 — Revisar y compartir la aplicación

1. Espera a que el despliegue termine con estado **Published**.
2. Abre la URL que Netlify genera, por ejemplo:

   ```text
   https://nombre-del-sitio.netlify.app
   ```

3. Comprueba estas funciones:
   - Buscar `tacos`, `enchiladas` o `guacamole`.
   - Ver las tarjetas de resultados.
   - Abrir el detalle de una receta.
   - Cambiar de página.
   - Recargar la página con una receta seleccionada.
4. Si todo funciona, cambia el nombre del sitio desde **Site configuration** >
   **Change site name**.
5. Para publicar cambios posteriores, haz `git push` a la rama conectada. Netlify
   ejecutará el build y actualizará el sitio automáticamente.

## Alternativa — subir la carpeta manualmente

Si no quieres conectar GitHub:

1. Ejecuta el build desde la raíz del proyecto:

   ```bash
   PORT=4173 BASE_PATH=/ pnpm --filter @workspace/forkify-recetas run build
   ```

2. En Netlify selecciona **Add new project** > **Deploy manually**.
3. Arrastra únicamente la carpeta:

   ```text
   artifacts/forkify-recetas/dist/public
   ```

4. Espera a que Netlify termine y abre la URL generada.

Con esta opción tendrás que repetir el build y volver a arrastrar la carpeta cada
vez que cambies el proyecto.

## Solución rápida de problemas

- **Página en blanco:** revisa que hayas publicado
  `artifacts/forkify-recetas/dist/public`, no `artifacts/forkify-recetas`.
- **El build falla:** ejecuta primero el comando de `typecheck` de la etapa 1 y
  después vuelve a ejecutar el build.
- **Falla al recargar una receta:** verifica que esté presente la redirección
  `/* -> /index.html` del archivo `netlify.toml`.
- **No aparecen recetas:** la aplicación consulta la API pública de Forkify;
  revisa la conexión de internet y vuelve a intentarlo.