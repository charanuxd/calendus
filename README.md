# Caloday 🗓️

A personal Calendly-style scheduling app with daily routines, booking pages, and Supabase backend.
Built with React + Vite. Deployable to GitHub Pages for free.

---

## 🗂 Project Structure

```
caloday/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── MiniCalendar.jsx   # Reusable calendar picker
│   │   └── UI.jsx             # Buttons, Modals, Inputs, Icons, Toast
│   ├── lib/
│   │   ├── supabase.js        # Supabase client + SQL schema (in comments)
│   │   └── theme.js           # Design tokens, colors, shared constants
│   ├── pages/
│   │   ├── Auth.jsx           # Login / Signup page
│   │   ├── Dashboard.jsx      # Main app (Today, Schedule, Booking, Settings)
│   │   └── PublicBook.jsx     # Public booking page (/book/:slug)
│   ├── App.jsx                # Router + auth guard
│   └── main.jsx               # Entry point
├── .env.example               # Environment variables template
├── .github/workflows/
│   └── deploy.yml             # Auto-deploy to GitHub Pages on push
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Setup in 4 Steps

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Set up Supabase (free)

1. Go to https://supabase.com and create a free project
2. In your project, go to **SQL Editor → New Query**
3. Copy all the SQL from the comments in `src/lib/supabase.js` and run it
4. Go to **Settings → API** and copy your Project URL and anon key

### Step 3 — Configure environment

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://yourusername.github.io/calendus
```

### Step 4 — Run locally

```bash
npm run dev
```

Open http://localhost:5173 ✅

---

## 📦 Deploy to GitHub Pages (free)

### One-time setup:

1. Push this project to a GitHub repo
2. Go to repo **Settings → Secrets and variables → Actions → New repository secret**
   Add these 3 secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_URL` → `https://yourusername.github.io/calendus`

3. Go to **Settings → Pages → Source** → select **GitHub Actions**

4. Update `vite.config.js` base path:
   ```js
   base: '/calendus/',  // your repo name
   ```

5. Push to `main` branch → GitHub Actions auto-deploys! 🎉

Your app will be live at: `https://yourusername.github.io/calendus`

---

## 🔗 Public Booking Links

Each user gets a link at `/book/their-slug`

Example: `https://yourdomain.com/book/jane`

Share this link — anyone can see your availability and book a slot without an account.

---

## 💰 Cost Breakdown

| Service | Free Tier | Paid |
|---|---|---|
| GitHub Pages | Free forever | Never |
| Supabase DB | 500MB, 50k MAU | $25/mo beyond |
| Supabase Auth | 50,000 users | $25/mo beyond |
| Custom Domain | ~$12/yr | One-time annual |

**You can serve tens of thousands of users for free.**

---

## 🛠 Tech Stack

- **React 18** + **Vite 5** — frontend
- **Supabase** — database, auth, real-time
- **React Router v6** — routing
- **GitHub Actions** — CI/CD
- **GitHub Pages** — hosting

No paid services required to launch. 🚀
