let transactions = JSON.parse(localStorage.getItem("dataKeuanganElegan")) || [];

const balanceDisplay = document.getElementById("balanceDisplay");
const financeForm = document.getElementById("financeForm");
const transactionContainer = document.getElementById("transactionContainer");
const themeToggle = document.getElementById("themeToggle");

const filterPeriod = document.getElementById("filterPeriod");
const filterType = document.getElementById("filterType");
 
const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");
const btnReset = document.getElementById("btnReset");
const btnPrint = document.getElementById("btnPrint");

const recapIncomeEl = document.getElementById("recapIncome");
const recapExpenseEl = document.getElementById("recapExpense");
const typeRadios = document.querySelectorAll('input[name="trxType"]');
const categorySelect = document.getElementById("category");

dateInput.valueAsDate = new Date();

const categoriesData = {
  expense: [
    { name: "Makanan", icon: "🍽️" },
    { name: "Transport", icon: "🚗" },
    { name: "Belanja", icon: "🛍️" },
    { name: "Tagihan", icon: "📄" },
    { name: "Lainnya", icon: "📦" },
  ],
  income: [
    { name: "Gaji", icon: "💼" },
    { name: "Bonus", icon: "🎁" },
    { name: "Investasi", icon: "📈" },
    { name: "Lainnya", icon: "💵" },
  ],
};

// --- Formatter di-cache (Intl.NumberFormat mahal dibuat berulang) ---
const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat("id-ID");

const formatRupiah = (number) => rupiahFormatter.format(number);

// --- Escape teks pengguna sebelum masuk ke innerHTML ---
const escapeHTML = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const dateCache = new Map();
const formatDateText = (dateString) => {
  if (!dateCache.has(dateString)) {
    dateCache.set(
      dateString,
      new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }
  return dateCache.get(dateString);
};

// --- Indeks ikon kategori: "type:name" -> ikon (hindari find() per item) ---
const categoryIconIndex = {};
for (const [type, cats] of Object.entries(categoriesData)) {
  for (const c of cats) categoryIconIndex[`${type}:${c.name}`] = c.icon;
}

amountInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  e.target.value = value ? numberFormatter.format(value) : "";
});

const updateCategoryDropdown = (type) => {
  categorySelect.innerHTML = categoriesData[type]
    .map((cat) => `<option value="${cat.name}">${cat.icon} ${cat.name}</option>`)
    .join("");
};

updateCategoryDropdown("expense");
typeRadios.forEach((radio) =>
  radio.addEventListener("change", (e) =>
    updateCategoryDropdown(e.target.value),
  ),
);

filterPeriod.addEventListener("change", () => updateUI());
filterType.addEventListener("change", () => updateUI());

const saveData = () =>
  localStorage.setItem("dataKeuanganElegan", JSON.stringify(transactions));

const deleteTransaction = (id) => {
  if (confirm("Hapus catatan transaksi ini?")) {
    transactions = transactions.filter((trx) => trx.id !== id);
    saveData();
    updateUI();
  }
};

btnReset.addEventListener("click", () => {
  if (transactions.length === 0) return;
  if (confirm("Reset seluruh data dompet ke Rp 0?")) {
    transactions = [];
    saveData();
    updateUI();
  }
});

// FUNGSI UNTUK MENDAPATKAN DATA YANG SUDAH DI-FILTER
const getFilteredData = () => {
  const filterTimeVal = filterPeriod.value;
  const filterTypeVal = filterType.value;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Batas minggu dihitung sekali saja, bukan per-transaksi
  let startOfWeek = null;
  let endOfWeek = null;
  if (filterTimeVal === "week") {
    startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (today.getDay() || 7) + 1);
    endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  }

  return transactions.filter((trx) => {
    let timeMatch = false;
    if (filterTimeVal === "all") {
      timeMatch = true;
    } else {
      const trxDate = new Date(trx.date);
      trxDate.setHours(0, 0, 0, 0);
      if (filterTimeVal === "day")
        timeMatch = trxDate.getTime() === today.getTime();
      else if (filterTimeVal === "week") {
        timeMatch = trxDate >= startOfWeek && trxDate <= endOfWeek;
      } else if (filterTimeVal === "month") {
        timeMatch =
          trxDate.getMonth() === today.getMonth() &&
          trxDate.getFullYear() === today.getFullYear();
      }
    }

    let typeMatch = filterTypeVal === "all" ? true : trx.type === filterTypeVal;
    return timeMatch && typeMatch;
  });
};

