# 🛠️ Guía de Personalización - CyberPort

## 1. Cambiar tu Nombre y Foto 👤

### En About.vue:
Edita `/src/views/About.vue` y busca:

```vue
<h2 class="text-3xl font-bold text-gray-900 mb-4">Tu Nombre Aquí</h2>
<p class="text-cyber-600 text-lg font-semibold mb-4">Especialista en Ciberseguridad</p>
```

Reemplaza con tu nombre y tu título.

---

## 2. Personalizar el Logo 🔐

En `/src/components/Navigation.vue`, busca:

```vue
<div class="w-8 h-8 bg-cyber-500 rounded-lg flex items-center justify-center font-bold">
  🔐
</div>
```

Cambia el emoji `🔐` por otro que prefieras, o usa una imagen.

---

## 3. Agregar tus Artículos 📝

Edita `/src/data/articles.js` y agrega un nuevo artículo:

```javascript
{
  id: 5,
  title: 'Tu Título Aquí',
  excerpt: 'Resumen corto del artículo...',
  content: `## Título de Sección
  
Aquí va tu contenido. Puedes usar:
- # para títulos
- ## para subtítulos
- ### para sub-subtítulos
- Listas con -
- **texto en negrita**`,
  date: '2024-03-04',
  category: 'Tu Categoría',
  author: 'Tu Nombre',
  readTime: '10 min'
}
```

---

## 4. Cambiar Colores Principales 🎨

Los colores cyan/azul están en varios lugares:

### En Navigation.vue:
```vue
<div class="w-8 h-8 bg-cyan-500 rounded-lg">
```

### En Tailwind:
- `bg-cyan-600` - Fondo principal
- `text-cyan-400` - Texto destacado
- `hover:bg-cyan-700` - Hover

**Opciones de colores Tailwind:**
- `slate`, `gray`, `zinc`, `stone`
- `red`, `orange`, `amber`, `yellow`, `lime`, `green`
- `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`
- `violet`, `purple`, `fuchsia`, `pink`, `rose`

Cambia `cyan` por el color que prefieras en todo el código.

---

## 5. Modificar Footer 🔗

Edita `/src/components/Footer.vue`:

```vue
<!-- Cambia los enlaces a tus redes sociales -->
<a href="https://twitter.com/tuusuario">Twitter</a>
<a href="https://linkedin.com/in/tuusuario">LinkedIn</a>
<a href="https://github.com/tuusuario">GitHub</a>
```

---

## 6. Cambiar Información de Contacto 📧

Edita `/src/views/Contact.vue` y busca:

```vue
<a href="mailto:tu@email.com" class="text-cyan-600 hover:text-cyan-700">
  tu@email.com
</a>
```

Reemplaza `tu@email.com` con tu correo real.

---

## 7. Personalizar Meta información 📊

Edita `/index.html`:

```html
<title>CyberPort - Blog de Ciberseguridad</title>
<meta name="description" content="Tu descripción aquí">
<meta name="keywords" content="ciberseguridad, seguridad, blog">
<meta name="author" content="Tu Nombre">
```

---

## 8. Agregar Nuevas Páginas 📄

### Paso 1: Crea un nuevo componente
Crea `/src/views/MiPagina.vue`:

```vue
<script setup>
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-gray-900">Mi Página</h1>
    <!-- Tu contenido aquí -->
  </div>
</template>
```

### Paso 2: Agrega la ruta
En `/src/router/index.js`:

```javascript
import MiPagina from '../views/MiPagina.vue'

// En el array routes:
{
  path: '/mi-pagina',
  name: 'MiPagina',
  component: MiPagina
}
```

### Paso 3: Agrega el enlace
En `/src/components/Navigation.vue`, en el menú:

```vue
<router-link to="/mi-pagina">Mi Página</router-link>
```

---

## 9. Personalizar Categorías 🏷️

Las categorías se definen automáticamente en `/src/data/articles.js`. Simplemente usa nuevas categorías en tus artículos y aparecerán en el filtro.

---

## 10. Cambiar Fuentes 🔤

Edita `/src/style.css`:

```css
:root {
  font-family: 'Tu Fuente Aquí', system-ui, Avenir, sans-serif;
}
```

O importa Google Fonts en `/src/main.js`:

```javascript
import '@fontsource/poppins'; // ejemplo
```

---

## 11. Agregar Images/Imágenes 🖼️

1. Guarda tus imágenes en `/public/`
2. Úsalas en tus componentes:

```vue
<img src="/nombre-imagen.jpg" alt="Descripción" />
```

---

## 12. Modo Oscuro (Opcional) 🌙

Para agregar modo oscuro, necesitarías:

1. Instalar un plugin: `npm install @vueuse/core`
2. Usar `tailwindcss` class strategy
3. Actualizar `tailwind.config.js`

---

## 13. Newsletter/Suscripción 📬

Para conectar el formulario de suscripción en Home.vue, usa:

- **Mailchimp**: `npm install @mailchimp/mailchimp_marketing`
- **SendGrid**: `npm install @sendgrid/mail`
- **Formspree**: Solo necesitas reemplazar el endpoint

---

## 14. Comentarios en Artículos 💬

Opciones:
- **Disqus**: [disqus.com](https://disqus.com)
- **Utterances**: [utteranc.es](https://utteranc.es)
- **Giscus**: [giscus.app](https://giscus.app)

---

## 📋 Comandos Útiles

```bash
# Desarrollar localmente
npm run dev

# Compilar para producción
npm run build

# Vista previa local de producción
npm run preview

# Instalar nuevos paquetes
npm install nombre-paquete
```

---

## 🎯 Checklist Inicial

- [ ] Cambié mi nombre en About.vue
- [ ] Agregué mis redes sociales
- [ ] Cambié mi email de contacto
- [ ] Personalicé los colores
- [ ] Agregué mis primeros artículos
- [ ] Desplegué en Vercel
- [ ] Conecté mi dominio personalizado
- [ ] Actualicé meta tags para SEO

---

## 🚀 Una vez en vivo

1. **SEO**: Agrega Google Search Console
2. **Analytics**: Habilita Vercel Analytics
3. **Backups**: Usa GitHub para versionado
4. **Monitoreo**: Configura alertas en Vercel
5. **Email**: Conecta un servicio para contacto

---

¿Necesitas ayuda específica? Revisa:
- [Documentación Vue 3](https://vuejs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

¡Tu blog está listo para ser personalizado! 🎉
