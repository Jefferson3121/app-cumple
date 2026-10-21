# Component Contracts - Lapis Pixel Art Ending Scene

**Date**: 2026-09-01 | **Format**: React TypeScript Interfaces | **Status**: Complete

## Overview

This document defines the public interface contracts for React components in the Lapis Pixel Art Ending Scene feature. These contracts ensure consistent data flow, type safety, and predictable component behavior across the application.

---

## PixelArtScene Component

**File**: `src/components/PixelArtScene.jsx`

**Purpose**: Top-level container component that orchestrates the complete scene experience.

### Props Interface

```typescript
interface PixelArtSceneProps {
  // Configuration
  sceneConfig: SceneConfig;
  onNavigateToMusicalButtons?: () => void;
  onSceneComplete?: () => void;
  
  // Optional overrides
  autoStart?: boolean;  // Default: true
  debugMode?: boolean;  // Default: false
}

interface SceneConfig {
  backgroundImagePath: string;
  characterAnimationConfig: CharacterAnimationConfig;
  textSequenceConfig: TextSequenceConfig;
  navigationConfig?: NavigationConfig;
}
```

### State Shape

```typescript
interface PixelArtSceneState {
  isActive: boolean;
  navigationState: NavigationStateData;
  characterAnimationState: CharacterAnimationState;
  textSequenceState: TextSequenceState;
  sceneStartTime: number;  // timestamp ms
  error?: Error;
}
```

### Events Emitted

```typescript
interface PixelArtSceneEvents {
  onNavigateToMusicalButtons: () => void;  // Double-tap detected
  onSceneComplete: () => void;             // Scene initialization complete
  onError: (error: Error) => void;         // Error occurred
  onFrameRenderComplete: () => void;       // Debug: frame rendered
}
```

### Usage Example

```jsx
<PixelArtScene
  sceneConfig={{
    backgroundImagePath: 'backgrounds/beach-scene.png',
    characterAnimationConfig: {
      frame1ImagePath: 'lapis-arm-1.png',
      frame2ImagePath: 'lapis-arm-2.png',
      frameRate: 1
    },
    textSequenceConfig: {
      phrases: [
        { id: 'p1', content: 'The adventure continues...', displayDuration: 2000 }
      ]
    }
  }}
  onNavigateToMusicalButtons={() => navigate('/musical-buttons')}
  autoStart={true}
/>
```

---

## CharacterAnimation Component

**File**: `src/components/CharacterAnimation.jsx`

**Purpose**: Render animated character using two-frame alternation.

### Props Interface

```typescript
interface CharacterAnimationProps {
  config: CharacterAnimationConfig;
  isPlaying: boolean;
  onFrameChange?: (frameIndex: 0 | 1) => void;
  onImageLoadError?: (error: Error) => void;
}

interface CharacterAnimationConfig {
  frame1ImagePath: string;
  frame2ImagePath: string;
  frameRate?: number;  // Frames per second (default: 1)
  size?: 'small' | 'medium' | 'large';  // Responsive sizing
  fallbackImagePath?: string;  // Error state fallback
}
```

### State Shape

```typescript
interface CharacterAnimationState {
  currentFrameIndex: 0 | 1;
  isLoaded: boolean;
  hasError: boolean;
  lastFrameUpdateTime: number;  // timestamp ms
  displayedDuration: number;    // ms since last frame change
}
```

### Events Emitted

```typescript
interface CharacterAnimationEvents {
  onFrameChange: (frameIndex: 0 | 1) => void;
  onImageLoadError: (error: Error, frameIndex: 0 | 1) => void;
  onAnimationStart: () => void;
  onAnimationStop: () => void;
}
```

### Guarantees

- Maintains 60fps display refresh rate (animates using requestAnimationFrame)
- Frame alternation respects frameRate configuration
- Both images must be preloaded before animation starts
- Smooth transitions between frames (no flickering)
- Responsive sizing via CSS classes or size prop

### Usage Example

```jsx
<CharacterAnimation
  config={{
    frame1ImagePath: 'lapis-arm-1.png',
    frame2ImagePath: 'lapis-arm-2.png',
    frameRate: 1,
    size: 'large'
  }}
  isPlaying={true}
  onFrameChange={(index) => console.log('Frame:', index)}
/>
```

