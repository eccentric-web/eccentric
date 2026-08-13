# Eccentric

Landing page for Eccentric — AI-focused engineering.

## Assets

- **Logo:** replace [`public/logo.svg`](public/logo.svg) or update `logo.src` in [`lib/site.ts`](lib/site.ts).
- **Hero background:** update `landingVideo.src` in [`lib/site.ts`](lib/site.ts).

## Development

```bash
npm install
npm run dev
```

Uses `.env.local` (Turnstile test keys). Open [http://localhost:3000](http://localhost:3000).

## Environment files

| File | Used by |
|------|---------|
| `.env.local` | `npm run dev` |
| `.env.production` | `npm run build`, `npm run deploy`, `npm run preview` |

Restart the dev server after editing env files.

### `.env.local` (local dev)

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

### `.env.production` (deploy)

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key
```

Get keys from [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) and add `eccentric.co.in` under **Hostname Management**.

## Cloudflare deployment

Production domain: **eccentric.co.in** (configured in `wrangler.jsonc`).

1. Put production keys in `.env.production`.
2. Set the Worker runtime secret:
   ```bash
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

`npm run deploy` loads `.env.production` before the build and attaches the worker to `eccentric.co.in` and `www.eccentric.co.in`.

## Production

```bash
npm run build
```

For Cloudflare Workers (OpenNext):

```bash
npm run deploy
```
