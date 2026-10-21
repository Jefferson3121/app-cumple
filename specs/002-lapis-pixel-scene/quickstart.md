# Quickstart: Lapis Pixel Art Ending Scene - Validation Guide

**Date**: 2026-09-01 | **Purpose**: End-to-end validation of Lapis Pixel Art Scene feature | **Format**: Manual user testing guide

## Overview

This guide provides step-by-step validation scenarios to confirm the Lapis Pixel Art Ending Scene feature works correctly across all user requirements (FR-001 through FR-015). All testing is manual per spec assumptions; no automated tests required.

**Prerequisites**:
- Application built and running (dev or production build)
- Browser with modern JavaScript support (Chrome, Firefox, Safari, Edge)
- Touch-capable device for mobile testing (optional but recommended)
- Two provisional character images available at `src/assets/lapis-arm-1.png` and `src/assets/lapis-arm-2.png`
- Background image available at `src/assets/backgrounds/beach-scene.png`
- Text phrase configuration loaded from `src/data/phrases.json`

---

## Validation Scenario 1: Scene Displays After Countdown Completes

**Requirements Covered**: FR-001, SC-001

**Objective**: Verify pixel art scene appears immediately when countdown reaches zero

**Prerequisites**:
- Application running on localhost (dev mode): `npm run dev`
- Countdown screen is reachable and functional
- Scene assets are loaded

**Steps**:

1. Navigate to countdown screen
   ```
   Expected: Countdown timer is visible and counting down
   ```

2. Observe countdown as it approaches zero
   ```
   Expected: Timer shows single-digit seconds (9, 8, 7...)
   ```

3. Let countdown complete to zero
   ```
   Expected: Lapis scene appears immediately (perceived as instantaneous)
   Expected: No gap or loading delay between countdown and scene
   Expected: Scene appears within 100ms per SC-001
   ```

4. Observe character and background
   ```
   Expected: Lapis Lazuli character visible in center/focal position
   Expected: Beach or series-inspired background visible with blue tones
   Expected: Character is clearly visible and detailed
   ```

**Validation Result**:
- [ ] Pass - Scene appears within 100ms, assets loaded correctly
- [ ] Fail - Scene appears after delay or not at all → Check browser console for errors

**Browser DevTools Measurement**:
- Open DevTools → Performance tab
- Record 5s before and 5s after countdown completion
- Measure time from last "0" display to first `PixelArtScene` component render
- Document time in ms (target: <100ms)

---

## Validation Scenario 2: Character Animation Loops Smoothly

**Requirements Covered**: FR-004, FR-005, SC-002

**Objective**: Verify character animates by alternating between two frames with smooth 60fps playback

**Prerequisites**:
- Scenario 1 passed (scene is displaying)
- Character images (`lapis-arm-1.png`, `lapis-arm-2.png`) are loaded

**Steps**:

1. Observe Lapis character in scene
   ```
   Expected: Character is fully visible
   ```

2. Watch character animation for 5-10 seconds
   ```
   Expected: Character arms appear to move in continuous loop
   Expected: Animation is smooth (no stuttering, flickering, or frame drops)
   Expected: Background environment remains stable and unchanged
   Expected: Animation plays continuously without stopping
   ```

3. Count animation cycles
   ```
   Expected: Animation cycles at consistent rate (~1 cycle per 2 seconds if frameRate=1)
   Expected: No variations in timing or rhythm
   ```

4. Check for frame rate consistency
   ```
   Open DevTools → Performance tab
   Record 10s of scene animation
   Check frame rate graph: should show consistent 60fps
   Expected: No frame drops, no stutters, smooth line in performance graph
   ```

**Validation Result**:
- [ ] Pass - Animation smooth, consistent 60fps, no drops
- [ ] Fail - Animation stutters, drops frames, or stops → Check browser console for errors or missing images

---

## Validation Scenario 3: Text Phrases Display Progressively

**Requirements Covered**: FR-006, FR-007, FR-008, SC-003, SC-006

**Objective**: Verify text phrases appear one at a time with smooth transitions and correct ordering

**Prerequisites**:
- Scenario 1 passed (scene is displaying)
- Phrase configuration loaded with 3+ phrases (check `src/data/phrases.json`)

**Steps**:

1. Wait for first text phrase to appear
   ```
   Expected: First phrase text appears in readable position (e.g., bottom-center)
   Expected: Text is clearly visible against background
   Expected: Text is NOT embedded in image; appears as DOM element (can be selected, inspected)
   ```

