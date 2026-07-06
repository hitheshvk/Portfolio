# Portfolio

## Preview diagnostics-v5 in Cursor Desktop

This repository now includes a built-in preview workflow so you can run and view the diagnostics case study inside Cursor.

### Option 1 (recommended): Run Cursor task

1. Open Command Palette (`Ctrl/Cmd + Shift + P`)
2. Run: `Tasks: Run Task`
3. Select: **Preview: Start diagnostics local server**
4. Open Command Palette again and run: **Simple Browser: Show**
5. Paste: `http://localhost:8000/diagnostics-v5.html`

### Option 2: Run script manually

From terminal in this repo:

```bash
bash scripts/preview-diagnostics.sh
```

Then in Cursor Desktop, open Simple Browser and go to:

`http://localhost:8000/diagnostics-v5.html`

### Stop the preview server

- Run task: **Preview: Stop diagnostics local server**
- or run:

```bash
bash scripts/stop-preview.sh
```
