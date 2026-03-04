## ⚡ Inicio Rápido - CyberPort

### 1️⃣ Clona o descarga el proyecto
```bash
cd /Users/julichaan/Documents/julichaan-portfolio
```

### 2️⃣ Instala las dependencias
```bash
npm install
```

### 3️⃣ Ejecuta en desarrollo
```bash
npm run dev
```
Abre `http://localhost:5173/` en tu navegador

### 4️⃣ Personaliza tu sitio

#### Cambiar el nombre
- Abre `src/components/Navigation.vue`
- Busca "CyberPort" y cámbialo por tu nombre

#### Agregar artículos
- Abre `src/data/articles.js`
- Agrega nuevos objetos al array `articles`

#### Tus redes sociales
- Abre `src/views/About.vue`
- Reemplaza los enlaces `#` con tus URLs reales

#### Tu email de contacto
- Abre `src/views/Contact.vue`
- Cambia "tu@email.com" por tu email real

### 5️⃣ Construir para producción
```bash
npm run build
```

### 6️⃣ Desplegar en Vercel

**Opción A: Desde GitHub (Recomendado)**
1. Sube el código a un repositorio de GitHub
2. Ve a https://vercel.com
3. Haz clic en "New Project"
4. Selecciona tu repositorio
5. ¡Vercel desplegará automáticamente!

**Opción B: Despliegue Manual**
1. Ejecuta `npm run build`
2. Ve a https://vercel.com/new
3. Arrastra la carpeta `dist` al área de carga
4. ¡Tu sitio estará en vivo!

---

## 🎯 Estructura de Artículos

Cada artículo en `src/data/articles.js` debe tener:

```javascript
{
  id: 1,                    // Número único
  title: 'Título del Artículo',
  excerpt: 'Descripción corta',
  content: 'Contenido completo con párrafos separados por \n\n',
  date: '2024-03-04',      // Formato YYYY-MM-DD
  category: 'Fundamentos', // Categoría para filtrado
  author: 'Tu Nombre',
  readTime: '8 min'        // Tiempo estimado de lectura
}
```

## 🎨 Personalizando Colores

Edita `tailwind.config.js` para cambiar los colores:

```javascript
colors: {
  'cyan': '#22d3ee',      // Color principal
  'blue': '#3b82f6',      // Color secundario
  'purple': '#a855f7',    // Acentos
}
```

## 📱 Probando en Móvil

Mientras el servidor está corriendo:
```bash
# En tu máquina local
http://localhost:5173/

# Desde otro dispositivo en la red
http://TU_IP_LOCAL:5173/
```

Para obtener tu IP:
```bash
ifconfig | grep "inet "
```

## ⚙️ Troubleshooting

**El servidor no inicia**
```bash
rm -rf node_modules
npm install
npm run dev
```

**Puerto 5173 en uso**
```bash
npm run dev -- --port 3000
```

**Problemas con Tailwind**
```bash
npm install -D tailwindcss postcss autoprefixer
npm run dev
```

---

**¡Ya estás listo para tener tu portfolio de ciberseguridad en línea!** 🔐🚀
