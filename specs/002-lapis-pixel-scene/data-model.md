# Phase 1: Data Model - Lapis Pixel Art Ending Scene

**Date**: 2026-09-01 | **Status**: Complete

## Entity Definitions

### PixelArtScene

**Purpose**: Top-level container managing the complete scene experience including background, character animation, text display, and navigation.

**Fields**:
- `id` (string, required): Unique identifier for scene instance (e.g., "lapis-ending-scene")
- `backgroundImagePath` (string, required): Path to background image asset
- `characterAnimationConfig` (CharacterAnimation, required): Configuration for character animation controller
- `textSequenceConfig` (TextSequence, required): Configuration for text phrase progression
- `navigationState` (NavigationState, enum): Current navigation state (e.g., "in-scene", "transitioning-to-musical-buttons", "transitioning-back-to-scene")
- `sceneStartTime` (timestamp, required): When scene was initialized (for performance monitoring)
- `isActive` (boolean, required): Whether scene is currently displayed and processing events

**Relationships**:
- Owns: CharacterAnimation (1:1)
- Owns: TextSequence (1:1)
- Owns: NavigationState (1:1)
- Receives events from: NavigationHandler (gesture detection)

**Validation Rules**:
- `backgroundImagePath` must be a valid file path resolvable in `src/assets/backgrounds/`
- `characterAnimationConfig` must be fully initialized before scene becomes active
- `textSequenceConfig` must have at least one phrase (validates in TextSequence)
- Scene initialization must complete within 100ms per SC-001
- `navigationState` transitions must be debounced (max 1 transition per 300ms)

**Lifecycle**:
- Created: When countdown reaches zero
- Active: User viewing scene and interaction enabled
- Transitioning: During double-tap navigation to Musical Buttons
- Destroyed: When user navigates away or session ends

---

### CharacterAnimation

**Purpose**: Controller managing alternating character animation between two provided image frames, creating arm movement effect.

**Fields**:
- `frame1ImagePath` (string, required): Path to first character image (arm position 1)
- `frame2ImagePath` (string, required): Path to second character image (arm position 2)
- `currentFrameIndex` (integer, enum: 0|1, required): Which frame is currently displayed
- `frameRate` (integer, optional): Animation speed in frames per second (default: 1 fps = 1 frame change per second; configurable 0.5-5 fps)
- `isLooping` (boolean, required): Whether animation repeats indefinitely
- `startTime` (timestamp, required): When animation started
- `isPaused` (boolean, optional): Whether animation is currently paused (default: false)

**Relationships**:
- Owned by: PixelArtScene (1:1)
- Renders to: HTML image element or CSS background-image

**Validation Rules**:
- Both `frame1ImagePath` and `frame2ImagePath` must be valid file paths resolvable in `src/assets/`
- `frameRate` if provided must be > 0
- Files must be loadable images (PNG, JPG, WebP) with same dimensions
- Animation must render at 60fps display rate regardless of frame rate setting per SC-002
- If image fails to load, scene displays visible error state or fallback placeholder
- Frame count must be exactly 2 (no more, no less)

**State Transitions**:
- Loaded → Running: When paths resolve and images load
- Running → Paused: When isPaused set to true (not currently used, but supported for future)
- Paused → Running: When isPaused set to false
- Running → Stopped: When scene is deactivated

---

### TextPhrase

**Purpose**: Individual text element with configurable display duration and content.

**Fields**:
- `id` (string, required): Unique identifier within sequence (e.g., "phrase-1", "phrase-2")
- `content` (string, optional): Text to display; empty strings are skipped
- `displayDuration` (integer, required): Milliseconds to show this phrase (default: 2000ms if <= 0)
- `positionClass` (string, optional): CSS class for positioning (e.g., "bottom-center", "top-left")
- `transitionStyle` (string, enum: "fade"|"slide", optional): How phrase transitions (default: "fade")

**Relationships**:
- Owned by: TextSequence (1:many)
- Rendered as: DOM text element with CSS styling

**Validation Rules**:
- If `content` is empty string (""), phrase is skipped in sequence without error
- `displayDuration` minimum 100ms; if <= 0, defaults to 2000ms per edge case spec
- Text must be readable and contrast well with scene background
- Text must fit within viewport at all responsive breakpoints
- Transition must complete within 100ms per SC-003

**Format**:
```javascript
{
  id: "phrase-1",
  content: "The adventure continues...",
  displayDuration: 2000,
  positionClass: "bottom-center",
  transitionStyle: "fade"
}
```

---

### TextSequence

**Purpose**: Ordered collection of text phrases with automatic progression and state tracking.

**Fields**:
- `phrases` (TextPhrase[], required): Ordered array of phrase objects
- `currentPhraseIndex` (integer, required): Index of currently displayed phrase (0-based)
- `isComplete` (boolean, required): Whether all phrases have been displayed
- `startTime` (timestamp, required): When sequence started
- `totalDisplayTime` (integer, computed): Sum of all displayDuration values

**Relationships**:
- Owned by: PixelArtScene (1:1)
- Contains: TextPhrase (1:many)
- Listens to: CharacterAnimation timing (for sync if needed)

**Validation Rules**:
- Must have at least 1 phrase
- Empty phrases ("") are filtered out silently
- `currentPhraseIndex` must stay in bounds [0, phrases.length - 1]
- Phrase transitions must occur within 100ms of duration expiry per SC-003
- All phrases must display in correct order per SC-006
- No phrases can be skipped unless filtered as empty

