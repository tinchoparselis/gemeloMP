# Gemelo de MP — tutor socrático generativo local (experimental)

## Qué incluye
- `index.html`: tutor para estudiantes, 5 rondas con **generación real** mediante un modelo abierto ejecutado con WebLLM/WebGPU.
- `app.js`: motor, historial y exportación JSON.
- `marco-mp.js`: síntesis conceptual editable (paráfrasis documentadas).
- `docente.html` y `docente.js`: importación de JSON, indicadores exploratorios y exportación CSV.
- `fuentes.html`: fuentes y límites.
- `style.css`: diseño para celulares y computadoras.

## Publicar gratis en GitHub Pages
1. Crear un repositorio **público** nuevo en GitHub (por ejemplo `gemelo-mp-local`).
2. Subir **los siete archivos** de esta carpeta a la raíz del repositorio, sin subir la carpeta contenedora.
3. Ir a Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.
4. Esperar la publicación. URL típica: `https://USUARIO.github.io/gemelo-mp-local/`.
5. El panel docente está en `https://USUARIO.github.io/gemelo-mp-local/docente.html`.

## Cómo probar
1. Abrir la web desde Chrome o Edge actualizados en una computadora con WebGPU. El sitio debe abrirse por HTTPS.
2. Pulsar «Descargar e iniciar motor generativo». La primera descarga puede ser grande y lenta. El modelo y los componentes se obtienen de terceros (CDN y repositorio de pesos).
3. Responder la pregunta inicial, esperar la intervención generada, reformular hasta completar cinco rondas.
4. Descargar el JSON y enviarlo al docente por campus u otro medio.
5. Abrir `docente.html`, seleccionar los JSON recibidos y descargar el CSV o corpus.

## Compatibilidad y límites
- **No funciona en todos los celulares**: depende de WebGPU, memoria y soporte del navegador. No hay un modo generativo universal gratuito garantizado en GitHub Pages. No hay API ni costo por consulta.
- El paquete carga `@mlc-ai/web-llm` mediante `https://esm.run/` y selecciona un modelo pequeño disponible en `prebuiltAppConfig.model_list`. Si el catálogo cambia, puede requerir actualizar el selector de `app.js`. No se han ejecutado pruebas reales en todos los dispositivos.
- En iPhone/iPad la compatibilidad WebGPU depende de versión de iOS y navegador; en móviles de poca RAM es frecuente que falle.
- El modelo no está *fine-tuned* con la obra de Parselis: está guiado mediante un prompt y un marco conceptual sintético. Para fidelidad bibliográfica más fuerte hay que ampliar y validar ese corpus.
- **Privacidad**: las respuestas se procesan localmente durante la inferencia. Al cargar la biblioteca y el modelo, el navegador contacta servidores de distribución. El docente solo recibe archivos que el estudiante le entregue.
- **No hay base de datos** ni recopilación automática. El panel docente es accesible a cualquiera que conozca su URL, pero no contiene datos hasta que el docente carga archivos localmente.
- El análisis docente es heurístico por expresiones, no interpretación profunda. Revisar resultados y no usarlos para calificar automáticamente.
- GitHub Pages tiene políticas y límites de uso; la publicación gratuita no implica disponibilidad garantizada.

## Cómo cambiar el marco de MP
Editar `marco-mp.js` y reemplazar las paráfrasis por síntesis contrastadas con las fuentes, manteniendo `id`, `nombre`, `fuente` y `texto`. No copiar capítulos enteros de libros protegidos a un repositorio público.

## Si falla la descarga
Abrir consola del navegador (F12 → Console). Verificar compatibilidad WebGPU, memoria libre, conexión y errores de descarga. En dispositivos incompatibles usar una computadora compatible; esta versión no simula IA con reglas.
