
# djay Pro MIDI Mapping Reference Guide

---

## 📚 Table of Contents

1. [djay Pro Functions Reference](#djay-pro-functions-reference)
   - [Turntable Control Functions](#turntable-control-functions)
   - [Cue & Loop Functions](#cue--loop-functions)
   - [Scratching & Jog Functions](#scratching--jog-functions)
   - [Effects Functions](#effects-functions)
   - [Mixer Functions](#mixer-functions)
   - [Library Functions](#library-functions)
   - [Beatgrid & Analysis Functions](#beatgrid--analysis-functions)
   - [Application Functions](#application-functions)
   - [Sampler Functions](#sampler-functions)
   - [Queue Management Functions](#queue-management-functions)
   - [Video & Visual Functions](#video--visual-functions)
   - [Streaming & Cloud Functions](#streaming--cloud-functions)
2. [MIDI Message Types & Control Types](#midi-message-types--control-types)
3. [Output Commands & LED Feedback](#output-commands--led-feedback)
4. [MIDI Mapping File Format](#midi-mapping-file-format)
5. [Technical Specifications](#technical-specifications)
6. [Examples & Best Practices](#examples--best-practices)

---

## djay Pro Functions Reference

> **Note:** In the `Key Path` column, `{N}` represents the deck number and should be replaced with `1`, `2`, `3`, or `4` (e.g., `turntable1.playPause`).

### Turntable Control Functions

#### Playback Control

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Play/Pause | `turntable{N}.playPause` | Toggle playback on deck N | ✅ |
| Speed Control | `turntable{N}.speed` | Adjust playback speed (absolute) | ❌ |
| Speed Plus | `turntable{N}.speedPlus` | Increase speed momentarily | ❌ |
| Speed Minus | `turntable{N}.speedMinus` | Decrease speed momentarily | ❌ |
| Speed Relative | `turntable{N}.speedRelative` | Relative speed adjustment | ❌ |
| Reset Speed | `turntable{N}.resetSpeed` | Reset to normal speed | ❌ |
| Reverse | `turntable{N}.reverse` | Per-deck reverse playback toggle | ✅ |
| Seek Forward | `turntable{N}.seekForward` | Seek forward in the track | ❌ |
| Seek Backward | `turntable{N}.seekBackward` | Seek backward in the track | ❌ |
| Load Next Track | `turntable{N}.loadNextTrack` | Load the next track from the current playlist | ❌ |
| Load Previous Track | `turntable{N}.loadPreviousTrack` | Load the previous track from the current playlist | ❌ |
| Backspin | `turntable{N}.backspin` | Triggers a backspin effect | ✅ |
| Brake Effect | `turntable{N}.brakeTransitionEffect` | Triggers a brake/vinyl stop effect | ✅ |


#### Pitch Control

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Pitch | `turntable{N}.pitch` | Pitch fader control | ❌ |
| Pitch Bend Plus | `turntable{N}.pitchBendPlus` | Temporary pitch increase (button) | ❌ |
| Pitch Bend Minus | `turntable{N}.pitchBendMinus` | Temporary pitch decrease (button) | ❌ |
| Pitch Bend Move | `turntable{N}.pitchBendMove` | Continuous pitch bend (rotary/jog) | ❌ |
| Reset Pitch | `turntable{N}.resetPitch` | Reset pitch to zero | ❌ |
| Pitch On/Off | `turntable{N}.pitchOnOff` | Enable/disable pitch fader | ✅ |

#### Sync & BPM

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| BPM Sync | `turntable{N}.bpmSync` | Sync to master tempo | ✅ |
| Sync Master | `turntable{N}.turntableIsSyncMaster` | Set as sync master | ✅ |
| Toggle Quantize | `turntable{N}.toggleQuantize` | Enable/disable quantization | ✅ |
| Down Beat | `turntable{N}.downBeat` | Mark down beat | ❌ |
| BPM Restore | `turntable{N}.bpmAndDownBeatRestoreAnalyzed` | Restore analyzed BPM | ❌ |

#### Audio Processing

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Gain | `turntable{N}.gain` | Track gain control | ❌ |
| Reset Gain | `turntable{N}.resetGain` | Reset gain to default | ❌ |
| High EQ | `turntable{N}.highEQ` | High frequency EQ | ❌ |
| Mid EQ | `turntable{N}.midEQ` | Mid frequency EQ | ❌ |
| Low EQ | `turntable{N}.lowEQ` | Low frequency EQ | ❌ |
| Filter | `turntable{N}.filter` | Low/high pass filter | ❌ |
| Reset Filter | `turntable{N}.resetFilter` | Reset filter to center | ❌ |
| Key Lock | `turntable{N}.key` | Key lock on/off | ✅ |

### Cue & Loop Functions

#### Cue Points

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Cue 1 | `turntable{N}.cuePositionOrJumpConsideringPlayState1` | Set/jump to cue point 1 | ✅ |
| Cue 2 | `turntable{N}.cueOrJumpIfAlreadySet2` | Set/jump to cue point 2 | ✅ |
| Cue 3 | `turntable{N}.cueOrJumpIfAlreadySet3` | Set/jump to cue point 3 | ✅ |
| Cue End | `turntable{N}.cueOrJumpIfAlreadySetEnd` | Set/jump to end cue | ✅ |
| Clear Cue 1 | `turntable{N}.clearCuePoint1` | Clear cue point 1 | ❌ |
| Clear Cue 2 | `turntable{N}.clearCuePoint2` | Clear cue point 2 | ❌ |
| Clear Cue 3 | `turntable{N}.clearCuePoint3` | Clear cue point 3 | ❌ |
| Clear End Point | `turntable{N}.clearEndPoint` | Clear end point | ❌ |
| Clear Start Point | `turntable{N}.clearStartPoint` | Clear start point | ❌ |
| Reset Cue Points | `turntable{N}.resetCuePoints` | Clear all cue points | ❌ |
| Go to Zero | `turntable{N}.gotoZero` | Jump to track beginning | ❌ |

#### Loop Control

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Loop In | `turntable{N}.loopIn` | Set loop in point | ✅ |
| Loop Out | `turntable{N}.loopOut` | Set loop out point | ✅ |
| Loop Out and Reloop | `turntable{N}.loopOutAndReloopOrUnloop`| Context-aware: Sets loop out, or reactivates/deactivates existing loop | ✅ |
| Loop Active | `turntable{N}.loopingActive` | Toggle loop on/off | ✅ |
| Auto Loop On/Off | `turntable{N}.autoLoopOnOff` | Toggle auto loop | ✅ |
| Auto Loop Duration | `turntable{N}.autoLoopDurationRotary` | Adjust loop length (rotary) | ❌ |
| Auto Loop Halve | `turntable{N}.autoLoopDurationHalf`| Halve current auto loop length (button) | ✅ |
| Auto Loop Double | `turntable{N}.autoLoopDurationDouble` | Double current auto loop length (button) | ✅ |

#### Fixed Loop Intervals

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| 1/32 Beat Loop | `turntable{N}.autoLoop025BeatInterval` | 1/32 beat auto loop | ✅ |
| 1/16 Beat Loop | `turntable{N}.autoLoop05BeatInterval` | 1/16 beat auto loop | ✅ |
| 1/8 Beat Loop | `turntable{N}.autoLoop1BeatInterval` | 1/8 beat auto loop | ✅ |
| 1/4 Beat Loop | `turntable{N}.autoLoop2BeatInterval` | 1/4 beat auto loop | ✅ |
| 1 Beat Loop | `turntable{N}.autoLoop4BeatInterval` | 1 beat auto loop | ✅ |
| 2 Beat Loop | `turntable{N}.autoLoop8BeatInterval` | 2 beat auto loop | ✅ |
| 4 Beat Loop | `turntable{N}.autoLoop16BeatInterval` | 4 beat auto loop | ✅ |
| 8 Beat Loop | `turntable{N}.autoLoop32BeatInterval` | 8 beat auto loop | ✅ |

#### Bounce Loop Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Bounce 1/64 | `turntable{N}.bounceLoop00625BeatInterval` | 1/64 beat bounce loop | ✅ |
| Bounce 1/32 | `turntable{N}.bounceLoop0125BeatInterval` | 1/32 beat bounce loop | ✅ |
| Bounce 1/16 | `turntable{N}.bounceLoop025BeatInterval` | 1/16 beat bounce loop | ✅ |
| Bounce 1/8 | `turntable{N}.bounceLoop05BeatInterval` | 1/8 beat bounce loop | ✅ |
| Bounce 1/4 | `turntable{N}.bounceLoop1BeatInterval` | 1/4 beat bounce loop | ✅ |
| Bounce 1/2 | `turntable{N}.bounceLoop2BeatInterval` | 1/2 beat bounce loop | ✅ |

### Scratching & Jog Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Scratching Mode | `turntable{N}.scratchingMode` | Enable scratch mode | ✅ |
| Scratching Move | `turntable{N}.scratchingMove` | Scratch wheel input | ❌ |
| Jog Seek Move | `turntable{N}.jogSeekMove` | Jog wheel movement | ❌ |
| Jog Seek Mode | `turntable{N}.jogSeekModeToggle` | Toggle jog mode | ✅ |
| Scrubbing | `turntable{N}.scrubbing` | High-speed track search | ❌ |
| Deck Slip Toggle | `turntable{N}.deckSlipToggle` | Enable slip mode | ✅ |
| Skip Rotary | `turntable{N}.skipRotary` | Track skip control | ❌ |

### Effects Functions

#### Effect Control

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| FX Active | `turntable{N}.fxActive` | Master FX on/off | ✅ |
| FX 1 Enabled | `turntable{N}.fx1Enabled` | Effect slot 1 on/off | ✅ |
| FX 2 Enabled | `turntable{N}.fx2Enabled` | Effect slot 2 on/off | ✅ |
| FX 3 Enabled | `turntable{N}.fx3Enabled` | Effect slot 3 on/off | ✅ |
| FX 1 Select Next | `turntable{N}.fx1SelectNext` | Cycle to next effect in slot 1 | ❌ |
| FX 2 Select Next | `turntable{N}.fx2SelectNext` | Cycle to next effect in slot 2 | ❌ |
| FX 3 Select Next | `turntable{N}.fx3SelectNext` | Cycle to next effect in slot 3 | ❌ |

#### Effect Parameters

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| FX 1 Wet/Dry | `turntable{N}.fx1WetDryValue` | Effect 1 mix amount | ❌ |
| FX 2 Wet/Dry | `turntable{N}.fx2WetDryValue` | Effect 2 mix amount | ❌ |
| FX 3 Wet/Dry | `turntable{N}.fx3WetDryValue` | Effect 3 mix amount | ❌ |
| FX 1 Parameter | `turntable{N}.fx1ParameterValue` | Effect 1 parameter | ❌ |
| FX 2 Parameter | `turntable{N}.fx2ParameterValue` | Effect 2 parameter | ❌ |
| FX 3 Parameter | `turntable{N}.fx3ParameterValue` | Effect 3 parameter | ❌ |

#### Instant Effects

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Instant FX 1-3 | `turntable{N}.instantFx[1-3]` | Trigger instant effect 1, 2, or 3 | ✅ |

#### Bounce Effects

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Bounce Bit Crusher | `turntable{N}.fxBounceBitCrusher` | Bounce bit crusher | ✅ |
| Bounce Echo Censor | `turntable{N}.fxBounceEchoCensor` | Bounce echo censor | ✅ |
| Bounce Echo Extreme | `turntable{N}.fxBounceEchoExtreme` | Bounce echo extreme | ✅ |
| Bounce Low Pass Echo | `turntable{N}.fxBounceLowPassEcho` | Bounce low pass echo | ✅ |
| Bounce High Pass Echo| `turntable{N}.fxBounceHighPassEcho` | Bounce high pass echo | ✅ |
| Bounce Flanger | `turntable{N}.fxBounceFlanger` | Bounce flanger | ✅ |
| Bounce Low Pass | `turntable{N}.fxBounceLowPass` | Bounce low pass filter | ✅ |
| Bounce High Pass | `turntable{N}.fxBounceHighPass` | Bounce high pass filter | ✅ |

### Mixer Functions

#### Channel Volume & Monitoring

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Line Volume 1-4 | `mixer.lineVolume[1-4]` | Channel volume | ❌ |
| Crossfader | `mixer.crossfade` | Crossfader position | ❌ |
| Master Level | `mixer.masterLevel` | Master output level | ❌ |

#### Monitoring

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Monitor 1-4 | `mixer.monitorActive[1-4]` | Cue channel | ✅ |
| Monitor Mix | `mixer.monitorMix` | Cue/main mix balance | ❌ |
| Monitor Level | `mixer.monitorLevel` | Headphone volume level | ❌ |
| Monitor Mute | `mixer.monitorLevelMuteOnOff`| Mute/unmute headphone output | ✅ |

#### Special Mixer Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Jump to Cue | `mixer.jumpToCueConsideringPlayState1` | Jump to cue point | ❌ |
| Transition Left | `mixer.transitionLeft` | Trigger transition to left deck | ✅ |
| Transition Right | `mixer.transitionRight` | Trigger transition to right deck | ✅ |
| Transition Type: Standard | `mixer.transitionTypeStandard` | Set transition type to standard crossfade | ✅ |
| Transition Type: Brake | `mixer.transitionTypeBrake` | Set transition type to brake effect | ✅ |
| Transition Type: Echo | `mixer.transitionTypeEcho` | Set transition type to echo out | ✅ |

### Library Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Library Rotary | `musicLibrary.libraryRotary` | Browse library | ❌ |
| Load to Deck 1-4 | `musicLibrary.load[1-4]` | Load track to deck | ❌ |
| Load Selection | `musicLibrary.loadSelection` | Load selected track to active/next deck | ❌ |
| Toggle Source | `musicLibrary.toggleLibrarySource` | Switch library source (e.g., Local, Streaming) | ✅ |
| Focus Sources | `musicLibrary.focusSources` | Focus UI on source panel | ❌ |
| Focus Tracks | `musicLibrary.focusTracks` | Focus UI on track list panel | ❌ |
| Mark/Unmark Songs | `musicLibrary.markUnmarkSelectedSongs`| Prepare songs for a session/playlist | ❌ |
| Unmark Songs | `musicLibrary.unmarkSelectedSongs` | Clear all selections | ❌ |

> **Note on Library Key Paths:** Some mappings use `turntable{N}.libraryRotary`. While this path is valid, its behavior can be unexpected. The recommended path for global library browsing is `musicLibrary.libraryRotary`.

### Advanced Library Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Library Search | `musicLibrary.search` | Open search function | ❌ |
| Preview Track | `musicLibrary.previewTrack` | Preview selected track | ✅ |
| View Mode Toggle | `musicLibrary.toggleViewMode` | Switch list/grid view | ✅ |
| Sort Toggle | `musicLibrary.toggleSort` | Change sort order | ❌ |
| Playlist Up/Down | `musicLibrary.playlistUp` / `playlistDown` | Navigate up/down playlist | ❌ |
| Add/Remove from Queue | `musicLibrary.addToQueue` / `removeFromQueue`| Add/remove track from queue | ❌ |
| Toggle Favorites | `musicLibrary.toggleFavorite` | Mark as favorite | ✅ |
| Show History | `musicLibrary.showHistory` | View play history | ❌ |
| Auto-Mix Toggle | `musicLibrary.autoMixToggle` | Enable auto-mix mode | ✅ |
| Library Filter | `musicLibrary.filter` | Apply library filter | ❌ |
| Expand/Collapse Folder | `musicLibrary.expandFolder` / `collapseFolder` | Expand/collapse selected folder | ❌ |

### Queue Management Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Queue Next/Previous | `queue.next` / `queue.previous` | Move to next/previous track in queue | ❌ |
| Queue Clear | `queue.clear` | Clear entire queue | ❌ |
| Queue Shuffle/Repeat | `queue.shuffle` / `queue.repeat` | Toggle queue shuffle/repeat | ✅ |
| Queue Auto-Load | `queue.autoLoad` | Auto-load next track | ✅ |
| Queue Show/Hide | `queue.toggleVisible` | Show/hide queue panel | ✅ |
| Add to Top/Bottom | `queue.addToTop` / `addToBottom` | Add track to top/bottom of queue | ❌ |
| Remove Selected | `queue.removeSelected` | Remove selected queue item | ❌ |

### Video & Visual Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Video On/Off | `video.toggle` | Toggle video playback | ✅ |
| Video Full Screen | `video.fullScreen` | Video full screen mode | ✅ |
| Video Transition | `video.transition` | Video transition effect | ❌ |
| Video BPM Sync | `video.bpmSync` | Sync video to BPM | ✅ |
| Video Scratch | `video.scratch` | Enable video scratching | ✅ |
| Video Cue | `video.cue` | Video cue functionality | ❌ |
| Visualizer Toggle | `video.visualizerToggle` | Show/hide visualizer | ✅ |
| Visualizer Mode | `video.visualizerMode` | Change visualizer type | ❌ |

### Beatgrid & Analysis Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Down Beat | `turntable{N}.downBeat` | Mark down beat | ❌ |
| Beat Grid Edit | `turntable{N}.beatGridEdit` | Enter beat grid edit mode | ✅ |
| Beat Grid Lock | `turntable{N}.beatGridLock` | Lock beat grid | ✅ |
| Beat Grid Shift Left/Right | `turntable{N}.beatGridShiftLeft` / `beatGridShiftRight` | Shift grid | ❌ |
| Beat Grid Double/Halve | `turntable{N}.beatGridDouble` / `beatGridHalve` | Double/halve grid density | ❌ |
| Beat Grid Reset | `turntable{N}.beatGridReset` | Reset beat grid to analysis | ❌ |
| Manual BPM Tap | `turntable{N}.bpmTap` | Tap to set BPM | ❌ |
| Tempo Range Toggle | `turntable{N}.tempoRangeToggle` | Switch tempo range (±8%, ±16%, ±50%) | ✅ |
| Re-analyze Track | `turntable{N}.reAnalyzeTrack` | Re-run track analysis | ❌ |

### Application Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Modifier | `application.modifier` | Shift/modifier key | ✅ |
| Reverse | `application.reverse` | Global reverse (for all decks) | ❌ |
| Global Gain/Filter | `application.gain` / `filter` | Global gain/filter control | ❌ |
| Global Sync Master | `application.turntableIsSyncMaster` | Global sync master | ✅ |
| Toggle EQ Mode (Global) | `application.toggleUnmixerEQMode` | Switch EQ mode for all decks | ✅ |
| Toggle EQ Mode (Per Deck) | `turntable{N}.toggleUnmixerEQMode` | Switch EQ mode for a specific deck | ✅ |
| Automix | `application.automix` | Toggle automix mode on/off | ✅ |

### Advanced Application Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Record Toggle | `application.recordToggle` | Start/stop recording | ✅ |
| Broadcast Toggle | `application.broadcastToggle` | Start/stop broadcasting | ✅ |
| Video Toggle | `application.videoToggle` | Show/hide video | ✅ |
| Full Screen | `application.fullScreen` | Toggle full screen mode | ❌ |
| Preferences | `application.showPreferences` | Open preferences | ❌ |
| Show/Hide Library | `application.toggleLibrary` | Toggle library visibility | ✅ |
| Show/Hide Browser | `application.toggleBrowser` | Toggle browser panel | ✅ |
| Show/Hide Queue | `application.toggleQueue` | Toggle queue panel | ✅ |
| Show/Hide Sampler | `application.toggleSampler` | Toggle sampler panel | ✅ |
| Undo/Redo | `application.undo` / `application.redo` | Undo/redo last action | ❌ |

### Sampler & Unmixer Functions

| Function | Key Path | Description | LED Support |
|---|---|---|---|
| Toggle Sampler | `sampler.toggleSamplerShown` | Show/hide sampler | ✅ |
| Sampler Volume | `sampler.volume` | Sampler master volume | ❌ |
| Player [1-8] | `sampler.player[1-8].playingConsideringHoldSetting` | Trigger sampler pad | ✅ |
| Unmixer Track 1-3 Mute | `turntable{N}.unmixerThreeTrackChannel[1-3]Muted` | Mute track in unmix | ✅ |

---

## midi message types & control types

*This section remains largely the same as it is accurate and comprehensive. Please refer to the previous version.*

---

## output commands & led feedback

### How Output Works

djay Pro sends MIDI messages **back** to your controller to provide visual feedback. This is a two-way communication system:

1.  **Input**: Controller → djay Pro (your button presses, knob turns)
2.  **Output**: djay Pro → Controller (LED states, display updates)

### Understanding the `<output>` Dictionary

In the mapping file, LED output is configured within an `<output>` dictionary. The content of this dictionary determines the LED's behavior.

| Configuration Example | Description |
|---|---|
| `<key>output</key><dict><key>midiMinValue</key><real>0</real><key>midiMaxValue</key><real>127</real></dict>` | **Standard On/Off.** This is the most common setup. The LED is OFF at value 0 and fully ON at value 127. |
| `<key>output</key><dict><key>midiMinValue</key><real>50</real></dict>` | **Custom "On" Value.** The LED is OFF at value 0 and ON at the specified value (e.g., 50). This is useful for controllers with specific brightness levels. The `midiMaxValue` is not required. |
| `<key>output</key><dict/>` | **Default Behavior.** An empty dictionary tells djay Pro to use its own default, built-in LED feedback for the function defined in `keyPath`. Use this when you don't need custom LED values. |

### <!-- NEW --> Advanced Output: Decoupled Input & Output

For complex controllers (e.g., with dedicated VU meters), you can specify an output message that is completely different from the input message.

**This is achieved by defining a full MIDI message inside the `<output>` block.**

```xml
<!-- 
Input: A fader on CC #19, Channel 0.
Output: A Note On/Off message on Note #12, Channel 11.
This could be used to send volume level data to a separate LED strip on the controller.
-->
<dict>
    <key>keyPath</key>
    <string>mixer.lineVolume1</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>19</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>output</key>
    <dict>
        <key>midiChannel</key>
        <integer>11</integer>
        <key>midiData</key>
        <integer>12</integer>
        <key>midiMessageType</key>
        <integer>1</integer>
    </dict>
</dict>
```

This powerful feature allows for mappings that are not possible with a simple input/output link.

---

## midi mapping file format

*This section remains the same. The structure is well-defined.*

---

## technical specifications

*This section remains the same.*

---

## examples & best practices

### Implementing Shift/Modifier Layers

There are two primary ways to create "shift" layers for your controls.

#### Method 1: Using the `application.modifier` Key (Recommended)

This method uses djay Pro's built-in modifier system. It is clean and software-based.

```xml
<!-- 1. The SHIFT button itself -->
<dict>
    <key>buttonMode</key>
    <string>hold</string>
    <key>keyPath</key>
    <string>application.modifier</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>63</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>

<!-- 2. The shifted function (e.g., Delete Cue 1) -->
<dict>
    <key>keyPath</key>
    <string>turntable1.clearCuePoint1</string>
    <key>midiChannel</key>
    <integer>7</integer> <!-- Can be on any channel -->
    <key>midiData</key>
    <integer>0</integer> <!-- Same note as the primary Cue 1 button -->
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>modifier</key> <!-- This key tells djay to only listen when the modifier is active -->
    <true/>
</dict>
```

#### Method 2: Using Different MIDI Channels

This method relies on the controller's hardware to send controls on a different MIDI channel when its shift button is held.

```xml
<!-- 1. Primary function (Play/Pause on Channel 0) -->
<dict>
    <key>keyPath</key>
    <string>turntable1.playPause</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>10</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>

<!-- 2. Shifted function (Reset Speed on Channel 2) -->
<!-- Same physical button, but controller sends on channel 2 when shifted -->
<dict>
    <key>keyPath</key>
    <string>turntable1.resetSpeed</string>
    <key>midiChannel</key>
    <integer>2</integer> <!-- Shifted channel -->
    <key>midiData</key>
    <integer>10</integer> <!-- Same note number -->
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>
```

### Best Practices

#### General
- **Use Note On/Off for Buttons:** Always use `midiMessageType: 1` for buttons, pads, and switches. Avoid using `midiMessageType: 3` (CC) for buttons.
- **Use Pickup Mode for Faders:** Enable `<key>pickupMode</key><true/>` for all faders and knobs that control absolute values (volume, EQ, filter) to prevent sudden value jumps.
- **Test with Hardware:** Always test your mapping on the actual controller before finalizing.

#### Disabling a Control ("No-Op")
- To make a control do nothing, you can map it to a base-level, non-functional `keyPath`. This is useful for disabling a control in a shift layer.
```xml
<!-- This makes the button on Note 32 do nothing. -->
<dict>
    <key>keyPath</key>
    <string>turntable1</string> <!-- or "application" -->
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>32</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>
```