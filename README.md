# djay Pro MIDI Mapping Documentation

## Complete Reference Guide

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


### Turntable Control Functions

#### Playback Control

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Play/Pause | `turntable{N}.playPause` | Toggle playback on deck N | ✅ |
| Speed Control | `turntable{N}.speed` | Adjust playback speed | ❌ |
| Speed Plus | `turntable{N}.speedPlus` | Increase speed momentarily | ❌ |
| Speed Minus | `turntable{N}.speedMinus` | Decrease speed momentarily | ❌ |
| Speed Relative | `turntable{N}.speedRelative` | Relative speed adjustment | ❌ |
| Reset Speed | `turntable{N}.resetSpeed` | Reset to normal speed | ❌ |

#### Pitch Control

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Pitch | `turntable{N}.pitch` | Pitch fader control | ❌ |
| Pitch Bend Plus | `turntable{N}.pitchBendPlus` | Temporary pitch increase | ❌ |
| Pitch Bend Minus | `turntable{N}.pitchBendMinus` | Temporary pitch decrease | ❌ |
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
| Loop In | `turntable{N}.loopIn` | Set loop in point | ❌ |
| Loop Out | `turntable{N}.loopOut` | Set loop out point | ❌ |
| Loop Active | `turntable{N}.loopingActive` | Toggle loop on/off | ✅ |
| Auto Loop On/Off | `turntable{N}.autoLoopOnOff` | Toggle auto loop | ✅ |
| Auto Loop Duration | `turntable{N}.autoLoopDurationRotary` | Adjust loop length | ❌ |

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
| Instant FX 1 | `turntable{N}.instantFx1` | Trigger instant effect 1 | ✅ |
| Instant FX 2 | `turntable{N}.instantFx2` | Trigger instant effect 2 | ✅ |
| Instant FX 3 | `turntable{N}.instantFx3` | Trigger instant effect 3 | ✅ |

#### Bounce Effects

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Bounce Bit Crusher | `turntable{N}.fxBounceBitCrusher` | Bounce bit crusher | ✅ |
| Bounce Echo Censor | `turntable{N}.fxBounceEchoCensor` | Bounce echo censor | ✅ |
| Bounce Echo Extreme | `turntable{N}.fxBounceEchoExtreme` | Bounce echo extreme | ✅ |
| Bounce Low Pass Echo | `turntable{N}.fxBounceLowPassEcho` | Bounce low pass echo | ✅ |

### Mixer Functions

#### Channel Volume & Monitoring

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Line Volume 1 | `mixer.lineVolume1` | Channel 1 volume | ❌ |
| Line Volume 2 | `mixer.lineVolume2` | Channel 2 volume | ❌ |
| Line Volume 3 | `mixer.lineVolume3` | Channel 3 volume | ❌ |
| Line Volume 4 | `mixer.lineVolume4` | Channel 4 volume | ❌ |
| Crossfader | `mixer.crossfade` | Crossfader position | ❌ |
| Master Level | `mixer.masterLevel` | Master output level | ❌ |

#### Monitoring

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Monitor 1 | `mixer.monitorActive1` | Cue channel 1 | ✅ |
| Monitor 2 | `mixer.monitorActive2` | Cue channel 2 | ✅ |
| Monitor 3 | `mixer.monitorActive3` | Cue channel 3 | ✅ |
| Monitor 4 | `mixer.monitorActive4` | Cue channel 4 | ✅ |
| Monitor Mix | `mixer.monitorMix` | Cue/main mix balance | ❌ |

#### Special Mixer Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Jump to Cue | `mixer.jumpToCueConsideringPlayState1` | Jump to cue point | ❌ |

### Library Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Library Rotary | `musicLibrary.libraryRotary` | Browse library | ❌ |
| Load to Deck 1 | `musicLibrary.load1` | Load track to deck 1 | ❌ |
| Load to Deck 2 | `musicLibrary.load2` | Load track to deck 2 | ❌ |
| Load to Deck 3 | `musicLibrary.load3` | Load track to deck 3 | ❌ |
| Load to Deck 4 | `musicLibrary.load4` | Load track to deck 4 | ❌ |
| Toggle Source | `musicLibrary.toggleLibrarySource` | Switch library source | ✅ |
| Focus Sources | `musicLibrary.focusSources` | Focus source panel | ❌ |
| Unmark Songs | `musicLibrary.unmarkSelectedSongs` | Clear selections | ❌ |