// RENDER TAMPILAN WEB
const updateUI = () => {
  const filteredData = getFilteredData();
  let totalIncome = 0;
  let totalExpense = 0;

  filteredData.forEach((trx) => {
    if (trx.type === "income") totalIncome += trx.amount;
    else totalExpense += trx.amount;
  });

  recapIncomeEl.innerText = formatRupiah(totalIncome);
  recapExpenseEl.innerText = formatRupiah(totalExpense);

  const currentBalance = transactions.reduce(
    (total, trx) =>
      trx.type === "income" ? total + trx.amount : total - trx.amount,
    0,
  );
  balanceDisplay.innerText = formatRupiah(currentBalance);

  transactionContainer.innerHTML = "";

  if (filteredData.length === 0) {
    transactionContainer.style.border = "none";
    transactionContainer.style.background = "transparent";
    transactionContainer.style.boxShadow = "none";
    transactionContainer.innerHTML = `<div class="empty-state">Tidak ada transaksi ditemukan.</div>`;
    return;
  } else {
    transactionContainer.style.border = "1px solid var(--border)";
    transactionContainer.style.background = "var(--surface)";
    transactionContainer.style.boxShadow = "0 4px 12px rgba(0,0,0,0.02)";
  }

  filteredData.forEach((trx) => {
    const operator = trx.type === "income" ? "+" : "-";
    const textClass = trx.type === "income" ? "text-income" : "";

    let icon = "💸";
    const catName = String(trx.category || "").replace(/[^a-zA-Z]/g, "").trim();
    if (categoryIconIndex[`${trx.type}:${catName}`]) {
      icon = categoryIconIndex[`${trx.type}:${catName}`];
    }

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("trx-item");

    itemDiv.innerHTML = `
                    <div class="trx-icon">${icon}</div>
                    <div class="trx-info">
                        <div class="trx-title">${escapeHTML(trx.desc)}</div>
                        <div class="trx-date">${escapeHTML(trx.category)} &bull; ${formatDateText(trx.date)}</div>
                    </div>
                    <div class="trx-right">
                        <div class="trx-amount ${textClass}">${operator}${formatRupiah(trx.amount)}</div>
                        <button class="btn-delete" onclick="deleteTransaction(${trx.id})" title="Hapus">✕</button>
                    </div>
                `;
    transactionContainer.appendChild(itemDiv);
  });
};

// --- FITUR CETAK LAPORAN (PRINT) ---
const PRINT_REPORT_CSS = `
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #111; background: #fff; padding: 24px; }
  .print-header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
  .print-header h2 { margin: 0 0 5px 0; }
  .print-header p { margin: 0; color: #555; font-size: 0.9rem; }
  .print-summary { margin-bottom: 20px; line-height: 1.6; }
  .print-table { width: 100%; border-collapse: collapse; }
  .print-table th, .print-table td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 0.9rem; }
  .print-table th { background-color: #f5f5f5; font-weight: bold; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .text-right { text-align: right !important; }
  .text-center { text-align: center !important; }
`;

btnPrint.addEventListener("click", async () => {
  const filteredData = getFilteredData();

  if (filteredData.length === 0) {
    alert("Tidak ada data untuk dicetak pada filter saat ini.");
    return;
  }

  let totalInc = 0;
  let totalExp = 0;
  let tableRowsHTML = "";

  // Buat baris tabel untuk setiap transaksi
  filteredData.forEach((trx, index) => {
    if (trx.type === "income") totalInc += trx.amount;
    else totalExp += trx.amount;

    const jenisText = trx.type === "income" ? "Pemasukan" : "Pengeluaran";
    tableRowsHTML += `
                    <tr>
                        <td class="text-center">${index + 1}</td>
                        <td>${formatDateText(trx.date)}</td>
                        <td>${escapeHTML(trx.desc)}</td>
                        <td>${escapeHTML(trx.category)}</td>
                        <td>${jenisText}</td>
                        <td class="text-right">${formatRupiah(trx.amount)}</td>
                    </tr>
                `;
  });

  // Ambil teks label filter yang sedang dipilih
  const periodLabel = filterPeriod.options[filterPeriod.selectedIndex].text;
  const typeLabel = filterType.options[filterType.selectedIndex].text;

  const reportBody = `
                <div class="print-header">
                    <h2>Laporan Catatan Keuangan</h2>
                    <p>Periode: <strong>${periodLabel}</strong> | Jenis Transaksi: <strong>${typeLabel}</strong></p>
                </div>

                <div class="print-summary">
                    <strong>Ringkasan Filter:</strong><br>
                    Total Pemasukan: ${formatRupiah(totalInc)}<br>
                    Total Pengeluaran: ${formatRupiah(totalExp)}<br>
                    <strong>Selisih (Net): ${formatRupiah(totalInc - totalExp)}</strong>
                </div>

                <table class="print-table">
                    <thead>
                        <tr>
                            <th width="5%" class="text-center">No</th>
                            <th width="15%">Tanggal</th>
                            <th width="30%">Keterangan</th>
                            <th width="15%">Kategori</th>
                            <th width="15%">Jenis</th>
                            <th width="20%" class="text-right">Nominal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRowsHTML}
                    </tbody>
                </table>
            `;

  if (isNativeApp()) {
    // Android WebView tidak mengenal window.print() — pakai dialog print native
    const { Printer } = nativePlugins();
    if (Printer) {
      const html = `<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><title>Laporan Nyatet</title><style>${PRINT_REPORT_CSS}</style></head><body>${reportBody}</body></html>`;
      try {
        await Printer.printHtml({ name: "Laporan Nyatet", html });
      } catch (e) {
        showToast("Gagal mencetak: " + (e.message || e));
      }
      return;
    }
  }

  // Browser biasa: gunakan @media print + window.print()
  const printArea = document.getElementById("printArea");
  printArea.innerHTML = reportBody;
  window.print();
});

financeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const typeInput = document.querySelector(
    'input[name="trxType"]:checked',
  ).value;
  const categoryClean = document
    .getElementById("category")
    .value.replace(/[^a-zA-Z]/g, "")
    .trim();
  const descClean = document.getElementById("desc").value.trim();
  const amountInputVal = parseInt(amountInput.value.replace(/\./g, ""));
  const currentBalance = transactions.reduce(
    (total, trx) =>
      trx.type === "income" ? total + trx.amount : total - trx.amount,
    0,
  );

  if (typeInput === "expense" && amountInputVal > currentBalance) {
    alert("Saldo tidak mencukupi.");
    return;
  }

  transactions.unshift({
    id: Date.now(),
    type: typeInput,
    date: document.getElementById("date").value,
    desc: descClean || categoryClean,
    amount: amountInputVal,
    category: categoryClean,
  });

  saveData();
  updateUI();

  document.getElementById("desc").value = "";
  amountInput.value = "";
  document.getElementById("date").valueAsDate = new Date();
});

// --- TEMA: ikuti preferensi tersimpan, atau preferensi sistem ---
const THEME_KEY = "nyatetTheme";
const syncStatusBar = async (mode) => {
  try {
    const plugins = (window.Capacitor && window.Capacitor.Plugins) || {};
    const { StatusBar, Style } = plugins;
    if (StatusBar) {
      await StatusBar.setStyle({
        style: mode === "dark" ? Style.Light : Style.Dark,
      });
      await StatusBar.setBackgroundColor({
        color: mode === "dark" ? "#000000" : "#f5f5f7",
      });
    }
  } catch (e) {
    /* browser biasa: abaikan */
  }
};
const applyTheme = (mode) => {
  document.body.classList.toggle("dark-mode", mode === "dark");
  syncStatusBar(mode);
};
const savedTheme = localStorage.getItem(THEME_KEY);
const initialTheme =
  savedTheme ||
  (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
applyTheme(initialTheme);
themeToggle.addEventListener("click", () => {
  const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});
updateUI();

/* =========================================================
   FITUR NATIVE & PWA (Capacitor) — aman di browser biasa
   ========================================================= */
const isNativeApp = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const nativePlugins = () => (window.Capacitor && window.Capacitor.Plugins) || {};

// --- Toast sederhana ---
const toastEl = document.getElementById("toast");
let toastTimer = null;
const showToast = (msg, duration = 2200) => {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toastEl.hidden = true), duration);
};

// --- Tombol kembali: tekan 2x untuk keluar (khusus APK) ---
if (isNativeApp()) {
  const { App } = nativePlugins();
  if (App) {
    let lastBack = 0;
    App.addListener("backButton", () => {
      const now = Date.now();
      if (now - lastBack < 2000) {
        App.exitApp();
      } else {
        lastBack = now;
        showToast("Tekan sekali lagi untuk keluar");
      }
    });
  }
}

// --- Service worker (hanya browser, bukan di dalam APK) ---
if ("serviceWorker" in navigator && !isNativeApp()) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
