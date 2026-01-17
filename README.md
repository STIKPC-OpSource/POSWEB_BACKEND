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
bun dev              # Development server dengan hot reload
bun x ultracite fix  # Auto-fix linting & formatting
bun x ultracite check # Check linting issues
```

## API Endpoints

| Method | Endpoint | Description  |
| ------ | -------- | ------------ |
| GET    | /        | Hello World  |
| GET    | /health  | Health check |

## Environment Variables

Lihat `.env.example` untuk daftar lengkap environment variables.