### Advanced Library Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Library Search | `musicLibrary.search` | Open search function | ❌ |
| Preview Track | `musicLibrary.previewTrack` | Preview selected track | ✅ |
| View Mode Toggle | `musicLibrary.toggleViewMode` | Switch list/grid view | ✅ |
| Sort Toggle | `musicLibrary.toggleSort` | Change sort order | ❌ |
| Playlist Up | `musicLibrary.playlistUp` | Navigate up playlist | ❌ |
| Playlist Down | `musicLibrary.playlistDown` | Navigate down playlist | ❌ |
| Add to Queue | `musicLibrary.addToQueue` | Add track to queue | ❌ |
| Remove from Queue | `musicLibrary.removeFromQueue` | Remove from queue | ❌ |
| Toggle Favorites | `musicLibrary.toggleFavorite` | Mark as favorite | ✅ |
| Show History | `musicLibrary.showHistory` | View play history | ❌ |
| Auto-Mix Toggle | `musicLibrary.autoMixToggle` | Enable auto-mix mode | ✅ |
| Library Filter | `musicLibrary.filter` | Apply library filter | ❌ |
| Expand Folder | `musicLibrary.expandFolder` | Expand selected folder | ❌ |
| Collapse Folder | `musicLibrary.collapseFolder` | Collapse selected folder | ❌ |

### Queue Management Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Queue Next | `queue.next` | Move to next track in queue | ❌ |
| Queue Previous | `queue.previous` | Move to previous track in queue | ❌ |
| Queue Clear | `queue.clear` | Clear entire queue | ❌ |
| Queue Shuffle | `queue.shuffle` | Shuffle queue order | ✅ |
| Queue Repeat | `queue.repeat` | Toggle queue repeat | ✅ |
| Queue Auto-Load | `queue.autoLoad` | Auto-load next track | ✅ |
| Queue Show/Hide | `queue.toggleVisible` | Show/hide queue panel | ✅ |
| Add to Top | `queue.addToTop` | Add track to top of queue | ❌ |
| Add to Bottom | `queue.addToBottom` | Add track to bottom of queue | ❌ |
| Remove Selected | `queue.removeSelected` | Remove selected queue item | ❌ |

### Video & Visual Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Video On/Off | `video.toggle` | Toggle video playback | ✅ |
| Video Full Screen | `video.fullScreen` | Video full screen mode | ✅ |
| Video Transition | `video.transition` | Video transition effect | ❌ |
| Video BPM Sync | `video.bpmSync` | Sync video to BPM | ✅ |
| Video Scratch | `video.scratch` | Enable video scratching | ✅ |
| Video Cue | `video.cue` | Video cue functionality | ❌ |
| Visualizer Toggle | `video.visualizerToggle` | Show/hide visualizer | ✅ |
| Visualizer Mode | `video.visualizerMode` | Change visualizer type | ❌ |

### Beatgrid & Analysis Functions

#### Beat Grid Control

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Down Beat | `turntable{N}.downBeat` | Mark down beat | ❌ |
| BPM Restore | `turntable{N}.bpmAndDownBeatRestoreAnalyzed` | Restore analyzed BPM | ❌ |
| Beat Grid Edit | `turntable{N}.beatGridEdit` | Enter beat grid edit mode | ✅ |
| Beat Grid Lock | `turntable{N}.beatGridLock` | Lock beat grid | ✅ |
| Beat Grid Shift Left | `turntable{N}.beatGridShiftLeft` | Shift grid left | ❌ |
| Beat Grid Shift Right | `turntable{N}.beatGridShiftRight` | Shift grid right | ❌ |
| Beat Grid Double | `turntable{N}.beatGridDouble` | Double beat grid density | ❌ |
| Beat Grid Halve | `turntable{N}.beatGridHalve` | Halve beat grid density | ❌ |
| Beat Grid Reset | `turntable{N}.beatGridReset` | Reset beat grid to analysis | ❌ |

