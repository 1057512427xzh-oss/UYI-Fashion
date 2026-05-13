import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="card max-w-lg p-8 text-center">
        <p className="text-sm font-semibold text-brand">提交成功</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">感谢填写，我们已经收到你的需求信息。</h1>
        <p className="mt-4 text-sm leading-6 text-muted">后续可以根据这些信息进一步梳理第一版系统范围和实施优先级。</p>
        <Link href="/survey" className="btn-primary mt-6">
          返回问卷
        </Link>
      </section>
    </main>
  );
}
