```
# SpendShield - Agent Instructions

## Project Context
Personal expense tracker for iOS. Single user (me). Built with:
- React Native + Expo (SDK 51+)
- TypeScript (strict mode)
- Expo Router (file-based routing)
- Supabase (database + auth + edge functions)
- NativeWind (Tailwind for RN)
- Google Gemini API (via Supabase Edge Functions only)

## Theme
Dark "Mission Control" theme. Palette defined in tailwind.config.js.
NEVER use pure black (#000) or pure white (#FFF).
Use #0A0F1E base, #F1F5F9 text, #3B82F6 accent.
Monospace font for all monetary values.

## Code Standards
- TypeScript strict mode, no `any`
- Functional components with hooks only
- NativeWind className over StyleSheet
- Expo Router <Link> and <Stack.Screen>, not react-navigation directly
- Supabase types auto-generated into types/supabase.ts
- All DB queries wrapped in custom hooks (hooks/useExpenses.ts etc)
- Server-side logic ONLY in supabase/functions/*
- NEVER put Gemini API key in app code

## Design Principles
- One-hand usability (bottom-aligned CTAs)
- Fast entry (minimum taps to log expense)
- Dark-first (OLED friendly, no pure black)
- Numbers in monospace, labels in sans-serif
- Haptic feedback on all primary actions

## File Structure
app/              - Expo Router screens
components/       - Reusable UI components
hooks/            - Data fetching + business logic
lib/              - Clients (supabase, gemini) + utils
types/            - TypeScript interfaces
constants/        - Static data (categories, colors)
supabase/         - Migrations + edge functions

## What NOT to Do
- Don't suggest adding Firebase, Auth0, or other services
- Don't use class components
- Don't inline styles - use NativeWind classes
- Don't add state management libraries beyond React hooks + Supabase
- Don't suggest features I didn't ask for in the current task
- Don't write comments explaining obvious code
```

