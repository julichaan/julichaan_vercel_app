# CyberPort - Blog de Ciberseguridad 🔐

Un moderno blog/portfolio de ciberseguridad construido con **Vue 3**, **Vite** y **Tailwind CSS**, desplegable en **Vercel**.

## 🚀 Características

- ✨ Diseño moderno y responsive
- 🎨 Tema personalizable de ciberseguridad
- 📱 Mobile-friendly
- ⚡ Rápido y optimizado (Vite + Vue 3)
- 🎯 Sistema de categorías para artículos
- 🔗 Navegación fluida con Vue Router
- 📝 Blog funcional con artículos de ejemplo
- 💬 Formulario de contacto
- 🌐 Listo para desplegar en Vercel

## 📦 Instalación Local

### Requisitos
- Node.js 16+ 
- npm o yarn

### Pasos

1. **Clonar o entrar en el proyecto:**
```bash
cd julichaan-portfolio
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## 🛠️ Desarrollo

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión compilada

### Estructura del Proyecto

```
src/
├── components/
│   ├── Navigation.vue      # Barra de navegación
│   └── Footer.vue          # Pie de página
├── views/
│   ├── Home.vue           # Página principal
│   ├── Blog.vue           # Lista de artículos
│   ├── ArticleDetail.vue  # Detalle del artículo
│   ├── About.vue          # Página sobre mí
│   └── Contact.vue        # Formulario de contacto
├── data/
│   └── articles.js        # Base de datos de artículos
├── router/
│   └── index.js           # Configuración de Vue Router
├── App.vue                # Componente principal
├── main.js                # Punto de entrada
├── style.css              # Estilos globales
└── tailwind.css          # Configuración de Tailwind
```

## ✏️ Personalización

### Cambiar información personal

1. **Edita `/src/views/About.vue`** - Cambia tu nombre, experiencia y certificaciones
2. **Edita `/src/data/articles.js`** - Agrega tus propios artículos de ciberseguridad
3. **Edita el componente Navigation.vue** - Personaliza el branding

### Agregar nuevos artículos

Edita `/src/data/articles.js` y agrega un nuevo objeto con esta estructura:

```javascript
{
  id: 5,
  title: 'Título del Artículo',
  excerpt: 'Resumen corto...',
  content: 'Contenido completo del artículo...',
  date: '2024-03-04',
  category: 'Categoría',
  author: 'Tu Nombre',
  readTime: '10 min'
}
```

### Personalizar colores

Edita `tailwind.config.js` para cambiar la paleta de colores de ciberseguridad.

## 🚀 Desplegar en Vercel

### Opción 1: Con Vercel CLI

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
vercel
```

### Opción 2: Con GitHub (Recomendado)

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel detectará automáticamente que es un proyecto Vite
5. Click en "Deploy"

### Opción 3: Conexión Manual

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Haz clic en "New Project"
3. Selecciona tu repositorio
4. Las configuraciones se detacarán automáticamente
5. Click en "Deploy"

## 📋 Próximos pasos

Después del despliegue, considera:

- [ ] Conectar un dominio personalizado
- [ ] Configurar Analytics
- [ ] Agregar más artículos
- [ ] Implementar sistema de comentarios
- [ ] Agregar newsletter
- [ ] Optimizar para SEO
- [ ] Agregar Dark Mode (opcional)

## 🎨 Personalización Avanzada

### Cambiar tipografía

En `tailwind.config.js`, agrega tu fuente preferida en la sección `theme`.

### Agregar más páginas

1. Crea un nuevo componente en `/src/views/`
2. Agrega la ruta en `/src/router/index.js`
3. Actualiza la Navigation.vue

## 📚 Recursos

- [Documentación Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue Router](https://router.vuejs.org/)
- [Vercel Docs](https://vercel.com/docs)

## 🤝 Soporte

Si tienes preguntas o necesitas ayuda:

1. Revisa la documentación de Vercel
2. Consulta los docs de Vue y Vite
3. Abre un issue en tu repositorio

## 📄 Licencia

Este proyecto es de código abierto y disponible bajo la licencia MIT.

---

¡Feliz blogging en ciberseguridad! 🔐💻
