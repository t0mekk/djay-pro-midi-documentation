# djay Pro MIDI Mapping Documentation

Unofficial documentation for creating, editing and understanding MIDI mappings in Algoriddim djay Pro, including the `.djayMidiMapping` file format.

Algoriddim does not document the file format and does not support editing it by hand. This documentation was drafted with AI assistance and then checked against real mapping files and Algoriddim's manual. [REFERENCE.md](REFERENCE.md#sources-and-verification) states what each part is based on and separates verified content from unverified.

## Documents

| Document | Purpose | Audience |
|----------|---------|----------|
| [BEGINNER.md](BEGINNER.md) | From mapping a button in MIDI Learn to editing the file by hand | New users |
| [REFERENCE.md](REFERENCE.md) | File format, every known key, conditions, and the keyPath list | All users |
| [examples/](examples/) | Five real mapping files with notes on what each demonstrates | All users |

## The format at a glance

A mapping is an Apple property list in XML with the extension `.djayMidiMapping`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>controls</key>
    <array>
        <!-- one <dict> per mapped control -->
    </array>
    <key>endpointName</key>
    <string>XONE:K2</string>
    <key>USBID</key>
    <integer>586153985</integer>
</dict>
</plist>
```

Each control is a dict:

```xml
<dict>
    <key>keyPath</key>
    <string>turntable1.playPause</string>    <!-- target.action -->
    <key>midiChannel</key>
    <integer>0</integer>                      <!-- 0-15; djay's UI shows 1-16 -->
    <key>midiData</key>
    <integer>11</integer>                     <!-- note or CC number, 0-127 -->
    <key>midiMessageType</key>
    <integer>1</integer>                      <!-- 1 = Note, 3 = Control Change -->
    <key>output</key>
    <dict/>                                   <!-- send LED feedback -->
</dict>
```

Optional keys change how the control behaves:

| Key | Purpose |
|-----|---------|
| `controlType` | `button`, `rotary`, `rotary-64`, `rotary-absolute` |
| `buttonMode` | `toggle` or `hold` |
| `flipped`, `pickupMode`, `rotarySensitivity`, `rotaryAcceleration` | Invert, pickup mode, encoder speed, jog response |
| `modifier` | Active only while the Controller Shift Key (`application.modifier`) is held |
| `condition` | Active only in a given pad mode or deck layer, e.g. `modifier1 == 0` |
| `output` | LED feedback: values, and optionally a different note, CC or channel |

## File locations

| Platform | Location |
|----------|----------|
| macOS | `~/Music/djay/MIDI Mappings/` |
| Windows | `%HOMEPATH%\Music\djay\MIDI Mappings` |
| iOS / iPadOS | Files app → On My iPhone/iPad → djay |

On macOS and Windows, double-clicking a mapping file installs it. Restart djay after editing a file by hand.

## External resources

Official:

- [How to custom map a controller using MIDI Learn](https://help.algoriddim.com/topic/hardware/how-to-map-a-controller)
- User manual, MIDI mapping: [Mac](https://help.algoriddim.com/user-manual/djay-pro-mac/midi/mapping), [Windows](https://help.algoriddim.com/user-manual/djay-pro-windows/midi/mapping), [iOS](https://help.algoriddim.com/user-manual/djay-ios/midi/mapping)
- [Where djay stores its data](https://help.algoriddim.com/topic/using-djay/where-does-djay-store-data)

Community:

- [How to work with modifiers in the MIDI Mapping XML](https://community.algoriddim.com/t/how-to-work-with-modifiers-in-the-midi-mapping-xml/32183)
- [List of available MIDI actions in djay](https://community.algoriddim.com/t/list-of-available-midi-actions-in-djay/12165), described by their MIDI Learn names
- [DJ TechTools mapping library](https://maps.djtechtools.com/), with user-made djay mappings

## Contributing

The most useful contribution is a confirmed keyPath. Map an action in MIDI Learn, save, open the file, and report the `keyPath` djay wrote along with your djay version. The [unverified list](REFERENCE.md#unverified-keypaths) is the place to start.