#### BPM & Tempo Analysis

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Manual BPM Tap | `turntable{N}.bpmTap` | Tap to set BPM | ❌ |
| BPM Adjust Up | `turntable{N}.bpmAdjustUp` | Increase BPM slightly | ❌ |
| BPM Adjust Down | `turntable{N}.bpmAdjustDown` | Decrease BPM slightly | ❌ |
| Tempo Range Toggle | `turntable{N}.tempoRangeToggle` | Switch tempo range (±8%, ±16%, ±50%) | ✅ |
| Re-analyze Track | `turntable{N}.reAnalyzeTrack` | Re-run track analysis | ❌ |
| Analysis Complete | `turntable{N}.analysisComplete` | Analysis status indicator | ✅ |

#### Advanced Sync Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| BPM Sync | `turntable{N}.bpmSync` | Sync to master tempo | ✅ |
| Sync Master | `turntable{N}.turntableIsSyncMaster` | Set as sync master | ✅ |
| Phase Sync | `turntable{N}.phaseSync` | Sync phase/beat alignment | ❌ |
| Instant Sync | `turntable{N}.instantSync` | Immediate tempo + phase sync | ❌ |
| Sync Lock | `turntable{N}.syncLock` | Lock sync to master | ✅ |
| Beat Jump Forward | `turntable{N}.beatJumpForward` | Jump forward by beats | ❌ |
| Beat Jump Backward | `turntable{N}.beatJumpBackward` | Jump backward by beats | ❌ |

### Application Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Modifier | `application.modifier` | Shift/modifier key | ✅ |
| Reverse | `application.reverse` | Global reverse | ❌ |
| Global Gain | `application.gain` | Global gain control | ❌ |
| Global Filter | `application.filter` | Global filter | ❌ |
| Global Sync Master | `application.turntableIsSyncMaster` | Global sync master | ✅ |
| Toggle EQ Mode | `application.toggleUnmixerEQMode` | Switch EQ mode | ✅ |

### Advanced Application Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Record Toggle | `application.recordToggle` | Start/stop recording | ✅ |
| Broadcast Toggle | `application.broadcastToggle` | Start/stop broadcasting | ✅ |
| Video Toggle | `application.videoToggle` | Show/hide video | ✅ |
| Full Screen | `application.fullScreen` | Toggle full screen mode | ❌ |
| Preferences | `application.showPreferences` | Open preferences | ❌ |
| Show/Hide Library | `application.toggleLibrary` | Toggle library visibility | ✅ |
| Show/Hide Browser | `application.toggleBrowser` | Toggle browser panel | ✅ |
| Show/Hide Queue | `application.toggleQueue` | Toggle queue panel | ✅ |
| Show/Hide Sampler | `application.toggleSampler` | Toggle sampler panel | ✅ |
| Undo | `application.undo` | Undo last action | ❌ |
| Redo | `application.redo` | Redo last action | ❌ |

### Streaming & Cloud Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Spotify Connect | `streaming.spotifyConnect` | Connect to Spotify | ✅ |
| Tidal Connect | `streaming.tidalConnect` | Connect to Tidal | ✅ |
| SoundCloud Connect | `streaming.soundCloudConnect` | Connect to SoundCloud | ✅ |
| Beatsource Connect | `streaming.beatsourceConnect` | Connect to Beatsource | ✅ |
| Stream Quality Toggle | `streaming.qualityToggle` | Change stream quality | ❌ |
| Offline Mode | `streaming.offlineMode` | Toggle offline mode | ✅ |
| Download Track | `streaming.downloadTrack` | Download for offline use | ❌ |

