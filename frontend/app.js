// ╔═══════════════════════════════════════════════════════════════╗
// ║              STUDENT TASKS  —  Start reading here!           ║
// ║            Open README.md first for full instructions.       ║
// ╚═══════════════════════════════════════════════════════════════╝

/**
 * TASK 1 — Your API Key
 * ─────────────────────
 * Replace "YOUR_API_KEY_HERE" with your personal API key.
 * Get a free key at: https://api-ninjas.com/register
 */
const API_KEY = "YOUR_API_KEY_HERE";

/**
 * TASK 2 — Exchange Rate URL
 * ──────────────────────────
 * Replace "YOUR_URL_HERE" with the correct, full API endpoint URL.
 *
 * Read the API documentation to find the endpoint and learn
 * how to pass the currency pair as a query parameter:
 *   → https://api-ninjas.com/api/exchangerate
 *
 * Common currency pairs: GBP_AUD · EUR_USD · USD_JPY · EUR_GBP
 */
const EXCHANGE_RATE_URL = "YOUR_URL_HERE";

/**
 * TASK 3 — Income Tax
 * ─────────────────────
 * 3a. Replace "YOUR_COUNTRY_HERE" with a 2-letter country code.
 *     This controls the card heading and currency symbol on screen.
 *     Supported values on the free API tier: "US" or "CA"
 */
const TAX_COUNTRY = "YOUR_COUNTRY_HERE";

/**
 * 3b. Replace "YOUR_URL_HERE" with the correct, full API endpoint URL
 *     for federal income tax brackets (year 2026).
 *
 *     Read the API documentation to find the endpoint and the
 *     required query parameters:
 *       → https://api-ninjas.com/api/incometax
 *
 *     Make sure the country in the URL matches Task 3a above.
 */
const TAX_URL = "YOUR_URL_HERE";

// Display configuration — driven by TAX_COUNTRY
const TAX_COUNTRIES = {
  US: { name: "United States", flag: "🇺🇸", currency: "USD" },
  CA: { name: "Canada",        flag: "🇨🇦", currency: "CAD" },
};

// ╔═══════════════════════════════════════════════════════════════╗
// ║        Application code  —  No changes needed below          ║
// ╚═══════════════════════════════════════════════════════════════╝

// ── Helpers ───────────────────────────────────────────────────────

function isConfigured(value) {
  return value && !value.includes("YOUR_") && value.trim() !== "";
}

function setLoading(container, message = "Loading…") {
  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>${message}</p>
    </div>`;
}

function showConfigError(elementId, taskNumbers) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = `
    <div class="error-card">
      <span class="error-icon">⚙️</span>
      <h3>Configuration needed</h3>
      <p>Open <code>app.js</code> and complete <strong>Task ${taskNumbers}</strong>
         at the top of the file.</p>
      <p>See <code>README.md</code> for step-by-step instructions.</p>
    </div>`;
}

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = `
    <div class="error-card">
      <span class="error-icon">❌</span>
      <h3>Something went wrong</h3>
      <p>${message}</p>
      <p>Open your browser's Developer Tools (F12) → Console tab for details.</p>
    </div>`;
}

function formatNumber(n) {
  return parseFloat(n).toLocaleString("en-US");
}

function formatFilingStatus(status) {
  const map = {
    __flat__:          "All Filers",
    single:            "Single",
    married:           "Married Filing Jointly",
    married_separate:  "Married Filing Separately",
    head_of_household: "Head of Household",
    common_law:        "Common Law",
  };
  return map[status] || status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function getRateClass(rate) {
  if (rate <= 0.12) return "rate-low";
  if (rate <= 0.22) return "rate-mid";
  if (rate <= 0.32) return "rate-high";
  return "rate-max";
}

function getCurrencyFlag(code) {
  return { GBP:"🇬🇧", AUD:"🇦🇺", USD:"🇺🇸", EUR:"🇪🇺",
           JPY:"🇯🇵", CHF:"🇨🇭", CAD:"🇨🇦", NZD:"🇳🇿" }[code] || "🏳️";
}

function getCurrencyName(code) {
  return {
    GBP:"British Pound",   AUD:"Australian Dollar", USD:"US Dollar",
    EUR:"Euro",            JPY:"Japanese Yen",      CHF:"Swiss Franc",
    CAD:"Canadian Dollar", NZD:"New Zealand Dollar",
  }[code] || code;
}

// ── Exchange Rate ─────────────────────────────────────────────────

async function fetchExchangeRate() {
  const container = document.getElementById("exchange-rate-content");
  const refreshButton = document.getElementById("refresh-exchange");

  if (!isConfigured(API_KEY) || !isConfigured(EXCHANGE_RATE_URL)) {
    showConfigError("exchange-rate-content", "1 &amp; 2");
    return;
  }

  setLoading(container, "Fetching live exchange rate…");

  // Disable the button while a request is in flight, so a rapid double-click
  // can't burn through the free API tier's rate limit.
  if (refreshButton) {
    refreshButton.disabled = true;
    refreshButton.textContent = "Refreshing…";
  }

  try {
    const response = await fetch(EXCHANGE_RATE_URL, {
      method: "GET",
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} — ${response.statusText}`);
    }

    const data = await response.json();
    renderExchangeRate(data);
  } catch (err) {
    showError("exchange-rate-content", err.message);
  } finally {
    if (refreshButton) {
      refreshButton.disabled = false;
      refreshButton.textContent = "↻ Refresh Rate";
    }
  }
}

