# Animal Farm — Frontend

Web client for the Animal Farm app, built with **Angular 17**, **NgRx** and **Angular Material**.
The API lives in [animal-farm-backend](https://github.com/luukitto/animal-farm-backend).

## Features

- **Animal list** — Material table with server-side pagination, search and sorting, and a "feed" action per animal
- **Farm leader panel** — shows the leader's current status and lets you change it
- **Soundtrack** — background music that switches to match the leader's status
- **State management** with NgRx store and effects (separate `animal` and `pig` feature slices)
- **Georgian localization** for the paginator (`MatPaginatorIntl`)
- Dev-server proxy to the backend, so no CORS setup is needed locally

## Tech stack

| Area        | Tools                               |
| ----------- | ----------------------------------- |
| Framework   | Angular 17 (standalone components)  |
| State       | NgRx Store + Effects, RxJS          |
| UI          | Angular Material                    |
| Testing     | Jasmine + Karma                     |

## Project structure

```
src/app/
├── components/     # animal list, pig status, music player
├── services/       # HTTP services for animals, pig status and music
├── store/          # NgRx actions, reducers, effects and selectors
├── models/         # TypeScript interfaces for API data
└── localization/   # Georgian paginator labels
```

## Getting started

**Requirements:** Node.js 18+ and the backend running on `http://localhost:3000`.

```bash
npm install
npm start          # ng serve with proxy.config.json
```

Open `http://localhost:4200`. Requests to `/api` are proxied to the backend.

## Scripts

```bash
npm start       # dev server
npm run build   # production build to dist/
npm test        # unit tests
```
