# 📊 Finance Dashboard — Homework Assignment

Welcome to your hands-on homework for the **SYSTEMS & ARCHITECTURE** course.

In this exercise you will connect a real financial dashboard to two live APIs —
exactly the way modern banking applications retrieve market data every day.

---

## What You Will Build

A working **Finance Dashboard** that displays:

- 📈 **Live currency exchange rate** — any pair you choose
- 🏙️ **Federal income-tax brackets** for 2026 (US or Canada), with a built-in tax estimator

No coding experience is required. Your job is to fill in **four values**
and make **three small text changes** — and the dashboard will come to life.

---

## How This Connects to the Lecture

| Lecture Topic | Where You Will See It in This Exercise |
|---|---|
| **REST Methods (GET)** | Both API calls use the HTTP GET method |
| **Authentication & API Keys** | You will add an `X-Api-Key` header — just like a bearer token |
| **Status Codes** | Open DevTools to see `200 OK` or error codes live |
| **Endpoint URLs & Query Parameters** | You will construct the correct URLs yourself |
| **JSON Responses** | The raw data returned is JSON — inspect it in the Console |
| **Partner APIs vs Internal APIs** | API Ninjas is a third-party (partner) API, similar to FX data feeds banks consume |
| **API Keys & Rate Limiting** | The free tier has a request limit — a real-world constraint you'll experience |

---

## Files in This Folder

| File | Purpose | Do You Edit It? |
|---|---|---|
| `index.html` | The visual structure of the page | ✏️ Yes — Task 1 |
| `styles.css` | Colors, fonts, and layout | ❌ No changes needed |
| `app.js` | JavaScript that fetches and displays data | ✏️ Yes — Tasks 2 & 3 |
| `README.md` | This guide | ❌ No changes needed |

---

## Before You Start — Get Your Free API Key

1. Open [https://api-ninjas.com/register](https://api-ninjas.com/register)  
2. Create a free account (no credit card needed)  
3. After logging in, go to **My Account** → copy your **API Key**  
4. Keep it ready — you will add it to `app.js` as the first step

> **Security note:** Never share your API key publicly or post it online.  
> Treat it like a password. This mirrors how real banking APIs handle credentials.

---

## Task 1 — Personalise the Dashboard ✏️ *(~5 minutes)*

Open **`index.html`** in any text editor (Notepad, VS Code, TextEdit, etc.).

Search for the three comments that start with `✏️ TASK 1` and make these changes:

| What to change | Where | Example value |
|---|---|---|
| Browser tab title | `<title>` tag | `UBB Finance Insights` |
| Main heading | `<h1 id="dashboard-title">` | `UBB Banking Insights Dashboard` |
| Subtitle | `<p id="dashboard-subtitle">` | `Live market data - ${your name}` |

Save the file. Open (or refresh) `index.html` in your browser to see the update.

---

## Task 2 — Exchange Rate API ✏️ *(~20 minutes)*

Open **`app.js`** in your text editor. You will see the **Student Tasks** section at the very top.

**Step 1 — Add your API key** *(Task 1 in `app.js`)*

Find this line and replace the placeholder with the key you copied earlier:

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

**Step 2 — Build the exchange rate URL** *(Task 2 in `app.js`)*

Find this line:

```js
const EXCHANGE_RATE_URL = "YOUR_URL_HERE";
```

Replace `"YOUR_URL_HERE"` with the correct, complete API endpoint URL.

**Read the API documentation** to find the endpoint URL and learn how to pass the currency pair as a query parameter:

→ [https://api-ninjas.com/api/exchangerate](https://api-ninjas.com/api/exchangerate)

**Choose a currency pair** — pick any two currencies. Format is `FROM_TO` (both codes separated by an underscore).
Common examples: `GBP_AUD` · `EUR_USD` · `USD_JPY` · `EUR_GBP`

**Build the full URL** — a URL with a query parameter follows this pattern:
```
https://example.com/endpoint?parameter=value
```
Combine the base URL from the docs with your chosen currency pair as the parameter value.

---

## Task 3 — Income Tax API ✏️ *(~20 minutes)*

Still in `app.js`, find the **Task 3** constants:

```js
const TAX_COUNTRY = "YOUR_COUNTRY_HERE";
const TAX_URL     = "YOUR_URL_HERE";
```

**Task 3a — Set the country code**
Replace `"YOUR_COUNTRY_HERE"` with one of these 2-letter codes:
- `"US"` — United States
- `"CA"` — Canada

This value controls the card heading and currency symbol displayed on screen.

**Task 3b — Build the income tax URL**
Replace `"YOUR_URL_HERE"` with the correct, complete API endpoint URL.

**Read the API documentation** to find the endpoint and all required query parameters:

→ [https://api-ninjas.com/api/incometax](https://api-ninjas.com/api/incometax)

You need three parameters: the country you chose above, the year `2026`, and the region `federal`.
Multiple query parameters are joined with `&`:
```
https://example.com/endpoint?param1=value1&param2=value2&param3=value3
```

---

## How to Test Your Work

1. Save `app.js` (and `index.html` if you changed it)
2. Open `index.html` in your browser  
   *(double-click the file, or right-click → Open with → Chrome / Firefox / Edge)*
3. When working correctly you should see:
   - Your personalised title and subtitle
   - A live exchange rate with flags and a timestamp
   - A colour-coded table of federal tax brackets
   - A working tax estimator — try entering different income amounts

---

## Troubleshooting

### Open Browser Developer Tools

Press **F12** (or right-click anywhere → **Inspect**) and switch to the **Console** tab.
Errors appear here in red — this is exactly how developers debug APIs.

| Symptom | Most Likely Cause |
|---|---|
| Grey “Configuration needed” box | A `YOUR_...` placeholder was not replaced |
| `401 Unauthorized` error | The API key is wrong or missing |
| `400 Bad Request` | The URL structure is wrong — re-read the docs and check your parameters |
| `CORS` or network error | Check your internet connection; try a different browser |
| Dashboard looks broken | Make sure `styles.css` and `app.js` are in the same folder as `index.html` |

---

## Bonus Challenges 🌟

Finished early? Try these optional tasks:

1. **Add a second currency pair** — Can you show two exchange rates at once?  
   *(Hint: you need a second `EXCHANGE_RATE_URL` constant and a second exchange rate card in `index.html`)*

2. **Switch countries** — Change `TAX_COUNTRY` and `TAX_URL` to the other supported country. What changes on screen?

3. **Change the colour scheme** — Open `styles.css`, find `--color-primary` and try a different hex colour, e.g. `#006e51` for a green banking theme

4. **Explore the raw JSON** — Open DevTools → **Network** tab, refresh the page, click on one of the API requests and read the raw response. Compare it to what appears on screen.

---

## The Bigger Picture

In real banking systems:

- Your mobile banking app makes identical GET requests to retrieve your balance and exchange rates
- Every payment processing system calls internal APIs — the same principles as what you did today
- The `X-Api-Key` header you added mirrors how partner banks authenticate with UBB's Open Banking APIs
- The JSON response you parsed is the standard format used by SWIFT, SEPA, and all modern payment networks

The values you configured today — **API key, endpoint URL, query parameters** —
are the core building blocks of every API integration in the industry.

---

*Finance Dashboard Homework · SYSTEMS & ARCHITECTURE Course*
