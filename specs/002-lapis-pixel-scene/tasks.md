# Tasks: Lapis Pixel Art Ending Scene

**Input**: Design documents from `/specs/002-lapis-pixel-scene/`

**Prerequisites**: plan.md (tech stack: React 18.3.1, Vite 6.0.7, Tailwind CSS), spec.md (3 user stories: P1, P1, P2)

**Testing**: Manual validation only per spec - no automated tests required. Validation via quickstart.md scenarios.

**Organization**: Tasks grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **React SPA Structure**: `src/components/`, `src/hooks/`, `src/assets/`, `src/data/`
- All component files: JSX in `src/components/`
- Custom hooks: `src/hooks/`
- Configuration: `src/data/`
- Assets: `src/assets/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for Lapis scene feature

- [x] T001 Create directory structure: `src/components/`, `src/hooks/`, `src/assets/backgrounds/`, `src/data/`
- [x] T002 Create phrases configuration file at `src/data/phrases.json` with initial text phrases
- [x] T003 [P] Prepare character animation images: verify `src/assets/lapis-arm-1.png` and `src/assets/lapis-arm-2.png` exist or add placeholder images
- [x] T004 [P] Create background image at `src/assets/backgrounds/beach-scene.png` (or add placeholder)
- [x] T005 [P] Create base CSS for scene styling in `src/components/PixelArtScene.css` (Tailwind + custom styles)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create custom hook `useDoublePointerDown` in `src/hooks/useDoublePointerDown.js` for gesture detection (supports mouse + touch, debouncing logic, returns ref + callbacks)
- [x] T007 Setup React Router integration: Verify routing infrastructure exists for scene navigation (add routes for `/lapis-scene` and `/musical-buttons-placeholder` if needed)
- [x] T008 Create configuration loading utility in `src/data/sceneConfig.js` to load phrases.json and animation settings
- [x] T009 Create error boundary component at `src/components/ErrorBoundary.jsx` for scene error handling and fallback UI

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Pixel Art Ending Scene After Countdown (Priority: P1) 🎯 MVP

**Goal**: Display animated pixel art scene with Lapis Lazuli character when countdown reaches zero, with smooth 60fps animation and stable background

**Independent Test**: Run countdown to completion and verify pixel art scene displays with Lapis character animating continuously at 60fps with stable blue-toned beach background

### Implementation for User Story 1

- [x] T010 [P] [US1] Create CharacterAnimation component at `src/components/CharacterAnimation.jsx` with props (config, isPlaying, onFrameChange) that:
  - Loads two frame images from config paths
  - Alternates between frames based on frameRate setting
  - Renders at 60fps using requestAnimationFrame
  - Handles image load errors gracefully with fallback placeholder
  - Returns current frame index via callback

- [x] T011 [P] [US1] Create PixelArtScene container component at `src/components/PixelArtScene.jsx` that:
  - Accepts sceneConfig prop with background path and animation/text config
  - Renders background image with stable positioning (no animation)
  - Mounts CharacterAnimation component with correct props
  - Initializes scene state and starts animation on component mount
  - Completes initialization within 100ms per SC-001

- [x] T012 [US1] Integrate scene into app routing: Update main App.jsx (or routing file) to:
  - Add route handler for `/lapis-scene` 
  - Trigger scene display when countdown reaches zero (integrate with existing countdown logic)
  - Pass correct sceneConfig to PixelArtScene component
  - Ensure scene appears within 100ms of countdown completion

- [x] T013 [P] [US1] Create Tailwind CSS styling in `src/components/PixelArtScene.css` for:
  - Scene container (full viewport, responsive sizing)
  - Character positioning (centered, responsive scaling)
  - Background image (fill, stable, no animation)
  - Mobile-responsive breakpoints (mobile: 390px, tablet: 768px, desktop: 1920px)

- [ ] T014 [US1] Manual validation of User Story 1: Run application, trigger countdown, verify:
  - Scene displays within 100ms (use DevTools Performance tab)
  - Character animation smooth at 60fps (check Performance graph)
  - Background stable with blue beach aesthetic
  - No frame drops or stuttering over 30s continuous display

**Checkpoint**: At this point, User Story 1 (pixel art scene with animation) should be fully functional and independently testable

---

## Phase 4: User Story 2 - Read Progressive Text Subtitles (Priority: P1)

**Goal**: Display text phrases one at a time with smooth transitions, configurable duration per phrase, all phrases in correct order

**Independent Test**: Verify each phrase appears at bottom of screen, remains for its duration, transitions smoothly to next phrase without jarring visual jumps

### Implementation for User Story 2

- [x] T015 [P] [US2] Create TextPhrase data model utility in `src/components/TextSequence.jsx` module to:
  - Define TextPhrase interface/shape (id, content, displayDuration, positionClass, transitionStyle)
  - Implement phrase validation (empty phrases skipped, duration defaults to 2000ms if <= 0)
  - Track phrase display state (currentIndex, isComplete, visiblePhrase)

- [x] T016 [P] [US2] Create TextSequence component at `src/components/TextSequence.jsx` that:
  - Accepts config prop with phrases array and default transition style
  - Displays one phrase at a time in DOM (not image-embedded per FR-008)
  - Progresses to next phrase after displayDuration expires
  - Applies smooth fade or slide transition (< 100ms per SC-003)
  - Skips empty phrases silently without errors
  - Emits onPhraseChange and onSequenceComplete callbacks
  - Preserves sequence state (currentPhraseIndex) when component unmounts/remounts

- [x] T017 [US2] Integrate TextSequence into PixelArtScene component:
  - Mount TextSequence component in PixelArtScene.jsx alongside CharacterAnimation
  - Pass textSequenceConfig from sceneConfig
  - Ensure text phrases start displaying when scene initializes
  - Handle phrase progression callbacks from TextSequence

- [x] T018 [P] [US2] Create Tailwind CSS for text phrase display in `src/components/TextSequence.css`:
  - Phrase container positioning (bottom-center, responsive font sizes)
  - Text styling (readable contrast against blue background, white or light text)
  - Transition effects (fade: opacity, slide: transform)
  - Responsive sizing (mobile: 14px, tablet: 16px, desktop: 18px font)

- [x] T019 [P] [US2] Verify and update `src/data/phrases.json` with 3+ actual text phrases:
  - Each phrase: id, content, displayDuration (2000-3000ms)
  - At least one empty phrase to test skip behavior
  - Include edge case: phrase with duration <= 0 to test default behavior
  - Format matches TextPhrase interface exactly

- [ ] T020 [US2] Manual validation of User Story 2: Run application after countdown, verify:
  - First phrase appears at bottom-center within scene
  - Text is readable and not image-embedded (selectable in DevTools)
  - Phrase remains visible for its configured duration (≈2000ms typical)
  - Transition to next phrase smooth (< 100ms, no jarring visual jump)
  - All phrases display in correct order per SC-006
  - Empty phrases skipped silently
  - Final phrase persists (scene doesn't auto-navigate) per FR-012
  - Text positioning and sizing responsive across desktop/mobile/tablet

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently (scene with animation + progressive text)

---

## Phase 5: User Story 3 - Navigate to Musical Buttons Experience (Priority: P2)

**Goal**: Enable double-tap navigation from Lapis scene to Musical Buttons placeholder, and return navigation with state preservation

**Independent Test**: Double-tap scene to navigate to Musical Buttons, double-tap to return, verify scene state preserved (text sequence resumes, animation continues)

### Implementation for User Story 3

- [x] T021 [P] [US3] Create NavigationHandler component at `src/components/NavigationHandler.jsx` that:
  - Wraps PixelArtScene content
  - Uses useDoublePointerDown hook for gesture detection
  - Passes ref to scroll container/scene div
  - Emits onDoubleTap callback when double-tap detected
  - Single taps do NOT trigger callback (only double-taps)
  - Debounces rapid taps per spec edge case (prevent multiple navigations)

- [x] T022 [P] [US3] Create MusicalButtonsPlaceholder component at `src/components/MusicalButtonsPlaceholder.jsx` as stub that:
  - Displays placeholder content ("Musical Buttons - Coming Soon" or similar)
  - Uses same useDoublePointerDown hook for gesture detection
  - Passes callback to navigate back to Lapis scene
  - Supports double-tap return navigation

- [x] T023 [US3] Update PixelArtScene component to:
  - Wrap content in NavigationHandler with onDoubleTap callback
  - Pause CharacterAnimation during transition to Musical Buttons
  - Preserve TextSequence.currentPhraseIndex in state during navigation away
  - Resume animation from paused frame when returning per FR-012

- [x] T024 [US3] Update routing to handle navigation flow:
  - Setup route handler for `/musical-buttons-placeholder`
  - Add navigation callback from PixelArtScene to `/musical-buttons-placeholder`
  - Add navigation callback from MusicalButtonsPlaceholder back to `/lapis-scene`
  - Preserve scene state via React Router state or Context API when navigating

- [ ] T025 [P] [US3] Create Tailwind CSS for navigation UI in `src/components/NavigationHandler.css`:
  - Touch-target sizing (minimum 44x44px per accessibility for mobile)
  - Visual feedback for double-tap detection (optional: subtle highlight on tap)
  - Ensure scene remains clickable/tappable across full viewport

- [ ] T026 [US3] Manual validation of User Story 3: Run application, verify:
  - Single tap on scene does NOT navigate (scene remains visible)
  - Double-tap on scene transitions to Musical Buttons within 300ms per SC-004
  - Musical Buttons placeholder displays correctly
  - Double-tap on Musical Buttons returns to Lapis scene within 300ms
  - Character animation resumes from paused state (no restart)
  - Text sequence continues from same phrase index (no reset to first phrase)
  - Rapid triple-taps don't cause multiple navigations (debounce working)
  - Navigation works on desktop (double-click) and mobile (double-tap)
  - Navigation responsive on tablet (large touch targets)

**Checkpoint**: All user stories (1, 2, 3) should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple user stories, final validation, and edge case handling

- [ ] T027 [P] Edge case handling: Update CharacterAnimation to handle missing/failed image loads:
  - Display fallback placeholder if image fails to load
  - Log console warning (no error crash)
  - Scene remains interactive despite missing images

- [ ] T028 [P] Edge case handling: Verify TextSequence handles all edge cases:
  - Empty phrase content ("") skipped silently
  - displayDuration <= 0 defaults to 2000ms
  - Very rapid phrase transitions (duration < 100ms) handled gracefully

- [ ] T029 [P] Edge case handling: Verify gesture detection debouncing:
  - Manual test: rapid triple-taps only produce one navigation
  - Test on multiple devices/browsers (Chrome, Firefox, Safari)

- [ ] T030 Performance monitoring: Run extended scene display test:
  - Keep scene active for 60+ seconds
  - Monitor DevTools Performance: frame rate should stay at 55-60fps
  - Monitor DevTools Memory: no memory leaks, stable allocation over time
  - Verify SC-005 (no degradation after 60s)

- [ ] T031 Responsive design validation across all breakpoints:
  - Desktop (1920x1080): Scene, text, character all proportional and readable
  - Laptop (1366x768): Scene scales appropriately
  - Tablet (768x1024): Touch target sizing adequate (44x44px minimum)
  - Mobile (390x844): Full-screen scene, readable text, responsive character sizing

- [ ] T032 Browser compatibility testing:
  - Chrome/Chromium (desktop + mobile emulation)
  - Firefox (desktop)
  - Safari (desktop, iOS if available)
  - Edge (desktop)
  - Verify: All features work, no console errors, gesture detection works

- [ ] T033 Complete manual validation checklist from `quickstart.md`:
  - Run all 9 validation scenarios (Scenarios 1-9 in quickstart.md)
  - Document results in validation report template
  - Verify all performance metrics met (timing, frame rate, stability)
  - Verify all cross-browser and responsive design scenarios pass

- [ ] T034 Documentation and code cleanup:
  - Add inline comments to complex logic (gesture debouncing, frame timing)
  - Update README or docs/ with feature description if applicable
  - Verify component JSDoc comments explain props and behavior
  - Clean up temporary console.log statements

- [ ] T035 Final verification before deployment:
  - Run full manual test flow: Countdown → Lapis scene → Text progression → Double-tap to Musical Buttons → Return
  - Verify all three user stories work together (no conflicts)
  - Check that existing countdown screen still works unchanged (FR-015)
  - Confirm feature ready for production

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (US1 + US2 simultaneously, then US3)
  - Or sequentially in priority order (US1 → US2 → US3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Pixel Art Scene)**: Can start after Foundational (Phase 2)
  - No dependencies on other stories - implements scene + animation independently
  - Independent test: Run countdown, scene appears with smooth animation

- **User Story 2 (P1 - Progressive Text)**: Can start after Foundational (Phase 2)
  - No dependencies on US1, but should be combined with it for complete feature
  - Can be implemented in parallel with US1 (different components, same container)
  - Independent test: Text phrases display, progress, transition smoothly

- **User Story 3 (P2 - Navigation)**: Can start after Foundational (Phase 2)
  - Should integrate with US1 + US2 completed, but can be implemented in parallel
  - Adds navigation between scenes without changing US1/US2 core behavior
  - Independent test: Double-tap navigation works, state preserved on return

### Within Each User Story

- Components before integration tasks
- CharacterAnimation component (T010) can start before PixelArtScene container (T011)
- TextSequence component (T016) can start before TextPhrase utilities (T015)
- CSS styling can start in parallel with component logic
- Integration happens after components are complete
- Manual validation last within each story

### Parallel Opportunities

**Phase 1 Setup**:
- T003, T004, T005 can run in parallel (different assets/files)

**Phase 2 Foundational**:
- T006 and T007 can run in parallel (different files)

**Phase 3 User Story 1**:
- T010 (CharacterAnimation) and T013 (CSS) can run in parallel
- T010 completes first, then T011 (PixelArtScene) depends on it
- T012, T014 can run after T011

**Phase 4 User Story 2**:
- T015 (TextPhrase model) and T018 (CSS) can run in parallel with T019 (config file)
- T016 (TextSequence component) depends on T015
- T017 (integration), T020 (validation) come after component complete

**Phase 5 User Story 3**:
- T021 (NavigationHandler) and T025 (CSS) can run in parallel
- T022 (MusicalButtonsPlaceholder) can run in parallel with T021
- T023, T024 (integration) depend on T021, T022 complete

**Phase 6 Polish**:
- T027, T028, T029 can run in parallel (different edge cases)
- T030, T031, T032 can run in parallel (different validation areas)

---

## Parallel Example: User Story 1

```bash
# Phase 3 User Story 1 - Can parallelize as shown:

