THETAKS v1.0 — SOURCE PROJECT

Isi:
- index.html: struktur aplikasi
- style.css: desain premium aesthetic
- app.js: fitur task dan penyimpanan lokal
- manifest.json + sw.js: dukungan PWA
- icon.svg: ikon aplikasi

Fitur yang sudah berjalan:
- Tambah, edit, hapus tugas
- Kategori dan prioritas
- Deadline
- Tandai tugas selesai
- Filter All / To do / Completed
- Progress harian
- Light / Dark mode
- Penyimpanan lokal di browser
- Service worker untuk cache/offline setelah pertama dimuat

CATATAN:
Ini adalah PWA, bukan APK Android native. Agar bisa dipasang lewat Chrome sebagai aplikasi, file perlu di-host pada alamat HTTPS. Setelah dibuka di Chrome Android, pilih menu browser > Install app atau Add to Home screen.
Data tersimpan di perangkat/browser yang digunakan (localStorage), belum tersinkron ke cloud.

VERSI 1.1:
- Kalender bulanan dengan navigasi bulan sebelumnya/berikutnya
- Penanda tanggal yang memiliki tugas
- Agenda tugas berdasarkan tanggal yang dipilih