### Sampler Functions

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Toggle Sampler | `sampler.toggleSamplerShown` | Show/hide sampler | ✅ |
| Sampler Volume | `sampler.volume` | Sampler master volume | ❌ |
| Player 1-1 | `sampler.turntable1.player1.playingConsideringHoldSetting` | Deck 1 sample 1 | ✅ |
| Player 1-2 | `sampler.turntable1.player2.playingConsideringHoldSetting` | Deck 1 sample 2 | ✅ |
| Player 1-3 | `sampler.turntable1.player3.playingConsideringHoldSetting` | Deck 1 sample 3 | ✅ |
| Player 1-4 | `sampler.turntable1.player4.playingConsideringHoldSetting` | Deck 1 sample 4 | ✅ |
| Player 2-1 | `sampler.turntable2.player1.playingConsideringHoldSetting` | Deck 2 sample 1 | ✅ |
| Player 2-2 | `sampler.turntable2.player2.playingConsideringHoldSetting` | Deck 2 sample 2 | ✅ |
| Player 2-3 | `sampler.turntable2.player3.playingConsideringHoldSetting` | Deck 2 sample 3 | ✅ |
| Player 2-4 | `sampler.turntable2.player4.playingConsideringHoldSetting` | Deck 2 sample 4 | ✅ |

### Advanced Turntable Functions

#### Unmixer Functions (3-track mode)

| Function | Key Path | Description | LED Support |
|----------|----------|-------------|-------------|
| Unmixer Track 1 Mute | `turntable{N}.unmixerThreeTrackChannel1Muted` | Mute track 1 in unmix | ✅ |
| Unmixer Track 2 Mute | `turntable{N}.unmixerThreeTrackChannel2Muted` | Mute track 2 in unmix | ✅ |
| Unmixer Track 3 Mute | `turntable{N}.unmixerThreeTrackChannel3Muted` | Mute track 3 in unmix | ✅ |

---

## midi message types & control types

### Understanding midiMessageType

The `midiMessageType` field determines how djay Pro interprets incoming MIDI data. This is crucial for proper controller behavior.

#### Type 1: Note On/Off Messages

```xml

<key>midiMessageType</key>
<integer>1</integer>
```

**Technical Details:**

- **MIDI Status Bytes**: 0x90-0x9F (Note On), 0x80-0x8F (Note Off)
- **Data Format**: [Status Byte] [Note Number] [Velocity]
- **Velocity Range**: 0-127 (0 = Note Off, 1-127 = Note On)
- **Channel Range**: 0-15 (embedded in status byte)

**When to Use:**

- ✅ **Buttons** - Play, pause, cue, sync, loop triggers
- ✅ **Pads** - Sample triggers, effect enables
- ✅ **Switches** - Mode toggles, shift keys
- ❌ **Faders** - Use CC instead
- ❌ **Knobs** - Use CC instead

**Behavior Characteristics:**

- **Momentary**: Button press = Note On (velocity > 0), release = Note Off (velocity = 0)
- **Toggle**: Some controllers send alternating Note On messages
- **Velocity Sensitive**: Velocity value can affect behavior intensity

**Example Implementation:**

```xml
<!-- Play Button with Note On/Off -->
<dict>
    <key>keyPath</key>
    <string>turntable1.playPause</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>11</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>controlType</key>
    <string>button</string>
</dict>
```

**Velocity Mapping Examples:**

| Velocity Range | Typical Behavior | Use Case |
|----------------|------------------|----------|
| 0 | Function off/release | Button released |
| 1-64 | Soft trigger | Light touch |
| 65-127 | Full trigger | Normal press |

#### Type 3: Control Change (CC) Messages

```xml

<key>midiMessageType</key>
<integer>3</integer>
```

**Technical Details:**

- **MIDI Status Bytes**: 0xB0-0xBF
- **Data Format**: [Status Byte] [Controller Number] [Value]
- **Value Range**: 0-127 (continuous values)
- **Channel Range**: 0-15 (embedded in status byte)

**When to Use:**

- ✅ **Faders** - Volume, crossfader, EQ
- ✅ **Knobs** - Parameters, filters, gain
- ✅ **Encoders** - Browse, jog wheels
- ✅ **Continuous Controls** - Any smooth parameter changes
- ❌ **Buttons** - Use Note On/Off instead

**Behavior Characteristics:**

- **Continuous**: Smooth parameter changes across full range
- **Absolute**: Direct value mapping (CC value = parameter value)
- **Relative**: Incremental changes (for endless encoders)

