# Beginner's Guide to djay Pro MIDI Mapping

This guide takes you from mapping one button to editing a mapping file by hand.

Two things to know first:

- **Use MIDI Learn for most of the work.** djay's built-in editor creates and saves mapping files for you. Hand-editing is for the few things the editor cannot do.
- **Hand-editing is unsupported.** Algoriddim does not document the file format. Keep a backup of any file you edit. MIDI mapping requires a PRO subscription.

## Contents

1. [Map a button with MIDI Learn](#1-map-a-button-with-midi-learn)
2. [Find and open the mapping file](#2-find-and-open-the-mapping-file)
3. [Read a control entry](#3-read-a-control-entry)
4. [Common edits](#4-common-edits)
5. [The CUE button and hot cues](#5-the-cue-button-and-hot-cues)
6. [Common keyPaths](#6-common-keypaths)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Map a button with MIDI Learn

1. Open djay Pro and connect your controller. If it is not natively supported, djay asks whether you want to configure it. Accept, and the MIDI Configuration window opens. To edit an existing mapping later, open the controller from djay's MIDI device settings.
2. Press the Play button on your controller. djay adds a row for the note or CC it received.
3. Set **Target** to `Deck 1` and **Action** to `Play/Pause`.
4. Open the advanced options and enable **MIDI Out** if the button has an LED.
5. Test it. The mapping is live before you save.
6. Click **Done** to save.

The advanced options you will meet most often:

| Option | What it does |
|---|---|
| Control type | Button, Fader/Knob, or one of three Rotary types for endless encoders and jog wheels. If an encoder misbehaves, try each Rotary type. |
| Invert | Reverses a control that moves the wrong way. |
| Pickup mode | Ignores a fader until it reaches the on-screen position, which prevents jumps. |
| Button mode | Default, Toggle, or Hold. |
| Speed | How fast an encoder moves its target. |
| MIDI Out | Sends feedback to the controller so LEDs follow djay's state. |

To add a shift layer, map a button to **General → Controller Shift Key**, then hold it while pressing another control. djay adds a second row marked "(SHIFT)" that you can assign separately.

---

## 2. Find and open the mapping file

| Platform | Location |
|---|---|
| macOS | `~/Music/djay/MIDI Mappings/`. In the MIDI Configuration window, the Share menu has **Show in Finder**. |
| Windows | `%HOMEPATH%\Music\djay\MIDI Mappings` |
| iOS / iPadOS | Files app → On My iPhone/iPad → djay. Use the Share icon in the MIDI Configuration window to export. |

The file is named after your mapping, with the extension `.djayMidiMapping`. On macOS it is an XML property list that opens in any text editor. Some Windows users report a JSON file instead, which this guide does not cover.

Before editing:

1. Copy the file somewhere safe.
2. Quit djay.
3. Edit, save, and start djay again. It reads mappings at startup.

To customize a natively supported controller, open its mapping in MIDI Learn and save it under a new name. That gives you a file to edit and leaves the built-in mapping intact.

---

## 3. Read a control entry

The file has a `controls` array with one `<dict>` per mapped control:

```xml
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
    <dict/>
</dict>
```

| Key | Meaning |
|---|---|
| `keyPath` | What djay does: a target (`turntable1` is Deck 1) and an action (`playPause`). |
| `midiChannel` | MIDI channel, counted from 0. **Channel 1 in djay's UI is `0` in the file.** |
| `midiData` | The note or CC number. |
| `midiMessageType` | `1` for a note (buttons and pads), `3` for a control change (faders, knobs, encoders). |
| `output` | LED feedback. An empty `<dict/>` sends feedback on the same note with default values. |

Optional keys you will see:

| Key | Values | Meaning |
|---|---|---|
| `controlType` | `button`, `rotary`, `rotary-64`, `rotary-absolute` | The MIDI Learn control type. Usually absent for plain buttons and faders. |
| `buttonMode` | `toggle`, `hold` | The MIDI Learn button mode. |
| `flipped` | `true` | Invert. |
| `pickupMode` | `true` | Pickup mode. |
| `rotarySensitivity` | number | Encoder speed. |
| `modifier` | `true` | Active only while the Controller Shift Key is held. |
| `condition` | e.g. `modifier1 == 0` | Active only in a certain pad mode or deck layer. Only in edits of built-in mappings. |

The full list is in [REFERENCE.md](REFERENCE.md#control-entry-fields).

---

## 4. Common edits

### Change what a control does

Replace the `keyPath` string. Take the new value from [section 6](#6-common-keypaths) or from [REFERENCE.md](REFERENCE.md#verified-keypaths).

### Copy a deck's mapping to another deck

Duplicate the entries and change `turntable1` to `turntable3` in each `keyPath`, along with the `midiChannel` or `midiData` your controller sends for that deck.

### Set an LED color

On controllers with colored pads, the values djay sends select the color. Set them in the `output` dict:

```xml
<key>output</key>
<dict>
    <key>midiMinValue</key>
    <real>1</real>
    <key>midiMaxValue</key>
    <real>49</real>
</dict>
```

`midiMinValue` is sent when the action is off and `midiMaxValue` when it is on. The numbers that produce each color are specific to your controller; its MIDI implementation chart lists them.

### Light an LED on a different note

If the LED listens on a different note or CC than the button sends, name it in `output`. Only the keys that differ from the input are needed:

```xml
<key>output</key>
<dict>
    <key>midiData</key>
    <integer>97</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
</dict>
```

### Make one control do two things

Add two entries with the same `midiChannel`, `midiData` and `midiMessageType` and different `keyPath` values. For example, a knob can move `turntable1.fx3WetDryValue` and `turntable2.fx3WetDryValue` together.

### Stop a fader from jumping

```xml
<dict>
    <key>keyPath</key>
    <string>turntable1.speed</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>9</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>pickupMode</key>
    <true/>
</dict>
```

### Map an endless encoder

```xml
<dict>
    <key>controlType</key>
    <string>rotary</string>
    <key>flipped</key>
    <true/>
    <key>keyPath</key>
    <string>musicLibrary.libraryRotary</string>
    <key>midiChannel</key>
    <integer>6</integer>
    <key>midiData</key>
    <integer>64</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
</dict>
```

Use `rotary` if the encoder sends `1` and `127`, `rotary-64` if it sends `63` and `65`. Add `rotarySensitivity` to change the speed; the example mappings use values from `1` (fine) to `300` (fast). Remove `flipped` if it scrolls the wrong way.

### Add a shift layer

Map the shift button to `application.modifier`, then mark shifted entries with `modifier`:

```xml
<!-- Shift button -->
<dict>
    <key>keyPath</key>
    <string>application.modifier</string>
    <key>midiChannel</key>
    <integer>15</integer>
    <key>midiData</key>
    <integer>15</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>

<!-- Unshifted: load to deck 1 -->
<dict>
    <key>keyPath</key>
    <string>musicLibrary.load1</string>
    <key>midiChannel</key>
    <integer>15</integer>
    <key>midiData</key>
    <integer>13</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>

<!-- Shifted: same button loads to deck 3 -->
<dict>
    <key>keyPath</key>
    <string>musicLibrary.load3</string>
    <key>midiChannel</key>
    <integer>15</integer>
    <key>midiData</key>
    <integer>13</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>modifier</key>
    <true/>
</dict>
```

Many controllers have a hardware shift that sends a different note or channel on its own. Those need no `modifier` key: press shift plus the control in MIDI Learn and map the row that appears. `application.modifier` gives you a second, independent shift on any spare button.

### Add a shift layer inside a pad mode

MIDI Learn gives you one set of "(SHIFT)" pad mappings shared by every pad mode. In an edit of a built-in mapping, you can get a separate shifted set per pad mode:

1. Find the eight pad entries for the pad mode. They share a `condition` such as `modifier1 == 0`.
2. Copy all eight and paste the copies after the originals.
3. Add `<key>modifier</key><true/>` to each copy.
4. Restart djay. The copies appear in MIDI Learn as "(SHIFT)" rows that keep the pad mode condition. Assign their actions there or by editing `keyPath`.

See [Shift layers and conditions](REFERENCE.md#shift-layers-and-conditions) for what `condition` can and cannot do.

### Disable a control

Give it a target with no action. The control is recognized and does nothing:

```xml
<dict>
    <key>keyPath</key>
    <string>turntable1</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>99</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>
```

---

## 5. The CUE button and hot cues

The main CUE button next to Play is mapped in the examples to:

`turntable{N}.cuePositionOrJumpConsideringPlayState1`

The name says the action depends on the play state. The expected behavior is that of a CDJ CUE button:

| Deck state | Press |
|---|---|
| Paused, away from the cue point | Sets the cue point at the current position. |
| Paused, at the cue point | Plays while held and returns to the cue point on release. |
| Playing | Jumps back to the cue point and pauses. |

Hot cue pads use a different family:

| Purpose | keyPath |
|---|---|
| Main CUE button | `turntable{N}.cuePositionOrJumpConsideringPlayState1` |
| Hot cue pad: set if empty, otherwise jump | `turntable{N}.cueOrJumpIfAlreadySet[1-8]` |
| Delete a hot cue (usually shift + pad) | `turntable{N}.clearCuePoint[1-8]` |

The trailing `1` indicates that the CUE button works on cue point 1, the same point hot cue pad 1 uses. This is read from the keyPath name, so check it on your setup if it matters.

---

## 6. Common keyPaths

Replace `{N}` with the deck number `1`–`4`. `[1-8]` means one keyPath per number. Every keyPath here is taken from the mappings in [examples/](examples/). The complete list is in [REFERENCE.md](REFERENCE.md#verified-keypaths).

### Deck

| Action | keyPath |
|---|---|
| Play/pause | `turntable{N}.playPause` |
| CUE | `turntable{N}.cuePositionOrJumpConsideringPlayState1` |
| Sync | `turntable{N}.bpmSync` |
| Tempo fader | `turntable{N}.speed` |
| Key lock | `turntable{N}.key` |
| Slip mode | `turntable{N}.deckSlipToggle` |
| Jump to start | `turntable{N}.gotoZero` |
| Load selected track | `musicLibrary.load[1-4]` |
| Jog touch | `turntable{N}.scratchingMode` |
| Jog turn (scratch) | `turntable{N}.scratchingMove` |
| Jog turn (pitch bend) | `turntable{N}.pitchBendMove` |

### Hot cues and loops

| Action | keyPath |
|---|---|
| Hot cue 1–8 | `turntable{N}.cueOrJumpIfAlreadySet[1-8]` |
| Clear hot cue 1–8 | `turntable{N}.clearCuePoint[1-8]` |
| Loop in | `turntable{N}.loopIn` |
| Loop out | `turntable{N}.loopOut` |
| Reloop | `turntable{N}.reloop` |
| Auto loop on/off | `turntable{N}.autoLoopOnOff` |
| Halve loop | `turntable{N}.autoLoopDurationHalf` |
| Double loop | `turntable{N}.autoLoopDurationDouble` |
| 1-beat loop | `turntable{N}.autoLoop1BeatInterval` |
| 4-beat loop | `turntable{N}.autoLoop4BeatInterval` |
| Jump back 1 beat | `turntable{N}.skipBackward1Beat` |
| Jump forward 1 beat | `turntable{N}.skipForward1Beat` |

The number in a loop keyPath is the length in beats with the decimal point dropped: `autoLoop05BeatInterval` is half a beat, `autoLoop16BeatInterval` is 16 beats.

### Mixer and EQ

| Action | keyPath |
|---|---|
| Channel fader | `mixer.lineVolume[1-4]` |
| Crossfader | `mixer.crossfade` |
| Master volume | `mixer.masterLevel` |
| Headphone cue | `mixer.monitorActive[1-4]` |
| Gain | `turntable{N}.gain` |
| High / mid / low EQ | `turntable{N}.highEQ`, `turntable{N}.midEQ`, `turntable{N}.lowEQ` |
| Filter | `turntable{N}.filter` |

EQ, gain and filter belong to the deck target, not `mixer`.

### Effects

| Action | keyPath |
|---|---|
| FX slot 1–3 on/off | `turntable{N}.fx[1-3]Enabled` |
| FX slot 1–3 wet/dry | `turntable{N}.fx[1-3]WetDryValue` |
| FX slot 1–3 parameter | `turntable{N}.fx[1-3]ParameterValue` |
| FX slot 1–3 next effect | `turntable{N}.fx[1-3]SelectNext` |
| Instant FX 1–8 | `turntable{N}.instantFx[1-8]` |

### Library

| Action | keyPath |
|---|---|
| Scroll | `musicLibrary.libraryRotary` |
| Back | `musicLibrary.libraryBack` |
| Switch source | `musicLibrary.toggleLibrarySource` |
| Show/hide library | `musicLibrary.toggleLibraryVisible` |

### Other

| Action | keyPath |
|---|---|
| Controller shift key | `application.modifier` |
| Sampler volume | `sampler.volume` |
| Sample pad 1–8 | `sampler.turntable{N}.player[1-8].playingConsideringHoldSetting` |
| Neural Mix: mute stem 1–4 | `turntable{N}.unmixerGenericChannel[1-4]Muted` |

If the action you want is not listed, map it in MIDI Learn, save, and look at the keyPath djay wrote to the file.

---

## 7. Troubleshooting

| Problem | Check |
|---|---|
| Control does nothing | `midiChannel` is zero-based: UI channel 1 is `0`. Then check `midiData` and `midiMessageType`. |
| Button mapped as a fader | The button sends CC. Add `controlType` `button`, or set Control type to Button in MIDI Learn. |
| LED stays dark | The entry needs an `output` key. If it has one, the LED may listen on a different note, CC or channel: set `midiData`, `midiMessageType` or `midiChannel` inside `output`. |
| LED has the wrong color | Set `midiMinValue` and `midiMaxValue` in `output` to the values from your controller's MIDI chart. |
| Fader jumps | Add `pickupMode`. |
| Encoder jumps to the ends or only moves one way | Wrong rotary type. Switch between `rotary`, `rotary-64` and `rotary-absolute`. |
| Encoder is too fast or too slow | Adjust `rotarySensitivity`. |
| Control moves backwards | Add or remove `flipped`. |
| Edits have no effect | Restart djay. It reads mapping files at startup. |
| djay ignores the mapping after an edit | The XML may be malformed. Restore your backup. On macOS, `plutil -lint "My Mapping.djayMidiMapping"` reports the line with the error. |
| A `condition` entry never fires | The variable is not set for your controller. Conditions only work in edits of built-in mappings that already use them. |

To study complete mappings, see [examples/](examples/).
