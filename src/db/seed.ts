import { auth } from "../lib/auth";
import { db } from "./index";

const SEED_USERS = [
  {
    email: "admin@posweb.local",
    password: "admin123",
    name: "Administrator",
    role: "admin" as const,
  },
  {
    email: "user@posweb.local",
    password: "user123",
    name: "User Demo",
    role: "user" as const,
  },
  {
    email: "cashier@posweb.local",
    password: "cashier123",
    name: "Cashier Demo",
    role: "cashier" as const,
  },
];

async function seed() {
  console.log("Seeding database...");

  for (const userData of SEED_USERS) {
    const existingUser = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.email, userData.email),
    });

    if (existingUser) {
      console.log(`User ${userData.email} already exists, skipping...`);
      continue;
    }

    const result = await auth.api.createUser({
      body: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role,
      },
    });

    if (!result.user) {
      console.error(`Failed to create user: ${userData.email}`);
      continue;
    }

    console.log(`Created ${userData.role}: ${userData.email}`);
  }

  console.log("\nSeed accounts:");
  for (const u of SEED_USERS) {
    console.log(`  [${u.role}] ${u.email} / ${u.password}`);
  }
}

seed()
  .then(() => {
    console.log("\nSeeding completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