function renderExchangeRate(data) {
  const container = document.getElementById("exchange-rate-content");
  const [fromCode, toCode] = data.currency_pair.split("_");
  const rate = parseFloat(data.exchange_rate);
  const inverseRate = (1 / rate).toFixed(5);
  const updated = new Date(data.timestamp * 1000).toLocaleString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  container.innerHTML = `
    <div class="exchange-display">
      <div class="currency-pair">
        <div class="currency-item">
          <span class="currency-flag">${getCurrencyFlag(fromCode)}</span>
          <span class="currency-code">${fromCode}</span>
          <span class="currency-name">${getCurrencyName(fromCode)}</span>
        </div>
        <div class="exchange-arrow">→</div>
        <div class="currency-item">
          <span class="currency-flag">${getCurrencyFlag(toCode)}</span>
          <span class="currency-code">${toCode}</span>
          <span class="currency-name">${getCurrencyName(toCode)}</span>
        </div>
      </div>

      <div class="rate-display">
        <span class="rate-value">${rate.toFixed(5)}</span>
      </div>

      <p class="rate-description">
        <strong>1 ${getCurrencyName(fromCode)}</strong> =
        <strong>${rate.toFixed(4)} ${getCurrencyName(toCode)}</strong>
      </p>
      <p class="rate-inverse">
        Inverse: 1 ${toCode} = ${inverseRate} ${fromCode}
      </p>

      <div class="rate-updated">
        <span class="dot dot-green"></span>
        Last updated: ${updated}
      </div>
    </div>`;
}

// ── Income Tax ────────────────────────────────────────────────────

let taxData = null;

function populateFilingStatuses(data) {
  const select = document.getElementById("filing-status");
  const regionData = data["federal"];
  if (!regionData) return;

  // Flat structure (e.g. Canada): brackets sit directly on the region object
  if (Array.isArray(regionData.brackets)) {
    select.innerHTML = `<option value="__flat__">All Filers</option>`;
    return;
  }

  // Nested structure (e.g. US): brackets are under a filing-status key
  const statuses = Object.keys(regionData).filter(k => Array.isArray(regionData[k]?.brackets));
  select.innerHTML = statuses
    .map(s => `<option value="${s}">${formatFilingStatus(s)}</option>`)
    .join("");
}