**State Transitions**:
- Initialized → DisplayingPhrase-0: When sequence starts
- DisplayingPhrase-N → DisplayingPhrase-(N+1): After phrase duration expires, smooth transition
- DisplayingPhrase-Final → Complete: After final phrase duration expires, phrase hidden but scene persists

---

### NavigationState

**Purpose**: Tracks current navigation state and handles double-tap gesture detection/debouncing.

**Fields**:
- `currentScene` (string, enum: "lapis-scene"|"musical-buttons-placeholder", required): Which screen is active
- `lastTapTime` (timestamp, required): When last pointer-down event occurred
- `tapCount` (integer, required): Number of consecutive taps detected (0, 1, or 2)
- `isTransitioning` (boolean, required): Whether navigation is in progress
- `debounceDelay` (integer, required): Minimum milliseconds between detectable taps (default: 300ms per SC-004)

**Relationships**:
- Owned by: PixelArtScene (1:1)
- Receives events from: NavigationHandler (gesture detection)
- Triggers: Navigation to/from MusicalButtons component

**Validation Rules**:
- `currentScene` must be one of two allowed values
- `tapCount` must be 0, 1, or 2
- Double-tap detected when: tapCount == 2 AND time between taps < 300ms
- Single taps (tapCount == 1) must not trigger navigation per spec
- Rapid consecutive taps debounced; only distinct double-tap gestures processed per spec edge case
- Response to valid double-tap must occur within 300ms per SC-004
- Transitions between scenes debounce to prevent state corruption

**Event Handling Flow**:
1. pointer-down event arrives at component
2. NavigationHandler records tap time and increments tapCount
3. If tapCount == 1: Set timer to reset tapCount after debounceDelay
4. If tapCount == 2 AND time gap < debounceDelay: Trigger navigation, reset counter
5. If tapCount resets to 0: Wait for next tap sequence

---

## Relationships & Data Flow

```
┌─────────────────────────────────────────┐
│       PixelArtScene (root)              │
├─────────────────────────────────────────┤
│ - id: "lapis-ending-scene"              │
│ - isActive: boolean                      │
│ - navigationState: NavigationState       │
│ - ↓ owns ↓                              │
├─────────────────────────────────────────┤
│                                          │
├─► CharacterAnimation                    │
│   ├─ frame1, frame2 paths               │
│   ├─ currentFrameIndex (0 or 1)         │
│   └─ frameRate (configurable)           │
│                                          │
├─► TextSequence                          │
│   ├─ phrases: [TextPhrase, ...]         │
│   ├─ currentPhraseIndex                 │
│   └─ isComplete                         │
│       └─ phrases[N]: TextPhrase         │
│          ├─ content (displayable)       │
│          ├─ displayDuration             │
│          └─ positionClass               │
│                                          │
└─► NavigationState                       │
    ├─ currentScene enum                  │
    ├─ tapCount (0, 1, or 2)              │
    └─ isTransitioning                    │
```

## State Persistence

**Within Scene Lifecycle**:
- PixelArtScene maintains state while active
- CharacterAnimation state (current frame, timing) reset on scene deactivation
- TextSequence state preserved if user navigates away and returns (per spec requirement FR-012)
- NavigationState always reset on scene deactivation/reactivation

**Across Navigation**:
- Returning to Lapis scene from Musical Buttons: TextSequence continues from where it left off (preserves currentPhraseIndex)
- Scene can be paused and resumed during navigation transitions
- No data persisted to localStorage/sessionStorage (scene lives only during user session)

## Edge Cases & Error Handling

| Scenario | Handling | Notes |
|----------|----------|-------|
| Character image fails to load | Display error placeholder or fallback asset | Per spec edge case |
| Empty phrase in sequence | Skip silently without error | Per spec edge case |
| Phrase duration <= 0 | Default to 2000ms | Per spec edge case |
| Rapid double-taps | Debounce, only process distinct gestures | Per spec edge case |
| User navigates before sequence completes | Scene state preserved; resume on return | Per spec requirement |
| Scene stays active >60 seconds | No performance degradation expected | Per SC-005 |

## Configuration Format

Text phrases loaded from JSON configuration file at `src/data/phrases.json`:

```javascript
{
  "phrases": [
    {
      "id": "phrase-1",
      "content": "The adventure continues...",
      "displayDuration": 2000,
      "positionClass": "bottom-center",
      "transitionStyle": "fade"
    },
    {
      "id": "phrase-2",
      "content": "",  // Will be skipped
      "displayDuration": 1500,
      "positionClass": "bottom-center",
      "transitionStyle": "fade"
    },
    {
      "id": "phrase-3",
      "content": "Until next time...",
      "displayDuration": 3000,
      "positionClass": "bottom-center",
      "transitionStyle": "fade"
    }
  ],
  "animationConfig": {
    "frameRate": 1,  // 1 frame per second
    "frame1Path": "lapis-arm-1.png",
    "frame2Path": "lapis-arm-2.png"
  },
  "backgroundPath": "backgrounds/beach-scene.png"
}
```

---

## Phase 1 Data Model Completion

**Status**: COMPLETE - All entities defined with fields, relationships, validation rules, and state transitions documented.

Entity definitions are ready for interface contract generation.
