# SpendShield

Personal expense tracker for iOS. Logs spending through an "interceptor" flow
triggered by an iOS Shortcut when a payment app is opened.

**Phase 1 — foundation only.** Navigation, theming, Supabase wiring and the
deep link route are in place. No expense logging yet.

Stack: Expo SDK 57 (RN 0.86) · Expo Router 57 · TypeScript strict · NativeWind 4
· Supabase JS v2 · MMKV (with AsyncStorage fallback)

---

## 1. Set up the database

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and paste the contents of
   [`supabase/migrations/001_init.sql`](supabase/migrations/001_init.sql).
3. Run it. It creates all seven tables, enables RLS, seeds the 11 default
   categories, and adds a trigger that creates a `profile` row when you sign up.
4. Copy **Project Settings → API** for the values you need in step 2.

<details>
<summary>Using the Supabase CLI instead (optional)</summary>

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```
</details>

## 2. Set environment variables

```bash
cp .env.example .env
```

Fill in:

```
EXPO_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your anon / publishable key>
```

Restart the dev server after editing `.env`.

## 3. Run it

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your iPhone (same Wi-Fi network).

### What to check on device

The Home tab has a **Foundation check** panel. Every row should be green except
`Session` (expected `anonymous` — there is no login screen yet):

| Row | Expected |
|---|---|
| Runtime | `storeClient` in Expo Go |
| Scheme | `spendshield` |
| Storage driver | `asyncstorage` in Expo Go, `mmkv` in a dev build |
| Supabase env | `present` |
| Deep link | `none received` until you run the test below |

Also confirm: all four tabs render, the tab bar matches the palette, and
amounts render in Space Mono.

## 4. Testing the deep link

### In Expo Go (works today)

Expo Go does **not** register the `spendshield://` scheme — the scheme is
build-time configuration. In Expo Go the equivalent path is prefixed with `/--/`:

```bash
npx uri-scheme open "exp://<your-lan-ip>:8081/--/add?amount=450&merchant=Swiggy&category=food" --ios
```

Get your LAN IP from the Metro output. The **Quick Add** sheet opens showing
`₹450`, `Swiggy`, and a `food` badge — which proves routing, param parsing and
deep link wiring all work.

### In a development build (after you have an Apple Developer account)

The real scheme works here:

```
spendshield://add?amount=450&merchant=Swiggy&category=food
```

A development build needs a **paid Apple Developer account** ($99/yr) for
provisioning profiles. See §6.

## 5. Verify the code

```bash
npm run typecheck
npx expo-doctor
```

`expo-doctor` will warn that `react-native-mmkv` and
`react-native-nitro-modules` are not SDK-matched. Expected: they are native
modules that cannot load in Expo Go, and `lib/storage.ts` falls back to
AsyncStorage when they are absent.

## 6. Later: real builds

Two things change once you have a development build:

- `spendshield://` links work, so the iOS Shortcut can use
  **Open App → `spendshield://add`**.
- `lib/storage.ts` picks MMKV automatically and auth sessions persist in MMKV
  instead of AsyncStorage. No code change needed.

To build:

```bash
npm i -D eas-cli
eas login
eas build:configure
eas build --profile development --platform ios
```

> **Important for the interceptor flow.** Cold-launching a *development* build
> from an app-specific deep link is not supported by the Expo dev client. Your
> Shortcut needs a **release** build (ad hoc or TestFlight) to launch SpendShield
> from `spendshield://add` when the app is not already running.

The Gemini edge function (`supabase/functions/analyze`) is a Phase 1
placeholder. Deploy and key it when Phase 2 wires up AI:

```bash
npx supabase functions deploy analyze --no-verify-jwt
npx supabase secrets set GEMINI_API_KEY=<key>
```

## Project layout

```
app/                      Expo Router screens
  _layout.tsx             Root layout: fonts, session provider, stack
  (tabs)/                 Home, Calendar, Stats, Profile
  add.tsx                 Quick Add — the deep link target
components/               Reusable UI
constants/                Palette, categories, fonts
hooks/                    Data fetching + session context
lib/                      Supabase client, storage adapter, haptics, deep links
supabase/                 Migrations + edge functions
types/                    Domain types + Supabase schema types
```

## Conventions

- Dark "Mission Control" theme. Pure black `#000` and pure white `#FFF` are not
  in the palette — `tailwind.config.js` replaces Tailwind's default colors
  entirely so `bg-white` does not resolve.
- Monetary values use `font-mono` (Space Mono). Labels use the system sans.
- `tailwind.config.js` and `constants/colors.ts` must stay in sync.
- Category class names are stored pre-built in `constants/categories.ts`.
  Tailwind cannot see dynamically constructed class names.