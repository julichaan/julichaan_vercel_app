# ─────────────────────────────────────────────
#  julichaan-portfolio — Makefile
#  Color corporativo: #ff003c (carmesí neón)
# ─────────────────────────────────────────────

.PHONY: install dev build preview clean push help

# ── Variables ─────────────────────────────────
COMMIT_MSG ?= "update"

# ── Colores para la terminal ──────────────────
RED    = \033[0;31m
GREEN  = \033[0;32m
YELLOW = \033[0;33m
CYAN   = \033[0;36m
RESET  = \033[0m

# ── Ayuda (target por defecto) ────────────────
help:
	@echo ""
	@echo "$(CYAN)julichaan-portfolio$(RESET)"
	@echo "─────────────────────────────────"
	@echo "$(GREEN)make install$(RESET)        → Instala dependencias (npm install)"
	@echo "$(GREEN)make dev$(RESET)            → Arranca el servidor de desarrollo"
	@echo "$(GREEN)make build$(RESET)          → Compila para producción (dist/)"
	@echo "$(GREEN)make preview$(RESET)        → Previsualiza el build de producción"
	@echo "$(GREEN)make clean$(RESET)          → Borra node_modules y dist/"
	@echo "$(GREEN)make push$(RESET)           → Add · Commit · Push a GitHub"
	@echo "$(GREEN)make push COMMIT_MSG='...'$(RESET)  → Push con mensaje personalizado"
	@echo ""

# ── Instalar dependencias ─────────────────────
install:
	@echo "$(YELLOW)Instalando dependencias...$(RESET)"
	npm install
	@echo "$(GREEN)✓ Dependencias instaladas$(RESET)"

# ── Servidor de desarrollo ────────────────────
dev:
	@echo "$(YELLOW)Arrancando servidor de desarrollo...$(RESET)"
	npm run dev

# ── Build de producción ───────────────────────
build:
	@echo "$(YELLOW)Compilando para producción...$(RESET)"
	npm run build
	@echo "$(GREEN)✓ Build completado en dist/$(RESET)"

# ── Previsualizar build ───────────────────────
preview: build
	@echo "$(YELLOW)Abriendo preview del build...$(RESET)"
	npm run preview

# ── Limpiar ───────────────────────────────────
clean:
	@echo "$(RED)Borrando node_modules y dist/...$(RESET)"
	rm -rf node_modules dist
	@echo "$(GREEN)✓ Limpieza completada$(RESET)"

# ── Subir a GitHub ────────────────────────────
push:
	@echo "$(YELLOW)Subiendo cambios a GitHub...$(RESET)"
	git add .
	git commit -m $(COMMIT_MSG)
	git push
	@echo "$(GREEN)✓ Cambios subidos correctamente$(RESET)"
