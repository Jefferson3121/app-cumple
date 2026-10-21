---

description: "Tareas de implementaciÃ³n para la pantalla de cuenta regresiva"
---

# Tasks: Pantalla de Cuenta Regresiva

**Input**: Documentos de diseÃ±o de `/specs/001-pantalla-cuenta-regresiva/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`, `quickstart.md`

**Tests**: No se incluyen tareas de pruebas automatizadas porque no fueron solicitadas; la validaciÃ³n manual estÃ¡ definida en `quickstart.md`.

**Organization**: Las tareas estÃ¡n agrupadas por historia de usuario para permitir implementaciÃ³n y validaciÃ³n independiente.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar la aplicaciÃ³n React/Vite y Tailwind sin dependencias innecesarias.

- [X] T001 Crear la estructura base de aplicaciÃ³n en `package.json`, `index.html`, `src/main.jsx`, `src/App.jsx` y `src/index.css` usando React y Vite.
- [X] T002 Configurar Tailwind CSS y su integraciÃ³n con Vite en `tailwind.config.js`, `postcss.config.js` y `src/index.css`.
- [X] T003 [P] Crear los directorios `src/assets/photos/`, `src/components/`, `src/hooks/` y `src/data/` segÃºn `specs/001-pantalla-cuenta-regresiva/plan.md`.
- [X] T004 [P] Revisar `08-keil.html` como referencia funcional y definir la migraciÃ³n de sus recursos locales sin conservar la duplicaciÃ³n ni las URLs externas.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Preparar los contratos y la configuraciÃ³n compartida que necesitan todas las historias.

**âš ï¸ CRITICAL**: No iniciar las historias de usuario hasta completar esta fase.

- [X] T005 Definir la fecha objetivo y sus reglas de interpretaciÃ³n en `src/data/countdownConfig.js`, sin incluir textos finales ni comportamiento posterior a cero.
- [X] T006 [P] Incorporar las fotografÃ­as disponibles como archivos locales en `src/assets/photos/` y documentar su orden y respaldo en `src/data/photos.js`.
- [X] T007 [P] Definir los estilos globales mobile-first, el reset mÃ­nimo y las variables visuales de viewport en `src/index.css`.
- [X] T008 Configurar el punto de entrada de la aplicaciÃ³n y renderizar `App` desde `src/main.jsx`, verificando que el proyecto inicia con `npm run dev`.

**Checkpoint**: La base React/Vite/Tailwind estÃ¡ disponible, las fotografÃ­as son locales y la aplicaciÃ³n puede iniciar.

---

## Phase 3: User Story 1 - Consultar la cuenta regresiva (Priority: P1) ðŸŽ¯ MVP

**Goal**: Mostrar una pantalla completa con dÃ­as, horas, minutos y segundos actualizados durante la cuenta regresiva.

**Independent Test**: Abrir la aplicaciÃ³n en un viewport mÃ³vil de 320 px, comprobar que las cuatro unidades aparecen en una sola vista sin desplazamiento horizontal y observar una actualizaciÃ³n durante 60 segundos.

### Implementation for User Story 1

- [X] T009 [P] [US1] Implementar el cÃ¡lculo de dÃ­as, horas, minutos y segundos, incluyendo valores no negativos y transiciÃ³n explÃ­cita al cero, en `src/hooks/useCountdown.js`.
- [X] T010 [P] [US1] Crear la presentaciÃ³n de las cuatro unidades del contador en `src/components/CountdownDisplay.jsx`.
- [X] T011 [US1] Crear la composiciÃ³n de pantalla completa y el estado activo de la cuenta regresiva en `src/components/CountdownScreen.jsx`.
- [X] T012 [US1] Integrar `CountdownScreen` y `CountdownDisplay` en `src/App.jsx` usando la configuraciÃ³n de `src/data/countdownConfig.js`.
- [X] T013 [US1] Aplicar la jerarquÃ­a visual mobile-first y el tamaÃ±o de viewport completo al contador en `src/components/CountdownScreen.jsx` y `src/index.css`.

**Checkpoint**: La User Story 1 funciona de forma independiente y constituye el MVP visual.

---

## Phase 4: User Story 2 - Ver fotografÃ­as de fondo (Priority: P1)

**Goal**: Mostrar fotografÃ­as locales como fondo y cambiarlas automÃ¡ticamente en un intervalo configurable.

**Independent Test**: Abrir la pantalla con al menos tres fotografÃ­as locales, esperar el intervalo configurado y comprobar que la imagen activa cambia sin interacciÃ³n.

### Implementation for User Story 2

- [X] T014 [P] [US2] Implementar el estado de Ã­ndice y la rotaciÃ³n cancelable de fotografÃ­as en `src/hooks/usePhotoRotation.js`.
- [X] T015 [P] [US2] Crear el fondo fotogrÃ¡fico con cobertura del viewport, posiciÃ³n centrada y alternativa visual ante un recurso no disponible en `src/components/PhotoBackground.jsx`.
- [X] T016 [US2] Integrar `PhotoBackground` con `CountdownScreen` y la colecciÃ³n de `src/data/photos.js` en `src/components/CountdownScreen.jsx`.
- [X] T017 [US2] Configurar el intervalo de rotaciÃ³n y el orden de fotografÃ­as en `src/data/photos.js` sin introducir dependencias de servicios remotos.
- [X] T018 [US2] Verificar que la rotaciÃ³n no interrumpe la cuenta regresiva y que la pantalla conserva el fondo cuando una fotografÃ­a falla en `src/components/PhotoBackground.jsx`.

