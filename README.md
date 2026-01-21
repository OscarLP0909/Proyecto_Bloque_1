🏎️ Fórmula 1 en la Actualidad

Proyecto web académico desarrollado con HTML, CSS y JavaScript, cuyo objetivo es analizar y presentar información relevante sobre la Fórmula 1 actual, incluyendo pilotos, resultados y comparativas, aplicando buenas prácticas de desarrollo front-end.

📌 Descripción del proyecto

Este proyecto consiste en una aplicación web informativa sobre la Fórmula 1 que permite:

Visualizar una lista de pilotos de la parrilla actual.

Consultar el detalle individual de cada piloto y su último resultado.

Realizar una comparativa entre dos pilotos seleccionados.

Gestionar correctamente aspectos legales como cookies.

Validar formularios de contacto mediante JavaScript.

La aplicación consume datos reales desde una API pública y aplica criterios de diseño moderno, experiencia de usuario y gestión de datos incompletos.

🧪 Tecnologías utilizadas

HTML5 – Estructura semántica de la aplicación

CSS3 – Diseño responsive, animaciones y estilo corporativo

JavaScript (ES6) – Lógica de la aplicación y consumo de API

Bootstrap 5 – Componentes base y navegación responsive

OpenF1 API – Datos reales de pilotos y resultados

LocalStorage – Gestión de cookies y preferencias

🗂️ Estructura del proyecto
/
├── index.html
├── drivers.html
├── detail.html
├── compare.html
├── contact.html
├── cookies.html
│
├── css/
│   ├── index.css
│   ├── drivers.css
│   ├── detail.css
│   ├── compare.css
│   ├── contact.css
│   └── cookies.css
│
├── scripts/
│   ├── drivers.js
│   ├── detail.js
│   ├── compare.js
│   ├── contact.js
│   └── cookies.js
│
│
│
└── README.md

🚀 Funcionalidades principales

📋 Lista de pilotos

Carga dinámica de pilotos desde la API.

Diseño en tarjetas con animación de entrada.

Avatar con iniciales cuando la imagen no está disponible.

Navegación al detalle del piloto.

🔍 Detalle del piloto

Información detallada del piloto seleccionado.

Resultado de la última sesión disponible.

Avatar alternativo con iniciales si no existe imagen.

Animaciones suaves de entrada y navegación clara.

⚔️ Comparador de pilotos

Selección de dos pilotos distintos.

Comparación visual lado a lado.

Estadísticas clave: posición, puntos, vueltas, estado.

Diseño coherente con el resto de la aplicación.

🍪 Cookies

Gestión del consentimiento mediante localStorage.

Redirección si no se han aceptado las cookies.

Página legal informativa.

✉️ Contacto

Formulario de contacto con validación en JavaScript.

Validación de email, asunto y mensaje.

Mensajes de error claros y accesibles.

🎨 Decisiones de diseño destacadas

Consistencia visual: todas las páginas comparten tipografía, colores y estilo.

Avatar con iniciales para gestionar imágenes null de la API (buena práctica profesional).

Animaciones de entrada para mejorar la experiencia de usuario.

Responsive design para distintos tamaños de pantalla.

Separación de responsabilidades entre HTML, CSS y JS.

⚠️ Gestión de datos incompletos

La API utilizada no garantiza que todos los pilotos tengan imagen disponible.
Para resolver este problema se implementó:

Un avatar con iniciales.

Color dinámico según la escudería.

Misma área visual que una imagen real.

Esto asegura:

Consistencia en el diseño.

Buena experiencia de usuario.

Robustez del proyecto.

📚 Contexto académico

Este proyecto ha sido desarrollado con fines educativos, aplicando los contenidos del módulo de desarrollo web front-end, incluyendo:

Manipulación del DOM

Consumo de APIs REST

Validación de formularios

Gestión del estado en el navegador

Diseño responsive y UX

🧑‍💻 Autor

Proyecto realizado por:
Óscar Luque Porca

📄 Licencia

Este proyecto es de uso exclusivamente académico.
No tiene fines comerciales.