**CC Value Interpretation:**

| CC Value | Percentage | Typical Use |
|----------|------------|-------------|
| 0 | 0% | Minimum (off, closed, left) |
| 64 | 50% | Center position |
| 127 | 100% | Maximum (full, open, right) |

**Example Implementation:**

```xml
<!-- Volume Fader with CC -->
<dict>
    <key>keyPath</key>
    <string>mixer.lineVolume1</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>69</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
</dict>
```

#### Advanced MIDI Message Types (Less Common)

| Type | Value | Description | Use Cases |
|------|-------|-------------|-----------|
| Program Change | 2 | Program/preset selection | Rarely used in djay |
| Aftertouch | 4 | Pressure after key press | Advanced controllers |
| Pitch Bend | 5 | 14-bit pitch bend | High-resolution controls |

**Note**: djay Pro primarily uses types 1 and 3. Other types are supported but rarely needed.

### Understanding controlType

The `controlType` field provides additional context about the physical control, affecting how djay Pro processes the MIDI data.

#### button - Standard Buttons

```xml

<key>controlType</key>
<string>button</string>
```

**Characteristics:**

- **Physical Type**: Momentary push button
- **MIDI Type**: Usually Note On/Off (type 1)
- **Behavior**: Press = trigger, release = stop
- **LED Support**: Full (on/off states)

**Variants:**

- **Momentary**: Spring-loaded return
- **Latching**: Stays pressed until pressed again
- **Soft-touch**: Velocity sensitive

**Best Practices:**

```xml
<!-- Standard Button Configuration -->
<dict>
    <key>controlType</key>
    <string>button</string>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>buttonMode</key>
    <string>toggle</string>  <!-- or "hold" -->
</dict>
```

#### rotary - Standard Endless Encoders

```xml

<key>controlType</key>
<string>rotary</string>
```

**Characteristics:**

- **Physical Type**: Endless rotary encoder
- **MIDI Type**: Control Change (type 3)
- **Behavior**: Relative movement detection
- **Values**: Increment/decrement based on rotation
- **Center**: No defined center position

**Value Interpretation:**

| CC Value | Direction | Speed |
|----------|-----------|-------|
| 1-64 | Counter-clockwise | Slower to faster |
| 65-127 | Clockwise | Slower to faster |

**Sensitivity Control:**

```xml
<key>rotarySensitivity</key>
<real>50</real>  <!-- 1.0 = very slow, 1000.0 = very fast -->
```

**Example Implementation:**

```xml
<!-- Library Browse Encoder -->
<dict>
    <key>keyPath</key>
    <string>musicLibrary.libraryRotary</string>
    <key>controlType</key>
    <string>rotary</string>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>rotarySensitivity</key>
    <real>75</real>
</dict>
```

#### rotary-64 - Center-Based Encoders

```xml

<key>controlType</key>
<string>rotary-64</string>
```

**Characteristics:**

- **Physical Type**: Endless encoder with center detent
- **MIDI Type**: Control Change (type 3)
- **Behavior**: 64 = center, deviation from center
- **Center**: 64 (middle value)
- **Range**: 0-127 with 64 as neutral

**Value Interpretation:**

| CC Value | Direction | Deviation |
|----------|-----------|-----------|
| 0-63 | Counter-clockwise | Maximum to minimum |
| 64 | Center | Neutral/stopped |
| 65-127 | Clockwise | Minimum to maximum |

**Common Uses:**

- **Jog Wheels**: 64 = stopped, deviation = scratch/nudge
- **Filter Knobs**: 64 = no filter, <64 = low pass, >64 = high pass
- **Pitch Bend**: 64 = normal speed, deviation = faster/slower

**Example Implementation:**

```xml
<!-- Jog Wheel with Center Position -->
<dict>
    <key>keyPath</key>
    <string>turntable1.jogSeekMove</string>
    <key>controlType</key>
    <string>rotary-64</string>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>rotarySensitivity</key>
    <real>300</real>
</dict>
```

### Interaction Between midiMessageType and controlType

