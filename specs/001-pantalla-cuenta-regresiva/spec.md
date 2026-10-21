# Feature Specification: Pantalla de Cuenta Regresiva

**Feature Branch**: `001-pantalla-cuenta-regresiva`

**Created**: 2026-08-26

**Status**: Draft

**Input**: User description: "La aplicación se divide en dos experiencias principales: una Pantalla de Cuenta Regresiva implementada hasta ahora y una Pantalla Final todavía no diseñada ni implementada. La Pantalla de Cuenta Regresiva incluye contador, cuatro cuadros con audios, fotografías rotativas con transiciones, balón de voleibol con frases al rebotar, audio independiente del balón y diseño mobile-first responsive. Debe mostrarse mientras la fecha objetivo siga activa. Al alcanzar la fecha objetivo, debe dejar de mostrarse y dar paso a la Pantalla Final, sin inventar todavía su contenido, diseño o comportamiento."

## Experience Architecture *(mandatory)*

La aplicación está compuesta por tres experiencias secuenciadas dentro del mismo
producto:



### Pantalla 1 — Cuenta Regresiva

Experiencia inicial, ya implementada y funcionando correctamente. Se muestra
mientras la fecha y hora actuales sean anteriores a la fecha objetivo. Sus
funcionalidades permanecen sin cambios respecto a lo ya definido en este documento.

### Pantalla 2 — Escena de Lapislázuli

Segunda experiencia. Se muestra automáticamente cuando la Pantalla 1 finaliza
(fecha objetivo alcanzada). Consiste en una escena de estilo pixel art retro
(look de videojuego de los años 90) protagonizada por un personaje que alterna
entre dos imágenes completas, generando una animación de brazos subiendo y
bajando. Cada imagen ocupa la escena completa (no se trata de un personaje
recortado sobre un fondo independiente). Sobre la escena aparece un mensaje de
cumpleaños dividido en fragmentos cortos, mostrados progresivamente al estilo
subtítulos, sin acumularse en pantalla.

### Pantalla 3 — Botones Musicales

Tercera experiencia, accesible desde la Pantalla 2 mediante doble toque
(*double tap*) en móvil o doble clic en escritorio (prioridad móvil). Consiste
en 6 botones interactivos, cada uno asociado a un tono musical distinto. Existen
4 modos musicales (Navidad, Cumpleaños y dos modos adicionales), cada uno con su
propia combinación de tonos. El estilo visual es pixel art con azul como color
principal.

### Regla de transición

- Pantalla 1 → Pantalla 2: automática, al alcanzar la fecha objetivo.
- Pantalla 2 ↔ Pantalla 3: mediante gesto de doble toque (double tap) / doble
  clic, en cualquiera de los dos sentidos.
- En ningún momento deben mostrarse dos pantallas simultáneamente.
- Un solo toque o clic NO debe producir ninguna transición; solo el doble toque
  distinto activa el cambio de pantalla.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consultar la cuenta regresiva (Priority: P1)

Como visitante, quiero abrir la experiencia y ver una cuenta regresiva que ocupe toda la pantalla para conocer cuánto falta para la fecha objetivo.

**Why this priority**: Es la función principal y el punto de entrada de toda la experiencia.

**Independent Test**: Abrir la experiencia en un teléfono y comprobar que la pantalla se adapta al viewport y muestra días, horas, minutos y segundos sin desplazamiento horizontal.

**Acceptance Scenarios**:

1. **Given** que la fecha objetivo aún no ha llegado, **When** el visitante abre la experiencia, **Then** ve la cuenta regresiva como elemento principal ocupando la pantalla completa.
2. **Given** que la cuenta regresiva está visible, **When** transcurre un segundo, **Then** el valor mostrado se actualiza y conserva las unidades de días, horas, minutos y segundos.

### User Story 2 - Ver fotografías de fondo (Priority: P1)

Como visitante, quiero ver fotografías detrás de la cuenta regresiva para recibir una experiencia visual de cumpleaños.

**Why this priority**: Las fotografías constituyen el fondo visual definido para la pantalla inicial.

**Independent Test**: Abrir la pantalla con una colección de fotografías y verificar que una fotografía se muestra como fondo, cubre el viewport y no deforma el contenido principal.

**Acceptance Scenarios**:

