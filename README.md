# Nyatet.

Catatan keuangan pribadi — offline, berjalan sepenuhnya di perangkat.
Kotlin/Java tidak diperlukan: aplikasi ini adalah HTML + CSS + JavaScript
yang dibungkus menjadi APK Android dengan [Capacitor](https://capacitorjs.com).

## Demo web
Buka `index.html` langsung di browser, atau bisa dengan link GitHub Pages.
(Mode demo ini berjalan sebagai PWA: bisa "diinstall" dan offline.)

## Fitur
- Catatan pemasukan/pengeluaran + saldo (localStorage, sepenuhnya offline)
- Mode terang/gelap (mengikuti preferensi sistem + toggle manual, tersinkron dengan status bar Android)
- Filter periode & jenis transaksi, cetak laporan (dialog print native di APK, `window.print()` di browser)
- Tombol back Android: tekan 2× untuk keluar
- Ikon aplikasi adaptif (launcher, splash, favicon) — aset dari `favicon.png`

## Build APK
Debug:
```bash
npm install
npm run build:apk   # sync web assets + gradlew assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

Release (ditandatangani):
```bash
cd android && ./gradlew assembleRelease bundleRelease
```
Output: `app/build/outputs/apk/release/Nyatet-<versionName>.apk` (mis. `Nyatet-1.1.1.apk`) dan `app/build/outputs/bundle/release/app-release.aab`

Butuh: **Node 20+**, **JDK 21** (Temurin), Android SDK (platform-tools, platforms;android-35, build-tools;35.0.0).
Set `ANDROID_HOME` (mis. `~/Android/Sdk`) dan `JAVA_HOME` ke JDK 21.

### Signing
`android/keystore.properties` dan `android/nyatet-release.jks` **tidak di-commit**
(ada di `.gitignore`). Backup keduanya di tempat aman — tanpa itu, update aplikasi
tidak bisa ditandatangani dengan kunci yang sama.

## CI (GitHub Actions)
Workflow `.github/workflows/android.yml` berjalan otomatis di setiap push ke `main`:
install deps → sync Capacitor → `assembleDebug` → APK diunggah sebagai artifact
(tab *Actions* → unduh `nyatet-debug-apk`).

Saat push tag `v*` (mis. `git tag v1.1.1 && git push --tags`), APK/AAB release
ditandatangani bila secret ini diset di repo: `NYATET_KEYSTORE_BASE64`
(isi `base64 -w0 android/nyatet-release.jks`), `NYATET_KEYSTORE_PASSWORD`,
`NYATET_KEY_ALIAS`, `NYATET_KEY_PASSWORD`. Hasilnya otomatis dilampirkan ke GitHub Release.


## Verifikasi SHA-256 (integritas APK/AAB)

Setiap rilis dapat disertai checksum SHA-256 agar siapa pun bisa memastikan
file yang diunduh identik dengan yang dibangun dari source code — penting
khususnya karena APK di GitHub Releases tidak dilindungi Play Store.

### Bagi maintainer (membuat checksum)
```bash
cd android/app/build/outputs
sha256sum apk/release/Nyatet-*.apk bundle/release/app-release.aab > ../../../SHA256SUMS-$(git describe --tags --always).txt
# atau, untuk satu release:
sha256sum Nyatet-1.1.1.apk app-release.aab > SHA256SUMS.txt
```
Lampirkan `SHA256SUMS*.txt` di GitHub Release bersama APK/AAB.
(Alternatif: `shasum -a 256` di macOS; format `sha256sum -c` kompatibel keduanya.)

### Bagi pengguna (memverifikasi)
```bash
# Unduh APK + SHA256SUMS.txt dari halaman Releases, lalu:
sha256sum -c SHA256SUMS.txt
# -> "Nyatet-1.1.1.apk: OK" berarti file identik dengan rilis resmi.

# Atau hitung manual dan bandingkan dengan yang tertera di halaman Release:
sha256sum Nyatet-1.1.1.apk
```
Jika hash tidak cocok: **jangan install** — file mungkin rusak atau dimodifikasi.

Catatan: checksum menjamin integritas file, bukan bebas virus — untuk instalasi
tanpa prompt Play Protect, distribusikan lewat Google Play (Play App Signing).

## Lisensi
[GNU General Public License v3.0](LICENSE) — source code terbuka; bila Anda
mendistribusikan versi modifikasi (termasuk APK-nya), Anda wajib melampirkan
source code versi tersebut dengan lisensi yang sama.

### Third-party licenses
Semua library pihak ketiga yang dibundel dicantumkan di
[THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) — semuanya permissive
(MIT/Apache-2.0/ISC/0BSD/BlueOak), kecuali `@capgo/capacitor-printer` (MPL-2.0).
Dependency native Android (AndroidX dsb.) Apache-2.0. Regenerate daftar dengan:

```bash
npx license-checker-rseidelsohn --production --json
npx license-checker-rseidelsohn --development --json
```

## Struktur
- `index.html`, `script.js`, `style.css` — aplikasi web (localStorage)
- `manifest.json`, `sw.js`, `icons/` — PWA (GitHub Pages)
- `android/` — proyek Android native (Capacitor)
- `www/` — aset web hasil copy (`npm run build:web`, di-gitignore)
