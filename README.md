# POSWEB Backend

Backend API untuk POSWEB, dibangun dengan Hono + Bun.

## Tech Stack

- **Runtime:** Bun
- **Framework:** Hono
- **Database:** SQLite (libSQL) + Drizzle ORM
- **Auth:** Better Auth
- **Validation:** Zod
- **Linting:** Ultracite (Biome)

## Getting Started

```bash
# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Generate database migration
bun db:gen

# Run database migration
bun db:push

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
bun db:gen    # Generate migration dari schema
bun db:mig    # Jalankan migration
bun db:push   # Push schema ke database (development)
bun db:seed   # Seed admin account
bun db:studio # Buka Drizzle Studio
```

## API Endpoints

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| GET    | /                       | Hello World         |
| GET    | /health                 | Health check        |
| POST   | /api/auth/sign-in/email | Login dengan email  |
| POST   | /api/auth/sign-out      | Logout              |
| GET    | /api/auth/get-session   | Get current session |

## API Documentation

Dokumentasi API tersedia di folder `docs/rest-api/` dan mendukung:

- **Postman** - Import file `rest-api.json`
- **Bruno** - Buka folder `docs/rest-api/` langsung di Bruno

## Environment Variables

Lihat `.env.example` untuk daftar lengkap environment variables.