1. **Given** que existen fotografías disponibles, **When** se muestra la pantalla inicial, **Then** una fotografía ocupa el fondo visible.
2. **Given** que una fotografía está activa, **When** llega el intervalo de cambio, **Then** la fotografía activa cambia automáticamente por otra disponible.

### User Story 3 - Mantener legibilidad y adaptación responsive (Priority: P1)

Como visitante, quiero que la cuenta regresiva sea legible sobre cualquier fotografía y en distintos tamaños de pantalla, especialmente en teléfonos móviles.

**Why this priority**: La experiencia se utilizará principalmente en dispositivos móviles y el contenido debe seguir siendo usable independientemente de la imagen de fondo.

**Independent Test**: Probar la pantalla en teléfonos pequeños, teléfonos grandes, tabletas y escritorio, verificando legibilidad, ausencia de desbordamiento y correcta ocupación del viewport.

**Acceptance Scenarios**:

1. **Given** una fotografía con zonas claras u oscuras, **When** se muestra la cuenta regresiva, **Then** una capa semitransparente separa visualmente el contador del fondo y mantiene su legibilidad.
2. **Given** un viewport móvil, **When** se gira o cambia el tamaño de la pantalla, **Then** el fondo, la capa y el contador se reajustan sin recortes funcionales ni desplazamiento horizontal.

### User Story 4 - Pasar a la pantalla final (Priority: P1)

Como visitante, quiero que la experiencia cambie de la Pantalla de Cuenta Regresiva a
la Pantalla Final al alcanzar la fecha objetivo, sin que ambas pantallas se mezclen.

**Why this priority**: Define la separación entre las dos partes principales de la
aplicación y establece el límite funcional de la pantalla inicial.

**Independent Test**: Usar una fecha objetivo de prueba cercana y comprobar que antes
de alcanzarla solo se muestra la Pantalla de Cuenta Regresiva y al alcanzarla solo se
muestra la Pantalla Final, aunque esta última tenga contenido pendiente de diseño.

**Acceptance Scenarios**:

1. **Given** que la fecha actual es anterior a la fecha objetivo, **When** el visitante
   abre la aplicación, **Then** solo se muestra la Pantalla de Cuenta Regresiva con
   sus funcionalidades definidas.
2. **Given** que la fecha actual alcanza la fecha objetivo, **When** finaliza el
   conteo, **Then** la Pantalla de Cuenta Regresiva deja de mostrarse y se habilita la
   Pantalla Final como experiencia independiente.


   ### User Story 5 - Ver la escena de Lapislázuli al finalizar la cuenta regresiva (Priority: P1)

Como visitante, quiero que al terminar la cuenta regresiva aparezca una escena
animada de estilo pixel art con un personaje, para recibir una experiencia visual
que continúe la sorpresa de cumpleaños.

**Why this priority**: Es la continuación directa y obligatoria de la Pantalla 1;
sin ella la experiencia queda incompleta.

**Independent Test**: Forzar que la cuenta regresiva llegue a cero y verificar
que aparece la escena con el personaje animándose en bucle mediante las dos
imágenes alternadas.

**Acceptance Scenarios**:

1. **Given** que la cuenta regresiva llega a cero, **When** finaliza, **Then**
   se muestra la Pantalla 2 con la escena de Lapislázuli.
2. **Given** que la Pantalla 2 está activa, **When** se observa el personaje,
   **Then** las dos imágenes se alternan en bucle continuo generando el efecto
   de brazos subiendo y bajando, con una cadencia visual tipo videojuego retro
   de los años 90.
3. **Given** que la Pantalla 2 está activa, **When** se observa la escena,
   **Then** cada imagen ocupa la pantalla completa, integrándose como la
   escena misma y no como una imagen de fondo detrás de otros elementos.

---

### User Story 6 - Leer el mensaje de cumpleaños en formato subtítulo (Priority: P1)

Como visitante, quiero leer un mensaje de cumpleaños que aparece en fragmentos
cortos sobre la escena de Lapislázuli, para vivir un momento narrativo dentro
de la experiencia.

**Why this priority**: El mensaje es el contenido emocional central de la
Pantalla 2.

**Independent Test**: Verificar que el mensaje se muestra dividido en
fragmentos, que cada fragmento desaparece antes de mostrar el siguiente, y que
el texto nunca se acumula en pantalla.

