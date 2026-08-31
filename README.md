# LMLM NVIDIA NIM Dashboard

A React + Vite + TypeScript + Tailwind dashboard for the LMLM inference control plane.

The UI models the architecture:

`Script.god → GOD Protocol → Model Router → Model Adapters → Kubernetes / NVIDIA NIM`

It is a frontend dashboard only. The metrics and events are representative UI data; no NVIDIA credentials or inference endpoints are embedded.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally:

`http://localhost:5173`

Build for production:

```bash
npm run build
npm run preview
```

## Dashboard areas

- Overview: runtime health, model routing and verification.
- Models: represented through the routing cards.
- Routing: capability matching and model scores.
- Script.god: orchestration activity and protocol events.
- Memory / Verification / Infrastructure: represented in the control-plane navigation and topology.
- NVIDIA NIM: shown as a first-class inference backend rather than as the LMLM intelligence layer.

## Connecting real APIs

Replace the sample arrays and activity records in `src/App.tsx` with API calls to your LMLM Go coordinator. A clean production boundary is:

```text
Browser
  ↓
LMLM API
  ↓
Go Coordinator
  ↓
Model Registry / Router
  ↓
NVIDIA NIM Service
```

Keep NGC/NVIDIA API credentials server-side in Kubernetes Secrets or an external secret manager. Never expose them in Vite environment variables that are shipped to the browser.