#### Valid Combinations

| controlType | midiMessageType | Description | Example |
|-------------|-----------------|-------------|---------|
| `button` | `1` | Standard button | Play/pause, cue, sync |
| `button` | `3` | CC-based button | Some controller designs |
| `rotary` | `3` | Endless encoder | Library browse, parameters |
| `rotary-64` | `3` | Center-based encoder | Jog wheel, filter |
| (none) | `1` | Basic note mapping | Simple button without type |
| (none) | `3` | Basic CC mapping | Simple fader without type |

#### Invalid/Problematic Combinations

| controlType | midiMessageType | Problem | Solution |
|-------------|-----------------|---------|----------|
| `button` | `3` | May not work properly | Use `midiMessageType: 1` |
| `rotary` | `1` | No continuous values | Use `midiMessageType: 3` |
| `rotary-64` | `1` | No center reference | Use `midiMessageType: 3` |

### Advanced Configuration Options

#### Button-Specific Options

```xml
<dict>
    <key>controlType</key>
    <string>button</string>
    <key>midiMessageType</key>
    <integer>1</integer>
    <!-- Button behavior mode -->
    <key>buttonMode</key>
    <string>toggle</string>  <!-- or "hold" -->
    <!-- Velocity sensitivity -->
    <key>velocitySensitive</key>
    <true/>
    <!-- Require shift/modifier -->
    <key>modifier</key>
    <true/>
</dict>
```

**Button Modes:**

- **toggle**: Press once = on, press again = off
- **hold**: On while pressed, off when released

#### Rotary-Specific Options

```xml
<dict>
    <key>controlType</key>
    <string>rotary</string>
    <key>midiMessageType</key>
    <integer>3</integer>
    <!-- Rotation sensitivity -->
    <key>rotarySensitivity</key>
    <real>50</real>
    <!-- Acceleration curve -->
    <key>rotaryAcceleration</key>
    <integer>150</integer>
    <!-- Reverse direction -->
    <key>flipped</key>
    <true/>
</dict>
```

#### Fader-Specific Options

```xml
<dict>
    <key>midiMessageType</key>
    <integer>3</integer>
    <!-- No controlType needed for basic faders -->
    <!-- Pickup mode prevents jumps -->
    <key>pickupMode</key>
    <true/>
    <!-- Reverse fader direction -->
    <key>flipped</key>
    <true/>
</dict>
```

---

## output commands & led feedback

### How Output Works

djay Pro sends MIDI messages **back** to your controller to provide visual feedback. This is a two-way communication system:

1. **Input**: Controller → djay Pro (your button presses, knob turns)
2. **Output**: djay Pro → Controller (LED states, display updates)

### LED Output Types

#### Toggle LEDs (Most Common)

- **On**: Function is active (playing, synced, loop enabled)
- **Off**: Function is inactive
- **MIDI Values**: 0 = Off, 127 = On

#### State LEDs

- **On**: Function is available/enabled
- **Off**: Function is unavailable/disabled
- **MIDI Values**: Variable based on state

#### Momentary LEDs

- **On**: Only while button is pressed
- **Off**: When button is released
- **MIDI Values**: Velocity-sensitive

### Output Configuration Format

In the mapping file, LED output is configured in the `output` dictionary:

```xml
<key>output</key>
<dict>
    <key>midiMinValue</key>
    <real>0</real>           <!-- LED off value -->
    <key>midiMaxValue</key>
    <real>127</real>         <!-- LED on value -->
</dict>
```

### Advanced Output Options

#### Multi-Level LEDs (Some Controllers)

```xml
<key>output</key>
<dict>
    <key>midiMinValue</key>
    <real>0</real>           <!-- Off -->
    <key>midiMaxValue</key>
    <real>127</real>         <!-- Bright -->
    <key>midiMidValue</key>
    <real>64</real>          <!-- Dim -->
</dict>
```

#### LED Flashing (Advanced Controllers)

Some controllers support flashing LEDs for active loops or effects:

- **Solid**: Function active
- **Flashing**: Function active with emphasis
- **Off**: Function inactive

