# Documentation of Changes in this Branch

This document outlines all fixes, architectural upgrades, and feature implementations applied in this branch.

---

## 1. Expo Start Fix (`bun run start`)

### Root Cause
- In `lib/supabase.ts`, `ExpoSecureStoreAdapter` directly invoked `SecureStore.getItemAsync`, `SecureStore.setItemAsync`, and `SecureStore.deleteItemAsync`.
- Expo Router static rendering (`web: { output: "static" }`) evaluates layout routes in a Node SSR context during Metro builds. Because `expo-secure-store` native methods (`getValueWithKeyAsync`) are unavailable in Node/browser environments, Metro halted with `TypeError: getValueWithKeyAsync is not a function`.

### Solution
- Updated `lib/supabase.ts` with a platform-adaptive storage adapter:
  - When `Platform.OS === 'web'`, session persistence safely uses `localStorage` (with SSR safeguard `typeof window !== 'undefined'`).
  - On iOS and Android, it retains native AES/Keychain encrypted storage via `expo-secure-store`.
  - Added URL parameter detection (`detectSessionInUrl: Platform.OS === 'web'`) for browser OAuth redirects.
  - Sanitized and trimmed Supabase environment variables.

---

## 2. Porting & Refactoring `newService` (`component/newService.ts`)

### Why `.ts` Instead of `.tsx`?
- `newService` contains zero UI components or JSX elements. Porting to pure TypeScript (`.ts`) eliminates JSX parser overhead and enables clean cross-platform execution in both Node.js (backend) and React Native / Expo (frontend).

### Architecture & Capabilities
- **Native Environment Variable Handling:**
  - No hardcoded API keys.
  - Resolves keys natively via `process.env.NEWS_FINLIGHT_API`, `process.env.EXPO_PUBLIC_NEWS_FINLIGHT_API`, or an explicitly passed `apiKey` argument.
- **Strict Dedicated Fetcher Modes:**
  - **Client-Side Direct Fetch (`useBackend: false` or default):** Directly issues POST requests to Finlight v2 (`https://api.finlight.me/v2/articles`) using the native environment API key.
  - **Backend Server Fetch (`useBackend: true`):** Strictly fetches from the configured backend endpoint (`/api/news`) using `GET`. If the backend fails or times out, it reports the backend error directly without silent/unintended fallback.
- **URL Normalization & Timeout Guard:**
  - Automatically formats `backendUrl` (e.g., handles `127.0.0.1:3000` -> `http://127.0.0.1:3000`).
  - Implements request timeout handling via `AbortController` (default: 10,000ms).
- **Flexible Invocations:**
  - Supports both positional arguments: `getFinancialNews("market", 10, 1)`
  - And configuration objects: `getFinancialNews({ query: "market", pageSize: 10, useBackend: true })`.

---

## 3. Backend Integration (`backend/server.js`)

- Added the `/api/news` endpoint in `backend/server.js`:
  - Reads `NEWS_FINLIGHT_API` from the environment without hardcoded fallbacks.
  - Normalizes query parameters (`query`, `pageSize`, `page`, `language`, `order`).
  - Proxies requests to Finlight v2 (`POST https://api.finlight.me/v2/articles`).
  - Dual `.env` configuration loader ensures environment variables are loaded whether running from the repository root or the `backend/` directory.

---

## 4. UI & Type Integrations

- **Dashboard Integration (`pages/Dashboard.tsx`):**
  - Connected the `useEffect` hook to call `getFinancialNews()` on mount.
  - Handled loading state, error display, and populated the financial news list.
- **Types Update (`types/News.ts`):**
  - Added optional `language`, `categories`, and `countries` fields to the `Article` interface to match Finlight v2 response payloads.
- **Component Index (`component/index.ts`):**
  - Exported `getFinancialNews` and the `GetFinancialNewsOptions` interface.
