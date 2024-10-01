
# Automated Study Resource Generator

**Automated Study Resource Generator** merupakan sebuah sistem yang dirancang untuk secara otomatis menghasilkan file Markdown berisi materi belajar dari daftar topik yang diberikan dengan memanfaatkan Google Generative AI (Gemini).

## Fitur

- Menghasilkan file Markdown untuk setiap topik yang diberikan.
- Menggunakan Google Generative AI untuk menghasilkan konten pembelajaran yang berkualitas.
- Menyimpan hasil dalam folder terpisah berdasarkan judul topik.

## Persyaratan

- Node.js (versi terbaru disarankan)
- NPM atau Yarn
- API Key untuk Google Generative AI

## Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/andiahmadysx/automated-study-resource-generator.git
   cd automated-study-resource-generator
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi**
    - Ganti `GeminiApiKey` dengan API key Anda di dalam file `index.js`.
    - Tambahkan topik yang diinginkan ke dalam file `topics.js`.

## Penggunaan

1. **Menjalankan Program**
   Setelah konfigurasi selesai, Anda bisa menjalankan program dengan perintah berikut:
   ```bash
   node index.js
   ```

2. **Output**
   Program akan membuat folder berdasarkan judul yang Anda berikan dan menghasilkan file Markdown untuk setiap topik. File akan disimpan di dalam folder tersebut.

3. **Log Kegagalan**
   Jika ada topik yang gagal diproses, sistem akan mencatatnya dalam file log yang bernama `<judul>-log.txt`.

## Struktur Proyek

```
.
├── format.txt          # Template dan prompt tambahaan untuk konten Markdown
├── index.js            # File utama untuk menjalankan aplikasi
├── package.json        # File konfigurasi proyek Node.js
├── topics.js           # Daftar topik untuk pembelajaran
└── README.md           # Dokumentasi proyek
```



## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