2. Observe first phrase duration
   ```
   Expected: First phrase remains visible for configured duration (e.g., 2000ms)
   Expected: Timer appears consistent and predictable
   ```

3. Watch phrase transition to second
   ```
   Expected: First phrase transitions to second smoothly (fade or slide, no jarring jump)
   Expected: Transition completes within 100ms per SC-003
   Expected: Transition animation is visually natural (not jerky or stuttered)
   ```

4. Verify second phrase content
   ```
   Expected: Second phrase text is different from first
   Expected: Text appears in same position as first
   Expected: Text is legible and properly positioned
   ```

5. Repeat for remaining phrases
   ```
   Expected: Each phrase displays, remains for its duration, transitions smoothly
   Expected: Phrases appear in correct order per spec
   Expected: No phrases are skipped or reordered
   ```

6. Observe final phrase completion
   ```
   Expected: After final phrase duration expires, text disappears or stays on screen per config
   Expected: Scene does NOT navigate away automatically
   Expected: Scene remains visible indefinitely per FR-012
   ```

7. Verify text is modifiable
   ```
   Open DevTools → Elements tab
   Inspect text element
   Expected: Text is HTML element (not image), can see text content in DOM
   Expected: Can easily edit `phrases.json` and see new text on next scene load
   ```

**Timing Validation**:
- Use browser DevTools → Performance tab
- Record entire phrase sequence (e.g., 10s for 3 phrases)
- Measure time between phrase transitions
- Verify each transition < 100ms

**Validation Result**:
- [ ] Pass - All phrases displayed in order, smooth transitions, readable text
- [ ] Fail - Phrases out of order, jerky transitions, or illegible text → Check `phrases.json` configuration and CSS styling

---

## Validation Scenario 4: Double-Tap Navigation to Musical Buttons

**Requirements Covered**: FR-009, FR-010, FR-012, SC-004

**Objective**: Verify double pointer-down event transitions scene to Musical Buttons placeholder

**Prerequisites**:
- Scenario 1 passed (Lapis scene displaying)
- Musical Buttons placeholder component exists and is navigable to
- Double-tap gesture detection is implemented

**Steps**:

### Desktop Testing (Mouse):

1. Position mouse on scene content
   ```
   Expected: Mouse cursor visible over scene
   ```

2. Perform single click (pointer-down + pointer-up)
   ```
   Action: Single click anywhere on scene
   Expected: No navigation occurs
   Expected: Scene remains on Lapis scene
   Expected: No visual feedback or state change
   ```

3. Perform double-click (two quick pointer-down events)
   ```
   Action: Double-click on scene area
   Timing: Taps within 300ms of each other
   Expected: Navigation occurs within 300ms per SC-004
   Expected: Scene transitions to Musical Buttons placeholder
   Expected: Musical Buttons screen becomes visible
   Expected: Smooth transition with no jarring visual jump
   ```

4. Verify Musical Buttons placeholder content
   ```
   Expected: Placeholder component displays (could be simple div with "Musical Buttons - Coming Soon")
   Expected: Component is interactive and ready for next input
   ```

### Mobile Testing (Touch):

1. Position finger on scene content
   ```
   Expected: Touch target is sufficient size for finger tap (minimum 44x44px per accessibility)
   ```

2. Perform single tap
   ```
   Action: Single finger tap on scene
   Expected: No navigation occurs
   Expected: Scene remains on Lapis scene
   Expected: No visual feedback or state change
   ```

3. Perform double-tap (two quick taps with finger)
   ```
   Action: Two rapid taps on scene area
   Timing: Taps within 300ms of each other
   Expected: Navigation occurs within 300ms per SC-004
   Expected: Scene transitions to Musical Buttons placeholder
   Expected: Smooth transition with no jank or delay
   ```