**Acceptance Scenarios**:

1. **Given** que la Pantalla 2 está activa, **When** comienza la secuencia de
   texto, **Then** se muestra el primer fragmento del mensaje con tipografía
   pixel (VT323).
2. **Given** que un fragmento es visible, **When** finaliza su intervalo de
   visualización, **Then** el fragmento desaparece y es reemplazado por el
   siguiente, sin acumularse con el anterior.
3. **Given** que se muestran todos los fragmentos, **When** finaliza el
   último, **Then** la escena permanece visible sin texto adicional.

---

### User Story 7 - Navegar entre la escena de Lapislázuli y los Botones Musicales (Priority: P2)

Como visitante, quiero alternar entre la escena de Lapislázuli y la pantalla de
Botones Musicales mediante doble toque, para explorar ambas experiencias
libremente.

**Why this priority**: La navegación complementa la experiencia principal;
la Pantalla 2 es autocontenida y funcional incluso si el usuario nunca
descubre la Pantalla 3.

**Independent Test**: Realizar un doble toque sobre la Pantalla 2 y verificar
la transición a Botones Musicales; repetir el doble toque y verificar el
regreso a la Pantalla 2.

**Acceptance Scenarios**:

1. **Given** que la Pantalla 2 está activa, **When** el usuario realiza un
   doble toque (dos toques con menos de 300ms de diferencia entre sí),
   **Then** la vista cambia a la Pantalla 3 (Botones Musicales).
2. **Given** que la Pantalla 3 está activa, **When** el usuario realiza un
   doble toque, **Then** la vista regresa a la Pantalla 2.
3. **Given** que cualquiera de las dos pantallas está activa, **When** el
   usuario realiza un solo toque, **Then** no se produce ninguna transición.
4. **Given** que el usuario toca la pantalla una vez y luego toca de nuevo
   después de más de 300ms, **When** ocurre esto, **Then** el sistema no lo
   interpreta como doble toque y no navega.

---

### User Story 8 - Interactuar con los Botones Musicales (Priority: P2)

Como visitante, quiero pulsar botones con distintos tonos organizados en
modos temáticos, para crear pequeñas combinaciones musicales de forma
divertida.

**Why this priority**: Es la funcionalidad interactiva final de la
experiencia, pero no bloquea el flujo principal (Pantalla 1 → Pantalla 2).

**Independent Test**: Verificar que existen 6 botones, que cada uno reproduce
un tono distinto, y que los tonos cambian según el modo musical activo.

**Acceptance Scenarios**:

1. **Given** que la Pantalla 3 está activa, **When** se observa la interfaz,
   **Then** se muestran 6 botones con estilo pixel art y azul como color
   principal.
2. **Given** que un modo musical está activo, **When** el usuario pulsa un
   botón, **Then** se reproduce el tono correspondiente a ese botón en ese
   modo.
3. **Given** que existen 4 modos musicales (Navidad, Cumpleaños y dos modos
   adicionales), **When** cambia el modo activo, **Then** los 6 botones
   reproducen la combinación de tonos correspondiente al nuevo modo.

### Edge Cases

- Si no hay fotografías disponibles o una fotografía no puede cargarse, la pantalla debe conservar un fondo visual alternativo y la cuenta regresiva debe seguir siendo legible.
- Si el dispositivo cambia de orientación, el contenido debe reajustarse al nuevo ancho y alto.
- Si la fecha objetivo llega a cero, debe mostrarse la Pantalla Final sin inventar
  contenido ni comportamiento interno para ella.
- Si el reloj local del dispositivo cambia, el valor mostrado debe reflejar la fecha y hora actuales disponibles para la experiencia sin mostrar unidades negativas.
- La transición debe evitar que la Pantalla de Cuenta Regresiva y la Pantalla Final
  estén visibles al mismo tiempo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La experiencia DEBE iniciar con una pantalla de cuenta regresiva que ocupe todo el viewport visible.
