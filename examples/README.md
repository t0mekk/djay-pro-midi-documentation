# Example MIDI Mappings

This directory contains real-world `.djayMidiMapping` files for study and reference. Each file demonstrates different approaches to mapping controllers for djay Pro.

> **Note:** These files use the XML plist format. To use any of these mappings, you must replace the `USBID` value with one matching your own controller. See the [beginner's guide](../BEGINNER.md) for instructions.

## Mappings

### Allen & Heath XONE:K2

**File:** `XONE_K2_Mapping_V1_By_LaFleurLabs.djayMidiMapping`

A comprehensive 4-deck mapping by LaFleurLabs that demonstrates:

- **Single-channel design:** All controls on MIDI channel 15
- **Full mixer support:** 4 channel faders, EQ (high/mid/low), gain, and headphone cue per channel
- **Transport & sync:** Play/pause, BPM sync for all 4 decks with LED feedback
- **Loops & FX:** Auto loop, instant FX, and loop duration controls
- **Library browsing:** Rotary encoders with `flipped` and `rotarySensitivity` for library navigation
- **Modifier layers:** Shift-based library loading for decks 3 and 4

**Key patterns to study:**
- Consistent use of `midiMessageType: 1` for buttons and `3` for all continuous controls
- `output` dicts on transport buttons for LED feedback
- Library encoders using `controlType: rotary` with `flipped: true`

---

### Pioneer DDJ-REV1

**File:** `Pioneer_DDJ-REV1_Edit_by_ALEXYUS_DJ.djayMidiMapping`

An edit by ALEXYUS DJ showing how to adapt a Serato-oriented controller for djay Pro:

- **Multi-channel layout:** Decks and FX split across MIDI channels 4, 5, and 6
- **Heavy modifier usage:** `modifier1` and `modifier2` conditions for pad mode layers
- **FX hold behavior:** `buttonMode: hold` on FX enable buttons so effects are only active while pressed
- **Library section:** Dedicated channel 6 for library encoder, source toggle, and load buttons

**Key patterns to study:**
- `condition` expressions like `modifier1 == 0` for context-sensitive mappings
- Separate `midiChannel` per deck side (left/right)
- `buttonMode: hold` for momentary FX engagement

---

### Denon MC7000

**File:** `Denon_DJ_MC7000_Edit_1.djayMidiMapping`

A large professional controller mapping demonstrating:

- **Crossfader and style control:** `mixer.crossfade` with adjustable crossfader curve
- **Sampler integration:** `sampler.volume` mapped to a dedicated knob
- **Library browsing:** Rotary encoder with `flipped: true` for intuitive scrolling
- **Extensive control coverage:** 16,000+ lines of mapping entries

**Key patterns to study:**
- Crossfader curve style mapping (`mixer.crossfadeStyle`)
- Library encoder with both `flipped` and `rotary` control type

---

### Native Instruments Traktor Kontrol S8

**File:** `Traktor_Kontrol_S8.djayMidiMapping`

A mapping for the Traktor S8 screen controller:

- **Screen-based feedback:** Uses `output` dicts for display integration
- **Toggle button mode:** `buttonMode: toggle` for play/pause behavior
- **Compact deck mapping:** Focuses on Deck 2 controls as a template

**Key patterns to study:**
- `buttonMode: toggle` vs. default toggle behavior
- CC-based buttons (`midiMessageType: 3`) with `controlType: button`
- Empty `output` dicts for default LED behavior

---

### Native Instruments Traktor Kontrol X1 MK2

**File:** `Traktor_Kontrol_X1_MK2.djayMidiMapping`

A compact effects controller mapping:

- **Simple layout:** Basic play, cue, and sync for two decks
- **Jog seeking:** Rotary encoder mapped to `jogSeekMove` with fine sensitivity
- **Clean structure:** Minimal mapping ideal for beginners to study

**Key patterns to study:**
- `rotarySensitivity: 1` for fine-grained jog control
- Straightforward 1:1 button-to-action mappings
- No modifier complexity — good starting point for customization

## How to Use These Examples

1. **Open the file** in any text editor to study the structure.
2. **Find a control** you want to understand — search for its `keyPath` (e.g., `turntable1.playPause`).
3. **Copy patterns** — use the XML structure as a template for your own mappings.
4. **Replace the USBID** — never distribute a mapping with your USBID intact; recipients should insert their own.

## File Format

All examples use the Apple XML plist format:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>USBID</key>
    <integer>586153985</integer>
    <key>controls</key>
    <array>
        <!-- control entries -->
    </array>
</dict>
</plist>
```