---

## TextSequence Component

**File**: `src/components/TextSequence.jsx`

**Purpose**: Display and manage progression through ordered text phrases.

### Props Interface

```typescript
interface TextSequenceProps {
  config: TextSequenceConfig;
  isPaused?: boolean;
  onPhraseChange?: (currentIndex: number, phrase: TextPhrase) => void;
  onSequenceComplete?: () => void;
}

interface TextSequenceConfig {
  phrases: TextPhrase[];
  defaultTransitionStyle?: 'fade' | 'slide';  // Default: 'fade'
  defaultPositionClass?: string;               // Default: 'bottom-center'
}

interface TextPhrase {
  id: string;
  content: string;  // Empty string = skip this phrase
  displayDuration?: number;  // ms (default: 2000, min: 100)
  positionClass?: string;  // Tailwind classes for positioning
  transitionStyle?: 'fade' | 'slide';
}
```

### State Shape

```typescript
interface TextSequenceState {
  currentPhraseIndex: number;
  isComplete: boolean;
  visiblePhrase: TextPhrase | null;
  transitionInProgress: boolean;
  sequenceStartTime: number;  // timestamp ms
  displayedPhrases: Set<string>;  // Track rendered phrases for SC-006
}
```

### Events Emitted

```typescript
interface TextSequenceEvents {
  onPhraseChange: (currentIndex: number, phrase: TextPhrase) => void;
  onSequenceComplete: () => void;
  onTransitionComplete: () => void;
}
```

### Guarantees

- Empty phrases skipped silently (no errors)
- Phrase transitions complete within 100ms per SC-003
- All phrases display in correct order (validates SC-006)
- Duration <= 0 defaults to 2000ms per edge case spec
- Text remains visible after sequence complete per spec

### Usage Example

```jsx
<TextSequence
  config={{
    phrases: [
      { id: 'p1', content: 'Hello...', displayDuration: 2000, positionClass: 'bottom-center' },
      { id: 'p2', content: '', displayDuration: 1000 },  // Will be skipped
      { id: 'p3', content: 'Goodbye', displayDuration: 2000, positionClass: 'bottom-center' }
    ]
  }}
  onSequenceComplete={() => console.log('All phrases displayed')}
/>
```

---

## NavigationHandler Hook

**File**: `src/hooks/useDoublePointerDown.js`

**Purpose**: Custom React hook for detecting double pointer-down (tap) events with debouncing.

### Interface

```typescript
interface UseDoublePointerDownOptions {
  debounceDelay?: number;  // ms (default: 300)
  onDoubleTap: () => void;
  enabled?: boolean;  // Default: true
}

type UseDoublePointerDownReturn = {
  ref: React.RefObject<HTMLElement>;
  isListening: boolean;
  reset: () => void;
  tapCount: number;
  lastTapTime: number;
}
```

### Hook Behavior

```typescript
const { ref, isListening, reset, tapCount, lastTapTime } = useDoublePointerDown({
  debounceDelay: 300,
  onDoubleTap: () => {
    // Handle double-tap navigation
  },
  enabled: true
});
```

### Guarantees

- Detects both mouse and touch pointer-down events (broad browser support)
- Double-tap must occur within debounceDelay (300ms default per SC-004)
- Single taps don't trigger callback
- Rapid consecutive taps debounced; only distinct double-tap gestures processed
- Response latency < 300ms per SC-004
- No false triggers from accidental double-taps
- Cleans up event listeners on unmount

### Implementation Notes

- Use `pointerdown` event for cross-device support (mouse + touch)
- Fallback to `mousedown` and `touchstart` for older browsers if needed
- Track tap timing with `performance.now()` or `Date.now()`
- Reset tap counter after debounceDelay has passed

### Usage Example

```jsx
function PixelArtSceneWithNavigation() {
  const { ref } = useDoublePointerDown({
    debounceDelay: 300,
    onDoubleTap: () => navigate('/musical-buttons'),
    enabled: true
  });
  
  return (
    <div ref={ref} className="scene-container">
      {/* Scene content */}
    </div>
  );
}
```

