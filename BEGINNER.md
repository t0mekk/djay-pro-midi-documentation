Of course. Presenting the information in a different way can make it much more accessible. The previous version is an excellent, exhaustive *reference*. This version is structured as a more practical *developer guide*.

It's designed to be read from top to bottom, guiding a user from their very first mapping to advanced techniques, with the full reference available at the end for lookups. It prioritizes workflow and understanding over exhaustive lists at the outset.

---

# The djay Pro MIDI Mapping Guide

Welcome! This guide will teach you how to create and customize MIDI mappings for djay Pro. Whether you want to change a single button or map an entire controller from scratch, you'll find everything you need here.

We'll start with the basics, build up to advanced techniques, and finish with a complete reference for every function.

## 1. Getting Started: Your First Mapping

Let's learn by doing. Our goal is to map a single **Play/Pause button** for Deck 1 and make its LED light up.

### Step 1: Find Your Controller's MIDI Signal

First, you need to know what MIDI message your button sends.

1.  Open djay Pro and connect your MIDI controller.
2.  Go to `Settings` > `MIDI Devices` and select your controller.
3.  Click "Configure..." to open the MIDI mapping editor.
4.  Press the Play/Pause button on your controller. The editor will show you the signal it receives. It will look something like this:
    *   **Type:** Note On
    *   **Channel:** 1
    *   **Note/CC:** 11

    > **Important:** djay's channels are 1-based, but the mapping file is 0-based. So, **Channel 1 in djay is Channel 0** in the file.

### Step 2: Create the Mapping File

A mapping is a simple text file with a `.djayMidiMapping` extension. Create a new file and paste this boilerplate code into it. Change `endpointName` to your controller's name.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>endpointName</key>
    <string>My Awesome Controller</string>
    <key>schemeVersion</key>
    <integer>1</integer>
    <key>version</key>
    <integer>0</integer>
    <key>controls</key>
    <array>
        <!-- Our mappings will go here -->
    </array>
</dict>
</plist>
```

### Step 3: Write the Control Block

Now, let's add the code for our Play/Pause button inside the `<array>` tags. Each mapping is a `<dict>` (dictionary) of keys and values.

```xml
<!-- Play/Pause Button for Deck 1 -->
<dict>
    <!-- What djay function to control? -->
    <key>keyPath</key>
    <string>turntable1.playPause</string>
    
    <!-- What MIDI signal triggers this? (From Step 1) -->
    <key>midiChannel</key>
    <integer>0</integer> <!-- djay said Channel 1, so we use 0 -->
    <key>midiData</key>
    <integer>11</integer> <!-- This is the Note number -->
    <key>midiMessageType</key>
    <integer>1</integer> <!-- 1 = Note Message -->
    
    <!-- How should djay send feedback to the LED? -->
    <key>output</key>
    <dict>
        <key>midiMinValue</key>
        <real>0</real> <!-- Value for OFF (Paused) -->
        <key>midiMaxValue</key>
        <real>127</real> <!-- Value for ON (Playing) -->
    </dict>