4. Verify tap debouncing (rapid taps don't multi-trigger)
   ```
   Action: Perform three rapid taps in quick succession
   Expected: Navigation occurs only once (double-tap detected once)
   Expected: No multiple navigations or ping-pong effect
   ```

**Browser DevTools Measurement**:
- Open DevTools → Performance tab
- Record from 1s before double-tap to 1s after
- Measure time from pointer-down event to Musical Buttons component render
- Document time in ms (target: <300ms per SC-004)

**Validation Result**:
- [ ] Pass - Double-tap navigates within 300ms, single tap doesn't navigate
- [ ] Fail - Navigation doesn't occur or takes too long → Check gesture detection implementation and event listeners

---

## Validation Scenario 5: Double-Tap Return to Lapis Scene

**Requirements Covered**: FR-011, FR-012, SC-004

**Objective**: Verify double-tap from Musical Buttons returns to Lapis scene with state preserved

**Prerequisites**:
- Scenario 4 passed (successfully navigated to Musical Buttons)
- Currently viewing Musical Buttons placeholder
- Lapis scene state should be preserved (text sequence, animation frame)

**Steps**:

1. Observe Musical Buttons placeholder
   ```
   Expected: Placeholder component visible
   ```

2. Perform double-tap on Musical Buttons screen
   ```
   Action: Double-click (desktop) or double-tap (mobile)
   Timing: Taps within 300ms of each other
   Expected: Navigation occurs within 300ms per SC-004
   Expected: Lapis scene becomes visible again
   Expected: Smooth transition back to Lapis
   ```

3. Verify Lapis scene state is preserved
   ```
   Expected: Character animation is still smooth and looping
   Expected: Text sequence continues from where it left off (NOT reset to first phrase)
   Expected: Scene background and character position unchanged
   Expected: No re-rendering or flashing
   ```

4. Track phrase progression
   ```
   Expected: If you left Lapis during phrase 2, you return and see phrase 2 or 3 continuing
   Expected: Text sequence timing resumed, not restarted
   Expected: No phrases skipped or replayed
   ```

**State Preservation Validation**:
- Before navigating away: Note which phrase is visible
- Navigate to Musical Buttons (double-tap)
- Wait 5 seconds in Musical Buttons
- Navigate back to Lapis (double-tap)
- Verify text sequence continued, not restarted

**Validation Result**:
- [ ] Pass - Navigation works both directions, state preserved
- [ ] Fail - State lost, animation restarted, or phrases replayed → Check state management and component lifecycle

---

## Validation Scenario 6: Scene Persists Until User Navigation

**Requirements Covered**: FR-012, SC-005

**Objective**: Verify scene remains visible indefinitely until user navigates away, with no performance degradation

**Prerequisites**:
- Scenario 1 passed (scene is displaying)
- Performance DevTools available

**Steps**:

1. Observe scene for extended duration
   ```
   Action: Leave scene active for 60+ seconds without interaction
   Expected: Scene remains visible throughout
   Expected: Character animation continues smoothly
   Expected: Text phrases continue cycling or remain on final phrase
   Expected: No automatic navigation or timeout
   ```

2. Monitor performance metrics
   ```
   DevTools → Performance tab
   Record entire 60s duration
   Observe:
   - Frame rate graph: Should remain at 60fps, no drops
   - Memory usage: Should remain stable, no memory leaks
   - CPU usage: Should remain consistent, not increase over time
   Expected: Performance metrics remain stable per SC-005
   ```

3. Attempt manual navigation after long display
   ```
   Action: Double-tap to navigate after 60+ seconds
   Expected: Navigation responds normally (within 300ms)
   Expected: No lag, stutter, or delayed response
   ```

**Memory Leak Detection**:
- DevTools → Memory tab
- Take heap snapshot at start
- Wait 30s with scene active
- Take another heap snapshot
- Compare memory usage
- Expected: Memory should remain stable or increase minimally

**Validation Result**:
- [ ] Pass - Scene persists 60s+, performance stable, no memory leaks
- [ ] Fail - Performance degrades, memory leaks detected, or automatic timeout occurs → Check for animation loops, memory leaks in event listeners

---

## Validation Scenario 7: Asset Error Handling

**Requirements Covered**: Edge case - missing or failed-to-load assets

**Objective**: Verify graceful handling when character images cannot load

**Prerequisites**:
- Scenario 1 framework ready
- Browser DevTools available

**Steps**:

### Test 1: Missing Character Image

1. Rename one character image file temporarily (e.g., `lapis-arm-1.png` → `lapis-arm-1.png.backup`)
   ```
   Expected: Scene still loads and renders
   ```

2. Observe scene appearance
   ```
   Expected: Scene displays with error placeholder or fallback image
   Expected: OR scene displays with visible error state (e.g., "Image not found" placeholder)
   Expected: No console errors crash the app
   Expected: Scene remains interactive despite missing image
   ```

3. Check browser console
   ```
   DevTools → Console
   Expected: Console shows warning or error message about missing image
   Expected: No uncaught exceptions
   ```

4. Restore image file
   ```
   Rename file back to `lapis-arm-1.png`
   Refresh page
   Expected: Scene loads correctly with both images
   ```

### Test 2: Missing Phrase Configuration

1. Check `src/data/phrases.json` exists and is valid JSON
   ```
   Expected: File exists and contains valid phrase array
   ```

2. If phrases.json has empty array, verify behavior
   ```
   Expected: Scene still renders (no crash)
   Expected: No text phrases displayed (expected behavior)
   Expected: Character animation still plays
   Expected: Background visible
   ```

**Validation Result**:
- [ ] Pass - Errors handled gracefully, no crashes, clear user feedback
- [ ] Fail - App crashes, console errors, or scene breaks → Improve error handling in components

---

## Validation Scenario 8: Responsive Design (Desktop vs Mobile)

**Requirements Covered**: Target Platform requirement - responsive design

**Objective**: Verify scene displays and functions correctly on different screen sizes and devices

**Prerequisites**:
- Application running
- DevTools available for device emulation

**Steps**:

### Desktop View:

1. Open application in full desktop browser
   ```
   Expected: Scene renders correctly at full viewport size
   Expected: Character is clearly visible and sized appropriately
   Expected: Text is readable at normal viewing distance
   Expected: All assets load correctly
   ```

2. Resize browser window (desktop)
   ```
   Action: Resize window to different widths (1920px, 1366px, 1024px, 768px)
   Expected: Scene layout adapts smoothly using responsive CSS
   Expected: Character and text remain visible and legible at all sizes
   Expected: No horizontal scrollbars or cut-off content
   ```

### Mobile Emulation:

1. Open DevTools → Device Emulation
   ```
   Set device: iPhone 14 (390x844) or similar
   ```

2. Verify scene on small screen
   ```
   Expected: Scene fills viewport appropriately
   Expected: Character visible and centered
   Expected: Text visible and readable (size appropriate for mobile)
   Expected: No need to scroll to see main content
   ```

3. Test gesture on emulated touch device
   ```
   Action: Emulate double-tap using DevTools
   Expected: Double-tap detection works on emulated touch
   Expected: Navigation occurs normally
   ```

4. Test on tablet emulation
   ```
   Set device: iPad (768x1024) or similar
   Expected: Scene scales appropriately for larger tablet screen
   Expected: Touch target for double-tap is sufficient (44x44px minimum)
   ```

**Validation Result**:
- [ ] Pass - Scene responsive across desktop, tablet, mobile
- [ ] Fail - Layout breaks, text illegible, or gestures unresponsive on mobile → Adjust CSS and touch target sizing

---

## Validation Scenario 9: Edge Cases Per Specification

**Requirements Covered**: Edge cases from spec

**Objective**: Verify handling of edge case scenarios

**Prerequisites**:
- Application configured and running

**Steps**:

### Edge Case 1: Empty Phrase Content

1. Verify `phrases.json` has phrase with empty content:
   ```json
   { "id": "empty-phrase", "content": "", "displayDuration": 1500 }
   ```

2. Run scene
   ```
   Expected: Empty phrase is skipped silently
   Expected: No error message displayed
   Expected: Text sequence continues to next non-empty phrase
   ```

### Edge Case 2: Zero or Negative Phrase Duration

1. Add phrase to config:
   ```json
   { "id": "invalid-duration", "content": "Text", "displayDuration": 0 }
   ```

2. Run scene
   ```
   Expected: Phrase displays for default 2000ms (not instantaneous)
   Expected: No error or crash
   ```

3. Try negative duration:
   ```json
   { "id": "negative-duration", "content": "Text", "displayDuration": -500 }
   ```

4. Run scene
   ```
   Expected: Phrase displays for default 2000ms
   Expected: Handled gracefully
   ```

### Edge Case 3: Rapid Successive Taps

1. Attempt rapid triple-tap on scene
   ```
   Action: Tap scene three times very quickly (all within 300ms)
   Expected: Only one double-tap detected and processed
   Expected: No multiple navigations or undefined state
   Expected: Debouncing prevents false triggers
   ```

**Validation Result**:
- [ ] Pass - All edge cases handled per spec
- [ ] Fail - Errors or unexpected behavior → Adjust configuration validation and error handling

---

## Performance Acceptance Criteria

| Metric | Target | Acceptable Range | Measurement Method |
|--------|--------|------------------|-------------------|
| Scene transition time | <100ms | 50-100ms | DevTools Performance tab, time from countdown=0 to scene render |
| Animation frame rate | 60fps | 55-60fps | DevTools Performance panel, frame rate graph |
| Phrase transition time | <100ms | 50-100ms | DevTools Performance panel, measure DOM transition |
| Double-tap response | <300ms | 200-300ms | DevTools Performance panel, time from tap event to screen update |
| 60s stability | No degradation | Frame rate stays 55+ fps | DevTools Performance panel, 60s recording |

---

## Manual Testing Checklist

Use this checklist to confirm all validation scenarios are complete:

### Functional Requirements
- [ ] Scene displays after countdown completion (Scenario 1)
- [ ] Character animation is smooth at 60fps (Scenario 2)
- [ ] Text phrases display progressively (Scenario 3)
- [ ] Double-tap navigates to Musical Buttons (Scenario 4)
- [ ] Double-tap returns to Lapis scene (Scenario 5)
- [ ] Scene persists indefinitely (Scenario 6)
- [ ] Asset errors handled gracefully (Scenario 7)
- [ ] Responsive design works on all screen sizes (Scenario 8)
- [ ] Edge cases handled correctly (Scenario 9)

### Performance Metrics
- [ ] Scene transition: <100ms (measured in DevTools)
- [ ] Animation: consistent 60fps (DevTools Performance tab)
- [ ] Phrase transitions: <100ms (DevTools Performance tab)
- [ ] Double-tap response: <300ms (DevTools Performance tab)
- [ ] 60s stability: no degradation (DevTools memory/frame rate stable)

### Cross-Browser Testing
- [ ] Chrome/Chromium (desktop + mobile)
- [ ] Firefox (desktop)
- [ ] Safari (desktop + iOS if available)
- [ ] Edge (desktop)

### Responsive Design
- [ ] 1920x1080 (desktop)
- [ ] 1366x768 (laptop)
- [ ] 768x1024 (tablet)
- [ ] 390x844 (mobile - iPhone)

### Gesture Testing
- [ ] Single click/tap doesn't trigger navigation (all platforms)
- [ ] Double-click/tap on desktop triggers navigation
- [ ] Double-tap on mobile triggers navigation
- [ ] Rapid taps don't cause multiple navigations

### Error Scenarios
- [ ] Missing character image handled gracefully
- [ ] Invalid phrase durations default correctly
- [ ] Empty phrases skipped silently
- [ ] Scene remains stable if navigation fails

---

## Validation Report Template

Use this template to document test results:

```markdown
## Validation Report: Lapis Pixel Art Ending Scene
**Date**: [TEST_DATE]
**Tester**: [NAME]
**Browser**: [BROWSER_NAME_VERSION]
**Device**: [DESKTOP/MOBILE/TABLET]
**OS**: [OPERATING_SYSTEM]

### Results Summary
- [x] All scenarios passed
- [ ] Some scenarios failed (see details below)
- [ ] Critical issues found (see blockers)

### Scenario Results
| Scenario | Result | Notes |
|----------|--------|-------|
| 1. Scene displays after countdown | PASS | <100ms transition |
| 2. Character animation smooth | PASS | Consistent 60fps |
| 3. Text phrases progressive | PASS | 3/3 phrases displayed |
| 4. Double-tap to Musical Buttons | PASS | 280ms response |
| 5. Double-tap return to Lapis | PASS | State preserved |
| 6. Scene persists 60s+ | PASS | No memory leaks |
| 7. Asset error handling | PASS | Graceful fallback |
| 8. Responsive design | PASS | All breakpoints ok |
| 9. Edge cases | PASS | All handled correctly |

### Performance Metrics
- Scene transition: 87ms ✓ (<100ms)
- Animation FPS: 59.8 ✓ (60fps target)
- Phrase transitions: 92ms ✓ (<100ms)
- Double-tap response: 295ms ✓ (<300ms)
- 60s stability: 59.2 fps ✓ (no degradation)

### Issues Found
None

### Sign-off
- [x] Ready for deployment
- [ ] Requires fixes (see issues above)
```

---

## Quickstart Complete

This validation guide provides comprehensive end-to-end testing for the Lapis Pixel Art Ending Scene feature. All scenarios can be executed manually by a user or QA team without automated test infrastructure.

**Next Step**: If all scenarios pass, feature is ready for deployment. If issues found, document them and return to implementation phase for fixes.
