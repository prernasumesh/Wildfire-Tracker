# Wildfire Tracker

Somewhere on Earth right now, something is on fire — and NASA is watching it happen in near real-time. This app pulls that data straight from orbit (well, from NASA's satellites) and drops it onto a live Google Map you can actually click around in.

## What's happening here

Every wildfire event tracked by NASA's [EONET (Earth Observatory Natural Event Tracker)](https://eonet.gsfc.nasa.gov/) from the last 30 days gets pinned to the map as a little flame icon. Click one — on the map or in the sidebar — and the map flies over to it and shows the details, pulled live from the API, not hardcoded.

No mock data. No static screenshots. If a fire starts somewhere new, refresh the app and it shows up.

A searchable sidebar lists every active fire so you can jump straight to one by name instead of hunting across the map. And an AI panel reads the live fire list and writes a short natural-language risk briefing — which regions are flaring up, notable fires, whether activity is trending up or down.

## Under the hood

- **React** — the whole app runs client-side
- **Google Maps** via `google-map-react` — for the actual map rendering
- **NASA EONET API** — the data source, updated continuously by NASA
- **Anthropic API** — generates the AI risk briefing from live fire data
- **Iconify** — for the fire markers

## Getting it running

```bash
npm install
```

Create a `.env` file in the project root with:

```
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
REACT_APP_ANTHROPIC_API_KEY=your_anthropic_key
```

- Google Maps key: from [Google Cloud Console](https://console.cloud.google.com/).
- Anthropic key: from the [Anthropic Console](https://console.anthropic.com/) — required for the AI risk briefing panel. Without it, the app still works fully; the panel just shows a setup message instead.

Then:

```bash
npm start
```

Opens at `http://localhost:3000`.

> Note: the Anthropic API is called directly from the browser for simplicity, which exposes the key client-side. That's fine for local use, but don't deploy this publicly as-is — route the call through a backend first.
