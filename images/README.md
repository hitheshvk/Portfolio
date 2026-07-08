# Images

Drop your real images into the folders below. The HTML expects the filenames listed under each. You can ship more than these, the site code references the named files first, and extras are available for future case study updates.

## Folder map

```
/images/
  /diagnostics/      Real Diagnostics screens, blueprints, artifacts
  /atlas/            Real Atlas before/after, key surfaces
  /signal/           Real Signal screens, notification frames
  /photography/      Your own photographs for /photography.html
  /portrait/         Optional, a single portrait for About
  README.md          This file
```

## Naming conventions

Use lowercase, hyphen-separated names. Include the artifact type in the filename so it's obvious from a quick `ls`.

| File | What it's for | Recommended size | Aspect ratio |
|---|---|---|---|
| `diagnostics/hero.jpg` | Case study top hero image | 1920×1080 (JPEG, ~150–250 KB) | 16:9 |
| `diagnostics/research.jpg` | Research artifact (notes, transcripts) | 1600×1200 | 4:3 |
| `diagnostics/blueprint.jpg` | Service blueprint photograph | 1920×1080 | 16:9 |
| `diagnostics/concept.jpg` | Wireframe / sketch / iteration | 1600×1200 | 4:3 |
| `diagnostics/shipped-1.jpg` | First shipped screen (big) | 1920×1200 | 8:5 |
| `diagnostics/shipped-2.jpg` | Second shipped screen | 1920×1200 | 8:5 |
| `atlas/...` | Same naming pattern as diagnostics | same sizes | same ratios |
| `signal/...` | Same naming pattern (mobile screens can use 9:16) | same sizes | 16:9 hero, 9:16 mobile |
| `photography/01.jpg` … `photography/12.jpg` | Gallery photos | 1600 px on long edge | mixed (let actual photos dictate) |
| `portrait/portrait.jpg` | Optional portrait for About | 1200×1500 | 4:5 |

## Format guidance

- **Photos**, `.jpg` at quality ~80–85. Run through ImageOptim or `imagemin` before committing.
- **Screens with transparency**, `.png` only when transparency matters. Otherwise `.jpg`.
- **`.webp`**, supported if you can generate it; the markup falls back to `.jpg` cleanly.
- **Max width**, 1920 px is the ceiling. Anything larger is wasted bytes.
- **Color**, keep the actual photos honest; the site applies a subtle `contrast(1.02) saturate(0.85)` via CSS for visual consistency. Don't over-process before uploading.

## Swapping placeholders

Every placeholder image in the site is marked with an HTML comment like:

```html
<!-- PLACEHOLDER · replace src with /images/diagnostics/hero.jpg -->
```

Search the codebase for `PLACEHOLDER` to find every one in one pass.
