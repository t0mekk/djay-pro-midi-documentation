# Beginner's Guide to djay Pro MIDI Mapping

This guide teaches you how to create and customize MIDI mappings for djay Pro, from mapping a single button to building a complete controller configuration.

## Table of Contents

1. [Your First Mapping](#1-your-first-mapping)
2. [Core Concepts](#2-core-concepts)
3. [Advanced Techniques](#3-advanced-techniques)
4. [CUE Button Deep Dive](#4-cue-button-deep-dive)
5. [Function Reference](#5-function-reference)
6. [Best Practices & Troubleshooting](#6-best-practices--troubleshooting)

---

## 1. Your First Mapping

Let's map a single **Play/Pause button** for Deck 1 and make its LED light up.

### Step 1: Find Your Controller's MIDI Signal

1. Open djay Pro and connect your MIDI controller.
2. Go to `Settings` > `MIDI Devices` and select your controller.
3. Click "Configure..." to open the MIDI mapping editor.
4. Press the Play/Pause button on your controller. The editor will show the signal:
   - **Type:** Note On
   - **Channel:** 1
   - **Note/CC:** 11

> **Important:** djay's UI shows channels 1–16, but the mapping file uses 0–15. **Channel 1 in djay = Channel 0 in the file.**

### Step 2: Create the Mapping File

A mapping is a text file with a `.djayMidiMapping` extension. Create a new file with this structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>USBID</key>
    <integer>586153985</integer>
    <key>controls</key>
    <array>
        <!-- Mappings go here -->
    </array>
</dict>
</plist>
```

The `USBID` uniquely identifies your controller. To find yours:
- Use the MIDI Learn editor in djay to create a dummy mapping, then locate the generated file.
- Or use the `djay-midi-terminal.py` tool included in this project (run with `⌥u` to auto-detect).

### Step 3: Write the Control Block

Add this inside the `<array>` tags:

```xml
<!-- Play/Pause Button for Deck 1 -->
<dict>
    <key>keyPath</key>
    <string>turntable1.playPause</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>11</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>output</key>
    <dict>
        <key>midiMinValue</key>
        <real>0</real>
        <key>midiMaxValue</key>
        <real>127</real>
    </dict>
</dict>
```

Save as `My Controller.djayMidiMapping` and place it in djay's MIDI Mappings folder:
- **macOS:** `~/Music/djay/MIDI Mappings/`
- **Windows:** User profile under the djay directory
- **iOS:** Files app → On My iPad/iPhone → djay

---

## 2. Core Concepts

### The Control Block

Every mapped control is a `<dict>` of key-value pairs:

| Key | Description | Required |
| :--- | :--- | :--- |
| `keyPath` | The djay function to control (e.g., `turntable1.playPause`) | Yes |
| `midiChannel` | MIDI channel (0–15) | Yes |
| `midiData` | Note or CC number (0–127) | Yes |
| `midiMessageType` | `1` = Note (buttons), `3` = CC (knobs/faders) | Yes |
| `output` | LED feedback configuration | No |
| `controlType` | Physical control type: `button`, `rotary`, `rotary-64` | No |
| `buttonMode` | `hold` (momentary) or `toggle` (press on/off) | No |
| `modifier` | `true` = only active when shift/modifier is held | No |
| `pickupMode` | `true` = prevents value jumps on faders/knobs | No |
| `rotarySensitivity` | Speed scaling for rotary encoders (e.g., `50.0`) | No |
| `flipped` | `true` = reverses rotary direction | No |

### Choosing `midiMessageType` and `controlType`

| Control | `midiMessageType` | `controlType` |
|---------|-------------------|---------------|
| Button / Pad | `1` (Note) | `button` (optional) |
| Knob / Fader (absolute) | `3` (CC) | — |
| Endless encoder (relative) | `3` (CC) | `rotary` |
| Jog wheel / centered encoder | `3` (CC) | `rotary-64` |

### LED Feedback: The `<output>` Block

| Configuration | Behavior |
| :--- | :--- |
| `<dict><key>midiMinValue</key><real>0</real><key>midiMaxValue</key><real>127</real></dict>` | Standard on/off: 0 = OFF, 127 = ON |
| `<dict><key>midiMinValue</key><real>50</real></dict>` | Custom "on" value: 0 = OFF, 50 = ON |
| `<dict/>` | Empty dict = use djay's built-in default feedback |

---

## 3. Advanced Techniques

### Faders and Knobs with Pickup Mode

Prevent value jumps when the physical and software positions are out of sync:

```xml
<dict>
    <key>keyPath</key>
    <string>mixer.lineVolume1</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>19</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>pickupMode</key>
    <true/>
</dict>
```

### Endless Encoders (Relative)

For library browsing or parameter scrolling:

```xml
<dict>
    <key>keyPath</key>
    <string>musicLibrary.libraryRotary</string>
    <key>midiChannel</key>
    <integer>6</integer>
    <key>midiData</key>
    <integer>64</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>controlType</key>
    <string>rotary</string>
    <key>rotarySensitivity</key>
    <real>75</real>
</dict>
```

### Shift Layers

#### Method 1: `application.modifier` (Recommended)

```xml
<!-- The SHIFT button -->
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

<!-- Shifted function (e.g., Delete Cue 1) -->
<dict>
    <key>keyPath</key>
    <string>turntable1.clearCuePoint1</string>
    <key>midiChannel</key>
    <integer>7</integer>
    <key>midiData</key>
    <integer>0</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>modifier</key>
    <true/>
</dict>
```

#### Method 2: Different MIDI Channels

When your controller sends on a different channel when shifted:

```xml
<!-- Primary: Play/Pause on Channel 0 -->
<dict>
    <key>keyPath</key>
    <string>turntable1.playPause</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>11</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>

<!-- Shifted: Reset Speed on Channel 2 -->
<dict>
    <key>keyPath</key>
    <string>turntable1.resetSpeed</string>
    <key>midiChannel</key>
    <integer>2</integer>
    <key>midiData</key>
    <integer>11</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>
```

### Decoupled LED Output

Send MIDI feedback on a different note/channel than the input:

```xml
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

---

## 4. CUE Button Deep Dive

The standard DJ CUE button behavior is mapped with:

**`turntable{N}.cuePositionOrJumpConsideringPlayState1`**

This emulates a CDJ-style CUE button:

| State | Press | Hold | Release |
|-------|-------|------|---------|
| **Paused** | Sets main cue point | Plays from cue point | Stops and returns to cue |
| **Playing** | Stops and returns to cue | — | — |

The `...ConsideringPlayState` suffix means the function behaves differently depending on whether the deck is playing or paused. The trailing `1` specifies the **primary cue point** (not a numbered hot cue).

### CUE vs. Hot Cues

| Type | Key Path | Purpose |
|------|----------|---------|
| **Main CUE** | `turntable{N}.cuePositionOrJumpConsideringPlayState1` | Dedicated CUE button next to Play/Pause |
| **Hot Cues** | `turntable{N}.cueOrJumpIfAlreadySet[1-8]` | Performance pads for secondary cue points |
| **Clear Hot Cue** | `turntable{N}.clearCuePoint[1-8]` | Remove a specific hot cue |

### CUE Button Example

```xml
<dict>
    <key>keyPath</key>
    <string>turntable1.cuePositionOrJumpConsideringPlayState1</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>12</integer>
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

---

## 5. Function Reference

Replace `{N}` with deck number (1–4). Replace `[1-4]` with channel number.

### Deck Controls

| Function | Key Path |
|----------|----------|
| Play/Pause | `turntable{N}.playPause` |
| CUE | `turntable{N}.cuePositionOrJumpConsideringPlayState1` |
| Sync | `turntable{N}.bpmSync` |
| Speed Fader | `turntable{N}.speed` |
| Pitch Bend | `turntable{N}.pitchBendMove` |
| Key Lock | `turntable{N}.key` |
| Reverse | `turntable{N}.reverse` |
| Slip Mode | `turntable{N}.deckSlipToggle` |
| Hot Cue 1–8 | `turntable{N}.cueOrJumpIfAlreadySet[1-8]` |
| Clear Hot Cue | `turntable{N}.clearCuePoint[1-8]` |
| Go to Start | `turntable{N}.gotoZero` |
| Backspin | `turntable{N}.backspin` |
| Brake Effect | `turntable{N}.brakeTransitionEffect` |

### Loop Controls

| Function | Key Path |
|----------|----------|
| Loop In | `turntable{N}.loopIn` |
| Loop Out | `turntable{N}.loopOut` |
| Loop Active | `turntable{N}.loopingActive` |
| Auto Loop | `turntable{N}.autoLoopOnOff` |
| Halve Loop | `turntable{N}.autoLoopDurationHalf` |
| Double Loop | `turntable{N}.autoLoopDurationDouble` |
| 1/8 Beat Loop | `turntable{N}.autoLoop1BeatInterval` |
| 1/4 Beat Loop | `turntable{N}.autoLoop2BeatInterval` |
| 1 Beat Loop | `turntable{N}.autoLoop4BeatInterval` |
| 2 Beat Loop | `turntable{N}.autoLoop8BeatInterval` |
| 4 Beat Loop | `turntable{N}.autoLoop16BeatInterval` |

### Mixer & EQ

| Function | Key Path |
|----------|----------|
| Channel Volume | `mixer.lineVolume[1-4]` |
| Crossfader | `mixer.crossfade` |
| Master Volume | `mixer.masterLevel` |
| Headphone Cue | `mixer.monitorActive[1-4]` |
| Headphone Mix | `mixer.monitorMix` |
| Headphone Volume | `mixer.monitorLevel` |
| High EQ | `turntable{N}.highEQ` |
| Mid EQ | `turntable{N}.midEQ` |
| Low EQ | `turntable{N}.lowEQ` |
| Filter | `turntable{N}.filter` |
| Gain | `turntable{N}.gain` |

### Library & Browser

| Function | Key Path |
|----------|----------|
| Browse | `musicLibrary.libraryRotary` |
| Load to Deck | `musicLibrary.load[1-4]` |
| Load to Selected | `musicLibrary.loadSelection` |
| Toggle Source | `musicLibrary.toggleLibrarySource` |
| Preview Track | `musicLibrary.previewTrack` |

### Effects

| Function | Key Path |
|----------|----------|
| Master FX | `turntable{N}.fxActive` |
| FX 1–3 Enable | `turntable{N}.fx[1-3]Enabled` |
| FX Wet/Dry | `turntable{N}.fx[1-3]WetDryValue` |
| FX Parameter | `turntable{N}.fx[1-3]ParameterValue` |
| Instant FX | `turntable{N}.instantFx[1-8]` |

### Application & Global

| Function | Key Path |
|----------|----------|
| Shift/Modifier | `application.modifier` |
| Toggle Sampler | `application.toggleSampler` |
| Toggle Library | `application.toggleLibrary` |
| Automix | `application.automix` |
| Record | `application.recordToggle` |
| Sampler Volume | `sampler.volume` |
| Sampler Pad 1–8 | `sampler.player[1-8].playingConsideringHoldSetting` |

> For the complete function reference with all keyPaths, see [MAIN.md](MAIN.md).

---

## 6. Best Practices & Troubleshooting

### Organization

- **One channel per deck:** Deck 1 → Channel 0, Deck 2 → Channel 1, global controls → Channel 15.
- **Document modifiers:** Keep notes on what each modifier represents (shift, pad mode, etc.).
- **Start in the GUI, refine in text:** Use MIDI Learn to discover keyPaths, then edit the file for complex behaviors.

### Disabling a Control ("No-Op")

Map to a non-functional keyPath to override a control in a specific layer:

```xml
<dict>
    <key>keyPath</key>
    <string>application</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>99</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>
```

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Button doesn't respond | Check `midiChannel` (remember: UI is 1-based, file is 0-based), then `midiData`, then `midiMessageType` |
| LED doesn't light up | Verify `<output>` block exists; the LED may use a different note/CC than the input |
| djay crashes on startup | Malformed XML — remove or fix the offending `.djayMidiMapping` file |
| Fader jumps to wrong value | Add `<key>pickupMode</key><true/>` to the control entry |
| Encoder too sensitive | Add `<key>rotarySensitivity</key><real>50</real>` and adjust |

### Example Mappings

Ready-to-study example mappings are available in the [examples/](examples/) directory:

| Controller | File | Notes |
|------------|------|-------|
| XONE:K2 | `XONE_K2_Mapping_V1_By_LaFleurLabs.djayMidiMapping` | 4-deck, single channel 15, full mixer |
| Pioneer DDJ-REV1 | `Pioneer_DDJ-REV1_Edit_by_ALEXYUS_DJ.djayMidiMapping` | Multi-channel, heavy modifier usage |
| Denon MC7000 | `Denon_DJ_MC7000_Edit_1.djayMidiMapping` | Large professional controller |
| Traktor S8 | `Traktor_Kontrol_S8.djayMidiMapping` | Screen controller mapping |
| Traktor X1 MK2 | `Traktor_Kontrol_X1_MK2.djayMidiMapping` | Compact effects controller |
