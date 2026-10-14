# Bartosz Wiorek — portfolio

An English-language personal site built with VitePress, Vue and Tailwind CSS. A custom, responsive dark theme uses the personal information from the original website. No employment history or project claims have been invented.

## Local development

Requires Node.js 22+ and pnpm 10.18.2.

```sh
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

Edit `.vitepress/theme/Layout.vue` to update the profile and expertise. Edit `privacy.md` to update privacy information.

```sh
pnpm typecheck
pnpm build
pnpm start
```

`pnpm start` loads `.env` if present. The production server serves `.vitepress/dist` on `0.0.0.0:$PORT` (default 3000). Use `pnpm start` to preview the built app including its runtime integrations.

## Railway

Connect this repository to Railway and set the service **Root Directory** to `/app`. Railway uses `Dockerfile` and `railway.toml` in that directory. Generate a public domain in the service's Networking settings. Railway provides `PORT`; the application also exposes `/health` for health checks.

Set `COOKIEBOT_ID`, `ACKEE_SERVER` and `ACKEE_DOMAIN_ID` as service variables. They are read at container startup, so changing them requires a service restart/redeployment, not a new asset build. These values are public identifiers, not secrets. Do not put API tokens in them.

To run the same image locally (from this directory):

```sh
docker build -t bw-portfolio .
docker run --rm -p 3000:3000 --env-file .env bw-portfolio
```

## Cookiebot and Ackee

1. Add the deployed website domain to Cookiebot and copy its Domain Group ID to `COOKIEBOT_ID`. The banner is English. This integration uses manual blocking; the application explicitly gates analytics on statistics consent.
2. Host Ackee separately, create a domain in its dashboard, and set `ACKEE_SERVER` (HTTPS, no trailing slash) and `ACKEE_DOMAIN_ID`. Allow the portfolio origin in the Ackee server's `ACKEE_ALLOW_ORIGIN` configuration.
3. Ackee's `tracker.js` is downloaded from your instance only after Cookiebot statistics consent. Detailed tracking is disabled; page URLs omit query strings and fragments. Refusing or withdrawing statistics consent stops subsequent duration updates. Previously transmitted records remain on your Ackee server.
4. Use **Cookie settings** in the footer to reopen the banner. Without a Cookiebot ID, all optional analytics stay disabled. Ackee ignores localhost visits, so verify actual analytics on your configured domain.

Check both consent acceptance and withdrawal on your registered domain before publishing. Set retention in your Ackee instance and review the privacy page for your actual hosting and service setup.

References: [VitePress custom themes](https://vitepress.dev/guide/custom-theme), [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite), [Cookiebot API](https://www.cookiebot.com/en/developer/), [Ackee tracker API](https://github.com/electerious/ackee-tracker).
