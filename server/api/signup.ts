import { promises as fs } from "fs";
import path from "path";
import type { User } from "~/utils/types";

/*
    this file will be replaced with a real API call instead of using a local file.
    this is just a mockup to simulate the signup process.
*/

const filePath = path.join(process.cwd(), "server/data/user.json");

// Helper function to simulate delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data.trim() ? JSON.parse(data) : [];
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return [];
    }
    throw err;
  }
}

async function saveUsers(users: User[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as User;

  // Simulate API delay (e.g., 3 seconds)
  await delay(3000);

  // Basic validation
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      data: { message: "Email and password are required" },
    });
  }

  // Normalize email
  body.email = body.email.trim().toLowerCase();

  try {
    const users = await loadUsers();

    // Check if email exists
    if (users.some((user) => user.email === body.email)) {
      throw createError({
        statusCode: 409,
        statusMessage: "Duplicate",
        data: { message: "Email already exists" },
      });
    }

    // Add new user
    users.push(body);
    await saveUsers(users);

    return { message: "Signup successful" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Log for dev/debug
    if (process.env.NODE_ENV === "development") {
      console.error("Signup Error:", error);
    }

    // If it's a known error (from createError), just re-throw it
    if (error.statusCode && error.data?.message) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || "Error",
        data: error.data,
      });
    }

    // Unknown error: fallback
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { message: "Something went wrong. Please try again later." },
    });
  }
});