**Checkpoint**: Las User Stories 1 y 2 funcionan juntas; el contador conserva su comportamiento mientras las fotografÃ­as rotan.

---

## Phase 5: User Story 3 - Mantener legibilidad y adaptaciÃ³n responsive (Priority: P1)

**Goal**: Mantener legible el contador sobre fotografÃ­as claras u oscuras y adaptar la composiciÃ³n a mÃ³viles, tabletas y escritorio.

**Independent Test**: Probar la pantalla en 320 px, telÃ©fonos grandes, tableta y escritorio; alternar orientaciÃ³n y comprobar que no hay desplazamiento horizontal ni recorte del contador.

### Implementation for User Story 3

- [X] T019 [P] [US3] AÃ±adir la capa semitransparente entre el fondo y el contenido en `src/components/CountdownScreen.jsx`.
- [X] T020 [P] [US3] Ajustar escalas, espaciados, Ã¡reas seguras y breakpoints mobile-first en `src/index.css`.
- [X] T021 [US3] Integrar los estados de fondo, capa y contenido para que conserven el orden visual correcto en `src/components/CountdownScreen.jsx`.
- [X] T022 [US3] Manejar cambios de tamaÃ±o y orientaciÃ³n mediante estilos de viewport y revisar desbordamientos en `src/index.css`.
- [X] T023 [US3] Confirmar que no se agregan textos finales ni una experiencia posterior a cero en `src/App.jsx` y `src/components/CountdownScreen.jsx`.

**Checkpoint**: La pantalla inicial cumple el contrato responsive y de legibilidad sin definir el flujo posterior a cero.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validar la entrega completa y eliminar restos de la implementaciÃ³n anterior.

- [X] T024 [P] Revisar accesibilidad bÃ¡sica de la pantalla y descripciones de fotografÃ­as en `src/components/PhotoBackground.jsx` y `src/components/CountdownDisplay.jsx`.
- [X] T025 [P] Revisar el bundle y eliminar dependencias no justificadas de `package.json`.
- [X] T026 Ejecutar los escenarios de `specs/001-pantalla-cuenta-regresiva/quickstart.md` y registrar cualquier ajuste necesario en `src/index.css`, `src/components/` o `src/hooks/`.
- [X] T027 Retirar o dejar fuera del flujo de la aplicaciÃ³n el HTML legado duplicado en `08-keil.html`, documentando la decisiÃ³n en `README.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No depende de otras fases.
- **Foundational (Phase 2)**: Depende de Setup y bloquea todas las historias.
- **User Stories (Phases 3-5)**: Dependen de Foundational.
- **Polish (Phase 6)**: Depende de las historias que se hayan implementado.

### User Story Dependencies

- **US1 (P1)**: Puede comenzar despuÃ©s de Phase 2; no depende de otras historias.
- **US2 (P1)**: Puede comenzar despuÃ©s de Phase 2, pero su integraciÃ³n final utiliza la composiciÃ³n creada por US1.
- **US3 (P1)**: Puede comenzar despuÃ©s de Phase 2; sus ajustes visuales se integran sobre US1 y US2.

### Within Each User Story

- Implementar primero la lÃ³gica o componente aislado.
- Integrar despuÃ©s en la composiciÃ³n de pantalla.
- Completar la validaciÃ³n independiente antes de avanzar.

## Parallel Opportunities

- **Setup**: T003 y T004 pueden ejecutarse en paralelo despuÃ©s de T001; T002 puede ejecutarse junto con T003.
- **Foundational**: T005, T006 y T007 pueden ejecutarse en paralelo; T008 requiere la base de T001 y T002.
- **US1**: T009 y T010 pueden ejecutarse en paralelo; T011 y T012 requieren sus resultados.
- **US2**: T014, T015 y T017 pueden ejecutarse en paralelo; T016 y T018 requieren la composiciÃ³n de US1.
- **US3**: T019 y T020 pueden ejecutarse en paralelo; T021-T023 requieren la integraciÃ³n de las historias anteriores.

## Implementation Strategy

### MVP First

1. Completar Phase 1: Setup.
2. Completar Phase 2: Foundational.
3. Completar Phase 3: US1.
4. Ejecutar su prueba independiente en un viewport mÃ³vil.
5. Detenerse para validar el MVP antes de aÃ±adir fotografÃ­as rotativas y refinamientos responsive.

### Incremental Delivery

1. AÃ±adir US1 para obtener el contador funcional.
2. AÃ±adir US2 para incorporar fotografÃ­as locales y rotaciÃ³n automÃ¡tica.
3. AÃ±adir US3 para legibilidad y responsive completo.
4. Ejecutar Polish y los escenarios de quickstart.
