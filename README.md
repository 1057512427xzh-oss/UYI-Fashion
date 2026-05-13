# clothing-trade-survey

中文 Web 问卷系统，用于收集小型服装贸易企业的软件需求。业务经理填写公开问卷，管理员用密码登录查看提交结果、详情和导出文件。

## 功能

- `/survey`：26 部分中文需求调研问卷，支持本地草稿自动保存、进度提示、移动端适配和中文校验。
- `/success`：提交成功页。
- `/admin/login`：MVP 管理员密码登录。
- `/admin`：提交总数、最新提交、搜索、业务模式筛选、日期筛选、CSV 导出和退出登录。
- `/admin/responses/[id]`：单份问卷详情，按章节分组展示，支持 JSON/CSV 导出。

## 安装依赖

```bash
npm install
```

## 本地运行

```bash
cp .env.example .env.local
npm run dev
```

然后访问：

- 问卷：`http://localhost:3000/survey`
- 管理员登录：`http://localhost:3000/admin/login`

## Supabase 建表

1. 创建一个 Supabase 项目。
2. 打开 Supabase SQL Editor。
3. 执行 `supabase/schema.sql` 中的 SQL。

如果执行索引时报 `gin_trgm_ops` 相关错误，请先运行：

```sql
create extension if not exists pg_trgm;
```

然后重新执行 schema 文件。

## 环境变量

在 `.env.local` 中设置：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=change_this_password
```

说明：

- `NEXT_PUBLIC_SUPABASE_URL` 可以出现在前端环境中，但本项目不从前端直接访问 Supabase。
- `SUPABASE_SERVICE_ROLE_KEY` 只在 Next.js 服务端使用，不能暴露到浏览器。
- `ADMIN_PASSWORD` 是 MVP 管理员密码，也用于签名 HTTP-only 登录 Cookie。

## 常用命令

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

## 部署到 Vercel

1. 将项目推送到 GitHub/GitLab/Bitbucket。
2. 在 Vercel 导入项目。
3. 在 Vercel Project Settings 中添加环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
4. 部署完成后访问 `/survey` 填写问卷，访问 `/admin/login` 管理提交结果。

## 安全说明

- 公开用户只通过 `/api/survey/submit` 提交问卷。
- 管理端 API 会检查 HTTP-only 管理员 Cookie。
- Supabase service role key 不会发送到前端。
- Supabase 表启用了 RLS，并拒绝匿名直接访问；服务端 service role 可绕过 RLS 读写。
