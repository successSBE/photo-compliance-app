# Photo Compliance App

Michigan Food Safety Compliance photo review app for Kroger display case uploads.

## Render Deployment

This repo is Render-ready as a Node web service. The service:

- serves the existing app at `/photo-compliance-app/`
- redirects `/` into the app
- verifies login through `/api/login`
- stores the login session in an HTTP-only cookie
- blocks `/work` data files unless the user is signed in

Create the Render service from `render.yaml`. It creates these login environment variables:

```text
APP_USER_1_EMAIL=success@elevatesbe.com
APP_USER_1_PASSWORD=Melon2021
APP_USER_2_EMAIL=paul.neal1990@gmail.com
APP_USER_2_PASSWORD=Melon2021
```

Set both password values inside Render. Render stores those values privately.

## Local Run

```bash
npm install
npm start
```

Open `http://localhost:8787/photo-compliance-app/`.

## Trail Import

The current Render blueprint deploys the live web app only. The app reads JSON files in `work/daily/`; a fully automated 10 AM Eastern Trail refresh should be added as a separate Render cron job after a supported Trail export/API or service-account flow is available.