</dict>
```

Save this file as `My Awesome Controller.djayMidiMapping`, place it in djay's MIDI Mappings folder, and restart the app. Your button should now work!

---

## 2. Core Concepts Explained

Now that you've made a mapping, let's break down the key concepts.

### The Control Block

Every mapped control is a `<dict>` containing key-value pairs that define its behavior.

| Key | Description |
| :--- | :--- |
| `keyPath` | **The djay Function.** The most important key. It tells djay what to do (e.g., `mixer.lineVolume1`). |
| `midiChannel`| **Which MIDI Channel (0-15).** The channel the controller is sending on. |
| `midiData` | **Which Note/CC Number (0-127).** The specific note or CC for this control. |
| `midiMessageType`| **The Type of Signal.** The most common are `1` (for buttons) and `3` (for knobs/faders). |
| `output` | **LED Feedback.** An optional dictionary that tells djay how to light up your controller's LEDs. |
| `controlType`| **Physical Control Type.** Optional but helpful. It gives djay more context (e.g., `button`, `rotary`). |

### How to Choose `midiMessageType` and `controlType`

This is the most common point of confusion. Here’s a simple way to think about it:

1.  **Is it a button/pad?** Use `midiMessageType: 1` (Note).
2.  **Is it a knob/fader?** Use `midiMessageType: 3` (CC).
3.  **Is it an endless encoder?** Use `midiMessageType: 3` and add a `controlType`:
    *   `controlType: rotary` for encoders that just spin.
    *   `controlType: rotary-64` for encoders that send a "center" value (like jog wheels).

### LED Feedback: The `<output>` Block

The `output` dictionary tells djay how to send MIDI messages back to your controller.

| Configuration | Behavior |
| :--- | :--- |
| **Simple On/Off**<br>`<dict><midiMaxValue/><real>127</real></dict>` | The most common setup. Sends value 127 for "On" and 0 for "Off". You only need to specify `midiMaxValue`. |
| **Custom "On" Value**<br>`<dict><midiMinValue/><real>50</real></dict>` | Useful for controllers with specific brightness levels. Sends 50 for "On" and 0 for "Off". |
| **Default Behavior**<br>`<dict/>` | An empty dictionary tells djay to use its built-in feedback for that function. Use this if you don't need custom values. |

---

## 3. Advanced Techniques

Once you've mastered the basics, you can build powerful, layered mappings.

### Faders, Knobs, and Encoders

These controls use `midiMessageType: 3` (CC).

**Faders & Knobs (Absolute):**
For controls like volume faders or EQ knobs, add `<key>pickupMode</key><true/>` to prevent the value from jumping when the software and hardware are out of sync.

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
    <true/> <!-- Prevents value jumps -->
</dict>
```

**Endless Encoders (Relative):**
For library browsing or parameter scrolling, use `controlType: rotary` or `rotary-64`. Adjust sensitivity with `rotarySensitivity`.

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
    <real>75</real> <!-- Adjust for faster/slower scrolling -->
</dict>
```

### Implementing Shift Layers

There are two ways to create a "shift" button that changes what other controls do.

**Method 1: The `application.modifier` Key (Recommended)**
This is the cleanest, software-based method.

```xml
<!-- 1. The SHIFT button itself is mapped to application.modifier -->
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

<!-- 2. The shifted function. Note the <modifier/> key -->
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
    <true/> <!-- This mapping is only active when the modifier is held -->
</dict>
```

**Method 2: Using Different MIDI Channels**
This method relies on your controller sending signals on a new channel when its shift key is held.

```xml
<!-- Primary function (Play/Pause on Channel 0) -->
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

<!-- Shifted function (Reset Speed on Channel 2) -->
<dict>
    <key>keyPath</key>
    <string>turntable1.resetSpeed</string>
    <key>midiChannel</key>
    <integer>2</integer> <!-- Different channel -->
    <key>midiData</key>
    <integer>11</integer> <!-- Same note -->
    <key>midiMessageType</key>
    <integer>1</integer>
</dict>
```

### Advanced LED Output (Decoupled Feedback)

What if you want a fader's input to control an LED strip's output on a different note? The `output` block can contain its own full MIDI message definition.

```xml
<!-- Input: A fader on CC #19, Channel 0. -->
<!-- Output: A Note On message to Note #12, Channel 11 (e.g., a VU meter). -->
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

## 4. The Complete Function Reference

Use the sections below to find the `keyPath` for any function you want to map.

<details>
<summary><strong> Deck Controls (Play, Pitch, Cues, Loops...)</strong></summary>

| Function | Key Path |
|---|---|
| Play/Pause | `turntable{N}.playPause` |
| Cue (Set/Jump) | `turntable{N}.cuePositionOrJumpConsideringPlayState1` |
| Sync | `turntable{N}.bpmSync` |
| Pitch Fader | `turntable{N}.speed` |
| Pitch Bend (Jog) | `turntable{N}.pitchBendMove` |
| Key Lock | `turntable{N}.key` |
| Reverse Playback | `turntable{N}.reverse` |
| Slip Mode | `turntable{N}.deckSlipToggle` |
| Set Cue 1-8 | `turntable{N}.cueOrJumpIfAlreadySet[1-8]` |
| Clear Cue 1-8 | `turntable{N}.clearCuePoint[1-8]` |
| Go to Start | `turntable{N}.gotoZero` |
| Loop In | `turntable{N}.loopIn` |
| Loop Out | `turntable{N}.loopOut` |
| Activate/Deactivate Loop | `turntable{N}.loopingActive` |
| Halve Loop Length | `turntable{N}.autoLoopDurationHalf` |
| Double Loop Length | `turntable{N}.autoLoopDurationDouble` |
| Jog Wheel Scratch | `turntable{N}.scratchingMove` |
| Jog Wheel Nudge/Seek | `turntable{N}.jogSeekMove` |

