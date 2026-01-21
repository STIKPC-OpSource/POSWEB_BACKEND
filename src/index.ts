import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();
const startTime = Date.now();

app.use(logger());

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://posweb.vercel.app",
      ...(process.env.CLIENT_ORIGIN ? [process.env.CLIENT_ORIGIN] : []),
    ],
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    exposeHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
    credentials: true,
  })
);

// app.use("*", async (c, next) => {
//   const session = await auth.api.getSession({ headers: c.req.raw.headers });

//   if (!session) {
//     c.set("user", null);
//     c.set("session", null);
//     await next();
//     return;
//   }

//   c.set("user", session.user);
//   c.set("session", session.session);
//   await next();
// });

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

app.get("/session", (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  return c.json({
    session,
    user,
  });
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.onError((err, c) => {
  console.error("Server Error:", err);
  return c.json(
    {
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    },
    500
  );
});

const server = serve({
  fetch: app.fetch,
  port: process.env.PORT || 3888,
  hostname: process.env.HOST || "localhost",
});

console.log(`Server running on http://${server.hostname}:${server.port}`);

const shutdown = () => {
  console.log("Shutting down...");
  server.stop();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
