# Photo Compliance App

Michigan Food Safety Compliance photo review app for Kroger display case uploads.

## Render Deployment

This repo is Render-ready as a Node web service. The service:

- serves the existing app at `/photo-compliance-app/`
- redirects `/` into the app
- verifies login through `/api/login`
- stores the login session in an HTTP-only cookie
- blocks `/work` data files unless the user is signed in

Create the Render service from `render.yaml`, then set this private environment variable in Render:

```json
APP_USERS_JSON=[{"email":"success@elevatesbe.com","password":"REPLACE_IN_RENDER"},{"email":"Paul.neal1990@gmail.com","password":"REPLACE_IN_RENDER"}]
```

Do not commit real passwords to the repo. Render stores this value privately.

## Local Run

```bash
npm install
npm start
```

Open `http://localhost:8787/photo-compliance-app/`.

## Trail Import

The Render blueprint includes a 10 AM Eastern-oriented cron placeholder for daily Trail imports. The current app reads JSON files in `work/daily/`; a fully automated Trail refresh still needs a supported Trail export/API or service-account flow.
