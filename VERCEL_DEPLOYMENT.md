# 🚀 Guía de Despliegue en Vercel

Felicidades por tener tu blog de ciberseguridad listo. Aquí te muestro cómo desplegarlo en Vercel en 3 sencillos pasos.

## Opción 1: GitHub + Vercel (Recomendado) ⭐

### Paso 1: Sube tu proyecto a GitHub

```bash
# Inicializa git (si no lo has hecho)
git init

# Agrega todos los archivos
git add .

# Haz tu primer commit
git commit -m "Initial commit: CyberPort blog"

# Crea un repositorio en GitHub.com
# Luego, sube tu código:
git branch -M main
git remote add origin https://github.com/tu-usuario/julichaan-portfolio.git
git push -u origin main
```

### Paso 2: Conecta Vercel a tu GitHub

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up" y crea una cuenta (o inicia sesión)
3. Haz clic en "New Project"
4. Selecciona "Import Git Repository"
5. Busca tu repositorio `julichaan-portfolio`
6. Haz clic en "Import"

### Paso 3: Configura y Despliega

1. Vercel detectará automáticamente que es un proyecto Vite
2. Las configuraciones ya están preestablecidas:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Haz clic en "Deploy"

¡Listo! Tu sitio está en vivo. Vercel te mostrará una URL como `https://julichaan-portfolio.vercel.app`

---

## Opción 2: Despliegue Manual con Vercel CLI

### Paso 1: Instala Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Despliega

```bash
cd /Users/julichaan/Documents/julichaan-portfolio
vercel
```

### Paso 3: Sigue las instrucciones

Vercel te hará algunas preguntas:
- Confirma el proyecto
- Selecciona tu equipo
- Directorio: `./` (enter para confirmar)

¡Tu sitio estará en vivo en segundos!

---

## ✅ Verificar tu Despliegue

1. Vercel te mostrará una URL: `https://[tu-dominio].vercel.app`
2. Abre esa URL en tu navegador
3. Verifica que todas las páginas funcionen:
   - ✓ Inicio
   - ✓ Blog
   - ✓ Artículos individuales
   - ✓ Sobre Mí
   - ✓ Contacto

---

## 🌐 Conectar un Dominio Personalizado

Una vez desplegado:

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Haz clic en "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Vercel te mostrará registros DNS para configurar
5. Actualiza los DNS en tu proveedor de dominio

---

## 📝 Actualizar tu Sitio

### Si usas GitHub (recomendado):

```bash
# Realiza cambios en tu código
# Luego:
git add .
git commit -m "Update blog content"
git push origin main
```

Vercel se redesplegará automáticamente. ¡Magia! ✨

### Si usas Vercel CLI:

```bash
vercel
```

---

## 🔧 Solución de Problemas

### El sitio no carga bien
- Borra el caché: Ctrl+Shift+Del (o Cmd+Shift+Del en Mac)
- Espera 2-3 minutos para que el caché se actualice

### Las rutas no funcionan
- Asegúrate de que `vercel.json` existe
- Verifica que esté correctamente configurado

### Los estilos no se ven
- Espera a que Tailwind CSS compile
- Reconstruye: `npm run build`

---

## 🎉 ¡Felicidades!

Tu blog de ciberseguridad está en vivo. Ahora puedes:

- ✍️ Agregar más artículos
- 🎨 Personalizar el diseño
- 📧 Conectar formularios a un servicio de email
- 📊 Agregar Analytics
- 🔔 Implementar newsletter

---

## Próximos Pasos Recomendados

1. **Personaliza tu información**: Edita `/src/views/About.vue`
2. **Agrega tus artículos**: Edita `/src/data/articles.js`
3. **Conecta Analytics**: Vercel incluye Analytics integrado
4. **SEO**: Agrega meta tags en `index.html`
5. **Email**: Conecta un servicio como Formspree o SendGrid para formularios

---

¿Necesitas ayuda? Revisa:
- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de Vue 3](https://vuejs.org/)
- [Vite Docs](https://vitejs.dev/)

¡Tu portfolio de ciberseguridad está listo para conquistar el mundo digital! 🔐
