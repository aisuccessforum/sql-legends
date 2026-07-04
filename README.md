# SQL Legends — Step 1 Slice

This is the first playable vertical slice of **SQL Legends**, deployed at
`sql.aisuccessforum.online`. It proves the core gameplay loop end-to-end
before any of the bigger systems (career ranks, multiple worlds, auth, D1
backend, IndexedDB offline saves) get built.

## What's in this slice

- **Boot sequence** — terminal-style intro (the signature visual moment)
- **One mission** (`content/missions/level001.ts`) — Data Academy, Level 1:
  a story briefing from Director Okafor, a real SQLite schema, and an
  objective
- **Real SQL execution in the browser** — `sql.js` (SQLite compiled to
  WebAssembly) runs entirely client-side, no server involved
- **Query validation** — checks the player's result set (columns + rows)
  against the expected answer, order-insensitive by default
- **XP + rank HUD** — a status bar with a live XP bar and a toast on
  mission completion
- **Local state only** — Zustand store, no persistence yet (refreshing the
  page resets progress — that's expected at this stage)

## Design system

Distinct from the main blog's neon-blue theme — this world reads as a
"secure field terminal," matching the story's classified-academy premise:

| Token | Hex | Use |
|---|---|---|
| `--void` | `#0a0d14` | page background |
| `--console` / `--console-raised` | `#121a29` / `#16202f` | panels, editor |
| `--terminal` | `#43f2a0` | SQL code, success states, primary action |
| `--dossier` | `#f2b24e` | story/narrative accents, objective callout |
| `--clearance` | `#7c8cf8` | rank badge, XP bar |
| `--danger` | `#f2545b` | query errors |

Type: **Space Grotesk** (display/HUD), **Inter** (narrative body),
**JetBrains Mono** (SQL editor, terminal output, schema chips).

## Run it locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

This produces a static export in `out/` (same deploy shape as the main
blog — `output: "export"` in `next.config.ts`).

> Note: the build fetches Space Grotesk / Inter / JetBrains Mono from
> Google Fonts at build time via `next/font/google`. This requires normal
> internet access during `npm run build` — it will work fine on your
> machine and on Cloudflare's build servers.

## Deploying to Cloudflare Pages (sql.aisuccessforum.online)

1. Push this folder to a **new GitHub repo** under the `aisuccessforum`
   account (keep it separate from the blog repo — different build output,
   and later this needs its own Workers/D1 backend).
2. In Cloudflare Pages, create a **new project** connected to that repo.
   - Build command: `npm run build`
   - Build output directory: `out`
3. Once deployed, go to the Pages project's **Custom domains** tab and add
   `sql.aisuccessforum.online`. Cloudflare will handle the DNS record
   automatically since the root domain is already on your Cloudflare
   account.
4. Wait for SSL to provision (usually a couple of minutes), then visit the
   subdomain.

## Folder structure

```
app/                  Next.js App Router pages + layout + global styles
components/
  boot/                BootSequence — terminal intro
  hud/                 StatusBar, XpToast
  dossier/             Story/briefing panel
  terminal/            SqlTerminal — the actual game
content/missions/      Mission data (schema, seed SQL, objective, hints)
lib/
  sqlEngine.ts          sql.js loader + query runner + result validation
  useTypewriter.ts       Typewriter animation hook
store/
  useGameStore.ts        Zustand store (XP, rank, completed missions)
public/sql-wasm/         sql.js WASM binary (served locally, no CDN)
```

## What Step 2 should add (not built yet)

- A second and third mission in the same world (chain the loop, prove
  content scaling before building the full 105-mission career ladder)
- Persist progress client-side (IndexedDB via Dexie) so refresh doesn't
  wipe XP
- A world map / level-select screen instead of hardcoding `level001`
- Only after the loop is proven fun: Google auth + Cloudflare D1 for
  cross-device save sync
