# Implementation Plan: Pantalla de Cuenta Regresiva

**Branch**: `001-pantalla-cuenta-regresiva` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-pantalla-cuenta-regresiva/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Construir la primera pantalla de la experiencia de cumpleaños como una aplicación React
creada con Vite. La pantalla ocupará todo el viewport, mostrará una cuenta regresiva
en días, horas, minutos y segundos sobre una capa semitransparente, y rotará
fotografías almacenadas localmente. El diseño será mobile-first y no se implementará
ningún flujo posterior a cero.

## Technical Context

**Language/Version**: JavaScript/JSX moderno, Node.js LTS para desarrollo

**Primary Dependencies**: React, React DOM, Vite, Tailwind CSS; ninguna dependencia adicional prevista

**Storage**: Recursos fotográficos locales dentro de `src/assets/`; sin almacenamiento persistente

**Testing**: Validación manual responsive en navegador y pruebas automatizadas de lógica/UI solo si la configuración base las incorpora; no añadir runner adicional sin necesidad concreta

**Target Platform**: Navegadores modernos en teléfonos móviles, tabletas y escritorio

**Project Type**: Aplicación web frontend de una sola pantalla

**Performance Goals**: Actualización visible del contador al menos una vez por segundo; transición de fotografía sin bloquear la interacción; carga inicial adecuada para una experiencia móvil

**Constraints**: Mobile-first, responsive, viewport completo, fotografías locales, textos finales aún no definidos, comportamiento posterior a cero fuera de alcance, sin librerías innecesarias

**Scale/Scope**: Una pantalla, una fecha objetivo, una colección local de fotografías y un contador; sin backend ni autenticación

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

La constitución contiene únicamente marcadores de plantilla y no define principios
ratificados ni gates aplicables. No se identifican violaciones constitucionales.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
```text
src/
├── assets/
│   └── photos/
├── components/
│   ├── CountdownScreen.jsx
│   ├── CountdownDisplay.jsx
│   └── PhotoBackground.jsx
├── hooks/
│   ├── useCountdown.js
│   └── usePhotoRotation.js
├── data/
│   └── photos.js
├── App.jsx
├── main.jsx
└── index.css
public/
└── (solo recursos estáticos que no deban importarse desde la aplicación)
```

**Structure Decision**: Aplicación frontend única con componentes pequeños y hooks
separados para aislar el contador y la rotación de fotografías. Las fotografías se
importarán desde `src/assets/photos/` para que formen parte del proyecto y del
proceso de compilación. No se crea backend ni una capa de persistencia.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Ninguna | N/A | N/A |