### Common LED Behaviors by Function Type

| Function Type | LED Behavior | On State | Off State |
|---------------|--------------|----------|-----------|
| Play/Pause | Toggle | Playing | Stopped |
| Sync | Toggle | Synced | Not synced |
| Cue Points | Toggle | Cue set | No cue |
| Loops | Toggle/Flash | Loop active | No loop |
| Effects | Toggle | Effect on | Effect off |
| Monitor | Toggle | Monitoring | Not monitoring |
| Sampler | Momentary | Playing sample | Silent |

---

## midi mapping file format

### File Structure Overview

djay Pro uses Apple's Property List (plist) format in XML. The file extension is `.djayMidiMapping`.

### Root Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" 
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- File metadata -->
    <key>USBID</key>
    <integer>399254016</integer>
    <key>endpointName</key>
    <string>Controller Name</string>
    <key>editor</key>
    <string>djay Pro MIDI Mapper</string>
    <key>schemeVersion</key>
    <integer>1</integer>
    <key>version</key>
    <integer>0</integer>
    <!-- Main mappings array -->
    <key>controls</key>
    <array>
        <!-- Individual mapping entries -->
    </array>
</dict>
</plist>
```

### Metadata Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `USBID` | Integer | USB Vendor/Product ID combination | Optional |
| `endpointName` | String | Controller display name | Yes |
| `editor` | String | Software used to create mapping | Optional |
| `schemeVersion` | Integer | Mapping format version (always 1) | Yes |
| `version` | Integer | Mapping file version | Yes |

### Control Entry Structure

Each mapping in the `controls` array has this structure:

```xml
<dict>
    <!-- Function being mapped -->
    <key>keyPath</key>
    <string>turntable1.playPause</string>
    
    <!-- MIDI input configuration -->
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>11</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    
    <!-- Control type (optional) -->
    <key>controlType</key>
    <string>button</string>
    
    <!-- LED output configuration -->
    <key>output</key>
    <dict>
        <key>midiMinValue</key>
        <real>0</real>
        <key>midiMaxValue</key>
        <real>127</real>
    </dict>
    
    <!-- Rotary-specific settings (optional) -->
    <key>rotarySensitivity</key>
    <real>50</real>
    
    <!-- Advanced options (optional) -->
    <key>flipped</key>
    <true/>
    <key>buttonMode</key>
    <string>hold</string>
    <key>pickupMode</key>
    <true/>
</dict>
```

### Field Descriptions

#### Required Fields

| Field | Type | Description | Valid Values |
|-------|------|-------------|--------------|
| `keyPath` | String | djay function to control | See function reference |
| `midiChannel` | Integer | MIDI channel (0-based) | 0-15 |
| `midiData` | Integer | MIDI note/CC number | 0-127 |
| `midiMessageType` | Integer | MIDI message type | 1 (Note), 3 (CC) |

#### Optional Fields

| Field | Type | Description | Valid Values |
|-------|------|-------------|--------------|
| `controlType` | String | Physical control type | `button`, `rotary`, `rotary-64` |
| `output` | Dict | LED feedback configuration | See output section |
| `rotarySensitivity` | Real | Encoder sensitivity | 1.0-1000.0 |
| `flipped` | Boolean | Reverse direction | `true`, `false` |
| `buttonMode` | String | Button behavior | `toggle`, `hold` |
| `pickupMode` | Boolean | Pickup mode for faders | `true`, `false` |
| `modifier` | Boolean | Requires modifier key | `true`, `false` |

### MIDI Message Types

| Type | Value | Description | Use Cases |
|------|-------|-------------|-----------|
| Note On/Off | 1 | Button presses | Play, cue, sync, effects |
| Control Change | 3 | Continuous controls | Faders, knobs, crossfader |

---

## technical specifications

### MIDI Constraints

- **Channels**: 0-15 (16 total channels)
- **Note Numbers**: 0-127 (128 notes)
- **CC Numbers**: 0-127 (128 controllers)
- **Velocity/Values**: 0-127 (128 levels)

### File Size Limits

- **Typical size**: 5-50 KB
- **Maximum mappings**: No hard limit (tested up to 1000+)
- **Maximum file size**: ~1 MB practical limit

### Performance Guidelines

- **Response time**: < 10ms for button presses
- **Encoder resolution**: 64 steps per rotation (typical)
- **LED update rate**: Up to 60 Hz

### Browser Compatibility

#### Web MIDI API Support

| Browser | Version | MIDI Input | MIDI Output |
|---------|---------|------------|-------------|
| Chrome | 43+ | ✅ | ✅ |
| Firefox | 108+ | ✅ | ✅ |
| Edge | 79+ | ✅ | ✅ |
| Safari | 14.1+ | ✅ | ✅ |

#### Web USB API Support

| Browser | Version | USB Detection |
|---------|---------|---------------|
| Chrome | 61+ | ✅ |
| Firefox | None | ❌ |
| Edge | 79+ | ✅ |
| Safari | None | ❌ |

---

## examples & best practices

### Basic Button Mapping

```xml
<!-- Play/Pause Button -->
<dict>
    <key>keyPath</key>
    <string>turntable1.playPause</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>11</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>controlType</key>
    <string>button</string>
    <key>output</key>
    <dict>
        <key>midiMinValue</key>
        <real>0</real>
        <key>midiMaxValue</key>
        <real>127</real>
    </dict>
