# PLAN.md — Revisión integral del proyecto

## 1) Objetivo
Dejar el proyecto en estado mantenible y verificable, con documentación alineada al código real y checks ejecutables por `make`.

## 2) Estado actual (resultado de revisión)
- Stack detectado: Vue 3 + Vite + Tailwind CSS v4 + Vue Router.
- Rutas activas: `/`, `/certificaciones`, `/writeups`, `/blog`, `/notes`, `/writeup`.
- Build/check local bloqueado por entorno: `npm` no está instalado (afecta `make install`, `make dev`, `make build`, `make preview`).
- `README.md` no refleja la estructura/rutas actuales del proyecto.
- Existen componentes/vistas no conectados al router/layout principal (deuda técnica).

## 3) Plan de trabajo propuesto

### Fase A — Entorno y validación base
1. Instalar Node.js + npm en el entorno de trabajo.
2. Ejecutar:
   - `make install`
   - `make build`
3. Confirmar que `dist/` se genera correctamente y que no hay errores de build.

### Fase B — Alineación de documentación
1. Actualizar `README.md` para reflejar:
   - Rutas reales del router.
   - Estructura actual de vistas/componentes.
   - Flujo de writeups markdown (`/public/writeups/**` + `WriteupViewer`).
2. Revisar instrucciones de personalización (actualmente apuntan a archivos no vigentes).

### Fase C — Limpieza de deuda técnica
1. Decidir qué hacer con componentes/vistas no usadas:
   - Eliminar si están obsoletas, o
   - Integrarlas formalmente al router/layout.
2. Reducir contenido hardcodeado masivo en vistas grandes (Blog/Notes) hacia fuentes de datos separadas.

### Fase D — Checklist de cierre
1. `make build` OK.
2. Navegación de rutas activas validada.
3. README alineado con código.
4. Sin archivos legacy huérfanos sin justificar.

## 4) Prioridad recomendada
1. Fase A (bloqueante)
2. Fase B (alto impacto)
3. Fase C (mantenibilidad)
4. Fase D (cierre)
