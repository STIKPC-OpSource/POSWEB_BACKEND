import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();
const startTime = Date.now();

app.use(logger());

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://posweb.vercel.app",
      ...(process.env.CLIENT_ORIGIN ? [process.env.CLIENT_ORIGIN] : []), // Secure: only allow defined origin, no wildcards
    ],
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    exposeHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.get("/health", (c) => {
  const requestStart = performance.now();

  const uptime = Date.now() - startTime;
  const seconds = Math.floor(uptime / 1000) % 60;
  const minutes = Math.floor(uptime / (1000 * 60)) % 60;
  const hours = Math.floor(uptime / (1000 * 60 * 60));

  const memory = process.memoryUsage();
  const latency = performance.now() - requestStart;

  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    latency: `${latency.toFixed(2)} ms`,
    memory: {
      heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
    },
  });
});

// Error Handling
app.onError((err, c) => {
  console.error("🔥 Server Error:", err);
  return c.json(
    {
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    },
    500
  );
});

// Start HTTP server with Hono ap
const server = serve({
  fetch: app.fetch,
  port: process.env.PORT || 3888,
  hostname: process.env.HOST || "localhost",
});

console.log(`Server running on http://${server.hostname}:${server.port}`);

// Graceful shutdown handler
const shutdown = () => {
  console.log("Shutting down...");
  server.stop();
  process.exit(0);
};

// Handle termination signals
process.on("SIGINT", shutdown); // Ctrl+C
process.on("SIGTERM", shutdown); // Docker stop / kill
