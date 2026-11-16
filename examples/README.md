# Example MIDI Mappings

Five real `.djayMidiMapping` files, saved by djay, for study and reference. They are the evidence behind the "verified" sections of [REFERENCE.md](../REFERENCE.md).

| File | Controller | Saved by | Controls |
|---|---|---|---|
| `XONE_K2_Mapping_V1_By_LaFleurLabs.djayMidiMapping` | Allen & Heath XONE:K2 | djay 5.3.1 | 75 |
| `Pioneer_DDJ-REV1_Edit_by_ALEXYUS_DJ.djayMidiMapping` | Pioneer DDJ-REV1 | djay 5.2.5 | 725 |
| `Denon_DJ_MC7000_Edit_1.djayMidiMapping` | Denon DJ MC7000 | djay Pro 2 (2.1) | 945 |
| `Traktor_Kontrol_S8.djayMidiMapping` | NI Traktor Kontrol S8 | djay Pro 2 (2.0.9) | 54 |
| `Traktor_Kontrol_X1_MK2.djayMidiMapping` | NI Traktor Kontrol X1 MK2 | djay Pro 2 (2.0.13) | 53 |

MIDI channels below are the zero-based values stored in the files. Add 1 for the channel shown in djay's UI.

To use one of these with the same controller, double-click it on macOS or Windows, or copy it into djay's mappings folder (see [File locations](../REFERENCE.md#file-locations)). A mapping is tied to its controller model by `endpointName` and `USBID`, so it will not attach to a different controller.

---

## Allen & Heath XONE:K2

**File:** `XONE_K2_Mapping_V1_By_LaFleurLabs.djayMidiMapping`, by LaFleurLabs

A from-scratch 4-deck mapping for a controller djay does not support natively. The best file to read first.

- Everything is on channel 15, the K2's default (channel 16 in the UI).
- Per deck: play/pause, sync, auto loop, instant FX 1–3, gain, 3-band EQ, filter, channel fader and headphone cue.
- A shift layer built with `application.modifier`: 21 entries carry `modifier` `true`. Shift turns the load buttons for decks 1 and 2 into load buttons for decks 3 and 4, and gives the knobs second functions (`filter`, `resetFilter`, `gain`, `autoLoopDurationRotary`).
- Two encoders scroll the library as `controlType` `rotary`. Their shifted entries (`turntable3.libraryRotary`, `turntable4.libraryRotary`) add `flipped` and `rotarySensitivity` `50`.
- Buttons have `output` dicts for LED feedback.

## Pioneer DDJ-REV1

**File:** `Pioneer_DDJ-REV1_Edit_by_ALEXYUS_DJ.djayMidiMapping`, an edit by ALEXYUS DJ

An edit of djay's built-in mapping (`customClassName` `PioneerDDJREV1`).

- Channel layout: 0–3 are decks 1–4, 4 and 5 are the left and right FX sections, 6 is the browser and mixer, 7–14 are the performance pads (two channels per deck, the second one carrying the shifted pad functions such as `clearCuePoint`).
- The pads send different note numbers in each pad mode, so pad modes need no conditions: 8 modes × 8 pads per channel.
- Deck layers use `condition`: on the FX channels, `modifier1 == 0` selects deck 1 and `modifier1 == 1` deck 3; `modifier2` does the same for decks 2 and 4.
- `buttonMode` `hold` on `fx1Enabled`–`fx3Enabled` makes the effects momentary.
- Pad mode buttons map to `padModeHotCue`, `padModeAutoLoop`, `padModeInstantFX` and the rest, grouped under a `headingTitle` entry.
- A top-level `outputs` array drives the level meters with `turntable{N}.monoMeter`, scaled with `midiMinValue` `37` and `midiMaxValue` `123`.
- About 225 entries are a bare target such as `turntable3` with no action: controls the editor knows about but that do nothing.

## Denon DJ MC7000

**File:** `Denon_DJ_MC7000_Edit_1.djayMidiMapping`

An edit of the built-in mapping (`customClassName` `DenonMC7000`) and the largest example. The best file for studying `condition`.

- Channel layout: 0–3 are decks 1–4, 4–7 are the pads for decks 1–4, 8 and 9 are the two FX units, 15 is global (crossfader, crossfader curve, sampler volume, browser).
- Pad modes are conditions. `modifier1`–`modifier4` hold the pad mode of decks 1–4, and each pad has one entry per mode: `0` hot cues, `3` cue loops, `7` bounce loops, `9` and `10` slicer, `11` and `12` sampler, `13` saved loops. See the [value table](../REFERENCE.md#values-in-the-denon-mc7000-example).
- Deck layers are conditions too. The two FX units serve four decks through `modifier5` (deck 1 or 3) and `modifier6` (deck 2 or 4).
- Pad LEDs use color values in `output` (`midiMinValue`, `midiMaxValue`), with `controlType` `button-blinking` on 136 of them.
- `pickupMode` on the four tempo faders (`turntable{N}.speed`).
- Jog wheels: `scratchingMove` as `rotary` with `rotarySensitivity` `24` and `rotaryAcceleration` `150`.
- `outputs` with four `monoMeter` entries, and a `userInfo` dict with `highResDataOffset`.

## Native Instruments Traktor Kontrol S8

**File:** `Traktor_Kontrol_S8.djayMidiMapping`

A small 2-deck mapping made in MIDI Learn. Channel 0 is deck 1, channel 1 is deck 2. It has no `USBID`.

- The S8's buttons send CC, so they are mapped with `midiMessageType` `3` plus `controlType` `button`.
- Cue points use the separate set, jump and clear actions: `cuePosition[1-4]`, `jumpToCueConsideringPlayState[1-4]`, `clearCuePoint[1-4]`.
- The only `buttonMode` `toggle` in the examples, on `turntable2.playPause`.
- The only `rotary-absolute` control in the examples: a `scratchingMove` entry with `flipped`, `rotarySensitivity` `300` and `rotaryAcceleration` `150`.
- Empty `output` dicts for default LED feedback.

## Native Instruments Traktor Kontrol X1 MK2

**File:** `Traktor_Kontrol_X1_MK2.djayMidiMapping`

A small mapping made in MIDI Learn, all on channel 0, with no `USBID`. It shows several unusual details:

- `output` dicts that redirect feedback to a different note, CC or message type than the input, e.g. a hot cue on note 31 with feedback on CC 97.
- `turntableSelected.playPause`, the only use of the selected-deck target.
- One entry with `midiMessageType` `6`, which is probably pitch bend.
- `mixer.crossfade` driven by encoders, as both `rotary` and `rotary-64`.
- `jogSeekMove` on encoders with `rotarySensitivity` `1` for fine seeking.
- `buttonMode` `hold` on `fx2Enabled` and `fx3Enabled`.
- A button assigned to `application.modifier`, although no entry uses `modifier`.

---

## Finding things in these files

Search for a `keyPath` such as `turntable1.playPause` to see how an action is mapped, or for a key such as `condition` or `pickupMode` to see it in context.

To list every distinct keyPath in a file on macOS or Linux:

```bash
grep -A1 '<key>keyPath</key>' examples/XONE_K2_Mapping_V1_By_LaFleurLabs.djayMidiMapping | grep '<string>' | sort -u
```
