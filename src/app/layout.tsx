import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小型服装贸易企业管理系统需求调研问卷",
  description: "用于收集小型服装贸易企业软件需求的中文问卷系统"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