- **FR-002**: La pantalla DEBE mostrar la cuenta regresiva separada en días, horas, minutos y segundos.
- **FR-003**: La cuenta regresiva DEBE actualizarse al menos una vez por segundo mientras la fecha objetivo no haya llegado.
- **FR-004**: La pantalla DEBE mostrar una fotografía como fondo durante la cuenta regresiva.
- **FR-005**: La pantalla DEBE cambiar automáticamente la fotografía activa según un intervalo definido para la experiencia.
- **FR-006**: La fotografía de fondo DEBE cubrir el área visible sin provocar desplazamiento horizontal ni deformar el contador.
- **FR-007**: La pantalla DEBE incluir una capa semitransparente entre la fotografía y la cuenta regresiva.
- **FR-008**: La capa semitransparente DEBE permitir que la cuenta regresiva sea legible sobre fotografías claras y oscuras.
- **FR-009**: La pantalla DEBE adaptarse a teléfonos móviles como tamaño prioritario y conservar una presentación usable en tabletas y escritorios.
- **FR-010**: La pantalla DEBE reajustar el fondo, la capa y el contador cuando cambien el tamaño o la orientación del viewport.
- **FR-011**: La pantalla NO DEBE fijar textos finales de felicitación, bromas u otros mensajes que todavía no hayan sido definidos.
- **FR-012**: La aplicación DEBE mostrar la Pantalla de Cuenta Regresiva únicamente mientras la fecha y hora actuales sean anteriores a la fecha objetivo.
- **FR-013**: La aplicación DEBE dejar de mostrar la Pantalla de Cuenta Regresiva cuando la fecha y hora actuales alcancen la fecha objetivo.
- **FR-014**: La aplicación DEBE reconocer la Pantalla Final como una experiencia independiente de la Pantalla de Cuenta Regresiva.
- **FR-015**: La aplicación DEBE mostrar la Pantalla Final después de alcanzar la fecha objetivo, sin definir todavía sus funcionalidades, contenido, diseño o comportamiento interno.
- **FR-016**: La aplicación NO DEBE mostrar simultáneamente la Pantalla de Cuenta Regresiva y la Pantalla Final durante la transición.
- **FR-017**: La especificación NO DEBE exigir textos finales, funcionalidades o decisiones visuales para la Pantalla Final antes de su diseño posterior.

- **FR-018**: El sistema DEBE mostrar la Pantalla 2 (Escena de Lapislázuli)
  inmediatamente después de que finalice la Pantalla 1.
- **FR-019**: El sistema DEBE animar al personaje alternando dos imágenes
  completas en bucle, con una cadencia aproximada de 250ms por imagen (estilo
  retro de videojuego de los años 90).
- **FR-020**: Cada imagen de la Pantalla 2 DEBE ocupar la pantalla completa,
  integrándose como la escena misma.
- **FR-021**: El sistema DEBE dividir el mensaje de cumpleaños en fragmentos
  cortos y mostrarlos progresivamente, sin acumular texto en pantalla.
- **FR-022**: El texto de los fragmentos DEBE usar tipografía pixel (VT323).
- **FR-023**: El contenido específico del mensaje de cumpleaños es
  configurable y puede usar un mensaje genérico como placeholder sin afectar
  la implementación.
- **FR-024**: El sistema DEBE reconocer el gesto de doble toque (double tap:
  dos toques con ≤300ms de diferencia entre sí) para alternar entre la
  Pantalla 2 y la Pantalla 3.
- **FR-025**: Un solo toque o clic NO DEBE producir ninguna transición entre
  pantallas.
- **FR-026**: El sistema DEBE mostrar 6 botones interactivos en la Pantalla 3,
  cada uno asociado a un tono musical.
- **FR-027**: El sistema DEBE soportar 4 modos musicales (Navidad, Cumpleaños
  y dos modos adicionales), cada uno con su propia combinación de tonos para
  los 6 botones. El detalle de los dos modos adicionales es configurable y
  puede usar valores genéricos como placeholder.
- **FR-028**: La Pantalla 3 DEBE usar estilo visual pixel art con azul como
  color principal.

### Requisitos anulados/actualizados

- **FR-011 y FR-017 quedan superados**: ya no aplica la restricción de "no
  fijar textos finales ni contenido de la Pantalla Final", dado que las
  Pantallas 2 y 3 ya cuentan con especificación propia en este documento.
- **FR-014, FR-015 y FR-016 quedan reemplazados** por las reglas de
  transición descritas en la sección "Experience Architecture" (Pantalla 1 →
  2 automática; Pantalla 2 ↔ 3 por doble toque; nunca dos pantallas visibles
  a la vez).

