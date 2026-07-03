# Photo Compliance Review Live Deploy

This folder is the static website bundle for colleagues.

## What is Included

- `photo-compliance-app/`: the app UI and compliance checker
- `work/display_case_photo_rows.json`: current imported Trail data
- `work/daily/`: saved date manifest and daily imports
- `work/display_case_all_images/`: downloaded display case photos

## How to Publish

Upload the full contents of this `live-deploy` folder to a static web host such as Netlify, Vercel, GitHub Pages, Cloudflare Pages, SharePoint static hosting, or an internal company web server.

The app entry point is:

`/photo-compliance-app/`

The root `index.html` redirects there automatically.

## App Logins

The app currently allows two login emails:

- `success@elevatesbe.com`
- `Paul.neal1990@gmail.com`

## Important Access Note

The current sign-in screen is a client-side app gate only. It does not verify users against a server. If the live site needs to be private, protect it with the hosting provider's access controls or add a real backend login before sharing broadly.

## GitHub Pages

To use GitHub Pages, upload this folder to a GitHub repository and enable Pages from the repository settings.

Recommended settings:

- Source: deploy from branch
- Branch: `main`
- Folder: `/root`

After Pages publishes, share the GitHub Pages URL with colleagues.

## Updating Data

When new Trail data is imported, replace these deploy files with the refreshed versions:

- `work/display_case_photo_rows.json`
- `work/daily/`
- `work/display_case_all_images/`

Then redeploy the folder.
