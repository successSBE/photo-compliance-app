# Daily Trail Import Format

The Photo Compliance Review app reads dated imports from this folder.

For each imported date, create:

- `display_case_photo_rows_YYYY-MM-DD.json`

Then update `display_case_dates.json`:

```json
{
  "latestDate": "YYYY-MM-DD",
  "dates": [
    {
      "date": "YYYY-MM-DD",
      "label": "Month D, YYYY",
      "sourceDateRange": "YYYY-MM-DD to YYYY-MM-DD",
      "path": "../work/daily/display_case_photo_rows_YYYY-MM-DD.json",
      "importedAt": "YYYY-MM-DDTHH:mm:ss",
      "stores": 64,
      "displayPhotos": 198
    }
  ]
}
```

Each daily JSON should match the existing `display_case_photo_rows.json` shape.
For each task, include `imageUrls`, `loadedPhotoCount`, and `actualPhotoCount` when photos are available.