### Key Entities

Buen ojo en preguntar esto — si simplemente pegas las dos listas una debajo de otra, quedan dos entidades contradictorias: la vieja dice "Pantalla Final: Segunda experiencia... pendiente de diseño" y ahora ya no es así (se dividió en Pantalla 2 y 3, y ya no está pendiente). Aquí va la versión integrada correctamente:

markdown
### Key Entities

- **Fecha objetivo**: Momento futuro contra el que se calcula la cuenta regresiva.
- **Fotografía de fondo**: Recurso visual mostrado detrás de la capa semitransparente
  y el contador en la Pantalla 1.
- **Intervalo de rotación**: Periodo que determina cuándo se sustituye la fotografía
  activa en la Pantalla 1.
- **Capa semitransparente**: Superficie visual que mejora la separación y legibilidad
  del contador sobre la fotografía en la Pantalla 1.
- **Pantalla 1 (Cuenta Regresiva)**: Primera experiencia, activa antes de la fecha
  objetivo y compuesta por las funcionalidades definidas en esta especificación.
- **Pantalla 2 (Escena de Lapislázuli)**: Segunda experiencia, mostrada
  automáticamente al alcanzar la fecha objetivo. Compuesta por el personaje
  animado y los fragmentos de mensaje.
- **Pantalla 3 (Botones Musicales)**: Tercera experiencia, accesible desde la
  Pantalla 2 mediante doble toque. Compuesta por los 6 botones y los modos
  musicales.
- **Personaje (Lapislázuli)**: Par de imágenes completas alternadas que componen
  la animación de la Pantalla 2.
- **Fragmento de mensaje**: Unidad de texto mostrada temporalmente en la
  Pantalla 2, parte de la división del mensaje de cumpleaños completo.
- **Doble toque (double tap)**: Gesto de navegación que alterna entre la
  Pantalla 2 y la Pantalla 3.
- **Modo musical**: Configuración de 6 tonos asociados a los botones de la
  Pantalla 3; existen 4 modos (Navidad, Cumpleaños, y dos adicionales).
- **Transición de experiencias**: Cambios entre las tres pantallas: automático
  de Pantalla 1 a Pantalla 2 al alcanzar la fecha objetivo, y mediante doble
  toque entre Pantalla 2 y Pantalla 3 en ambos sentidos.
## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En una pantalla móvil, el visitante puede identificar días, horas, minutos y segundos en una sola vista, sin desplazamiento horizontal.
- **SC-002**: La pantalla utiliza el 100% del viewport visible en teléfonos, tabletas y escritorios, sin dejar una franja estructural vacía ni recortar el contador.
- **SC-003**: El valor de la cuenta regresiva cambia al menos una vez por segundo durante una prueba de 60 segundos.
- **SC-004**: En una prueba con al menos tres fotografías, la imagen visible cambia automáticamente en cada intervalo configurado sin interacción del visitante.
- **SC-005**: En pruebas con fotografías claras y oscuras, al menos el 95% de los participantes puede leer las cuatro unidades del contador sin modificar la pantalla.
- **SC-006**: Al rotar un teléfono entre orientación vertical y horizontal, la pantalla se reajusta en un máximo de 1 segundo y no presenta desplazamiento horizontal.
- **SC-007**: Antes de la fecha objetivo, el 100% de las comprobaciones muestra únicamente la Pantalla de Cuenta Regresiva.
- **SC-008**: Al alcanzar la fecha objetivo, el 100% de las comprobaciones deja de mostrar la Pantalla de Cuenta Regresiva y muestra la Pantalla Final sin superposición entre ambas.

## Assumptions

- La fecha objetivo y la colección de fotografías serán definidas por el producto antes de la implementación.
- El intervalo de rotación será configurable; se usará un valor predeterminado razonable durante la implementación, sin fijarlo como decisión de diseño final en esta especificación.
- La experiencia se ejecutará en un navegador moderno con acceso a los recursos visuales configurados.
- La Pantalla de Cuenta Regresiva es el único alcance funcional implementado en esta
  entrega; la Pantalla Final solo queda registrada como segunda experiencia pendiente.
- Los textos finales se definirán en una especificación posterior.
- La Pantalla Final será objeto de una especificación, diseño e implementación posteriores.