</details>

<details>
<summary><strong> Mixer & EQ Controls</strong></summary>

| Function | Key Path |
|---|---|
| Channel Volume Fader | `mixer.lineVolume{N}` |
| Crossfader | `mixer.crossfade` |
| Master Volume | `mixer.masterLevel` |
| Headphone Cue Toggle | `mixer.monitorActive{N}` |
| Headphone Mix (Cue/Master) | `mixer.monitorMix` |
| Headphone Volume | `mixer.monitorLevel` |
| High EQ | `turntable{N}.highEQ` |
| Mid EQ | `turntable{N}.midEQ` |
| Low EQ | `turntable{N}.lowEQ` |
| Filter | `turntable{N}.filter` |
| Reset Filter | `turntable{N}.resetFilter` |
| Gain/Trim | `turntable{N}.gain` |

</details>

<details>
<summary><strong> Library & Browser Controls</strong></summary>

| Function | Key Path |
|---|---|
| Browse (Scroll) | `musicLibrary.libraryRotary` |
| Load to Deck {N} | `musicLibrary.load{N}` |
| Load to selected deck | `musicLibrary.loadSelection` |
| Navigate Folders (Back) | `musicLibrary.toggleLibrarySource` |
| Switch focus to Playlist pane | `musicLibrary.focusSources` |
| Switch focus to Track List | `musicLibrary.focusTracks` |
| Preview Track | `musicLibrary.previewTrack` |
| Add to Queue | `musicLibrary.addToQueue` |

</details>

<details>
<summary><strong> Effects Controls</strong></summary>

| Function | Key Path |
|---|---|
| Master FX On/Off | `turntable{N}.fxActive` |
| Enable FX 1/2/3 | `turntable{N}.fx[1-3]Enabled` |
| FX Wet/Dry Mix | `turntable{N}.fx[1-3]WetDryValue` |
| FX Parameter Knob | `turntable{N}.fx[1-3]ParameterValue` |
| Select Next FX | `turntable{N}.fx[1-3]SelectNext` |
| Instant Effect (Pads) | `turntable{N}.instantFx[1-8]` |
| Bounce Loop Effect | `turntable{N}.bounceLoop[size]BeatInterval` |
| Bounce Filter/Echo Effect | `turntable{N}.fxBounce[EffectName]` |

</details>

<details>
<summary><strong> Application & Global Controls</strong></summary>

| Function | Key Path |
|---|---|
| Shift/Modifier Key | `application.modifier` |
| Toggle Sampler Panel | `application.toggleSampler` |
| Toggle Library Panel | `application.toggleLibrary` |
| Automix On/Off | `application.automix` |
| Start/Stop Recording | `application.recordToggle` |
| Sampler Volume | `sampler.volume` |
| Trigger Sampler Pad 1-8 | `sampler.player[1-8].playingConsideringHoldSetting` |

</details>

---

## 5. Best Practices & Troubleshooting

*   **One Channel Per Deck:** For clarity, map Deck 1 to Channel 0, Deck 2 to Channel 1, and global controls to a high channel like 15.
*   **"No-Op" Mappings:** To disable a button in a shift layer, map it to a non-functional `keyPath` like `application` or `turntable1`. This will override the primary mapping.
*   **My Button Doesn't Work!**
    1.  Check the `midiChannel` first. Remember that djay's UI is 1-based, but the file is 0-based.
    2.  Check the `midiData` (Note/CC number).
    3.  Ensure `midiMessageType` is correct (`1` for buttons, `3` for knobs).
*   **My LED Doesn't Light Up!**
    1.  Make sure you have an `<output>` block.
    2.  The note/CC for your controller's LED might be different from its input. Test with a MIDI monitor or try the advanced Decoupled Feedback method.
