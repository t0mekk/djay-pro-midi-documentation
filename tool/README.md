# djay MIDI Mapper (prototype)

A single-file, no-install editor for `.djayMidiMapping` files. Touch a control on the hardware, pick a djay action, export.

**Status:** prototype. File import/export is tested against every mapping in [`../examples`](../examples) (lossless round-trip). It has **not** yet been tested with real hardware or by loading an exported file into djay.

## Run

Open `index.html` in **Chrome or Edge** (Safari has no Web MIDI) and allow MIDI access when asked. If the browser refuses MIDI on a `file://` page, serve the folder instead:

```bash
python3 -m http.server 8000 --directory tool
```

Then open `http://localhost:8000`. Without MIDI the tool still works by clicking controls.

## Workflow

1. **Pick a layout** (header, *Layout*).
   - **Xone:K2** — bundled layout ([`layouts/k2.json`](layouts/k2.json)). The MIDI channel (*Ch*) is taken from the first K2 message that arrives on another channel, if nothing is mapped yet.
   - **Your own layout** — create one with *Create layout…* / *Edit layout…* (see [Layouts](#layouts)), or drop a layout `.json` onto the page. This is the suggested path for the Xone:4D.
   - **Learn (Xone:4D / any)** — no layout. Move each control once and it appears as a tile; endless encoders are told apart from pots automatically. Give tiles a label (labels stay in the browser, djay's format has no place for them).
2. **Select a control** by touching it on the hardware (*Follow hardware*), clicking it, or moving with the arrow keys.
3. **Pick an action** — type in the search box (up/down to choose, Enter assigns), or click. *Recent* actions are listed at the top. *fits control* hides actions that do not suit the control type.
4. **Export** and copy the file to `~/Music/djay/MIDI Mappings/`.

Safest start for a new device: do one MIDI Learn in djay so it writes a mapping file with the right device name and ID, then **Import** that file here and carry on. On import, a layout whose `match` fits the device name is selected automatically.

### Features

| Feature | How |
|---|---|
| Shift layer | Map a button to **Shift (modifier)**, switch to the *Shift* layer (or press `S`), map as usual. Each tile shows the other layer's mapping as a small second line. With *Follow hardware* on, holding the mapped Shift button on the hardware shows the Shift layer. |
| Whole row at once | Tick *whole row*: one pick maps every control of the same kind in the row, one deck per column. *Columns → decks* sets which deck each column drives (e.g. `3 1 2 4`). Only offered for layouts with deck columns. |
| LED feedback | Per button: off, default, and (if the layout sets `led`) amber/green, sent as a separate output note at +`led` / +2×`led` (+36 / +72 on the K2). *Flash LED* lights the selected button. |
| Encoders | Mapped as `rotary` automatically; sensitivity and *flipped* are editable. |
| Undo / redo | Header buttons, or `Ctrl/Cmd+Z` (add `Shift` for redo). |
| Copy / paste | `Ctrl/Cmd+C` / `V` copies a mapping to another control of the same message type; the deck is re-targeted by column. |
| Checks | Warns about a Shift layer with no Shift button, double mappings, actions on the wrong control type, a layout channel mismatch, and an empty device name. |
| Lossless edits | Keys the tool does not understand (`condition`, `outputs`, …) are kept as they are. |

Shortcuts: `/` search, `Up`/`Down` + `Enter` pick and assign, arrow keys move between controls, `S` toggle layer, `Delete`/`Backspace` clear the control on the current layer, `Ctrl/Cmd+C`/`V` copy/paste, `Ctrl/Cmd+Z` undo.

## Layouts

A layout only describes what the hardware looks like; mappings never depend on it. Layouts are JSON. The K2 ships as [`layouts/k2.json`](layouts/k2.json) (embedded into `index.html` by `build.mjs`); your own are stored in the browser (localStorage) and are not part of exported files.

**Layout editor** (*Edit layout…* / *Create layout…*): JSON on the left with live validation, a live preview on the right.

- With *add touched controls* ticked, controls you touch on the hardware are appended to the last row; endless encoders are detected automatically.
- *New row*, *Gap* and *Remove last* edit the end of the layout. Click a preview tile to label it.
- *From learned controls* seeds a layout from the controls seen so far.
- *Load .json…* / *Download .json* import and export a layout file. *Save & use* stores it; *Delete layout* removes a user layout.

Example:

```json
{
  "name": "My controller",
  "device": "My Controller",
  "match": "my\\s?controller",
  "channel": 1,
  "decks": [1, 2],
  "rows": [
    "# Mixer",
    ["pot 4 Gain", "pot 5 Gain"],
    ["fader 16 Volume", "fader 17 Volume"],
    "gap",
    ["btn 36 Play", "btn 37 Play"],
    {"decks": false, "cells": ["enc 0 Browse", {"type": "btn", "note": 12, "label": "Load", "led": 4}]}
  ]
}
```

Top-level keys:

| Key | Meaning |
|---|---|
| `name` | Required. Shown in the *Layout* menu. |
| `rows` | Required. List of rows, drawn top to bottom. |
| `channel` | Device MIDI channel, 1-16 (default 1). |
| `decks` | Deck number (1-4) for each column, e.g. `[1, 2, 3, 4]`. Omit for no deck columns. |
| `led` | Note offset for extra LED colours (colour 2 at note + `led`, colour 3 at note + 2×`led`). |
| `device`, `usbId` | Used for new mapping files. |
| `match` | Regular expression on the device name; on import, the first matching layout is picked. |

Rows:

- A list of controls, drawn left to right.
- `"gap"` adds space; `"# Heading"` adds a heading.
- `{"decks": false, "cells": [...]}` is a row that ignores the deck columns.

Controls:

- A string: `"pot 4"`, `"fader 16 Volume"`, `"enc 0 Browse"`, `"btn 36 Play"` (kind, number, optional label). Kinds are `btn`, `pot`, `fader`, `enc`. Buttons default to notes, everything else to CC; override with `"btn cc12"` or `"pot n5"`. A `@16` suffix (e.g. `"btn 36@16 Play"`) puts one control on its own channel. `"-"` is a blank cell.
- An object: `{"type": "btn", "note": 12, "label": "Layer", "led": 4, "w": 2}`. Use `cc` or `note` for the number, `ch` (1-16) for its own channel, `led` to override the LED offset for that button, `w` for width in cells.

**Xone:4D:** no 4D layout is bundled because its MIDI map is not documented in this repository. Create one with *Create layout…*, touching each control (or *From learned controls* after a Learn session), then label the tiles.

## Known limits

- No Xone:4D layout is bundled. Its MIDI map is not documented in this repository; use Learn mode or create your own [layout](#layouts).
- K2 amber/green LEDs, latching layers and the hold-Shift preview are untested on hardware. Layouts you create are untested too.
- Entries with a `condition` can be viewed and removed but not created.

## Updating the action list

The action catalog inside `index.html` is generated from [`../REFERENCE.md`](../REFERENCE.md), and the bundled layouts from `layouts/*.json`:

```bash
node tool/build.mjs
```

Re-run it after changing either; it rewrites the embedded data in `index.html`.