# Start these in parallel:
Task T010: Create CharacterAnimation component
Task T013: Create Tailwind CSS for scene
# Both can run simultaneously (different files)

# After T010 completes:
Task T011: Create PixelArtScene container (depends on CharacterAnimation existing)

# After T011 completes:
Task T012: Integrate into routing
Task T014: Manual validation

# Result: US1 complete, independent test validates pixel art scene works
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Combined - Core Feature)

The MVP should deliver the complete scene experience without navigation:

1. Complete Phase 1: Setup (5 tasks)
2. Complete Phase 2: Foundational (4 tasks)
3. Complete Phase 3: User Story 1 (5 tasks) → Scene + Animation works
4. Complete Phase 4: User Story 2 (6 tasks) → Scene + Text Progression works
5. **STOP and VALIDATE**: 
   - Run countdown, scene appears with animation
   - Text phrases display progressively
   - All manual validation scenarios pass
6. Deploy/demo core feature (User Stories 1 & 2)

### Incremental Delivery

1. **Phase 1-2 + US1-2**: Core scene experience (MVP - Deploy/Demo)
2. **Add Phase 5 (US3)**: Navigation between scenes (Phase 2 increment - Deploy/Demo)
3. **Add Phase 6**: Polish, edge cases, full validation

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (9 tasks, 2-3 day effort)
2. Once Foundational complete:
   - Developer A: User Story 1 (5 tasks)
   - Developer B: User Story 2 (6 tasks) [can start in parallel with A]
   - Developer C: User Story 3 (6 tasks) [can start after US1/US2, or in parallel]
