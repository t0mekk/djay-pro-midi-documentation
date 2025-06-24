
The function that corresponds to the typical DJ CUE button is:

**`turntable{N}.cuePositionOrJumpConsideringPlayState1`**

This `keyPath` perfectly emulates the behavior of a CUE button on a standard CDJ or controller:

1.  **When the track is PAUSED:**
    *   Pressing the button sets the **main cue point** (the primary, white-colored cue flag in the djay Pro UI) at the current playhead position.
    *   Holding the button down will play the track from that cue point **momentarily**.
    *   Releasing the button will stop playback and return the playhead to that cue point. This allows for "stutter" starts.

2.  **When the track is PLAYING:**
    *   Pressing the button will immediately stop playback and return the playhead to the previously set **main cue point**.

The `...ConsideringPlayState` part of the name is key, as it indicates the function's logic changes depending on whether the deck is playing or paused. The `...1` at the end specifies that it controls the **primary cue point**, not one of the numbered hot cues.

### Implementation Example

Here is how you would map the CUE button for Deck 1 in your `.djayMidiMapping` file. This button would typically be a momentary push-button sending a Note On/Off message.

```xml
<!-- CUE Button for Deck 1 -->
<dict>
    <key>keyPath</key>
    <string>turntable1.cuePositionOrJumpConsideringPlayState1</string>
    <key>midiChannel</key>
    <integer>0</integer>
    <key>midiData</key>
    <integer>12</integer> <!-- Example MIDI Note Number for the CUE button -->
    <key>midiMessageType</key>
    <integer>1</integer>
    <key>controlType</key>
    <string>button</string>
    <!-- The output block makes the button's LED light up when a cue point is set and the track is paused at that point -->
    <key>output</key>
    <dict>
        <key>midiMinValue</key>
        <real>0</real>
        <key>midiMaxValue</key>
        <real>127</real>
    </dict>
</dict>
```

### Main CUE vs. Hot Cues

It's important to distinguish this from the hot cue functions:

*   **Main CUE Button (this function):** `turntable{N}.cuePositionOrJumpConsideringPlayState1`
    *   This is for the single, dedicated CUE button usually found next to the Play/Pause button.

*   **Hot Cue Pads:** `turntable{N}.cueOrJumpIfAlreadySet[1-8]`
    *   This is for the 1-8 performance pads used to set and trigger secondary cue points (often colored blue, green, etc.). These functions do not affect the main CUE point.
