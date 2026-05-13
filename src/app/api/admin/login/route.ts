import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, adminCookieOptions, createAdminToken } from "@/lib/auth";
import { requireAdminPassword } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };
    const expectedPassword = requireAdminPassword();

    if (!password || password !== expectedPassword) {
      return NextResponse.json({ success: false, error: "管理员密码不正确。" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, createAdminToken(), adminCookieOptions);
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "登录失败。" },
      { status: 500 }
    );
  }
}
