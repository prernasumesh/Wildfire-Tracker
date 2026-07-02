# 🔥 Wildfire Tracker

Somewhere on Earth right now, something is on fire — and NASA is watching it happen in near real-time. This app pulls that data straight from orbit (well, from NASA's satellites) and drops it onto a live Google Map you can actually click around in.

## What's happening here

Every active wildfire event tracked by NASA's [EONET (Earth Observatory Natural Event Tracker)](https://eonet.gsfc.nasa.gov/) gets pinned to the map as a little flame icon. Click one, and you get the details — name, location, ID — pulled live from the API, not hardcoded.

No mock data. No static screenshots. If a fire starts somewhere new, refresh the app and it shows up.

## Under the hood

- **React** — the whole app runs client-side
- **Google Maps** via `google-map-react` — for the actual map rendering
- **NASA EONET API** — the data source, updated continuously by NASA
- **Iconify** — for the fire markers

## Getting it running

```bash
npm install
```

Grab a Google Maps API key from Google Cloud Console, then create a `.env` file in the project root:REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here

Then:

```bash
npm start
```

Opens at `http://localhost:3000`.
