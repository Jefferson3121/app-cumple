# Feature Specification: Lapis Pixel Art Ending Scene

**Feature Branch**: `002-lapis-pixel-scene`

**Created**: 2026-08-30

**Status**: Draft

**Input**: User description: New ending experience with Lapis Lazuli pixel art scene and progressive text display after countdown completion.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Pixel Art Ending Scene After Countdown (Priority: P1)

User reaches the end of the countdown and transitions to a new pixel art scene featuring Lapis Lazuli instead of returning to the home screen or other experience.

**Why this priority**: This is the core feature - the scene must appear immediately after countdown ends to deliver the visual reward and experience completion.

**Independent Test**: Can be tested by running the countdown to completion and verifying the pixel art scene displays with Lapis Lazuli animation.

**Acceptance Scenarios**:

1. **Given** the countdown is running, **When** the countdown reaches zero, **Then** the pixel art scene displays with Lapis Lazuli character visible and animated
2. **Given** the pixel art scene is displayed, **When** the user observes it, **Then** the character animation loops continuously showing only arm movement variations
3. **Given** the pixel art scene is active, **When** observing the environment, **Then** the background remains stable with beach/series-inspired aesthetic in predominantly blue tones

---

### User Story 2 - Read Progressive Text Subtitles (Priority: P1)

While the pixel art scene is displayed, the user reads a series of short phrases that appear one at a time, creating a narrative moment that complements the visual scene.

**Why this priority**: The progressive text is an integral part of the experience narrative and must synchronize with scene display.

**Independent Test**: Can be tested by verifying each phrase appears, remains visible for appropriate duration, and transitions to the next phrase.

**Acceptance Scenarios**:

1. **Given** the pixel art scene is displayed, **When** observing the interface, **Then** one phrase appears in a visually integrated position (not overlaid harshly on the image)
2. **Given** a phrase is visible, **When** the display interval expires, **Then** the phrase transitions smoothly to the next phrase without jarring jumps
3. **Given** multiple phrases are configured, **When** all phrases have been displayed, **Then** after the final phrase completes, the scene remains visible with no text

---

### User Story 3 - Navigate to Musical Buttons Experience (Priority: P2)

The user can double-tap the scene to progress to the next experience (Musical Buttons) when ready, and can double-tap again to return to the Lapis scene.

**Why this priority**: Navigation allows exploration and return to the scene; P2 because the experience is self-contained initially and navigation timing can be refined post-launch.

**Independent Test**: Can be tested by double-tapping the scene and verifying transitions to a placeholder/stub Musical Buttons screen, then double-tapping again to return.

**Acceptance Scenarios**:

1. **Given** the pixel art scene is displayed, **When** user performs a double pointer-down (touch or mouse), **Then** the view transitions to the Musical Buttons experience
2. **Given** the Musical Buttons experience is displayed, **When** user performs a double pointer-down, **Then** the view returns to the Lapis pixel art scene
3. **Given** either scene is active, **When** user performs a single pointer-down, **Then** no transition occurs (only double-taps trigger navigation)

---

### Edge Cases

- What happens if one or both provisional character images cannot load? → Scene displays with visible error state or fallback placeholder
- What happens if text phrases are configured as empty strings? → Empty phrases are skipped in the display sequence
- What happens if phrase display duration is set to zero or negative? → Default to reasonable minimum (e.g., 2 seconds per phrase)
- What happens if user double-taps rapidly in succession? → System debounces taps and only processes distinct double-tap gestures

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the pixel art scene when the countdown reaches zero (transition from existing countdown screen)
- **FR-002**: System MUST render a beach or series-inspired environment as the background with predominantly blue tones
- **FR-003**: System MUST display Lapis Lazuli as the main character in the scene
- **FR-004**: System MUST animate the character by alternating between two provided provisional images in a continuous loop, creating the appearance of arm movement
- **FR-005**: System MUST keep the background environment stable while the character animates
- **FR-006**: System MUST display progressive text phrases one at a time, with each phrase remaining visible for a configurable interval
- **FR-007**: System MUST transition to the next text phrase after the display interval expires, with smooth transition (no jarring visual jumps)
- **FR-008**: System MUST display text as UI elements (not embedded in images), enabling easy modification without image re-editing
- **FR-009**: System MUST detect double pointer-down events (both mouse and touch input) on the scene
- **FR-010**: System MUST transition to the Musical Buttons experience when a double pointer-down is detected
- **FR-011**: System MUST allow users to return to the Lapis pixel art scene from the Musical Buttons experience via another double pointer-down
- **FR-012**: System MUST persist the pixel art scene indefinitely until user initiates navigation
- **FR-013**: System MUST NOT include audio in the pixel art scene
- **FR-014**: System MUST NOT display dialogue bubbles or character speech elements
- **FR-015**: System MUST NOT modify or alter the existing countdown screen functionality

### Key Entities

- **PixelArtScene**: Container for the complete scene experience including background, character animation, and text display
- **Character Animation**: Animation controller that manages alternating between two image frames with configurable frame rate
- **Text Phrase**: Individual text element with configurable duration and content
- **TextSequence**: Ordered collection of text phrases with automatic progression

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Scene displays correctly within 100ms of countdown completion (perceived as instantaneous transition)
- **SC-002**: Character animation runs smoothly with no frame drops or stuttering at 60fps
- **SC-003**: Text phrases transition to the next phrase within 100ms of duration expiry
- **SC-004**: Double-tap navigation responds within 300ms of user input
- **SC-005**: Scene remains stable with no performance degradation after 60 seconds of continuous display
- **SC-006**: All text phrases display in correct order and visibility (0 missing or skipped phrases)
- **SC-007**: Text is readable and integrates visually with scene (subjective, evaluated by design review)
- **SC-008**: Double-tap debouncing successfully prevents false triggers from rapid consecutive taps

## Assumptions

- Two provisional character images are already available in the project and can be located/loaded by asset path
- Character animation needs only simple alternation between two frames (no complex keyframe animation required)
- Text phrases are stored in a configuration format (e.g., JSON, constants, or properties file) that is easily modifiable without code recompilation
- Beach or series-inspired environment visual assets are either already available or can be created from existing project resources
- The existing countdown screen will continue to function unchanged; this feature creates a new screen path only
- Musical Buttons experience will be implemented in a future iteration; current implementation should accept a placeholder/stub for navigation testing
- Target users have sufficient screen size/resolution to view the scene clearly (web/mobile responsive design to be handled in implementation)
- No accessibility requirements beyond standard keyboard/pointer event handling are needed at MVP launch
- English and/or Spanish text support based on existing project localization patterns
- **Validación Manual Únicamente**: No se requieren ni se implementarán tests automatizados (unit, integration, e2e, o de componentes). La validación será manual mediante ejecución de la aplicación en PC y dispositivos móviles
