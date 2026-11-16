# djay Pro MIDI Mapping Reference

Reference for the `.djayMidiMapping` file format and the `keyPath` actions that can appear in it.

Algoriddim does not document this format and does not support hand-editing it. Everything here comes from the sources listed in [Sources and verification](#sources-and-verification), and each section says how well established its contents are.

## Contents

1. [Sources and verification](#sources-and-verification)
2. [File format](#file-format)
3. [Control entry fields](#control-entry-fields)
4. [LED feedback: the `output` dict](#led-feedback-the-output-dict)
5. [Shift layers and conditions](#shift-layers-and-conditions)
6. [Verified keyPaths](#verified-keypaths)
7. [Unverified keyPaths](#unverified-keypaths)

---

## Sources and verification

| Source | What it establishes |
|---|---|
| The five mappings in [examples/](examples/) (saved by djay Pro 2.0.9 through djay 5.3.1) | Every key, value and keyPath in the "verified" sections below appears in at least one of these files. |
| Algoriddim user manual: MIDI mapping for [Mac](https://help.algoriddim.com/user-manual/djay-pro-mac/midi/mapping), [Windows](https://help.algoriddim.com/user-manual/djay-pro-windows/midi/mapping), [iOS](https://help.algoriddim.com/user-manual/djay-ios/midi/mapping) | The meaning of the MIDI Learn options (control type, invert, pickup mode, button mode, speed, reaction, MIDI Out). |
| Community thread [How to work with modifiers in the MIDI Mapping XML](https://community.algoriddim.com/t/how-to-work-with-modifiers-in-the-midi-mapping-xml/32183) | `condition` syntax, the meaning of `modifierN` values, and a few keyPaths quoted from real mappings. |

Terms used below:

- **Verified** — present in a mapping file saved by djay. Whether a given djay version still accepts it is not guaranteed.
- **Inferred** — the key or value is verified, but its meaning is deduced from context rather than stated by Algoriddim. Marked *(inferred)*.
- **Unverified** — listed in earlier versions of this document without a traceable source.

The descriptions of what each keyPath does are read from its name and from how the example mappings use it. They are not Algoriddim's wording.

---

## File format

A mapping is an Apple property list in XML with the extension `.djayMidiMapping`. On Windows, users have reported mapping files that contain JSON instead ([thread](https://community.algoriddim.com/t/midi-mapping-file-format/23308)); this document covers the XML form only.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>controls</key>
    <array>
        <!-- one <dict> per mapped control -->
    </array>
    <key>editor</key>
    <string>djay-5.3.1</string>
    <key>endpointName</key>
    <string>XONE:K2</string>
    <key>schemeVersion</key>
    <integer>1</integer>
    <key>USBID</key>
    <integer>586153985</integer>
    <key>version</key>
    <integer>0</integer>
</dict>
</plist>
```

### Top-level keys

| Key | Type | In examples | Meaning |
|---|---|---|---|
| `controls` | Array | 5 of 5 | The mapped controls. See [Control entry fields](#control-entry-fields). |
| `editor` | String | 5 of 5 | App version that last saved the file, e.g. `djay Pro 2-2.0.9`, `djay-5.3.1`. |
| `endpointName` | String | 5 of 5 | Name of the MIDI device the mapping belongs to, e.g. `XONE:K2`, `DDJ-REV1`. |
| `schemeVersion` | Integer | 5 of 5 | Always `1`. |
| `version` | Integer | 5 of 5 | `0` in the three examples created from scratch, `2` and `3` in the two edits of built-in mappings. |
| `USBID` | Integer | 3 of 5 | USB identity of the controller: `(vendor ID << 16) \| product ID` *(inferred)*. `586153985` is `0x22F00001`, vendor `0x22F0` (Allen & Heath). It identifies the controller model, not an individual unit or user. |
| `outputs` | Array | 2 of 5 | Output-only entries with no input side, used for level meters. See [Output-only entries](#output-only-entries). |
| `customClassName` | String | 2 of 5 | Name of djay's built-in handler for a natively supported controller, e.g. `DenonMC7000`. Present in edits of built-in mappings. |
| `logoImage` | String | 2 of 5 | Built-in logo resource, e.g. `pioneerLogo`. |
| `supportWebsite` | String | 2 of 5 | Manufacturer support URL. |
| `uuid` | String | 2 of 5 | Identifier of the built-in mapping the file derives from. |
| `userInfo` | Dict | 1 of 5 | Controller-specific settings, e.g. `highResDataOffset` in the MC7000 mapping. |

The two Traktor examples have no `USBID`, so a mapping can be matched to a device by `endpointName` alone *(inferred)*.

### File locations

| Platform | Location | Source |
|---|---|---|
| macOS | `~/Music/djay/MIDI Mappings/` (`~/Music/djay Pro 2/MIDI Mappings/` for djay Pro 2) | [Algoriddim](https://help.algoriddim.com/topic/using-djay/where-does-djay-store-data) |
| Windows | `%HOMEPATH%\Music\djay\MIDI Mappings` | [Algoriddim](https://help.algoriddim.com/user-manual/djay-pro-windows/midi/sharing) |
| iOS / iPadOS | Files app → On My iPhone/iPad → djay (no subfolder) | [Algoriddim staff reply](https://community.algoriddim.com/t/midi-mapping-folder-location-on-ios/39957) |

On macOS and Windows, double-clicking a `.djayMidiMapping` file installs it. On macOS, the Share menu in the MIDI Configuration window has **Show in Finder**. djay reads mapping files at startup, so restart the app after editing one by hand.

---

## Control entry fields

Each element of `controls` is a dict. All keys below are verified.

| Key | Type | Values | Meaning |
|---|---|---|---|
| `keyPath` | String | `target.action` | The djay action. See [Verified keyPaths](#verified-keypaths). |
| `midiChannel` | Integer | `0`–`15` | MIDI channel, zero-based. djay's UI shows 1–16. |
| `midiData` | Integer | `0`–`127` | Note number or CC number. |
| `midiMessageType` | Integer | `1`, `3`, `6` | See [midiMessageType](#midimessagetype). |
| `controlType` | String | `button`, `rotary`, `rotary-64`, `rotary-absolute` | See [controlType](#controltype). Omitted for most entries. |
| `buttonMode` | String | `toggle`, `hold` | See [buttonMode](#buttonmode). |
| `flipped` | Boolean | `true` | "Invert" in MIDI Learn: reverses the direction of a fader, knob or encoder. |
| `pickupMode` | Boolean | `true` | "Pickup mode" in MIDI Learn: the control is ignored until it reaches the on-screen value, which prevents jumps. |
| `rotarySensitivity` | Real | `1`–`300` seen | "Speed" in MIDI Learn *(inferred)*: how far one encoder step moves the target. |
| `rotaryAcceleration` | Integer | `150` seen | "Reaction" in MIDI Learn *(inferred)*: jog wheel response. Only seen on `scratchingMove` and `pitchBendMove`. |
| `modifier` | Boolean | `true` | The entry applies only while the `application.modifier` button is held. See [Shift layers and conditions](#shift-layers-and-conditions). |
| `condition` | String | e.g. `modifier1 == 0` | The entry applies only while the expression is true. See [Shift layers and conditions](#shift-layers-and-conditions). |
| `output` | Dict | | LED feedback. See [LED feedback](#led-feedback-the-output-dict). |
| `headingTitle` | String | | A section heading in the MIDI Learn list. The entry has this key and nothing else. |

Several entries may share the same channel, number and message type. The example mappings do this to make one control drive several actions and to give one control different actions under different `modifier` or `condition` settings.

### midiMessageType

| Value | Message | Count in examples |
|---|---|---|
| `1` | Note On/Off | 1587 |
| `3` | Control Change | 263 |
| `6` | Pitch Bend *(inferred)* | 1 |

The values match the MIDI status nibble minus 8 (`0x9` Note On, `0xB` Control Change, `0xE` Pitch Bend). That would make `0` Note Off, `2` Polyphonic Aftertouch, `4` Program Change and `5` Channel Pressure, but none of those appear in any example.

Buttons do not have to be notes. The Traktor Kontrol S8 example maps buttons that send CC by combining `midiMessageType` `3` with `controlType` `button`.

### controlType

| Value | MIDI Learn label | Use |
|---|---|---|
| *(omitted)* | Button for notes, Fader/Knob for CC | Absolute controls and ordinary buttons. |
| `button` | Button | Needed when a button sends CC instead of notes. |
| `rotary` | Rotary (01h/7Fh) | Endless encoder that sends `1` for one direction and `127` for the other. |
| `rotary-64` | Rotary (3Fh/41h) | Endless encoder that sends values around `64`: `63` and `65`. |
| `rotary-absolute` | Rotary (absolute) | Encoder or jog wheel that sends an absolute position. |

The MIDI Learn labels are from the Algoriddim manual; matching them to the file values is *(inferred)* from the names. The manual's advice for choosing between the rotary types is to try each one.

Inside an `output` dict and in `outputs` entries, `controlType` takes different values: `button-blinking` and `control`.

### buttonMode

| Value | Behavior (per the Algoriddim manual) |
|---|---|
| *(omitted)* | Default: performs the action when pressed. |
| `toggle` | Alternates between two states with each press. |
| `hold` | Active only while the button is held. |

`hold` is used in the examples on `fx1Enabled`–`fx3Enabled`, so that an effect runs only while its button is down. A community member reports that `toggle` has no effect on `application.modifier`.

---

## LED feedback: the `output` dict

When an entry has an `output` key, djay sends MIDI back to the controller to reflect the action's state. This corresponds to the **MIDI Out** checkbox in MIDI Learn.

| Key | Type | Meaning |
|---|---|---|
| *(empty dict)* | | Send feedback on the same channel, number and message type as the input, with default values. |
| `midiMinValue` | Real | Value sent when the action is off. The manual describes it as the LED color when the button is not engaged. |
| `midiMaxValue` | Real | Value sent when the action is on. |
| `midiChannel` | Integer | Send on a different channel than the input. |
| `midiData` | Integer | Send to a different note or CC number than the input. |
| `midiMessageType` | Integer | Send a different message type than the input. |
| `flipped` | Boolean | "Invert" under MIDI Out: reverses the output signal. |
| `controlType` | String | `button-blinking`: the LED blinks. Seen on the MC7000 pad layers. |

Only keys that differ from the input side need to be present. On controllers with RGB pads, `midiMinValue` and `midiMaxValue` select colors, which is why the examples contain values such as `17` and `49` instead of `0` and `127`.

```xml
<key>output</key>
<dict>
    <key>midiMinValue</key>
    <real>1</real>
    <key>midiMaxValue</key>
    <real>49</real>
</dict>
```

The MIDI Learn option **Blend** ("smooths the transition between values") has no identified key in the examples.

### Output-only entries

The top-level `outputs` array holds feedback that has no matching input, such as channel level meters. Entries use the same keys as a control entry, with `controlType` `control`.

```xml
<key>outputs</key>
<array>
    <dict>
        <key>controlType</key>
        <string>control</string>
        <key>keyPath</key>
        <string>turntable1.monoMeter</string>
        <key>midiChannel</key>
        <integer>0</integer>
        <key>midiData</key>
        <integer>2</integer>
        <key>midiMessageType</key>
        <integer>3</integer>
        <key>midiMinValue</key>
        <real>37</real>
        <key>midiMaxValue</key>
        <real>123</real>
    </dict>
</array>
```

`turntable{N}.monoMeter` is the only keyPath seen in `outputs`. It never appears in `controls`.

---

## Shift layers and conditions

### `modifier`: the user shift layer

Map a button to `application.modifier`. Every entry with `<key>modifier</key><true/>` then applies only while that button is held. In MIDI Learn this is the "Controller Shift Key" action under the General target, and shifted entries are listed with "(SHIFT)".

```xml
<!-- The shift button -->
<dict>
    <key>keyPath</key>
    <string>application.modifier</string>
    <key>midiChannel</key>
    <integer>15</integer>
    <key>midiData</key>
    <integer>15</integer>
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>output</key>
    <dict/>
</dict>

<!-- Same knob as the unshifted mapping, different action while shift is held -->
<dict>
    <key>keyPath</key>
    <string>turntable1.filter</string>
    <key>midiChannel</key>
    <integer>15</integer>
    <key>midiData</key>
    <integer>13</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
    <key>modifier</key>
    <true/>
</dict>
```

There is one `modifier` layer, and it is momentary: a community member reports that `buttonMode` `toggle` does not latch it.

### Hardware shift

Many controllers handle shift themselves and send a different note, CC or channel while their shift button is held. Those arrive as separate controls and are mapped like any other entry, with no `modifier` key. The DDJ-REV1 and MC7000 examples work this way.

### `condition`: built-in modifier state

Mappings for natively supported controllers use `condition` to make an entry depend on a named state variable, typically the current pad mode or which deck a side of the controller is assigned to.

```xml
<dict>
    <key>condition</key>
    <string>modifier5 == 0</string>
    <key>keyPath</key>
    <string>turntable1.fx1WetDryValue</string>
    <key>midiChannel</key>
    <integer>8</integer>
    <key>midiData</key>
    <integer>0</integer>
    <key>midiMessageType</key>
    <integer>3</integer>
</dict>
```

Syntax, as reported in the community thread:

| Form | Example | Verified in examples/ |
|---|---|---|
| Equality | `modifier1 == 0` | Yes |
| Inequality | `modifier1 != 0` | No |
| Conjunction | `(modifier2 == 1) && (modifier4 == 0)` (written `&amp;&amp;` in XML) | No |
| Conjunction | `modifier1 == 1 AND modifier5 == 0` | No |

Limits:

- The variables are set by djay's built-in handler for that controller (`customClassName`). No known keyPath sets them, so `condition` only works in edits of built-in mappings that already use it.
- Variable names and values differ between controllers. Most mappings use `modifier1`–`modifier6`; some use descriptive names instead.
- MIDI Learn has no field for `condition`. Entries created in MIDI Learn have none, so add it by hand, or duplicate an existing conditioned entry in the XML and change its keyPath.

`condition` and `modifier` can be combined on one entry to get a shift layer inside a pad mode.

#### Values in the Denon MC7000 example

`modifier1`–`modifier4` hold the pad mode of decks 1–4. The meaning of each value is *(inferred)* from the actions mapped under it.

| Value | Actions mapped under it | Pad mode |
|---|---|---|
| `0` | `cueOrJumpIfAlreadySet`, `clearCuePoint` | Hot Cue |
| `2` | *(no action assigned)* | Instant FX, per the thread |
| `3` | `cueOrJumpIfAlreadySetAndAutoloop`, `…AndReloop` | Cue Loop |
| `7` | `bounceLoop…BeatInterval` | Bounce Loop |
| `9`, `10` | `slicer8Slice` | Slicer, Slicer Loop |
| `11`, `12` | `sampler.turntable{N}.player…` | Sampler |
| `13` | `saveLoopIfLoopingOrActivate`, `…OrReloop` | Saved Loop |
| `15` | *(no action assigned)* | Pitch Play, per the thread |

`modifier5` is `0` when the left side controls deck 1 and `1` for deck 3. `modifier6` is `0` for deck 2 and `1` for deck 4.

#### Values in the Pioneer DDJ-REV1 example

`modifier1` is `0` when the left side controls deck 1 and `1` for deck 3. `modifier2` is `0` for deck 2 and `1` for deck 4. Pad modes are not conditions on this controller: the pads send different note numbers in each pad mode.

---

## Verified keyPaths

A keyPath is `target.action`. Targets:

| Target | Scope |
|---|---|
| `turntable1` … `turntable4` | One deck. Written `turntable{N}` below. |
| `turntableSelected` | The currently selected deck. Seen once, as `turntableSelected.playPause`. |
| `mixer` | Mixer. |
| `musicLibrary` | Library browser. |
| `sampler` | Sampler. |
| `application` | Global ("General" in MIDI Learn). |

A bare target with no action, such as `turntable1` or `musicLibrary`, is a control that was learned and given a target but no action. It does nothing, and the example mappings contain hundreds of them. Use one to reserve or silence a control.

Table columns:

- **Input** — the kind of control the examples map it to: `Note` for a button or pad, `CC` for a fader or knob, `Encoder` for a CC with a rotary `controlType`. A button that sends CC works too, with `controlType` `button`.
- **LED** — `Yes` if at least one example gives the entry an `output` dict. `—` means no example does, not that feedback is impossible.

`[1-8]` means one keyPath per number, e.g. `turntable1.clearCuePoint1` through `turntable1.clearCuePoint8`. A range shows the numbers that appear in the examples.

### Transport

| Action | keyPath | Input | LED |
|---|---|---|---|
| Play/pause | `turntable{N}.playPause` | Note | Yes |
| Cue button (CDJ style, main cue point) | `turntable{N}.cuePositionOrJumpConsideringPlayState1` | Note | Yes |
| Jump to track start | `turntable{N}.gotoBeginning` | Note | — |
| Jump to start and pause | `turntable{N}.gotoBeginningAndPause` | Note | Yes |
| Jump to start and play | `turntable{N}.gotoBeginningAndPlay` | Note | Yes |
| Jump to start | `turntable{N}.gotoZero` | Note | Yes |
| Set or jump to start point | `turntable{N}.startPoint` | Note | — |
| Clear start point | `turntable{N}.clearStartPoint` | Note | — |
| Reverse | `turntable{N}.reverse` | Note | Yes |
| Censor (reverse while held) | `turntable{N}.censor` | Note | Yes |
| Backspin | `turntable{N}.backspin` | Note | — |
| Slip mode | `turntable{N}.deckSlipToggle` | Note | Yes |
| Load selected track to this deck | `turntable{N}.loadTrack` | Note | — |

### Tempo, pitch and sync

| Action | keyPath | Input | LED |
|---|---|---|---|
| Tempo fader | `turntable{N}.speed` | CC | — |
| Reset tempo | `turntable{N}.resetSpeed` | Note | Yes |
| Sync | `turntable{N}.bpmSync` | Note | Yes |
| Tap BPM | `turntable{N}.bpmTap` | Note | — |
| Set downbeat | `turntable{N}.downBeat` | Note | Yes |
| Pitch bend down (held) | `turntable{N}.pitchBendMinus` | Note | Yes |
| Pitch bend up (held) | `turntable{N}.pitchBendPlus` | Note | Yes |
| Key shift | `turntable{N}.pitch` | Encoder | — |
| Reset key shift | `turntable{N}.resetPitch` | Note | — |
| Key lock | `turntable{N}.key` | Note | Yes |
| Match key | `turntable{N}.matchKey` | Note | Yes |
| Tempo fader range: next | `application.tempoSliderRangeNext` | Note | Yes |
| Tempo fader range: wider | `application.tempoSliderRangePlus` | Note | Yes |
| Tempo fader range: narrower | `application.tempoSliderRangeMinus` | Note | Yes |

### Jog wheel

| Action | keyPath | Input | LED |
|---|---|---|---|
| Jog touch (scratch engaged) | `turntable{N}.scratchingMode` | Note | — |
| Jog turn, scratching | `turntable{N}.scratchingMove` | Encoder | — |
| Jog turn, pitch bend | `turntable{N}.pitchBendMove` | Encoder | — |
| Jog turn, seek | `turntable{N}.jogSeekMove` | Encoder | — |
| Toggle jog between scratch and pitch bend | `turntable{N}.jogPitchBendModeToggle` | Note | Yes |
| Needle search strip | `turntable{N}.scrubbing` | CC | — |
| Start/stop time (platter brake speed) | `application.stopDelay` | CC | — |

Jog entries in the examples carry `rotarySensitivity` (`20`–`300`) and, for `scratchingMove` and `pitchBendMove`, `rotaryAcceleration` `150`.

### Cue points

| Action | keyPath | Input | LED |
|---|---|---|---|
| Hot cue: set if empty, else jump | `turntable{N}.cueOrJumpIfAlreadySet[1-8]` | Note | Yes |
| Hot cue, then start an auto loop | `turntable{N}.cueOrJumpIfAlreadySetAndAutoloop[1-8]` | Note | Yes |
| Hot cue, then re-enter the loop | `turntable{N}.cueOrJumpIfAlreadySetAndReloop[1-8]` | Note | Yes |
| Set cue point | `turntable{N}.cuePosition[1-4]` | Note | — |
| Jump to cue point, respecting play state | `turntable{N}.jumpToCueConsideringPlayState[1-4]` | Note | Yes |
| Clear cue point | `turntable{N}.clearCuePoint[1-8]` | Note | Yes |
| Clear all cue points | `turntable{N}.resetCuePoints` | Note | — |

### Loops

| Action | keyPath | Input | LED |
|---|---|---|---|
| Loop in | `turntable{N}.loopIn` | Note | Yes |
| Loop out | `turntable{N}.loopOut` | Note | Yes |
| Loop out, or reloop/exit if a loop exists | `turntable{N}.loopOutAndReloopOrUnloop` | Note | — |
| Loop on/off, reloop when off | `turntable{N}.loopingActiveAndReloopWhenOff` | Note | Yes |
| Reloop | `turntable{N}.reloop` | Note | Yes |
| Auto loop on/off | `turntable{N}.autoLoopOnOff` | Note | Yes |
| Auto loop length | `turntable{N}.autoLoopDurationRotary` | Encoder | — |
| Halve loop | `turntable{N}.autoLoopDurationHalf` | Note | Yes |
| Double loop | `turntable{N}.autoLoopDurationDouble` | Note | Yes |
| Save loop to slot, or activate saved loop | `turntable{N}.saveLoopIfLoopingOrActivate[1-8]` | Note | Yes |
| Save loop to slot, or reloop saved loop | `turntable{N}.saveLoopIfLoopingOrReloop[1-8]` | Note | Yes |

Fixed-length loops encode the length in beats in the name, with the decimal point dropped: `0125` is 0.125 beats (1/8).

| Length in beats | Auto loop | Bounce loop (loop roll, held) |
|---|---|---|
| 1/16 | — | `turntable{N}.bounceLoop00625BeatInterval` |
| 1/8 | `turntable{N}.autoLoop0125BeatInterval` | `turntable{N}.bounceLoop0125BeatInterval` |
| 1/4 | `turntable{N}.autoLoop025BeatInterval` | `turntable{N}.bounceLoop025BeatInterval` |
| 1/2 | `turntable{N}.autoLoop05BeatInterval` | `turntable{N}.bounceLoop05BeatInterval` |
| 1 | `turntable{N}.autoLoop1BeatInterval` | `turntable{N}.bounceLoop1BeatInterval` |
| 2 | `turntable{N}.autoLoop2BeatInterval` | `turntable{N}.bounceLoop2BeatInterval` |
| 4 | `turntable{N}.autoLoop4BeatInterval` | `turntable{N}.bounceLoop4BeatInterval` |
| 8 | `turntable{N}.autoLoop8BeatInterval` | `turntable{N}.bounceLoop8BeatInterval` |
| 16 | `turntable{N}.autoLoop16BeatInterval` | `turntable{N}.bounceLoop16BeatInterval` |

All are sent as notes and have LED output in the examples.

### Beat jump

| Action | keyPath | Input | LED |
|---|---|---|---|
| Jump forward | `turntable{N}.skipForward0125Beats`, `…025Beats`, `…05Beats`, `…1Beat`, `…2Beats`, `…4Beats` | Note | Yes |
| Jump backward | `turntable{N}.skipBackward0125Beats`, `…025Beats`, `…05Beats`, `…1Beat`, `…2Beats`, `…4Beats` | Note | Yes |

The 1-beat keyPaths end in `Beat`; the others end in `Beats`.

### Slicer

| Action | keyPath | Input | LED |
|---|---|---|---|
| Slice 1–8 | `turntable{N}.slicer8Slice[1-8]` | Note | Yes |

### Pad mode selection

| Action | keyPath | Input | LED |
|---|---|---|---|
| Hot Cue | `turntable{N}.padModeHotCue` | Note | — |
| Auto Loop | `turntable{N}.padModeAutoLoop` | Note | — |
| Bounce Loop | `turntable{N}.padModeBounceLoop` | Note | — |
| Skipping | `turntable{N}.padModeSkipping` | Note | — |
| Sampler | `turntable{N}.padModeSampler` | Note | — |
| Neural Mix | `turntable{N}.padModeUnmixer` | Note | — |
| Instant FX | `turntable{N}.padModeInstantFX` | Note | — |
| Pitch Play | `turntable{N}.padModePitchPlay` | Note | — |
| Empty | `turntable{N}.padModeEmpty` | Note | — |

These switch the on-screen pad mode. They do not change the `modifierN` variables that `condition` reads.

### Effects

| Action | keyPath | Input | LED |
|---|---|---|---|
| FX unit on/off | `turntable{N}.fxActive` | Note | Yes |
| FX slot on/off | `turntable{N}.fx[1-3]Enabled` | Note | Yes |
| FX slot: next effect | `turntable{N}.fx[1-3]SelectNext` | Note | Yes |
| FX slot wet/dry | `turntable{N}.fx[1-3]WetDryValue` | CC | — |
| FX slot parameter | `turntable{N}.fx[1-3]ParameterValue` | Encoder | — |
| FX slot parameter down | `turntable{N}.fx[1-3]ParameterValueMinus` | Note | — |
| FX slot parameter up | `turntable{N}.fx[1-3]ParameterValuePlus` | Note | — |
| Instant FX pad | `turntable{N}.instantFx[1-8]` | Note | Yes |
| Held effect: bit crusher | `turntable{N}.fxBounceBitCrusher` | Note | Yes |
| Held effect: echo censor | `turntable{N}.fxBounceEchoCensor` | Note | Yes |
| Held effect: echo extreme | `turntable{N}.fxBounceEchoExtreme` | Note | Yes |
| Held effect: flanger | `turntable{N}.fxBounceFlanger` | Note | Yes |
| Held effect: high-pass echo | `turntable{N}.fxBounceHighPassEcho` | Note | Yes |
| Held effect: low-pass echo | `turntable{N}.fxBounceLowPassEcho` | Note | Yes |

### EQ, gain and filter

| Action | keyPath | Input | LED |
|---|---|---|---|
| Gain | `turntable{N}.gain` | CC | — |
| High EQ | `turntable{N}.highEQ` | CC | — |
| Mid EQ | `turntable{N}.midEQ` | CC | — |
| Low EQ | `turntable{N}.lowEQ` | CC | — |
| Filter | `turntable{N}.filter` | CC | — |
| Reset filter | `turntable{N}.resetFilter` | Note | — |

These belong to the deck target, not `mixer`.

### Neural Mix

| Action | keyPath | Input | LED |
|---|---|---|---|
| Mute stem 1–4 | `turntable{N}.unmixerGenericChannel[1-4]Muted` | Note | Yes |
| Solo stem 1–4 | `turntable{N}.unmixerGenericChannel[1-4]Solo` | Note | Yes |

### Mixer

| Action | keyPath | Input | LED |
|---|---|---|---|
| Channel fader | `mixer.lineVolume[1-4]` | CC | — |
| Crossfader | `mixer.crossfade` | CC | — |
| Crossfader curve | `mixer.crossfadeStyle` | CC | — |
| Video crossfader | `mixer.videoCrossfade` | CC | — |
| Master volume | `mixer.masterLevel` | CC | — |
| Headphone cue for channel | `mixer.monitorActive[1-4]` | Note | Yes |
| Center the cue/master mix | `mixer.monitorMixToMiddle` | Note | Yes |
| Automatic transition to the left deck | `mixer.transitionLeft` | Note | — |
| Automatic transition to the right deck | `mixer.transitionRight` | Note | — |

### Library

| Action | keyPath | Input | LED |
|---|---|---|---|
| Scroll track list | `musicLibrary.libraryRotary` | Encoder | — |
| Scroll track list (deck target) | `turntable{N}.libraryRotary` | Encoder | — |
| Scroll sections | `musicLibrary.sectionRotary` | Encoder | — |
| Back | `musicLibrary.libraryBack` | Note | Yes |
| Load selected track to deck | `musicLibrary.load[1-4]` | Note | — |
| Switch library source | `musicLibrary.toggleLibrarySource` | Note | Yes |
| Show/hide library | `musicLibrary.toggleLibraryVisible` | Note | Yes |
| Preview selected track | `musicLibrary.togglePreview` | Note | — |
| Focus the source list | `musicLibrary.focusSources` | Note | Yes |
| Focus the queue | `musicLibrary.focusQueue` | Note | Yes |
| Add/remove selected tracks to the queue | `musicLibrary.markUnmarkSelectedSongs` | Note | Yes |

Library encoders in the examples use `controlType` `rotary`, usually with `flipped`.

### Sampler

| Action | keyPath | Input | LED |
|---|---|---|---|
| Sampler volume | `sampler.volume` | CC | — |
| Trigger sample pad | `sampler.turntable{N}.player[1-8].playingConsideringHoldSetting` | Note | Yes |
| Stop sample pad | `sampler.turntable{N}.player[1-8].paused` | Note | Yes |

The sampler pads are addressed per deck side: `sampler.turntable1.player3.…`.

### Application

| Action | keyPath | Input | LED |
|---|---|---|---|
| Controller shift key | `application.modifier` | Note | Yes |

### Output only

| Action | keyPath |
|---|---|
| Channel level meter | `turntable{N}.monoMeter` |

### Reported in the community thread

Quoted from real mappings in the [modifiers thread](https://community.algoriddim.com/t/how-to-work-with-modifiers-in-the-midi-mapping-xml/32183), but not present in examples/:

| Action | keyPath |
|---|---|
| Clear saved loop | `turntable{N}.clearSavedLoop[1-8]` |
| Route FX slot 1 to a Neural Mix stem (the thread's author found it after mapping "FX1 Assignment Drums" in MIDI Learn) | `turntable{N}.fx1RoutingInstrumental` |

---

## Unverified keyPaths

Earlier versions of this document listed the keyPaths below. None of them appears in the example mappings or in a source that quotes a real mapping file, and this document was originally drafted with AI assistance, so some of these are likely invented. They are kept so that nobody has to rediscover which ones were already suspected.

To check one, map the action in MIDI Learn, save, and read the keyPath djay writes to the file. Please move confirmed ones into the tables above.

| Area | keyPaths |
|---|---|
| Transport | `turntable{N}.seekForward`, `seekBackward`, `loadNextTrack`, `loadPreviousTrack`, `brakeTransitionEffect` |
| Tempo and pitch | `turntable{N}.speedPlus`, `speedMinus`, `speedRelative`, `pitchOnOff`, `tempoRangeToggle`, `turntableIsSyncMaster`, `toggleQuantize` |
| Jog | `turntable{N}.jogSeekModeToggle` |
| Cue points | `turntable{N}.cuePosition[5-8]`, `cuePositionOrJumpConsideringPlayState[2-8]`, `clearEndPoint` |
| Loops | `turntable{N}.loopingActive`, `bounceLoopDrums025BeatInterval`, `bounceLoopDrums05BeatInterval`, `bounceLoopDrums1BeatInterval` |
| Beat jump | `turntable{N}.skipForward`, `skipBackward`, `skipRotary`, `skipDurationRotary`, `skipDurationUp`, `skipDurationDown` |
| Slicer | `turntable{N}.slicerRepeatDurationDouble`, `slicerRepeatDurationHalf` |
| Effects | `turntable{N}.fxBounceLowPass`, `fxBounceHighPass` |
| EQ and gain | `turntable{N}.resetGain` |
| Beat grid | `turntable{N}.beatGridEdit`, `beatGridLock`, `beatGridShiftLeft`, `beatGridShiftRight`, `beatGridDouble`, `beatGridHalve`, `beatGridReset`, `bpmAndDownBeatRestoreAnalyzed`, `reAnalyzeTrack`, `shiftDownBeatLeft`, `shiftDownBeatRight` |
| Neural Mix | `turntable{N}.unmixerThreeTrackChannel[1-3]Muted`, `unmixerThreeTrackChannel[1-3]Volume`, `unmixerFourTrackChannel[1-4]VolumeEQ`, `toggleUnmixerEQMode`, `application.toggleUnmixerEQMode` |
| Mixer | `mixer.monitorMix`, `monitorLevel`, `monitorLevelMuteOnOff`, `transitionTypeStandard`, `transitionTypeBrake`, `transitionTypeEcho` |
| Library | `musicLibrary.libraryDown`, `loadSelection`, `focusTracks`, `previewTrack`, `unmarkSelectedSongs`, `autoMixToggle` |
| Sampler | `sampler.toggleSamplerShown`, `sampler.player[1-8].playingConsideringHoldSetting` |
| Application | `application.reverse`, `gain`, `filter`, `automix`, `recordToggle`, `showPreferences`, `toggleLibrary`, `toggleSampler`, `undo`, `redo` |
| Video | `video.toggle`, `video.fullScreen`, `video.transition` |

A separate community spreadsheet, [DJKontrol MIDI Map](https://community.algoriddim.com/t/list-of-available-midi-actions-in-djay/12165/40), lists about 440 keyPaths. It was not used as a source here: it omits most of the keyPaths verified above and its author describes it as untested. The older [community actions list](https://community.algoriddim.com/t/list-of-available-midi-actions-in-djay/12165) describes the actions by their MIDI Learn names and is a good guide to what exists, but it does not give keyPaths.
