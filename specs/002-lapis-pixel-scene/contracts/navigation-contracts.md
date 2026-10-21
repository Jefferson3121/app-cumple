# Navigation Contracts - Lapis Pixel Art Ending Scene

**Date**: 2026-09-01 | **Format**: React Navigation Interfaces | **Status**: Complete

## Overview

This document defines the navigation flow contracts between the Lapis Pixel Art Scene, the Countdown screen, and the Musical Buttons experience placeholder. These contracts ensure predictable screen transitions and consistent navigation state management.

---

## Navigation Flows

### Flow 1: Countdown → Lapis Scene (Automatic)

**Trigger**: Countdown timer reaches zero

**Sequence**:
```
Countdown (active)
  ↓
  [countdown reaches 0]
  ↓
Lapis Scene (enters, becomes active)
  ↓
  [CharacterAnimation starts]
  [TextSequence begins displaying phrases]
```

**Timing**: Scene must be fully rendered and interactive within 100ms of countdown=0 (SC-001)

**State Preservation**:
- Countdown screen no longer active (unmounts or becomes invisible)
- Lapis scene mounts with fresh initial state
- No data passed between screens (independent session)

**Error Handling**:
- If Lapis scene fails to mount: Display error state, allow user to manually trigger retry or return to home
- Countdown screen never modified per FR-015

---

### Flow 2: Lapis Scene → Musical Buttons (Double-Tap)

**Trigger**: User performs double pointer-down (double-tap) on Lapis scene

**Sequence**:
```
Lapis Scene (active, listening for gestures)
  ↓
  [double-tap detected via NavigationHandler]
  ↓
  [navigationState.isTransitioning = true]
  ↓
Musical Buttons Experience (stub/placeholder, becomes active)
  ↓
  [Musical Buttons listens for double-tap]
```

**Timing**: Navigation transition must complete within 300ms of tap detection (SC-004)

**Navigation Parameters**:
```typescript
interface NavigationToMusicalButtons {
  from: 'lapis-scene';
  trigger: 'double-tap';
  tapPosition?: { x: number, y: number };  // Optional, for debugging
  timestamp: number;  // When navigation was triggered
}
```

**State Preservation**:
- Lapis scene state partially preserved (TextSequence continues from current phrase index on return)
- CharacterAnimation pauses during transition but resumes on return
- Navigation state debounces to prevent multiple simultaneous transitions

**Error Handling**:
- If Musical Buttons fails to load: Show error message, allow user to tap to return to Lapis scene
- If double-tap detection fails: Scene remains active, waiting for next valid tap gesture

---

### Flow 3: Musical Buttons → Lapis Scene (Double-Tap Return)

**Trigger**: User performs double pointer-down (double-tap) on Musical Buttons experience

**Sequence**:
```
Musical Buttons Experience (active, listening for gestures)
  ↓
  [double-tap detected via NavigationHandler]
  ↓
  [navigationState.isTransitioning = true]
  ↓
Lapis Scene (resumes, becomes active again)
  ↓
  [CharacterAnimation resumes from paused state]
  [TextSequence continues from saved phrase index]
```

**Timing**: Return navigation must complete within 300ms of tap detection (SC-004)

**Navigation Parameters**:
```typescript
interface NavigationToLapisScene {
  from: 'musical-buttons-placeholder';
  trigger: 'double-tap';
  timestamp: number;  // When navigation was triggered
}
```

**State Preservation** (Key Requirement per FR-012):
- TextSequence.currentPhraseIndex preserved
- CharacterAnimation frame index preserved
- Text already displayed remains visible (no reset)
- Scene resumes exactly as left

**Debouncing**: Prevents rapid ping-pong navigation between screens

**Error Handling**:
- If Lapis scene fails to resume: Show error, prompt user to reset or return home
- Gesture detection remains active to allow retry

---

## Navigation State Machine

```
           ┌─────────────────────────────────────────┐
           │      COUNTDOWN_SCREEN                   │
           │    (external feature, not modified)     │
           └────────────────┬────────────────────────┘
                            │
                            │ [countdown reaches 0]
                            │ <100ms transition required
                            ↓
           ┌─────────────────────────────────────────┐
           │     LAPIS_SCENE_INITIAL                 │
           │ ├─ CharacterAnimation starting          │
           │ ├─ TextSequence beginning               │
           │ └─ Listening for double-tap             │
           └────────────────┬────────────────────────┘
                            │
                  [scene active, user viewing]
                            │
                  ┌─────────┴──────────┐
                  │                    │
     [double-tap detected]    [manual navigation/close]
                  │                    │
                  ↓                    ↓
        ┌──────────────────┐  ┌──────────────────┐
        │  TRANSITIONING_  │  │  LAPIS_SCENE_   │
        │ TO_MUSICAL_BTN   │  │  PAUSED_OR_CLOSED│
        └────────┬─────────┘  └──────────────────┘
                 │
      [<300ms transition]
                 │
                 ↓
        ┌──────────────────────────────┐
        │  MUSICAL_BUTTONS_PLACEHOLDER  │
        │  (stub component)             │
        │  Listening for double-tap     │
        └────────┬─────────────────────┘
                 │
       [scene active, user viewing]
                 │
       [double-tap detected]
                 │
                 ↓
        ┌──────────────────────────────┐
        │  TRANSITIONING_              │
        │  TO_LAPIS_SCENE              │
        └────────┬─────────────────────┘
                 │
      [<300ms transition]
                 │
                 ↓
        ┌──────────────────────────────┐
        │  LAPIS_SCENE_RESUMED          │
        │ ├─ Phrase progression resumes│
        │ ├─ Animation resumes         │
        │ └─ State preserved from      │
        │    before navigation         │
        └──────────────────────────────┘
```

