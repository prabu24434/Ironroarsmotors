# Iron & Roar Motors

Situs dealer Harley-Davidson: katalog, kredit, test ride, deposit, PWA.

## Isi folder
index.html, styles.css, app.js, manifest.json, sw.js, README.md

## Cara menjalankan
1. Ekstrak ZIP ke satu folder.
2. Service worker butuh http(s), jadi jangan buka lewat file://. Jalankan salah satu:
   - `python3 -m http.server 8080` lalu buka http://localhost:8080
   - atau pratinjau lewat SPCK Editor, atau unggah ke hosting statis (Netlify, GitHub Pages)
3. Buka di Chrome lalu pilih "Install app" untuk memasang PWA.

## Catatan
- Tailwind dan FontAwesome dimuat dari CDN; muat sekali saat online agar tersimpan di cache.
- Gambar motor berupa ilustrasi SVG. Ganti fungsi `bikeSVG()` di app.js dengan foto produk resmi jika sudah ada.
- Peta dan nomor kontak masih placeholder.
- Pembayaran dan kredit hanya simulasi.
