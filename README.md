# 🏎️ Fórmula 1 en la Actualidad

Proyecto web académico desarrollado con **HTML, CSS y JavaScript**, cuyo objetivo es analizar y presentar información relevante sobre la **Fórmula 1 actual**, incluyendo pilotos, resultados y comparativas, aplicando buenas prácticas de desarrollo front-end.

---

## 📌 Descripción del proyecto

Este proyecto consiste en una aplicación web informativa sobre la Fórmula 1 que permite:

- Visualizar una **lista de pilotos** de la parrilla actual.
- Consultar el **detalle individual** de cada piloto y su último resultado.
- Realizar una **comparativa entre dos pilotos** seleccionados.
- Gestionar correctamente aspectos legales como **cookies**.
- Validar formularios de contacto mediante **JavaScript**.

La aplicación consume datos reales desde una API pública y aplica criterios de **diseño moderno**, **experiencia de usuario** y **gestión de datos incompletos**.

---

## 🧪 Tecnologías utilizadas

- **HTML5** – Estructura semántica de la aplicación  
- **CSS3** – Diseño responsive, animaciones y estilo corporativo  
- **JavaScript (ES6)** – Lógica de la aplicación y consumo de API  
- **Bootstrap 5** – Componentes base y navegación responsive  
- **OpenF1 API** – Datos reales de pilotos y resultados  
- **LocalStorage** – Gestión de cookies y preferencias  

---

## 🗂️ Estructura del proyecto

```text
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

```

---

## 🚀 Funcionalidades principales

### 📋 Lista de pilotos
- Carga dinámica de pilotos desde la **OpenF1 API**.
- Visualización mediante **tarjetas** con animación de entrada.
- Gestión de imágenes inexistentes mediante **avatar con iniciales**.
- Navegación directa al **detalle individual del piloto**.
- Color dinámico de tarjetas según la escudería.

---

### 🔍 Detalle del piloto
- Información detallada del piloto seleccionado.
- Consulta del **resultado de la última sesión disponible**.
- Visualización de estadísticas clave:
  - Posición
  - Puntos
  - Vueltas completadas
  - Estado de la carrera
- Avatar alternativo con iniciales si la imagen no está disponible.
- Animaciones suaves de entrada para mejorar la experiencia de usuario.
- Botón de navegación para volver a la lista de pilotos.

---

### ⚔️ Comparador de pilotos
- Selección de **dos pilotos distintos** mediante desplegables.
- Bloqueo automático de la selección duplicada.
- Comparación visual **lado a lado**.
- Estadísticas comparadas:
  - Posición
  - Puntos
  - Vueltas
  - Estado de carrera
- Diseño coherente con el resto de la aplicación.
- Tarjetas dinámicas con color identificativo por escudería.

---

### 🍪 Gestión de cookies
- Control del consentimiento mediante **LocalStorage**.
- Redirección automática si las cookies no han sido aceptadas.
- Página legal informativa adaptada al contexto académico.
- Persistencia de la aceptación entre sesiones.

---

### ✉️ Formulario de contacto
- Formulario accesible y responsive.
- Validación en **JavaScript** de:
  - Correo electrónico (formato válido).
  - Asunto (campo obligatorio).
  - Mensaje (contenido mínimo).
- Mensajes de error claros para el usuario.
- Prevención del envío si los datos no son válidos.

---

## 🎨 Decisiones de diseño destacadas

- **Consistencia visual** entre todas las páginas:
  - Tipografía común.
  - Paleta de colores corporativa.
  - Componentes reutilizables.
- Uso de **avatar con iniciales** para gestionar imágenes `null` de la API.
- Animaciones de entrada discretas para mejorar la experiencia de usuario.
- Diseño **responsive**, adaptable a escritorio, tablet y móvil.
- Separación clara de responsabilidades:
  - HTML para estructura.
  - CSS para presentación.
  - JavaScript para lógica.

---

## ⚠️ Gestión de datos incompletos

La API utilizada no garantiza que todos los pilotos tengan imagen disponible.  
Para resolver este problema se implementó:

- Avatar con **iniciales del piloto**.
- Uso de colores dinámicos según la escudería.
- Conservación del mismo espacio visual que una imagen real.

Esto permite:

- Mantener la consistencia del diseño.
- Evitar errores visuales.
- Mejorar la robustez del proyecto.

---

## 📚 Contexto académico

Proyecto desarrollado con fines educativos, aplicando conceptos del módulo de **desarrollo web front-end**, incluyendo:

- Manipulación del DOM.
- Consumo de APIs REST.
- Validación de formularios.
- Gestión del estado en el navegador.
- Principios de diseño UX/UI.
- Responsive Design.

---

## 🧑‍💻 Autor

**Proyecto realizado por:**  
**Óscar Luque Porca**

---

## 📄 Licencia

Este proyecto es de uso **exclusivamente académico**.  
No tiene fines comerciales.

