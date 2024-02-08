## Setup Proyek

Proyek ini adalah monorepo [Nx](nx.dev/). Lihat [dokumentasi Nx](https://nx.dev/) untuk informasi lebih lanjut tentang struktur proyek dan perintahnya atau untuk memanfaatkan kekuatan penuh Nx.

### Prasyarat Umum

-   [Node.js](https://nodejs.org/en/) >= 21.1.0 
-   [pnpm](https://pnpm.io/) >= 8.10.0
-   [Docker](https://www.docker.com/) >= 24.0.7 _(opsional)_
-   [PostgreSQL](https://www.postgresql.org/) >= 13.4 _(opsional jika Docker digunakan)_

#### Prasyarat Pengembangan Aplikasi Android

-   [Java](https://openjdk.org/) >= 17.0.9
-   [Android Studio](https://developer.android.com/studio) >= 2020.3.1
-   [Android SDK](https://developer.android.com/studio) >= 31.0.0

### Pengaturan Awal

> Ini adalah langkah demi langkah bagaimana membangun dan menjalankan lingkungan pengembangan lokal. Cukup [R.T.F.M.](https://en.wikipedia.org/wiki/RTFM) jika Anda tahu apa yang Anda lakukan.

-   Pastikan Anda telah menginstal semua prasyarat.
-   Kloning repositori menggunakan [Git](https://git-scm.com/).

```bash
git clone https://github.com/trashtrack-team/trashtrack
```

-   Instal dependensi menggunakan `pnpm install`.
-   Salin `.env.example` ke `.env` atau `.env.local` dan isi nilainya di dalam [apps/api](apps/api).
-   

## Menjalankan Proyek

### Melakukan bootstrap pada database

-   Mulai database menggunakan `pnpm nx run api:docker-compose-up` atau server PostgreSQL lokal.
-   Deploy migrasi prisma ke database menggunakan `pnpm nx run api:prisma-deploy`.
-   Akses database menggunakan `pnpm nx run api:prisma-studio` atau menggunakan aplikasi manajemen database seperti [PGAdmin](https://www.pgadmin.org/).

### Melakukan build dan menjalankan aplikasi Android

- Build frontend aplikasi menggunakan `pnpm nx run app:build`.
- Sinkronkan frontend aplikasi ke perangkat Android lewat Capactior menggunakan `pnpm nx run app:sync:android`.
- Jalankan aplikasi lewat Android Virtual Device atau perangkat fisik menggunakan `pnpm nx run app:run:android`.
  - Atau menggunakan perintah `pnpm nx run app:open:android` untuk membuka aplikasi di Android Studio.

### Melakukan build dan menjalankan API

- Build server API menggunakan `pnpm nx run api:build`.
- Jalankan server API menggunakan `pnpm nx run api:serve`.