3. Tasks marked [P] within each story can run in parallel by same developer or separate team members
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files or no cross-dependencies
- [Story] label (US1, US2, US3) maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Manual validation after each user story phase
- Use quickstart.md scenarios for validation
- Commit after each phase or logical task group
- Stop at any checkpoint to validate story independently
- No automated tests required per spec (manual validation only)
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Performance metrics should be validated using browser DevTools (Performance, Memory tabs)

---

## Task Summary

**Total Tasks**: 35

**By Phase**:
- Phase 1 (Setup): 5 tasks
- Phase 2 (Foundational): 4 tasks
- Phase 3 (US1): 5 tasks
- Phase 4 (US2): 6 tasks
- Phase 5 (US3): 6 tasks
- Phase 6 (Polish): 9 tasks

**By User Story**:
- User Story 1 (Pixel Art Scene): 5 tasks
- User Story 2 (Progressive Text): 6 tasks
- User Story 3 (Navigation): 6 tasks
- Cross-cutting/Polish: 9 tasks
- Setup/Foundational: 9 tasks

**MVP Scope** (minimum for viable feature):
- Phases 1-2: Setup + Foundational (9 tasks)
- Phases 3-4: User Stories 1 & 2 (11 tasks)
- **Total MVP: 20 tasks** → Delivers scene with animation + text progression

**Full Scope** (all requirements):
- All phases including US3 (Navigation): 35 tasks

**Parallel Opportunities Identified**: 15 tasks marked [P] can run in parallel with task dependencies satisfied

---

## Implementation Ready

✅ All tasks follow strict checklist format (checkbox, ID, labels, file paths)
✅ Tasks organized by user story for independent implementation and testing
✅ Each user story has clear independent test criteria
✅ Parallel execution opportunities identified throughout
✅ MVP scope clearly defined (US1 + US2)
✅ Full scope includes all requirements (US1 + US2 + US3)
✅ File paths specified for all implementation tasks
✅ All format validation complete - ready to execute
