import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { requireAdminPassword } from "@/lib/env";

export const ADMIN_COOKIE_NAME = "clothing_trade_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8;

function sign(timestamp: string, password: string): string {
  return createHmac("sha256", password).update(timestamp).digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function createAdminToken(): string {
  const password = requireAdminPassword();
  const timestamp = String(Date.now());
  return `${timestamp}.${sign(timestamp, password)}`;
}

export function verifyAdminToken(token?: string): boolean {
  if (!token) return false;

  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;

    const issuedAt = Number(timestamp);
    if (!Number.isFinite(issuedAt)) return false;
    if (Date.now() - issuedAt > MAX_AGE_SECONDS * 1000) return false;

    return safeEqual(signature, sign(timestamp, requireAdminPassword()));
  } catch {
    return false;
  }
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS
};
