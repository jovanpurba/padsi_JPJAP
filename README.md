# Cemerlang Laundry

## Jalankan
1) Copy `.env.example` jadi `.env` lalu isi `DATABASE_URL` Neon.
2) Install:
```bash
npm install
```
3) Generate Prisma dan migrate:
```bash
npx prisma generate
npx prisma migrate dev
```
4) Run:
```bash
npm run dev
```

## Halaman
- /dashboard/pelanggan
- /dashboard/pelanggan/tambah
- /dashboard/kurir
- /dashboard/kurir/tambah
- /dashboard/jadwal
- /dashboard/jadwal/tambah