---

## Configuration File Format

**File**: `src/data/phrases.json`

**Purpose**: Externalize text phrase configuration for easy modification without code changes.

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["phrases", "animationConfig", "backgroundPath"],
  "properties": {
    "phrases": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["id", "content", "displayDuration"],
        "properties": {
          "id": { "type": "string" },
          "content": { "type": "string" },
          "displayDuration": { "type": "integer", "minimum": 0 },
          "positionClass": { "type": "string" },
          "transitionStyle": { "enum": ["fade", "slide"] }
        }
      }
    },
    "animationConfig": {
      "type": "object",
      "required": ["frame1Path", "frame2Path"],
      "properties": {
        "frame1Path": { "type": "string" },
        "frame2Path": { "type": "string" },
        "frameRate": { "type": "number", "minimum": 0.5, "maximum": 5 }
      }
    },
    "backgroundPath": { "type": "string" }
  }
}
```

### Example File

```json
{
  "phrases": [
    {
      "id": "opening",
      "content": "The adventure continues...",
      "displayDuration": 2000,
      "positionClass": "bottom-center",
      "transitionStyle": "fade"
    },
    {
      "id": "middle",
      "content": "In a world of wonders...",
      "displayDuration": 2500,
      "positionClass": "bottom-center",
      "transitionStyle": "fade"
    },
    {
      "id": "closing",
      "content": "Until next time, Lapis.",
      "displayDuration": 3000,
      "positionClass": "bottom-center",
      "transitionStyle": "fade"
    }
  ],
  "animationConfig": {
    "frame1Path": "lapis-arm-1.png",
    "frame2Path": "lapis-arm-2.png",
    "frameRate": 1
  },
  "backgroundPath": "backgrounds/beach-scene.png"
}
```

---

## Error Handling Contract

All components must adhere to the following error handling patterns:

### Image Load Failures

```typescript
interface ImageLoadErrorHandling {
  // Scenario: Character image fails to load
  behavior: "display fallback placeholder or error state";
  fallbackPath?: string;
  userNotification: "visual error state, no console error";
}
```

### Configuration Errors

```typescript
interface ConfigErrorHandling {
  // Scenario: Invalid phrase duration (< 0)
  behavior: "default to 2000ms, log warning";
  
  // Scenario: Empty phrase content
  behavior: "skip phrase silently, continue to next";
  
  // Scenario: Missing required config
  behavior: "throw error, prevent scene mount";
}
```

### Gesture Detection Errors

```typescript
interface GestureErrorHandling {
  // Scenario: Rapid successive taps
  behavior: "debounce, process only distinct double-taps";
  
  // Scenario: Single tap detected
  behavior: "no action, no error";
}
```

---

## Performance Contracts

### Timing Guarantees

| Operation | Target | Measurement |
|-----------|--------|-------------|
| Scene transition | <100ms | Time from countdown=0 to scene visible |
| Frame rendering | 60fps | Animation frame rate (no drops) |
| Phrase transition | <100ms | Time from duration expiry to new phrase visible |
| Double-tap response | <300ms | Time from tap detection to navigation |
| Performance stability | >60s | No degradation over extended display (SC-005) |

### Memory Guarantees

- No memory leaks on component mount/unmount
- Image assets preloaded once, not reloaded on frame change
- Event listeners cleaned up on component unmount
- State garbage collected when scene closed

---

## Contract Compliance Checklist

**Before implementation**:
- [ ] All component props match interfaces defined above
- [ ] All events emit data matching defined Events interfaces
- [ ] Configuration files validate against JSON schemas
- [ ] Error handling follows specified patterns
- [ ] Performance targets aligned with measurements above
- [ ] Custom hooks expose documented return shapes

**Before shipping**:
- [ ] Manual testing covers all user scenarios
- [ ] All timing guarantees verified via browser DevTools
- [ ] Image load errors handled gracefully
- [ ] Gesture detection tested on multiple devices
- [ ] Responsive design verified across breakpoints

---

## Contract Status

**Date**: 2026-09-01
**Status**: COMPLETE - All component and configuration contracts defined

Ready for implementation phase.
