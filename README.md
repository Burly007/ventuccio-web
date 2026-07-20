# Restaurante Ventuccio — Rediseño web

Propuesta de rediseño para [Restaurante Ventuccio](https://restauranteventuccio.com) (Marbella y Jaén).
Sitio estático, sin dependencias ni proceso de build: HTML + CSS + JavaScript.

> **Estado: demo.** Los formularios validan y muestran confirmación, pero **no envían datos**
> a ningún sitio todavía. Ver [Pendiente](#pendiente).

---

## Estructura

```
.
├── index.html              Página completa (12 secciones)
├── 404.html                Página de error
├── robots.txt              Bloquea indexación mientras es demo
├── .nojekyll               Desactiva Jekyll en GitHub Pages
└── assets/
    ├── css/styles.css      Diseño, tokens de color, responsive
    └── js/main.js          Datos de la carta + interactividad
```

Toda la carta, las reseñas y los platos destacados están en **`assets/js/main.js`**, al principio del
archivo (`DISHES`, `MENU`, `SALSAS`, `TESTIMONIALS`). Para cambiar un precio o un plato **no hace falta
tocar el HTML**.

---

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube el proyecto:

   ```bash
   git remote add origin https://github.com/USUARIO/REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Source: `Deploy from a branch`**, rama `main`, carpeta `/ (root)`.

3. La web queda publicada en `https://USUARIO.github.io/REPOSITORIO/` en un par de minutos.

Las rutas son relativas, así que funciona tanto en la raíz del dominio como en un subdirectorio.

---

## Pasar a producción

Al publicar en el dominio real hay que **deshacer las protecciones de demo**, o la web no aparecerá en Google:

| Paso | Archivo | Qué hacer |
|---|---|---|
| 1 | `index.html` | Eliminar la etiqueta `<meta name="robots" content="noindex, nofollow">` |
| 2 | `404.html` | Eliminar la misma etiqueta `noindex` |
| 3 | `robots.txt` | Sustituir el contenido por el bloque de producción comentado al final |
| 4 | `index.html` | Actualizar `GOOGLE_REVIEWS_URL` en `main.js` con la ficha real de Google |

---

## Pendiente

- **Conectar los formularios.** Los tres puntos de envío están marcados en `assets/js/main.js`
  con el comentario `// >> BACKEND` (reservas, contacto y newsletter). Sirve cualquier servicio
  de formularios (Formspree, Basin) o un endpoint propio.
- **Fotografías propias.** Las imágenes actuales son de banco y solo ilustran el diseño.
  Sustituir por fotos reales de los platos y de los dos locales, en `assets/img/`.
- **PDF de la carta** para el botón de descarga.

---

## Accesibilidad y rendimiento

Auditado y verificado en navegador:

- Contraste **WCAG AA**: 0 fallos (medido sobre todas las pestañas del menú y el header con scroll)
- Jerarquía de encabezados sin saltos · un solo `<h1>`
- Todos los objetivos táctiles ≥ 44 px
- 9/9 imágenes con `alt`, `loading="lazy"` y dimensiones declaradas (evita saltos de maquetación)
- `prefers-reduced-motion` respetado · enlace de salto al contenido · `lang="es"`
- Datos estructurados **Schema.org/Restaurant** (nombre, teléfonos, direcciones, horarios)

## Licencias

El código es propiedad del cliente. **Las fotografías actuales son de banco y no están licenciadas
para uso comercial**: deben sustituirse antes de publicar en el dominio real.
