# djay Pro MIDI Mapping Documentation

Complete documentation for creating, editing, and understanding MIDI mappings in djay Pro.

## Documentation Structure

| Document | Purpose | Audience |
|----------|---------|----------|
| [BEGINNER.md](BEGINNER.md) | Step-by-step tutorial from first mapping to advanced techniques | New users |
| [REFERENCE.md](REFERENCE.md) | Complete reference: all keyPaths, MIDI types, file format | All users |

## Example Mappings

The [examples/](examples/) directory contains real-world mapping files for study and reference:

| Controller | File | Highlights |
|------------|------|------------|
| **Allen & Heath XONE:K2** | `XONE_K2_Mapping_V1_By_LaFleurLabs.djayMidiMapping` | 4-deck mapping on single MIDI channel, full mixer, EQ, FX, library |
| **Pioneer DDJ-REV1** | `Pioneer_DDJ-REV1_Edit_by_ALEXYUS_DJ.djayMidiMapping` | Multi-channel layout, modifier layers, Serato-oriented controller adapted for djay |
| **Denon MC7000** | `Denon_DJ_MC7000_Edit_1.djayMidiMapping` | Large professional controller with extensive feature coverage |
| **Native Instruments Traktor S8** | `Traktor_Kontrol_S8.djayMidiMapping` | Screen controller with display feedback |
| **Native Instruments Traktor X1 MK2** | `Traktor_Kontrol_X1_MK2.djayMidiMapping` | Compact effects controller mapping |

## Quick Start

1. **New to MIDI mapping?** Start with [BEGINNER.md](BEGINNER.md) — it walks you through creating your first mapping step by step.
2. **Looking for a specific function?** Use [MAIN.md](MAIN.md) — the complete keyPath reference with all available actions.
3. **Want to study real mappings?** Browse the [examples/](examples/) directory to see how experienced users structure their mappings.

## Key Concepts at a Glance

### File Format

djay Pro uses Apple Property List (XML) format with the `.djayMidiMapping` extension:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>USBID</key>
    <integer>586153985</integer>
    <key>controls</key>
    <array>
        <!-- Individual control entries -->
    </array>
</dict>
</plist>
```

### Control Entry Anatomy

```xml
<dict>
    <key>keyPath</key>
    <string>turntable1.playPause</string>    <!-- What djay does -->
    <key>midiChannel</key>
    <integer>0</integer>                      <!-- MIDI channel (0-15) -->
    <key>midiData</key>
    <integer>11</integer>                     <!-- Note/CC number (0-127) -->
    <key>midiMessageType</key>
    <integer>1</integer>                      <!-- 1=Note, 3=CC -->
    <key>output</key>
    <dict/>                                   <!-- LED feedback -->
</dict>
```

### MIDI Message Types

| Value | Type | Use For |
|-------|------|---------|
| `1` | Note On/Off | Buttons, pads, switches |
| `3` | Control Change (CC) | Knobs, faders, encoders |

### Channel Numbering

> djay's UI shows channels 1–16, but mapping files use 0–15. **Subtract 1** from what you see in the MIDI Learn editor.

## File Locations

| Platform | Path |
|----------|------|
| macOS | `~/Music/djay/MIDI Mappings/` |
| Windows | User profile under djay directory |
| iOS | Files app → On My iPad/iPhone → djay |

## External Resources

- [Algoriddim MIDI Learn Guide](https://help.algoriddim.com/topic/hardware/how-to-map-a-controller)
- [Community MIDI Actions List](https://community.algoriddim.com/t/list-of-available-midi-actions-in-djay/12165)
- [Modifiers How-To](https://community.algoriddim.com/t/how-to-work-with-modifiers-in-the-midi-mapping-xml/32183)