---

## Navigation Constants

```typescript
export const NAVIGATION_CONFIG = {
  // Scene identifiers
  SCENES: {
    LAPIS_PIXEL_SCENE: 'lapis-pixel-scene',
    MUSICAL_BUTTONS_PLACEHOLDER: 'musical-buttons-placeholder'
  },
  
  // Navigation triggers
  TRIGGERS: {
    DOUBLE_TAP: 'double-tap',
    COUNTDOWN_COMPLETE: 'countdown-complete',
    MANUAL_CLOSE: 'manual-close'
  },
  
  // Timing constraints
  TIMING: {
    MAX_SCENE_TRANSITION_MS: 100,      // SC-001
    MAX_TAP_RESPONSE_MS: 300,           // SC-004
    DOUBLE_TAP_DEBOUNCE_MS: 300,
    SINGLE_TO_DOUBLE_TAP_WINDOW_MS: 300
  },
  
  // Gesture detection
  GESTURE_CONFIG: {
    POINTER_DOWN_EVENT: 'pointerdown',  // Primary
    FALLBACK_EVENTS: ['mousedown', 'touchstart'],  // Fallback for older browsers
    DOUBLE_TAP_TAP_COUNT: 2,
    SINGLE_TAP_TAP_COUNT: 1,
    MAX_TAP_DEBOUNCE_DELAY_MS: 500
  }
};
```

---

## Route/Navigation Definition

**Integration Point**: Adapt this to your routing library (React Router, etc.)

```typescript
// Example: React Router integration
import PixelArtScene from './components/PixelArtScene';
import MusicalButtonsPlaceholder from './components/MusicalButtonsPlaceholder';

const routes = [
  {
    path: '/countdown',
    element: <CountdownScreen />  // External feature, not part of this spec
  },
  {
    path: '/lapis-scene',
    element: <PixelArtScene
      onNavigateToMusicalButtons={() => navigate('/musical-buttons-placeholder')}
      onSceneComplete={() => console.log('Scene loaded')}
    />
  },
  {
    path: '/musical-buttons-placeholder',
    element: <MusicalButtonsPlaceholder
      onNavigateToLapisScene={() => navigate('/lapis-scene')}
    />
  }
];
```

---

## Navigation State Interface

```typescript
interface NavigationContext {
  currentScene: 'lapis-scene' | 'musical-buttons-placeholder';
  isTransitioning: boolean;
  lastTransitionTime: number;
  transitionHistory: NavigationEvent[];
}

interface NavigationEvent {
  id: string;
  from: string;
  to: string;
  trigger: string;
  timestamp: number;
  duration: number;  // ms taken for transition
}
```

---

## Gesture Debouncing Contract

```typescript
interface GestureDebounceConfig {
  debounceDelay: number;  // 300ms default
  
  // Ensures:
  // 1. Rapid taps only trigger ONE navigation
  // 2. Single taps never trigger navigation
  // 3. Each double-tap gesture is distinct and separate
  // 4. Response latency < 300ms
}

// Example debouncing logic:
function detectDoubleTap(tapSequence: TapEvent[]): boolean {
  if (tapSequence.length < 2) return false;
  
  const [firstTap, secondTap] = tapSequence.slice(-2);
  const timeBetweenTaps = secondTap.timestamp - firstTap.timestamp;
  
  return timeBetweenTaps <= DEBOUNCE_DELAY && timeBetweenTaps >= 50;
}
```

---

## Navigation Error States

| Error State | Recovery Action | User Experience |
|-------------|-----------------|-----------------|
| Scene mount fails | Show error UI, allow retry | "Scene failed to load. Tap to retry." |
| Navigation transition hangs | Timeout after 1000ms, rollback | Remains on current screen, tap to retry |
| Double-tap detection broken | Log error, remain active | Scene stays visible, gestures may not work |
| Musical Buttons fails to load | Navigate back to Lapis scene | Automatic return after 5s timeout |

---

## Accessibility Considerations

- **Keyboard Alternative to Double-Tap**: Consider adding keyboard shortcut (e.g., `N` key) for navigation, beyond gesture-only input
- **Screen Reader Support**: Announce scene transitions and current active scene
- **Focus Management**: Restore focus after navigation transitions
- **Visual Indicator**: Show indication when double-tap is detected/processed

---

## Testing Navigation Scenarios

Manual testing checklist (per spec requirement for manual validation):

- [ ] Countdown completes → Lapis scene appears within 100ms
- [ ] Lapis scene fully interactive (text visible, animation smooth)
- [ ] Single tap on scene does NOT trigger navigation
- [ ] Double tap within 300ms transitions to Musical Buttons
- [ ] Double tap on Musical Buttons within 300ms returns to Lapis scene
- [ ] Text sequence resumes from same point after return
- [ ] Rapid double-taps don't cause multiple navigations
- [ ] Navigation works on desktop (mouse) and mobile (touch)
- [ ] Navigation works on tablet (large touch target)
- [ ] Error states display and recover correctly

---

## Navigation Contract Status

**Date**: 2026-09-01
**Status**: COMPLETE - All navigation flows, state machines, and contracts defined

Ready for implementation phase.
