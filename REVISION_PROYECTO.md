# Revisión técnica del proyecto

## Resumen ejecutivo
Proyecto SPA frontend en Vue 3 con estética cyber/terminal y contenido orientado a ciberseguridad (writeups, blog, notes, certificaciones). La base funcional está clara y la arquitectura principal es coherente, pero hay desalineación documental y deuda técnica de archivos no utilizados.

## Hallazgos principales

### 1) Bloqueo de entorno para comandos del Makefile (ALTO)
- Evidencia:
  - `make build` falla con: `make: npm: No such file or directory`.
- Impacto:
  - No se puede validar build local ni usar objetivos clave del Makefile.
- Recomendación:
  - Instalar Node.js/npm en entorno local/CI antes de continuar con validaciones.

### 2) README desactualizado respecto al código real (ALTO)
- Evidencia:
  - El README menciona rutas/archivos de personalización no alineados con la estructura actual.
  - El router real expone rutas distintas a las esperables por el texto de README.
- Impacto:
  - Onboarding más lento y riesgo de cambios en archivos equivocados.
- Recomendación:
  - Reescribir secciones de arquitectura, rutas y personalización en base al router y vistas actuales.

### 3) Archivos no conectados al flujo principal (MEDIO)
- Evidencia:
  - Componentes/vistas presentes pero fuera de rutas activas o sin uso en layout principal:
    - `src/components/Navigation.vue`
    - `src/components/HelloWorld.vue`
    - vistas como `Contact.vue`, `BugBounty.vue`, `HtbTest.vue`, `CV.vue`, `TerminalView.vue` no están en router activo actual.
- Impacto:
  - Complejidad accidental y mantenimiento innecesario.
- Recomendación:
  - Definir inventario “activo vs legado” y eliminar o reintegrar.

### 4) Contenido extenso hardcodeado en vistas (MEDIO)
- Evidencia:
  - `Blog.vue` y `Notes.vue` contienen bloques de datos muy grandes embebidos.
- Impacto:
  - Dificulta mantenimiento, revisión y escalado de contenido.
- Recomendación:
  - Extraer datasets a módulos separados (`src/data/*`) o contenido markdown/json.

## Estado de checks durante revisión
- `problems` (VS Code): sin errores reportados.
- `make help`: correcto.
- `make build`: bloqueado por falta de `npm`.

## Riesgo actual
- Funcionalidad principal aparentemente estable a nivel de estructura.
- Riesgo operativo principal: imposibilidad de validar build en entorno actual.

## Próximo paso recomendado
Seguir `PLAN.md` comenzando por Fase A (instalación de entorno y validación build), luego alinear README y limpiar deuda técnica.