</dict>
```

### Rotary Encoder Mapping

```xml
<!-- Library Browse Knob -->
<dict>
    <key>keyPath</key>
    <string>musicLibrary.libraryRotary</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>20</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>controlType</key>
    <string>rotary-64</string>
    <key>flipped</key>
    <true/>
    <key>rotarySensitivity</key>
    <real>50</real>
    <key>output</key>
    <dict/>
</dict>
```

### Fader with Pickup Mode

```xml
<!-- Volume Fader -->
<dict>
    <key>keyPath</key>
    <string>mixer.lineVolume1</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>69</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>pickupMode</key>
    <true/>
    <key>output</key>
    <dict/>
</dict>
```

### Effect with Hold Mode

```xml
<!-- Instant Effect (Hold) -->
<dict>
    <key>keyPath</key>
    <string>turntable1.instantFx1</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>49</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>buttonMode</key>
    <string>hold</string>
    <key>output</key>
    <dict>
        <key>midiMinValue</key>
        <real>0</real>
        <key>midiMaxValue</key>
        <real>127</real>
    </dict>
</dict>
```

### Multi-Level LED Output

```xml
<!-- Advanced LED with Multiple Brightness Levels -->
<dict>
    <key>keyPath</key>
    <string>turntable1.bpmSync</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>8</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>output</key>
    <dict>
        <key>midiMinValue</key>
        <real>0</real>         <!-- Off -->
        <key>midiMaxValue</key>
        <real>127</real>        <!-- Full brightness -->
    </dict>
</dict>
```

### Best Practices

#### MIDI Channel Organization

- **Channel 0**: Deck 1 controls
- **Channel 1**: Deck 2 controls  
- **Channel 2**: Deck 3 controls
- **Channel 3**: Deck 4 controls
- **Channel 15**: Global/mixer controls

#### Note Number Conventions

- **0-31**: Transport controls (play, cue, sync)
- **32-63**: Loop and effect buttons
- **64-95**: Performance pads
- **96-127**: Utility functions

#### CC Number Conventions

- **0-31**: EQ and filters
- **32-63**: Effect parameters
- **64-95**: Faders and volumes
- **96-127**: Encoders and browsers

#### LED Implementation Tips

1. **Test LED notes separately** from input notes
2. **Use pickup mode** for faders to prevent jumps
3. **Group related functions** on same MIDI channel
4. **Document your mapping** with comments in controller name
5. **Test with actual hardware** before finalizing

#### Performance Optimization

- **Minimize MIDI conflicts** by using unique note/CC numbers
- **Use appropriate sensitivity** for rotary encoders
- **Enable pickup mode** only when necessary
- **Test latency** with your specific controller

This documentation provides everything needed to understand and create effective djay Pro MIDI mappings, from basic button assignments to advanced LED feedback systems.