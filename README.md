# POSWEB Backend

Backend API untuk POSWEB, dibangun dengan Hono + Bun.

## Tech Stack

- **Runtime:** Bun
- **Framework:** Hono
- **Auth:** Better Auth
- **Validation:** Zod
- **Linting:** Ultracite (Biome)

## Getting Started

```bash
# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Run development server
bun dev
```

Server akan jalan di `http://localhost:3888`

## Scripts

```bash
bun dev       # Development server dengan hot reload
bun build     # Build untuk production
bun start     # Jalankan production build
bun lint      # Check linting issues
bun format    # Auto-fix linting & formatting
```

## API Endpoints

| Method | Endpoint | Description  |
| ------ | -------- | ------------ |
| GET    | /        | Hello World  |
| GET    | /health  | Health check |

## API Documentation

Dokumentasi API tersedia di folder `docs/rest-api/` dan mendukung:

- **Postman** - Import file `rest-api.json`
- **Bruno** - Buka folder `docs/rest-api/` langsung di Bruno

## Environment Variables

Lihat `.env.example` untuk daftar lengkap environment variables.