async function fetchIncomeTax() {
  const container = document.getElementById("income-tax-content");

  if (!isConfigured(API_KEY) || !isConfigured(TAX_COUNTRY) || !isConfigured(TAX_URL)) {
    showConfigError("income-tax-content", "1, 3a &amp; 3b");
    return;
  }

  const config = TAX_COUNTRIES[TAX_COUNTRY];
  if (!config) {
    showError("income-tax-content", `Unknown country code "${TAX_COUNTRY}". Supported values: "US" or "CA".`);
    return;
  }

  document.getElementById("tax-badge").textContent = `2026 · ${config.flag} Federal`;
  document.getElementById("tax-heading").textContent = `${config.name} Income Tax Brackets`;
  setLoading(container, `Fetching ${config.name} federal tax brackets…`);

  try {
    const response = await fetch(TAX_URL, {
      method: "GET",
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} — ${response.statusText}`);
    }

    taxData = await response.json();
    populateFilingStatuses(taxData);
    renderIncomeTax(taxData);
  } catch (err) {
    showError("income-tax-content", err.message);
  }
}

function renderIncomeTax(data) {
  const status   = document.getElementById("filing-status").value;
  const config   = TAX_COUNTRIES[TAX_COUNTRY] || {};
  const currency = config.currency || "USD";
  const regionData = data["federal"];
  const brackets = status === "__flat__"
    ? regionData?.brackets
    : regionData?.[status]?.brackets;

  if (!brackets) {
    showError("income-tax-content", "No bracket data found for the selected region and filing status.");
    return;
  }

  const container = document.getElementById("income-tax-content");

  const rows = brackets.map((b) => {
    const cls      = getRateClass(b.rate);
    const pct      = (b.rate * 100).toFixed(0);
    const maxLabel = b.max === "Infinity" ? "No limit" : `${currency} ${formatNumber(b.max)}`;
    const barWidth = Math.min(pct * 2.5, 100);

    return `
      <tr>
        <td><span class="rate-badge ${cls}">${pct}%</span></td>
        <td>${currency} ${formatNumber(b.min)}</td>
        <td>${maxLabel}</td>
        <td>
          <div class="bracket-bar">
            <div class="bracket-bar-fill ${cls}" style="width:${barWidth}%"></div>
          </div>
        </td>
      </tr>`;
  }).join("");

  container.innerHTML = `
    <p class="tax-info-label">
      Showing: <strong>${config.flag || ""} ${config.name || TAX_COUNTRY} Federal</strong> brackets for
      <strong>${formatFilingStatus(status)}</strong> filers (2026)
    </p>

    <table class="tax-table">
      <thead>
        <tr>
          <th>Rate</th>
          <th>Income From</th>
          <th>Income To</th>
          <th>Visual</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <div class="tax-calculator">
      <h3>💰 Quick Tax Estimator</h3>
      <p>Enter your annual income to find your ${config.name || TAX_COUNTRY} federal tax bracket:</p>
      <div class="calculator-input">
        <span class="currency-prefix">${currency}</span>
        <input
          type="number"
          id="income-input"
          placeholder="e.g. 75 000"
          min="0"
          max="10000000"
        />
        <button class="btn btn-small" onclick="calculateAndShow()">Calculate</button>
      </div>
      <div id="calculator-result"></div>
    </div>`;
}

function calculateAndShow() {
  const resultEl = document.getElementById("calculator-result");
  const income   = parseFloat(document.getElementById("income-input").value);

  if (!income || income < 0) {
    resultEl.innerHTML = `<p class="calc-error">Please enter a valid positive income amount.</p>`;
    return;
  }

  const currency = TAX_COUNTRIES[TAX_COUNTRY]?.currency || "USD";
  const status   = document.getElementById("filing-status").value;
  const brackets = status === "__flat__"
    ? taxData?.["federal"]?.brackets
    : taxData?.["federal"]?.[status]?.brackets;
  if (!brackets) return;

  const result = calculateTax(income, brackets);

  resultEl.innerHTML = `
    <div class="calc-result">
      <div class="calc-row">
        <span>Annual Income</span>
        <strong>${currency} ${formatNumber(income)}</strong>
      </div>
      <div class="calc-row">
        <span>Top (Marginal) Rate</span>
        <strong class="rate-highlight">${(result.marginalRate * 100).toFixed(0)}%</strong>
      </div>
      <div class="calc-row">
        <span>Estimated Tax</span>
        <strong>${currency} ${formatNumber(Math.round(result.totalTax))}</strong>
      </div>
      <div class="calc-row">
        <span>Effective Tax Rate</span>
        <strong>${result.effectiveRate.toFixed(1)}%</strong>
      </div>
      <p class="calc-note">
        ⚠️ Estimate for educational purposes only.
        Consult a qualified tax professional for personalised advice.
      </p>
    </div>`;
}

function calculateTax(income, brackets) {
  let totalTax    = 0;
  let marginalRate = 0;

  for (const b of brackets) {
    const max = b.max === "Infinity" ? Infinity : parseFloat(b.max);
    const min = parseFloat(b.min);
    if (income <= min) break;
    totalTax    += (Math.min(income, max) - min) * b.rate;
    marginalRate = b.rate;
  }

  return {
    totalTax,
    marginalRate,
    effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
  };
}

// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  fetchExchangeRate();
  fetchIncomeTax();

  document.getElementById("refresh-exchange")
    ?.addEventListener("click", fetchExchangeRate);

  document.getElementById("filing-status")
    ?.addEventListener("change", () => { if (taxData) renderIncomeTax(taxData); });
});
