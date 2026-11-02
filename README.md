# Gemelo de MP — ¿Qué es la tecnología?

Aplicación estática, gratuita y sin APIs externas para cinco iteraciones de reflexión socrática y análisis exploratorio de recorridos.

## Publicar en GitHub Pages

1. Crear un repositorio público nuevo en GitHub (por ejemplo `gemelo-mp-gratis`).
2. Subir **todos los archivos de esta carpeta** a la raíz del repositorio: `index.html`, `docente.html`, `style.css`, `engine.js`, `app.js`, `docente.js`.
3. En el repositorio, abrir **Settings → Pages**.
4. En **Build and deployment**, seleccionar **Deploy from a branch**; elegir **main** y carpeta **/(root)**; guardar.
5. Esperar la publicación y abrir `https://TU-USUARIO.github.io/gemelo-mp-gratis/`.
6. Compartir solamente el enlace del tutor con los estudiantes. La página docente está en `/docente.html`.

## Flujo de uso

- Estudiante: responde cinco veces; el motor escoge una repregunta a partir de patrones presentes en la respuesta; descarga JSON al terminar.
- Docente: solicita los JSON por campus o correo; abre `docente.html`, selecciona todos los JSON y descarga informe y tabla CSV.
- Las respuestas se guardan localmente en el navegador del estudiante. No existe envío automático, ni base de datos, ni login.
- El análisis docente se realiza localmente en su navegador.

## Límites y alcance

- **No es un LLM ni una IA generativa**: las repreguntas provienen de un repertorio revisable de preguntas, seleccionado con reglas. No atribuye citas a Martín Parselis.
- Las categorías son **hipótesis de trabajo** para discutir y ajustar a partir de textos autorizados, especialmente *Dar sentido a la técnica*. No reemplazan lectura conceptual ni evaluación docente.
- La detección por palabras clave produce falsos positivos y negativos; la tabla mide menciones detectables, **no aprendizaje**.
- No hay control de identidad ni verificación de autoría; los IDs son seudónimos aleatorios, no identificadores seguros.
- GitHub Pages es alojamiento público estático. No recibe respuestas automáticamente.
- El almacenamiento local puede perderse si el usuario borra datos del navegador; conviene descargar el JSON al finalizar.
- Para preservar gratuidad y compatibilidad, esta versión no incorpora WebLLM. Un módulo opcional de IA local podría añadirse luego, con pruebas de WebGPU y memoria en móviles.

## Archivos

- `index.html`: tutor del estudiante.
- `engine.js`: categorías y repreguntas socráticas.
- `app.js`: flujo, persistencia y exportación.
- `docente.html`, `docente.js`: analizador local de archivos JSON.
- `style.css`: interfaz responsive.

## Privacidad

Antes de usar con una cursada, informar que se recopilarán las respuestas entregadas voluntariamente y su finalidad pedagógica. Recomendar no incluir nombres ni datos personales en las respuestas. El docente debe custodiar los archivos que reciba.
