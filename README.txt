# Grayscale Image Converter

Aplikasi web untuk mengkonversi gambar berwarna menjadi grayscale menggunakan HTML5 Canvas dan operasi matriks.

## Cara Kerja Algoritma

Aplikasi ini menggunakan algoritma konversi grayscale berdasarkan standar ITU-R BT.601, yang merupakan standar internasional untuk konversi warna ke grayscale. Berikut adalah penjelasan detail tentang cara kerja algoritma:

1. Konversi Grayscale (Operasi Matriks)
   - Setiap piksel gambar memiliki 3 komponen warna: Red (R), Green (G), dan Blue (B)
   - Untuk mengkonversi ke grayscale, kita menggunakan matriks koefisien berikut:
     * Red   = 0.299
     * Green = 0.587
     * Blue  = 0.114
   - Nilai grayscale dihitung dengan rumus:
     Grayscale = (0.299 × R) + (0.587 × G) + (0.114 × B)
   - Koefisien ini dipilih berdasarkan persepsi mata manusia terhadap warna

2. Proses Konversi
   a. Baca data piksel gambar dari canvas
   b. Untuk setiap piksel:
      - Ambil nilai R, G, B
      - Hitung nilai grayscale menggunakan rumus di atas
      - Set nilai R, G, B ke nilai grayscale yang sama
   c. Tampilkan hasil di canvas

3. Optimasi Preview
   - Gambar preview diskala ke ukuran maksimum 500x400 piksel
   - Skala dihitung secara proporsional untuk mempertahankan aspek ratio
   - Konversi preview menggunakan resolusi yang lebih rendah untuk performa

4. Download Hasil
   - Saat mengunduh, gambar dikonversi dalam resolusi penuh
   - Hasil disimpan dalam format PNG untuk kualitas terbaik
   - Nama file hasil ditambahkan suffix "-grayscale"

## Fitur Aplikasi

1. Upload Gambar
   - Drag & drop file gambar
   - Pilih file melalui dialog
   - Mendukung format PNG, JPEG, JPG
   - Maksimum ukuran file: 10MB

2. Preview
   - Tampilan side-by-side gambar asli dan hasil
   - Preview real-time sebelum konversi final
   - Ukuran preview dioptimasi untuk performa

3. Konversi
   - Konversi grayscale menggunakan standar ITU-R BT.601
   - Preservasi kualitas gambar asli
   - Proses konversi dilakukan di sisi client

4. Download
   - Unduh hasil dalam resolusi penuh
   - Format PNG untuk kualitas terbaik
   - Nama file otomatis dengan suffix "-grayscale"

## Struktur Kode

1. HTML (index.html)
   - Struktur dasar aplikasi
   - Container untuk preview dan upload
   - Tombol-tombol interaksi

2. CSS (style.css)
   - Styling responsif
   - Layout preview side-by-side
   - Animasi drag & drop
   - Desain modern dan clean

3. JavaScript (grayscale.js)
   - Logika konversi grayscale
   - Handling file upload
   - Preview dan download
   - Validasi input

## Penggunaan

1. Buka aplikasi di browser
2. Upload gambar dengan cara:
   - Seret & lepas gambar ke area upload, atau
   - Klik tombol "Pilih File"
3. Preview gambar akan muncul
4. Klik tombol "Grayscale" untuk konversi
5. Klik "Download" untuk mengunduh hasil
6. Gunakan tombol "Kembali" untuk mengkonversi gambar lain

## Batasan

- Maksimum ukuran file: 10MB
- Format yang didukung: PNG, JPEG, JPG
- Proses di sisi client (browser)
- Tidak ada penyimpanan server

## Tim Pengembang

1. Adidan Adriyana (237006044)
2. Alya Azar Nabilah (2370060618)
3. Raihan Faisal Ramdani (237006065)
