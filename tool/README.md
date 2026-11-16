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

1. **Pick a surface.**
   - **Xone:K2** — full on-screen layout. The MIDI channel is detected from the first message the K2 sends.
   - **Learn (Xone:4D / any)** — no layout. Move each control once and it appears as a tile; endless encoders are told apart from pots automatically. Give tiles a label (labels stay in the browser, djay's format has no place for them).
2. **Select a control** by touching it on the hardware (*Follow hardware*) or clicking it.
3. **Pick an action** — type in the search box and press Enter, or click. *fits control* hides actions that do not suit the control type.
4. **Export** and copy the file to `~/Music/djay/MIDI Mappings/`.

Safest start for a new device: do one MIDI Learn in djay so it writes a mapping file with the right device name and ID, then **Import** that file here and carry on.

### Features

| Feature | How |
|---|---|
| Shift layer | Map a button to **Shift (modifier)**, switch to the *Shift* layer (or press `S`), map as usual. A dot on a tile means the other layer has a mapping too. |
| Whole row at once (K2) | Tick *all 4 columns*: one pick maps the row to four decks. *Columns → decks* sets which deck each column drives (e.g. `3 1 2 4`). |
| LED feedback | Per button: off, default, and on the K2 amber/green (sent as a separate output note at +36 / +72). |
| Encoders | Mapped as `rotary` automatically; sensitivity and *flipped* are editable. |
| Checks | Warns about a Shift layer with no Shift button, double mappings, actions on the wrong control type, and a K2 channel mismatch. |
| Lossless edits | Keys the tool does not understand (`condition`, `outputs`, …) are kept as they are. |

Shortcuts: `/` search, `Enter` assign first result, `S` toggle layer.

## Known limits

- No Xone:4D layout yet. Its MIDI map is not documented in this repository, so it runs in Learn mode.
- K2 amber/green LEDs and latching layers are untested on hardware.
- Entries with a `condition` can be viewed and removed but not created.

## Updating the action list

The action catalog inside `index.html` is generated from [`../REFERENCE.md`](../REFERENCE.md):

```bash
node tool/build-actions.mjs
```
